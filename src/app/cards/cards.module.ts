import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    CardsComponent
  ],
  imports: [
    CommonModule,
    SweetAlert2Module,
    NgbModule,
  ],
  exports: [CardsComponent,],

})
export class CardsModule { }
