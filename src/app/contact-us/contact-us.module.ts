import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';


console.warn("contactus")
@NgModule({
  declarations: [
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDy4YDcrHfTyCRV_IVjlBj8TvIkNLK3hVo",
    }),
    RouterModule.forChild([
      {
        path:"",
        component:ContactUsComponent
      },
    ])
  ]
})
export class ContactUsModule { }
