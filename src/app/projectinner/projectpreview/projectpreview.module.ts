import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectpreviewComponent } from './projectpreview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [ProjectpreviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: "",
        component: ProjectpreviewComponent
      },
    ])
  ]
})
export class ProjectpreviewModule { }
