import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, first, take, tap, throttle, throttleTime } from 'rxjs';
import { Alarm } from 'src/app/monitoring/model/Alarms';

@Component({
  selector: 'app-flights-summary-table',
  templateUrl: './flights-summary-table.component.html',
  styleUrls: ['./flights-summary-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FlightsSummaryTableComponent implements OnInit {

  displayedColumns: string[] = ['name','info'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Alarm;

  @Input()
  dataInput!: Observable<Alarm[]>;

  ALARMS_SUMMARY: string = '/monitoring/alarms-summary';

  dataSource!: any;
  loading: boolean = false;

  constructor(private router: Router){}

  ngOnInit(): void {

    this.dataInput
      .subscribe(alarm => {
        this.dataSource = new MatTableDataSource(alarm);
      })
  }
  search(id: string) {
    this.router.navigate([this.ALARMS_SUMMARY, id]);
  }
}
