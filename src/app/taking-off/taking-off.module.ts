import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TakingOffComponent } from './taking-off.component';
import { RouterModule } from '@angular/router';
import { CardsModule } from '../cards/cards.module';


console.warn("takingoff")
@NgModule({
  declarations: [
    TakingOffComponent
  ],
  imports: [
    CommonModule,
    CardsModule,
    RouterModule.forChild([
      {
        path: "",
        component: TakingOffComponent
      },
    ])
  ]
})
export class TakingOffModule { }
