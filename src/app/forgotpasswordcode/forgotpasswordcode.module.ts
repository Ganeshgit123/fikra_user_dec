import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotpasswordcodeComponent } from './forgotpasswordcode.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ForgotpasswordcodeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path:"",
        component:ForgotpasswordcodeComponent
      },
    ])
  ]
})
export class ForgotpasswordcodeModule { }
