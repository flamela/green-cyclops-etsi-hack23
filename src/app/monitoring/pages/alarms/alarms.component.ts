import { Component, OnInit } from '@angular/core';
import { finalize, map} from 'rxjs';
import { Alarms } from '../../model/Alarms';
import { AlarmHttpService } from '../../services/alarm-http.service';

@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.css']
})
export class AlarmsComponent implements OnInit {

  loading:boolean = false;
  alarms!:Alarms;

  constructor(
    private alarmHttpService: AlarmHttpService) { }

  ngOnInit(): void {

    this.loading  = true;

    this.alarmHttpService.getAlarms({page:  0,size:  5}).pipe(
      map(x=>this.alarms = x),
      finalize(() => this.loading = false)
    ).subscribe();
  }
}
