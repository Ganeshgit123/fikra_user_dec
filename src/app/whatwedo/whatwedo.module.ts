import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatwedoComponent } from './whatwedo.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    WhatwedoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path:"",
        component:WhatwedoComponent
      },
    ])
  ]
})
export class WhatwedoModule { }
