import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectinnerRoutingModule } from './projectinner-routing.module';
import { PaymentComponent } from './payment/payment.component';
import { PeopleComponent } from './people/people.component';
import { ProjectoverviewComponent } from './projectoverview/projectoverview.component';
import { ProjectpreviewComponent } from './projectpreview/projectpreview.component';
import { PromotionComponent } from './promotion/promotion.component';
import { RewardsComponent } from './rewards/rewards.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    PeopleComponent,
  ],
  imports: [
    CommonModule,
    ProjectinnerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProjectinnerModule { }
