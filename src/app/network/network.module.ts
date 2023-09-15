import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetworkRoutingModule } from './network-routing.module';
import { EdgeComponent } from './pages/edge/edge.component';
import { RadioComponent } from './pages/radio/radio.component';


@NgModule({
  declarations: [
    EdgeComponent,
    RadioComponent
  ],
  imports: [
    CommonModule,
    NetworkRoutingModule
  ]
})
export class NetworkModule { }
