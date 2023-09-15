import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';


@NgModule({
  declarations: [
    DialogDeleteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
    
  ],
  exports:[
    DialogDeleteComponent
  ]
})
export class ShareModule { }
