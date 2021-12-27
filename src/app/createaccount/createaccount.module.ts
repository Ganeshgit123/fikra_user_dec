import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateaccountComponent } from './createaccount.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


console.warn("create")
@NgModule({
  declarations: [
    CreateaccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    RouterModule.forChild([
      {
        path:"",
        component:CreateaccountComponent
      },
    ])
  ]
})
export class CreateaccountModule { }
