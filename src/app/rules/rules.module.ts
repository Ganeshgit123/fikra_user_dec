import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RulesComponent } from './rules.component';
import { RouterModule } from '@angular/router';


console.warn("rule")
@NgModule({
  declarations: [
    RulesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"",
        component:RulesComponent
      },
    ])
  ]
})
export class RulesModule { }
