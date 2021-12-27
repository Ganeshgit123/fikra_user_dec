import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CareersComponent } from './careers.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


console.warn("career")
@NgModule({
  declarations: [
    CareersComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    RouterModule.forChild([
      {
        path: "",
        component: CareersComponent
      },
    ])
  ],
})
export class CareersModule { }
