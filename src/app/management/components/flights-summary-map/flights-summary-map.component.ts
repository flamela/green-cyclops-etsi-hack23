import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Observable, finalize } from 'rxjs';
import { Alarm } from 'src/app/monitoring/model/Alarm';

@Component({
  selector: 'app-flights-summary-map',
  templateUrl: './flights-summary-map.component.html',
  styleUrls: ['./flights-summary-map.component.css']
})
export class FlightsSummaryMapComponent implements OnInit {


  @Input()
  dataInput!: Observable<Alarm[]>;

  map!: L.Map;
  loading: boolean = false;


  ngOnInit(): void {
    this.loading = true;
    this.dataInput.pipe(
      finalize(() => this.loading = false)
    )
      .subscribe(x => this.initMap(x))
  }

  initMap(alarms: Alarm[]) {

    let description = alarms[0].id;
    let lat = parseFloat(alarms[0].latitude);
    let lng = parseFloat(alarms[0].longitude);

    this.map = L.map('map').setView([lat, lng], 9);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    let marker = L.marker([lat, lng])
      .bindPopup("<b>Id: " + description + "</b><br>");
    marker.addTo(this.map);

    this.loadMarks(alarms)
    this.refreshLayer();
  }

  loadMarks(alarms: Alarm[]) {

    alarms.forEach(alarm => {

      let description = alarm.id;
      let lat = parseFloat(alarm.latitude);
      let lng = parseFloat(alarm.longitude);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(this.map);

      let marker = L.marker([lat, lng])
        .bindPopup("<b>Id: " + description + "</b><br>");
      marker.addTo(this.map);
    });
  }


  refreshLayer() {
    this.map.invalidateSize();
    setTimeout(() => { this.refreshLayer(); }, 100);
  }
}

