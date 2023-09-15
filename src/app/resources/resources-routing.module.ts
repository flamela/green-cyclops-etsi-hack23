import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevicesComponent } from './pages/devices/devices.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { SitesComponent } from './pages/sites/sites.component';
import { DeviceResolver } from './services/device.resolver';
import { DevicesEditComponent } from './pages/devices-edit/devices-edit.component';
import { SitesEditComponent } from './pages/sites-edit/sites-edit.component';
import { SiteResolver } from './services/site.resolver';
import { PathsComponent } from './pages/paths/paths.component';
import { PathResolver } from './services/path.resolver';
import { PathsEditComponent } from './pages/paths-edit/paths-edit.component';
import { SitesSummaryComponent } from './pages/sites-summary/sites-summary.component';
import { DevicesSummaryComponent } from './pages/devices-summary/devices-summary.component';
import { IotComponent } from './pages/iot/iot.component'


const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'devices', component: DevicesComponent,
      resolve: { deviceResolver: DeviceResolver }
    },
    { path: 'devices-edit', component: DevicesEditComponent },
    { path: 'devices-edit/:id', component: DevicesEditComponent },
    { path: 'devices-summary/:id', component: DevicesSummaryComponent },
    {
      path: 'sites', component: SitesComponent,
      resolve: { siteResolver: SiteResolver }
    },
    { path: 'sites-edit', component: SitesEditComponent },
    { path: 'sites-edit/:id', component: SitesEditComponent },
    { path: 'sites-summary/:id', component: SitesSummaryComponent },
    {
      path: 'paths', component: PathsComponent,
      resolve: { pathResolver: PathResolver }
    },
    { path: 'paths-edit', component: PathsEditComponent },
    { path: 'paths-edit/:id', component: PathsEditComponent },

    { path: 'iot', component: IotComponent },

    { path: 'profiles', component: ProfilesComponent },
    { path: '**', redirectTo: 'devices' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }
