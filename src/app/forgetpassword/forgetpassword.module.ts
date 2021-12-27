import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetpasswordComponent } from './forgetpassword.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


console.warn("forget")
@NgModule({
  declarations: [
    ForgetpasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path:"",
        component:ForgetpasswordComponent
      },
    ])
  ]
})
export class ForgetpasswordModule { }
