import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TakingOffComponent } from './taking-off.component';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


console.warn("takingoff")
@NgModule({
  declarations: [
    TakingOffComponent
  ],
  imports: [
    CommonModule,
    SweetAlert2Module,
    NgbModule,
    RouterModule.forChild([
      {
        path: "",
        component: TakingOffComponent
      },
    ])
  ]
})
export class TakingOffModule { }
