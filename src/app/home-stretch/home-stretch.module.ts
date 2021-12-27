import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeStretchComponent } from './home-stretch.component';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


console.warn("homestretc")
@NgModule({
  declarations: [
    HomeStretchComponent
  ],
  imports: [
    CommonModule,
    SweetAlert2Module,
    NgbModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomeStretchComponent
      },
    ])
  ]
})
export class HomeStretchModule { }
