import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicComponent } from './basic.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [BasicComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: BasicComponent
      },
    ])
  ]
})
export class BasicModule { }
