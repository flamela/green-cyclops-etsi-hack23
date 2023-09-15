import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, map, mergeMap, of } from 'rxjs';
import { Flight } from '../../model/Flight';
import { FlightEntityService } from '../../services/flight-entity.service';
import { IssueHttpService } from 'src/app/monitoring/services/issue-http.service';
import { ProblemHttpService } from 'src/app/monitoring/services/problem-http.service';

interface TreeItem {
  label?: string;
  id?: string;
  type?: TYPE;
  expanded?: boolean;
  subItems?: TreeItem[];
}

enum TYPE {
  FLIGHT = 'FLIGHT',
  ISSUE = 'ISSUE',
  PROBLEMS = 'PROBLEMS'
}

@Component({
  selector: 'app-operations-summary',
  templateUrl: './operations-summary.component.html',
  styleUrls: ['./operations-summary.component.css']
})
export class OperationsSummaryComponent implements OnInit {

  flights$!: Observable<Flight[]>;

  name!: string;
  items: TreeItem[] = [];

  FLIGHT_SUMMARY: string = '/management/flights-summary';
  ISSUE_SUMMARY: string = '/monitoring/issues-summary';
  PROBLEM_SUMMARY: string = '/monitoring/problem-mmgmt-summary';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private flightEntityService: FlightEntityService,
    private issueHttpService: IssueHttpService,
    private problemHttpService: ProblemHttpService) {

  }

  ngOnInit(): void {

    this.name = this.route.snapshot.params['name'];

    //Filter flights by Operation.name 
    this.flightEntityService.entities$.pipe(
      map(x => x.filter(flight => flight.parent === this.name)),
    ).subscribe(
      flights => {

        let subItemsContentIssues: TreeItem[] = []
        let subItemsContentProblems: TreeItem[] = []

        flights.forEach(flight => {
          //console.log('flight: ', flight.name)
          of(null).pipe(
            //It paralyzes calls to recover the issues and problems, onces both async call are resolved is created the items objects to the view
            mergeMap(() => forkJoin([this.issueHttpService.findIssueByRelated(flight.parent), this.problemHttpService.findProblemByRelated(flight.parent)]))
          ).subscribe(([issues, problems]) => {


            //1.- it creates a subItemsContentIssues node with the issues api response  
            //console.log('Issue:', issues);
            issues.forEach(issue => {
              //console.log(issue)
              let newItem: TreeItem = {
                id: issue.id,
                type: TYPE.ISSUE
              }
              subItemsContentIssues.push(newItem)
            })

            //2.- it creates a subItemsContentProblems node with the problems api response  
            //console.log('Problem:', problems);
            problems.forEach(problem => {
              //console.log(problem)
              let newItem: TreeItem = {
                id: problem.id,
                type: TYPE.PROBLEMS
              }
              subItemsContentProblems.push(newItem)
            })
          });

          //3.- Finally is ensamble newItem with nodes subItemsContentIssues and subItemsContentProblems
          let newItem: TreeItem = {
            label: flight.name,
            id: flight.id,
            type: TYPE.FLIGHT,
            expanded: false,
            subItems: [
              {
                label: 'Issues',
                expanded: false,
                subItems: subItemsContentIssues
              },
              {
                label: 'Problems',
                expanded: false,
                subItems: subItemsContentProblems
              }
            ]
          }
          this.items.push(newItem)
        })
      }
    );
  }


  toggleCollapse(item: TreeItem) {
    item.expanded = !item.expanded;
  }

  onSearchClick(item: TreeItem) {
    switch (item.type) {
      case TYPE.FLIGHT: {
        this.router.navigate([this.FLIGHT_SUMMARY, item.label]);
        break;
      }
      case TYPE.ISSUE: {
        this.router.navigate([this.ISSUE_SUMMARY, item.id]);
        break;
      }
      case TYPE.PROBLEMS: {
        this.router.navigate([this.PROBLEM_SUMMARY, item.id]);
        break;
      }
      default: {
        break;
      }
    }
  }
}