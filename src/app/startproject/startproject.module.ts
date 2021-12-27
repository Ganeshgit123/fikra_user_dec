import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartprojectComponent } from './startproject.component';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


console.warn("start");
@NgModule({
  declarations: [
    StartprojectComponent,
    
  ],
  imports: [
    CommonModule,
    SweetAlert2Module,
    RouterModule.forChild([
      {
        path:"",
        component:StartprojectComponent
      }
    ])
  ],

})
export class StartprojectModule { }
