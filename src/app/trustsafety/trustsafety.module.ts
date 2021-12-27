import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrustsafetyComponent } from './trustsafety.component';
import { RouterModule } from '@angular/router';


console.warn("trust")
@NgModule({
  declarations: [
    TrustsafetyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"",
        component:TrustsafetyComponent
      },
    ])
  ]
})
export class TrustsafetyModule { }
