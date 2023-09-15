import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ErrorResolver, ErrorhandlerComponent } from './errorhandler';
import { DroneComponent } from './drone/drone.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home-routing.module').then(m => m.HomeRoutingModule),
    canActivate: [AuthGuard],
    data: { roles: ["fire-admin", "fire-user"] }
  },
  {
    path: 'error',component: ErrorhandlerComponent,
    resolve: {
      errorData: ErrorResolver,
    }
  },
  {
    path: 'monitoring',
    loadChildren: () => import('./monitoring/monitoring-routing.module').then(m => m.MonitoringRoutingModule),
    canActivate: [AuthGuard],
    data: { roles: ["fire-admin", "fire-user"] }
  },
  {
    path: 'management',
    loadChildren: () => import('./management/management-routing.module').then(m => m.ManagementRoutingModule),
    canActivate: [AuthGuard],
    data: { roles: ["fire-admin", "fire-user"] }
  },
  {
    path: 'resources',
    loadChildren: () => import('./resources/resources-routing.module').then(m => m.ResourcesRoutingModule),
    canActivate: [AuthGuard],
    data: { roles: ["fire-admin", "fire-user"] }
  },
  {
    path: 'network',
    loadChildren: () => import('./network/network-routing.module').then(m => m.NetworkRoutingModule),
    canActivate: [AuthGuard],
    data: { roles: ["fire-admin", "fire-user"] }
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings-routing.module').then(m => m.SettingsRoutingModule),
    canActivate: [AuthGuard],
    data: { roles: ["fire-admin", "fire-user"] }
  },
  {
    path: 'drone', component: DroneComponent,
    canActivate: [AuthGuard],
    data: { roles: ["fire-admin", "fire-user"] }
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
