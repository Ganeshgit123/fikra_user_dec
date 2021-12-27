import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpguideComponent } from './helpguide.component';
import { RouterModule } from '@angular/router';


console.warn("help")
@NgModule({
  declarations: [
    HelpguideComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"",
        component:HelpguideComponent
      },
    ])
  ]
})
export class HelpguideModule { }
