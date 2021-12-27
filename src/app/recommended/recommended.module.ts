import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendedComponent } from './recommended.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


console.warn("recommended")
@NgModule({
  declarations: [
    RecommendedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    NgbModule,
    RouterModule.forChild([
      {
        path:"",
        component:RecommendedComponent
      },
    ])
  ]
})
export class RecommendedModule { }
