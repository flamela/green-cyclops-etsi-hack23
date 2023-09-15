import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Device } from '../../model/Device';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { DeviceEntityService } from '../../services/device-entity.service';

@Component({
  selector: 'app-devices-summary',
  templateUrl: './devices-summary.component.html',
  styleUrls: ['./devices-summary.component.css']
})
export class DevicesSummaryComponent implements OnInit {

  id!: string;

  loading: boolean = false;
  device$!: Observable<Device>;


  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private deviceEntityService: DeviceEntityService
  ) { }

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];

    this.device$ = this.deviceEntityService.entities$
    .pipe(
      map(x => {
        let result = x.filter(x => x.id === this.id)
        return result[0];
      })
    )
  }
}
