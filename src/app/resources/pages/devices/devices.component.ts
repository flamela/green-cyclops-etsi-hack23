import { Component, OnInit } from '@angular/core';
import { Observable, delay, map, tap } from 'rxjs';
import { EntityAction } from '@ngrx/data';
import { Device } from '../../model/Device';
import { DeviceEntityService } from '../../services/device-entity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  devices$!: Observable<Device[]>;
  loading$!: Observable<boolean>;
  loaded$!: Observable<boolean>;
  error$!: Observable<EntityAction<any>>;

  routerNavigate: string = ''
  DEVICES_EDIT: string = '/resources/devices-edit';


  constructor(
    private router: Router,
    private deviceEntityService: DeviceEntityService) { }

  ngOnInit(): void {

    this.loading$ = this.deviceEntityService.loading$.pipe(delay(0));
    this.loaded$ = this.deviceEntityService.loaded$.pipe(delay(0));
    this.error$ = this.deviceEntityService.errors$;
    this.devices$ = this.deviceEntityService.entities$;
  }

  create() {
    this.router.navigate([this.DEVICES_EDIT]);
  }

}
