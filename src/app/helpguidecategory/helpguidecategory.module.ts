import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpguidecategoryComponent } from './helpguidecategory.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


console.warn("helpcate")
@NgModule({
  declarations: [
    HelpguidecategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path:"",
        component:HelpguidecategoryComponent
      },
    ])
  ]
})
export class HelpguidecategoryModule { }
