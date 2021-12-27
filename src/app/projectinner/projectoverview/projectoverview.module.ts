import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectoverviewComponent } from './projectoverview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoundProgressModule } from 'angular-svg-round-progressbar';



@NgModule({
  declarations: [ProjectoverviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RoundProgressModule,
    RouterModule.forChild([
      {
        path: "",
        component: ProjectoverviewComponent
      },
    ])
  ]
})
export class ProjectoverviewModule { }
