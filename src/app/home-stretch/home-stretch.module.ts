import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeStretchComponent } from './home-stretch.component';
import { RouterModule } from '@angular/router';
import { CardsModule } from '../cards/cards.module';


console.warn("homestretc")
@NgModule({
  declarations: [
    HomeStretchComponent,
  ],
  imports: [
    CommonModule,
    CardsModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomeStretchComponent
      },
    ])
  ]
})
export class HomeStretchModule { }
