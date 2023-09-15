import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { AlarmHttpService } from '../../services/alarm-http.service';
import { Alarm } from '../../model/Alarm';
import { IssueHttpService } from '../../services/issue-http.service';
import { Issue } from '../../model/Issue';

@Component({
  selector: 'app-issues-summary',
  templateUrl: './issues-summary.component.html',
  styleUrls: ['./issues-summary.component.css']
})
export class IssuesSummaryComponent  implements OnInit {

  id!: string;

  loading: boolean = false;
  alarms$!: Observable<Alarm[]>;
  issue$!: Observable<Issue>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private issueHttpService: IssueHttpService,
    private alarmHttpService: AlarmHttpService) { }

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];

    this.issue$ = this.issueHttpService.getIssueById(this.id);

    //Once issue$ is resolved is recovery a parent value to be used on second observer alarms$
    this.alarms$ = this.issue$.pipe(
      switchMap(x=>{
        return this.alarmHttpService.findAlarmByParent(x.parent);
      })
    );
 
  }
}
