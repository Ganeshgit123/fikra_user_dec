import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutusComponent } from './aboutus.component';
import { RouterModule } from '@angular/router';



console.warn("about");
@NgModule({
  declarations: [
    AboutusComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"",
        component:AboutusComponent
      }
    ])
  ],

})
export class AboutusModule { }
