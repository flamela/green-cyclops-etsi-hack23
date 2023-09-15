import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightsComponent } from './pages/flights/flights.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { OperationsComponent } from './pages/operations/operations.component';
import { OperationsEditComponent } from './pages/operations-edit/operations-edit.component';
import { OperationResolver } from './services/operation.resolver';
import { ProfileResolver } from './services/profile.resolver';
import { ProfilesEditComponent } from './pages/profiles-edit/profiles-edit.component';
import { FlightResolver } from './services/flight.resolver';
import { FlightsEditComponent } from './pages/flights-edit/flights-edit.component';
import { OperationsSummaryComponent } from './pages/operations-summary/operations-summary.component';
import { FlightsSummaryComponent } from './pages/flights-summary/flights-summary.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'operations', component: OperationsComponent,
      resolve: { operationResolver: OperationResolver }
    },
    { path: 'operations-edit', component: OperationsEditComponent },
    { path: 'operations-edit/:id', component: OperationsEditComponent },
    { path: 'operations-summary/:name', component: OperationsSummaryComponent },
    {
      path: 'profiles', component: ProfilesComponent,
      resolve: { profileResolver: ProfileResolver }
    },
    { path: 'profiles-edit', component: ProfilesEditComponent },
    { path: 'profiles-edit/:id', component: ProfilesEditComponent },
    {
      path: 'flights', component: FlightsComponent,
      resolve: { flightResolver: FlightResolver }
    },
    { path: 'flights-edit', component: FlightsEditComponent },
    { path: 'flights-edit/:id', component: FlightsEditComponent },
    { path: 'flights-summary/:id', component: FlightsSummaryComponent },
    { path: '**', redirectTo: 'operations' }
  ]
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
