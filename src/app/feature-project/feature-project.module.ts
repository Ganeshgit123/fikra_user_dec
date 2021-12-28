import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureProjectComponent } from './feature-project.component';
import { RouterModule } from '@angular/router';
import { CardsModule } from '../cards/cards.module';


console.warn("feature");
@NgModule({
  declarations: [
    FeatureProjectComponent
  ],
  imports: [
    CommonModule,
    CardsModule,
    RouterModule.forChild([
      {
        path: "",
        component: FeatureProjectComponent
      },
    ])
  ]
})
export class FeatureProjectModule { }
