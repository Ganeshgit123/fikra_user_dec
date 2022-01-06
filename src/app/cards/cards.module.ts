import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CardsComponent
  ],
  imports: [
    CommonModule,
    SweetAlert2Module,
    NgbModule,
    RouterModule
  ],
  exports: [CardsComponent,],

})
export class CardsModule { }
