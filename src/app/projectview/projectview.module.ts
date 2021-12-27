import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectviewComponent } from './projectview.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {ClipboardModule} from '@angular/cdk/clipboard';


console.warn("projectview")
@NgModule({
  declarations: [
    ProjectviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    NgbModule,
    AngularEditorModule,
    ClipboardModule,
    RouterModule.forChild([
      {
        path:"",
        component:ProjectviewComponent
      },
    ])
  ]
})
export class ProjectviewModule { }
