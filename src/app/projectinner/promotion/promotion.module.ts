import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PromotionComponent } from './promotion.component';



@NgModule({
  declarations: [PromotionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forChild([
      {
        path: "",
        component: PromotionComponent
      },
    ])
  ]
})
export class PromotionModule { }
