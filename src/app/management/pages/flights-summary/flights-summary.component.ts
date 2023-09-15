import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { Alarm, Alarms } from 'src/app/monitoring/model/Alarms';
import { AlarmHttpService } from 'src/app/monitoring/services/alarm-http.service';
import { Flight } from '../../model/Flight';
import { FlightEntityService } from '../../services/flight-entity.service';

@Component({
  selector: 'app-flights-summary',
  templateUrl: './flights-summary.component.html',
  styleUrls: ['./flights-summary.component.css']
})
export class FlightsSummaryComponent implements OnInit {

  id!: string;

  loading: boolean = false;
  alarms$!: Observable<Alarm[]>;
  flight$!:Observable<Flight>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private flightEntityService: FlightEntityService,
    private alarmHttpService: AlarmHttpService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.alarms$ = this.alarmHttpService.findAlarmByFlightId(this.id);

    this.flight$ = this.flightEntityService.entities$
    .pipe(
      map(x => {
        let result = x.filter(x => x.name === this.id)
        return result[0];
      })
    )
  }
}
