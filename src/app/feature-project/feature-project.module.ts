import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureProjectComponent } from './feature-project.component';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


console.warn("feature");
@NgModule({
  declarations: [
    FeatureProjectComponent
  ],
  imports: [
    CommonModule,
    SweetAlert2Module,
    NgbModule,
    RouterModule.forChild([
      {
        path: "",
        component: FeatureProjectComponent
      },
    ])
  ]
})
export class FeatureProjectModule { }
