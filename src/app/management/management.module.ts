import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FlightsComponent } from './pages/flights/flights.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { OperationEntityService } from './services/operation-entity.service';
import { OperationDataService } from './services/operation-data.service';
import { OperationResolver } from './services/operation.resolver';
import { MaterialModule } from '../material/material.module';
import { ShareModule } from '../share/share.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { entityMetadata } from './entity-metadata';
import { ManagementRoutingModule } from './management-routing.module';
import { OperationsComponent } from './pages/operations/operations.component';
import { OperationsTableComponent } from './components/operations-table/operations-table.component';
import { OperationsEditComponent } from './pages/operations-edit/operations-edit.component';
import { ProfileEntityService } from './services/profile-entity.service';
import { ProfileDataService } from './services/profile-data.service';
import { ProfileResolver } from './services/profile.resolver';
import { ProfilesTableComponent } from './components/profiles-table/profiles-table.component';
import { ProfilesEditComponent } from './pages/profiles-edit/profiles-edit.component';
import { FlightEntityService } from './services/flight-entity.service';
import { FlightDataService } from './services/flight-data.service';
import { FlightResolver } from './services/flight.resolver';
import { FlightsEditComponent } from './pages/flights-edit/flights-edit.component';
import { FlightsTableComponent } from './components/flights-table/flights-table.component';
import { OperationFlightsFormComponent } from './components/operation-flights-form/operation-flights-form.component';
import { OperationsSummaryComponent } from './pages/operations-summary/operations-summary.component';
import { FlightsSummaryMapComponent } from './components/flights-summary-map/flights-summary-map.component';
import { FlightsSummaryTableComponent } from './components/flights-summary-table/flights-summary-table.component';
import { FlightsSummaryComponent } from './pages/flights-summary/flights-summary.component';
import { FlightsSummaryInfoComponent } from './components/flights-summary-info/flights-summary-info.component';



@NgModule({
  declarations: [
    OperationsComponent,
    FlightsComponent,
    ProfilesComponent,
    OperationsTableComponent,
    OperationsEditComponent,
    ProfilesTableComponent,
    ProfilesEditComponent,
    FlightsEditComponent,
    FlightsTableComponent,
    OperationFlightsFormComponent,
    OperationsSummaryComponent,
    FlightsSummaryMapComponent,
    FlightsSummaryTableComponent,
    FlightsSummaryComponent,
    FlightsSummaryInfoComponent

  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    MaterialModule,
    ShareModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  providers: [
    OperationEntityService,
    OperationDataService,
    OperationResolver,
    ProfileEntityService,
    ProfileDataService,
    ProfileResolver,
    FlightEntityService,
    FlightDataService,
    FlightResolver
  ]
})
export class ManagementModule {
  
  constructor(private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private operationDataService: OperationDataService,
    private profileDataService: ProfileDataService,
    private flightDataService: FlightDataService) {
    
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Operation', operationDataService);
    entityDataService.registerService('Profile',profileDataService);
    entityDataService.registerService('Flight',flightDataService);
  }
}

