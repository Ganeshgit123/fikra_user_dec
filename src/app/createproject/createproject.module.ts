import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateprojectComponent } from './createproject.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    CreateprojectComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path:"",
        component:CreateprojectComponent
      },
    ])
  ]
})
export class CreateprojectModule { }
