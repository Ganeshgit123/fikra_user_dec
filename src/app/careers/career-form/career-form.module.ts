import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareerFormComponent } from './career-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


console.warn("career-form")
@NgModule({
  declarations: [
    CareerFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path:"",
        component:CareerFormComponent
      },
    ])
  ],
  
})
export class CareerFormModule { }
