import { Component, OnInit } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Flight } from '../../model/Flight';
import { EntityAction } from '@ngrx/data';
import { Router } from '@angular/router';
import { FlightEntityService } from '../../services/flight-entity.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  flights$!: Observable<Flight[]>;
  loading$!: Observable<boolean>;
  loaded$!: Observable<boolean>;
  error$!: Observable<EntityAction<any>>;

  routerNavigate: string = ''
  FLIGHTS_EDIT: string = '/management/flights-edit';


  constructor(
    private router: Router,
    private flightEntityService: FlightEntityService) { 
  
    }

  ngOnInit(): void {
    this.loading$ = this.flightEntityService.loading$.pipe(delay(0));
    this.loaded$ = this.flightEntityService.loaded$.pipe(delay(0));
    this.error$ = this.flightEntityService.errors$;
    this.flights$ = this.flightEntityService.entities$;
  }

  create() {
    this.router.navigate([this.FLIGHTS_EDIT]);
  }

}

