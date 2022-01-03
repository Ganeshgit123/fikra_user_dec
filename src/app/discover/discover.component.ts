import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../shared/auth.service";

@Component({
  selector: "app-discover",
  templateUrl: "./discover.component.html",
  styleUrls: ["./discover.component.css"],
})
export class DiscoverComponent implements OnInit {
  displayMode = 1;
  category: any = [];
  property1: any;
  property2: any;
  recommended: any;
  currentCat: any;
  subCatList: any = [];
  subcategoryList = [];
  contentLan: any = {};

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {}
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
    this.myPromise
    this.authService.category().subscribe((res: any) => {
      if (res.error === false) {
        this.category = res;
      }
    });

    this.authService.subcategory().subscribe((res: any) => {
      if (res.error === false) {
        this.subcategoryList = res.list;
      }
    });

    this.authService.recommendedlist().subscribe((res: any) => {
      if (res.error === false) {
        this.recommended = res.data;
      }
    });

  }

  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;
  }

  listproject(value: any, value1: any, value2: any, value3: any, value4: any) {
    console.log('Working')
    let catName = this.category.list.find(
      (c: any) => c._id == this.currentCat
    )?.categorieName;
    localStorage.setItem("selectedcategory", JSON.stringify(value));
    this.router.navigate(["/recommended", catName, value4]);
  }

  selectCat(id: any) {
    if (this.currentCat == id) {
      this.currentCat = "";
      this.subCatList = [];
    } else {
      this.currentCat = id;
      this.subCatList = this.subcategoryList.filter(
        (data: any) => data.categorieId === id
      );
    }
  }

}
