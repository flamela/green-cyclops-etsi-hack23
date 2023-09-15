import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-sites-summary-map',
  templateUrl: './sites-summary-map.component.html',
  styleUrls: ['./sites-summary-map.component.css']
})
export class SitesSummaryMapComponent implements OnInit {


  map!: L.Map;

  @Input()
  dataInput!: any;

  ngOnInit(): void {

    const data = this.dataInput[0];

    let description = data.name;
    let lat = parseFloat(data.latitude);
    let lng = parseFloat(data.longitude);


    this.map = L.map('map').setView([lat, lng], 9);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    let marker = L.marker([lat, lng])
      .bindPopup("<b>Zone: " + description + "</b><br>");
    marker.addTo(this.map);

    this.refreshLayer();

  }

  refreshLayer() {
    this.map.invalidateSize();
    setTimeout(() => { this.refreshLayer(); }, 100);
  }
}




