import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PledgeComponent } from './pledge.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


console.warn("pledge")
@NgModule({
  declarations: [
    PledgeComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: "",
        component: PledgeComponent
      },
    ])
  ]
})
export class PledgeModule { }
