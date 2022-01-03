import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() obj: { title: String, projectImage: String, decription: String, categoryName: String, city: String, userName: String, goalAmount: any, _amount_Pleadged_: any, _pledged_count_: any, subCategoryName: String, inter: any, luncont: any, _is_Liked_Project: Boolean, _id: String, _is_Saved_Project: Boolean, featurelastpercentage: any, _is_All_Nothing_: Boolean, _is_Keep_It_All_: Boolean, launchDate: any } =
    { title: '', projectImage: '', decription: '', categoryName: '', city: '', userName: '', goalAmount: '', _amount_Pleadged_: '', _pledged_count_: '', subCategoryName: '', inter: '', luncont: '', _is_Liked_Project: true, _id: '', _is_Saved_Project: true, featurelastpercentage: '', _is_All_Nothing_: false, _is_Keep_It_All_: false, launchDate: '' };
  contentLan: any = {};
  userver: any;
  constructor(public fb: FormBuilder, public authService: AuthService) { }
  @Output() onLike = new EventEmitter();
  @Output() onSave = new EventEmitter();

  myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        this.arabicCotent()
      );
    }, 2000);
  });

  async arabicCotent() {
    let sameContent = await JSON.parse(localStorage.getItem("transkey")!);

    const lang = localStorage.getItem("lang") || "en";

    await sameContent.reduce(async (promise: any, element: any) => {
      // console.log(element)
      if (lang == "en") {
        this.contentLan[element.key] = element.en;
      } else {
        this.contentLan[element.key] = element.ar;
      }
      await promise;
    }, Promise.resolve());
  }

  ngOnInit(): void {
    this.userver = JSON.parse(localStorage.getItem("userId")!);
  }
  addtolike(values: any) {
    // emit event onClose
    this.onLike.emit(values);
  }

  addtosave(values: any) {
    this.onSave.emit(values);
  }

}
