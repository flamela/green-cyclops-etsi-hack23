import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoringComponent } from './pages/monitoring/monitoring.component';
import { OperationsComponent } from './pages/operations/operations.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'monitoring', component: MonitoringComponent,
    },
    {
      path: 'operations', component: OperationsComponent,
    },
    {
      path: 'users', component: UsersComponent,
    },
    { path: '**', redirectTo: 'monitoring' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
