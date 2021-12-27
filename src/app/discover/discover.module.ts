import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscoverComponent } from './discover.component';
import { RouterModule, Routes } from "@angular/router";

import { AppModule } from '../app.module';


console.warn("dicover");
@NgModule({
  declarations: [
    DiscoverComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"",
        component:DiscoverComponent
      }
    ])
  ],

})
export class DiscoverModule { }
