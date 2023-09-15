import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IssueHttpService } from '../../services/issue-http.service';
import { AlarmHttpService } from '../../services/alarm-http.service';
import { Alarm } from '../../model/Alarms';
import { Issue } from '../../model/Issue';
import { Observable, map, tap } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ImagesS3Service } from '../../services/images-s3.service';

@Component({
  selector: 'app-alarms-summary',
  templateUrl: './alarms-summary.component.html',
  styleUrls: ['./alarms-summary.component.css']
})
export class AlarmsSummaryComponent implements OnInit {

  components = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { compName: 'alarms-summary-info', cols: 12, rows: 2, color: 'wite' },
          { compName: 'alarms-summary-map', cols: 12, rows: 4, color: 'wite' },
          { compName: 'alarms-summary-images', cols: 12, rows: 4, color: 'wite' },
        ];
      }

      return [
        { compName: 'alarms-summary-info', cols: 12, rows: 2, color: 'wite' },
        { compName: 'alarms-summary-map', cols: 5, rows: 6, color: 'wite' },
        { compName: 'alarms-summary-images', cols: 7, rows: 6, color: 'wite' },
      ];
    })
  );


  id!: string;

  loading: boolean = false;
  alarm$!: Observable<Alarm>;
  

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private alarmHttpService: AlarmHttpService,
    private issueHttpService: IssueHttpService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.alarm$ = this.alarmHttpService.getAlarmById(this.id);

   
  }
}
