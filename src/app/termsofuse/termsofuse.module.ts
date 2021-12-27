import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsofuseComponent } from './termsofuse.component';
import { RouterModule } from '@angular/router';


console.warn("termsofuse")
@NgModule({
  declarations: [
    TermsofuseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"",
        component:TermsofuseComponent
      },
    ])
  ]
})
export class TermsofuseModule { }
