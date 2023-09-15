import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Problem } from '../../model/Problem';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { ProblemHttpService } from '../../services/problem-http.service';
import { Issue } from '../../model/Issue';
import { IssueHttpService } from '../../services/issue-http.service';

@Component({
  selector: 'app-problem-mmgmt-summary',
  templateUrl: './problem-mmgmt-summary.component.html',
  styleUrls: ['./problem-mmgmt-summary.component.css']
})
export class ProblemMmgmtSummaryComponent implements OnInit {

  id!: string;

  loading: boolean = false;
  problem$!: Observable<Problem>;
  issues$!: Observable<Issue[]>;


  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private problemHttpService: ProblemHttpService,
    private issueHttpService: IssueHttpService) { }

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];

    this.problem$ = this.problemHttpService.getProblemById(this.id);

    //Once issue$ is resolved is recovery a parent value to be used on second observer alarms$
    this.issues$ = this.problem$.pipe(
      switchMap(x=>{
        return this.issueHttpService.findIssueByParent(x.parent);
      })
    );
 
  }
}
