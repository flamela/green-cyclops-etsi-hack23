import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourcesRoutingModule } from './resources-routing.module';

import { DevicesComponent } from './pages/devices/devices.component';
import { SitesComponent } from './pages/sites/sites.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { DeviceEntityService } from './services/device-entity.service';
import { DeviceDataService } from './services/device-data.service';
import { EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { entityMetadata } from './entity-metadata';
import { DeviceResolver } from './services/device.resolver';
import { ShareModule } from '../share/share.module';
import { DevicesSummaryComponent } from './pages/devices-summary/devices-summary.component';
import { DevicesTableComponent } from './components/devices-table/devices-table.component';
import { MaterialModule } from '../material/material.module';
import { DevicesEditComponent } from './pages/devices-edit/devices-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SitesTableComponent } from './components/sites-table/sites-table.component';
import { SitesEditComponent } from './pages/sites-edit/sites-edit.component';
import { SiteEntityService } from './services/site-entity.service';
import { SiteDataService } from './services/site-data.service';
import { SiteResolver } from './services/site.resolver';
import { PathsComponent } from './pages/paths/paths.component';
import { PathsEditComponent } from './pages/paths-edit/paths-edit.component';
import { PathsTableComponent } from './components/paths-table/paths-table.component';
import { PathEntityService } from './services/path-entity.service';
import { PathDataService } from './services/path-data.service';
import { PathResolver } from './services/path.resolver';
import { SitesSummaryComponent } from './pages/sites-summary/sites-summary.component';
import { SitesSummaryInfoComponent } from './components/sites-summary-info/sites-summary-info.component';
import { SitesSummaryMapComponent } from './components/sites-summary-map/sites-summary-map.component';
import { SitesSummaryPathsComponent } from './components/sites-summary-paths/sites-summary-paths.component';
import { DeviceSummaryInfoComponent } from './components/device-summary-info/device-summary-info.component';
import { IotComponent } from './pages/iot/iot.component';




@NgModule({
  declarations: [
    DevicesComponent,
    DevicesSummaryComponent,
    DevicesTableComponent,
    DevicesEditComponent,
    SitesComponent,
    SitesTableComponent,
    SitesEditComponent,
    ProfilesComponent,
    PathsComponent,
    PathsEditComponent,
    PathsComponent,
    PathsTableComponent,
    SitesSummaryComponent,
    SitesSummaryInfoComponent,
    SitesSummaryMapComponent,
    SitesSummaryPathsComponent,
    DeviceSummaryInfoComponent,
    IotComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ResourcesRoutingModule,
    ShareModule,
    ReactiveFormsModule,
    FlexLayoutModule,

  ],
  providers: [
    DeviceEntityService,
    DeviceDataService,
    DeviceResolver,
    SiteEntityService,
    SiteDataService,
    SiteResolver,
    PathEntityService,
    PathDataService,
    PathResolver
  ]
})
export class ResourcesModule {

  constructor(private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private deviceDataService:DeviceDataService,
    private siteDataService:SiteDataService,
    private pathDataService:PathDataService){

      eds.registerMetadataMap(entityMetadata);
      entityDataService.registerService('Device',deviceDataService);
      entityDataService.registerService('Zone',siteDataService);
      entityDataService.registerService('Path',pathDataService);
    }
}
