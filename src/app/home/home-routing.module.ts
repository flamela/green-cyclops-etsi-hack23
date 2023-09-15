import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'app-home', component: HomeComponent,
      resolve: {
        //monitoringResolver: MonitoringComponent
      }
    },
    { path: '**', redirectTo: 'app-home' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
