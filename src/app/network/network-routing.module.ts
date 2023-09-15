import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EdgeComponent } from './pages/edge/edge.component';
import { RadioComponent } from './pages/radio/radio.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'edge', component: EdgeComponent,
    },
    {
      path: 'radio', component: RadioComponent,
    },
    { path: '**', redirectTo: 'app-edge' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkRoutingModule { }
