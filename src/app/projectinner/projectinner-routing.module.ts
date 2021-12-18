import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth.guard';
import { BasicComponent } from './basic/basic.component';
import { PaymentComponent } from './payment/payment.component';
import { PeopleComponent } from './people/people.component';
import { ProjectoverviewComponent } from './projectoverview/projectoverview.component';
import { ProjectpreviewComponent } from './projectpreview/projectpreview.component';
import { PromotionComponent } from './promotion/promotion.component';
import { RewardsComponent } from './rewards/rewards.component';
import { StoryComponent } from './story/story.component';

const routes: Routes = [
  {
    path: "projectinner/:id",
    children: [
  {path : 'projectoverview', component : ProjectoverviewComponent, canActivate: [AuthGuard]},
  {path : 'projectoverview/projectpreview', component :  ProjectpreviewComponent, canActivate: [AuthGuard]},
  {path : 'projectoverview/basic', component :  BasicComponent,canActivate: [AuthGuard]},
  {path : 'projectoverview/people', component :  PeopleComponent, canActivate: [AuthGuard]},
  {path : 'projectoverview/payment', component :  PaymentComponent, canActivate: [AuthGuard]},
  {path : 'projectoverview/promotion', component :  PromotionComponent, canActivate: [AuthGuard]},
  {path : 'projectoverview/rewards', component :  RewardsComponent, canActivate: [AuthGuard]},
  {path : 'projectoverview/story', component :  StoryComponent, canActivate: [AuthGuard]},


]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectinnerRoutingModule { }
