import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowingComponent } from './following.component';
import { RouterModule } from '@angular/router';


console.warn("following");
@NgModule({
  declarations: [
    FollowingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"",
        component:FollowingComponent
      },
    ])
  ]
})
export class FollowingModule { }
