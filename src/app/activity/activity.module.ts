import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './activity.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CardsModule } from '../cards/cards.module';


console.warn("activity")
@NgModule({
  declarations: [
    ActivityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CardsModule,
    NgbPaginationModule,
    RouterModule.forChild([
      {
        path: "",
        component: ActivityComponent
      },
    ])
  ]

})
export class ActivityModule { }
