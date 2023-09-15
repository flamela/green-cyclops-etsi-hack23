import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../../model/Flight';

@Component({
  selector: 'app-flights-summary-info',
  templateUrl: './flights-summary-info.component.html',
  styleUrls: ['./flights-summary-info.component.css']
})
export class FlightsSummaryInfoComponent implements OnInit {

  @Input()
  dataInput!: Observable<Flight>;
  form: any;

  flight!: Flight

  constructor() { }

  ngOnInit(): void {
    this.dataInput.subscribe(flight => {
      this.flight = flight;
    })
  }
}

