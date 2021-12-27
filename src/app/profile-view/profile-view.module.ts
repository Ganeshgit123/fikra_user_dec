import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileViewComponent } from './profile-view.component';
import { RouterModule } from '@angular/router';


console.warn("profileview")
@NgModule({
  declarations: [
    ProfileViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"",
        component:ProfileViewComponent
      },
    ])
  ]
})
export class ProfileViewModule { }
