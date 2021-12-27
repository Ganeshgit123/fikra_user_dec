import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecicalrequestComponent } from './specicalrequest.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


console.warn("special")
@NgModule({
  declarations: [
    SpecicalrequestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path:"",
        component:SpecicalrequestComponent
      },
    ])
  ]
})
export class SpecicalrequestModule { }
