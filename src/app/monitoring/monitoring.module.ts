import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoringRoutingModule } from './monitoring-routing.module';
import { AlarmsComponent } from './pages/alarms/alarms.component';
import { SandboxComponent } from './pages/sandbox/sandbox.component';
import { ProblemMmgmtComponent } from './pages/problem-mmgmt/problem-mmgmt.component';
import { AlarmsTableComponent } from './components/alarms-table/alarms-table.component';
import { ProblemsTableComponent } from './components/problems-table/problems-table.component';
import { MaterialModule } from '../material/material.module';
import { ShareModule } from '../share/share.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AlarmEntityService } from './services/alarm-entity.service';
import { AlarmDataService } from './services/alarm-data.service';
import { AlarmResolver } from './services/alarm.resolver';
import { EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { entityMetadata } from './entity-metadata';
import { AlarmsSummaryComponent } from './pages/alarms-summary/alarms-summary.component';
import { AlarmsSummaryInfoComponent } from './components/alarms-summary-info/alarms-summary-info.component';
import { AlarmsSummaryMapComponent } from './components/alarms-summary-map/alarms-summary-map.component';
import { AlarmsSummaryImagesComponent } from './components/alarms-summary-images/alarms-summary-images.component';
import { IssuesComponent } from './pages/issues/issues.component';
import { IssuesSummaryComponent } from './pages/issues-summary/issues-summary.component';
import { IssuesTableComponent } from './components/issues-table/issues-table.component';
import { IssuesSummaryMapComponent } from './components/issues-summary-map/issues-summary-map.component';
import { IssuesSummaryTableComponent } from './components/issues-summary-table/issues-summary-table.component';
import { IssuesSummaryInfoComponent } from './components/issues-summary-info/issues-summary-info.component';
import { ProblemMmgmtEditComponent } from './pages/problem-mmgmt-edit/problem-mmgmt-edit.component';
import { ProblemMmgmtSummaryComponent } from './pages/problem-mmgmt-summary/problem-mmgmt-summary.component';
import { ProblemsSummaryTableComponent } from './components/problems-summary-table/problems-summary-table.component';
import { ProblemsSummaryInfoComponent } from './components/problems-summary-info/problems-summary-info.component';
import { IssuesEditComponent } from './pages/issues-edit/issues-edit.component';


@NgModule({
  declarations: [
    AlarmsComponent,
    SandboxComponent,
    ProblemMmgmtComponent,
    AlarmsTableComponent,
    ProblemsTableComponent,
    AlarmsSummaryComponent,
    AlarmsSummaryInfoComponent,
    AlarmsSummaryMapComponent,
    AlarmsSummaryImagesComponent,
    IssuesComponent,
    IssuesSummaryComponent,
    IssuesTableComponent,
    IssuesSummaryMapComponent,
    IssuesSummaryTableComponent,
    IssuesSummaryInfoComponent,
    ProblemMmgmtEditComponent,
    ProblemMmgmtSummaryComponent,
    ProblemsSummaryTableComponent,
    ProblemsSummaryInfoComponent,
    IssuesEditComponent
  ],
  imports: [
    CommonModule,
    MonitoringRoutingModule,
    MaterialModule,
    ShareModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  providers:[
    AlarmEntityService,
    AlarmDataService,
    AlarmResolver
  ]
})
export class MonitoringModule { 
  
  constructor(private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private alarmDataService:AlarmDataService,
){

      eds.registerMetadataMap(entityMetadata);
      entityDataService.registerService('Alarm',alarmDataService);
    
    }

}
