import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookiepolicyComponent } from './cookiepolicy.component';
import { RouterModule } from '@angular/router';


console.warn("Cookie")
@NgModule({
  declarations: [
    CookiepolicyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"",
        component:CookiepolicyComponent
      },
    ])
  ]
})
export class CookiepolicyModule { }
