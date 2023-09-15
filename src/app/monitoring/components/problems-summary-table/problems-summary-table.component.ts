import { Component, Input, OnInit } from '@angular/core';
import { Issue } from '../../model/Issue';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-problems-summary-table',
  templateUrl: './problems-summary-table.component.html',
  styleUrls: ['./problems-summary-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProblemsSummaryTableComponent implements OnInit {

 
  displayedColumns: string[] = ['name','info'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Issue;

  @Input()
  dataInput!: Observable<Issue[]>;

  ISSUES_SUMMARY: string = '/monitoring/issues-summary';

  dataSource!: any;
  loading: boolean = false;

  constructor(private router: Router){}

  ngOnInit(): void {

    this.dataInput
      .subscribe(issue => {
        this.dataSource = new MatTableDataSource(issue);
      })
  }

  search(id: string) {
    this.router.navigate([this.ISSUES_SUMMARY, id]);
  }
}
