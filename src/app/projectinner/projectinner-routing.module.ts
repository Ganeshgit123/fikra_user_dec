import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth.guard';

import { PeopleComponent } from './people/people.component';
import { ProjectoverviewComponent } from './projectoverview/projectoverview.component';

import { PromotionComponent } from './promotion/promotion.component';


const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: 'projectoverview',
        loadChildren: () =>
          import("./projectoverview/projectoverview.module").then(
            (m) => m.ProjectoverviewModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: 'projectoverview/projectpreview',
        loadChildren: () =>
          import("./projectpreview/projectpreview.module").then(
            (m) => m.ProjectpreviewModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: 'projectoverview/basic',
        loadChildren: () =>
          import("./basic/basic.module").then(
            (m) => m.BasicModule
          ),
        canActivate: [AuthGuard]
      },
      { path: 'projectoverview/people', component: PeopleComponent, canActivate: [AuthGuard] },
      {
        path: 'projectoverview/payment',
        loadChildren: () =>
          import("./payment/payment.module").then(
            (m) => m.PaymentModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: 'projectoverview/promotion',
        loadChildren: () =>
          import("./promotion/promotion.module").then(
            (m) => m.PromotionModule
          )
        , canActivate: [AuthGuard]
      },
      {
        path: 'projectoverview/rewards',
        loadChildren: () =>
          import("./rewards/rewards.module").then(
            (m) => m.RewardsModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: 'projectoverview/story',
        loadChildren: () =>
          import("./story/story.module").then(
            (m) => m.StoryModule
          ),
        canActivate: [AuthGuard]
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectinnerRoutingModule { }
