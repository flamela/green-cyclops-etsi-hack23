import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Alarm } from '../../model/Alarms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-alarms-summary-map',
  templateUrl: './alarms-summary-map.component.html',
  styleUrls: ['./alarms-summary-map.component.css']
})
export class AlarmsSummaryMapComponent implements OnInit {

  map!: L.Map;

  @Input()
  dataInput!: Observable<Alarm>;

  ngOnInit(): void {
    this.dataInput.subscribe(x => this.initMap(x))
  }

  initMap(alarm: Alarm) {

    let description = alarm?.id ?? 0;
    let lat = parseFloat(alarm?.latitude ?? 0);
    let lng = parseFloat(alarm?.longitude ?? 0);


    this.map = L.map('map').setView([lat, lng], 9);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    let marker = L.marker([lat, lng])
      .bindPopup("<b>Id: " + description + "</b><br>");
    marker.addTo(this.map);

    this.refreshLayer();
  }


  refreshLayer() {
    this.map.invalidateSize();
    setTimeout(() => { this.refreshLayer(); }, 100);
  }
}

