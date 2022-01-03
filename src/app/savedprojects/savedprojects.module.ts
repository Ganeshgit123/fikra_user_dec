import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavedprojectsComponent } from './savedprojects.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardsModule } from '../cards/cards.module';


console.warn("save")
@NgModule({
  declarations: [
    SavedprojectsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    CardsModule,
    RouterModule.forChild([
      {
        path: "",
        component: SavedprojectsComponent
      },
    ])
  ]
})
export class SavedprojectsModule { }
