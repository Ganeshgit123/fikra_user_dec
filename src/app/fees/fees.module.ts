import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeesComponent } from './fees.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FeesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"",
        component:FeesComponent
      },
    ])
  ]
})
export class FeesModule { }
