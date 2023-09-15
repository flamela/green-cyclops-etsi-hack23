import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { UsersComponent } from './pages/users/users.component';
import { OperationsComponent } from './pages/operations/operations.component';
import { MonitoringComponent } from './pages/monitoring/monitoring.component';


@NgModule({
  declarations: [
    OperationsComponent,
    MonitoringComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
