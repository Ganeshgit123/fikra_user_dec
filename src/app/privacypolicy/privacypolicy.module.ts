import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacypolicyComponent } from './privacypolicy.component';
import { RouterModule } from '@angular/router';


console.warn("privacy")
@NgModule({
  declarations: [
    PrivacypolicyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"",
        component:PrivacypolicyComponent
      },
    ])
  ]
})
export class PrivacypolicyModule { }
