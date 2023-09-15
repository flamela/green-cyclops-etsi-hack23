import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../../model/Device';

@Component({
  selector: 'app-device-summary-info',
  templateUrl: './device-summary-info.component.html',
  styleUrls: ['./device-summary-info.component.css']
})
export class DeviceSummaryInfoComponent implements OnInit {

  @Input()
  dataInput!: Observable<Device>;
  form: any;

  device!: Device

  constructor() { }

  ngOnInit(): void {
    this.dataInput.subscribe(device => {
      this.device = device;
    })
  }
}

