import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../shared/auth.service";

@Component({
  selector: "app-recommended",
  templateUrl: "./recommended.component.html",
  styleUrls: ["./recommended.component.css"],
})
export class RecommendedComponent implements OnInit {
  collection: any;
  list: any;
  category: any;
  myselect: any;
  valuesearch: any;
  recommended: any;
  displayMode: number | undefined;
  value: any;
  sort: any;
  value1: any;
  value2: any;
  value3: any;
  search: any;
  selectedtag: any;
  params: any;
  selectedcity: any;
  selectedcategory: any;
  city: any;
  recommendeddataAmount: any;
  recommendeddataPleadged: any;
  recommendeddatapercentage: any;
  sortedValue: any;
  saveform: any;
  contentLan: any = {};
  disable: any = {
    category: false,
    subCategory: false,
    city: false,
    sort: false,
    search: false
  };
  userver:any;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute
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
  recommendeddata: any;
  subcategory: any;
  Cate: any;
  SubCate: any;
  AllSubCat: any;
  ngOnInit(): void {
    this.myPromise
    this.userver = JSON.parse(localStorage.getItem("userId")!);
    this.localprojectid();

    this.selectedcategory = JSON.parse(
      localStorage.getItem("selectedcategory")!
    );

    this.authService.subcategory().subscribe((res: any) => {
      if (res.error === false) {
        this.AllSubCat = res.list;
      }
    });

    this.route.params.subscribe((params) => {
      this.valuesearch = params.text;
      this.selectedcategory = params?.cat || "Category";
      this.selectedtag = params?.subCat || "Sub Category";
      if (this.selectedtag != "Sub Category") {
      }
      this.Onchangerecommended(
        params?.cat || "",
        "",
        "",
        "",
        params?.subCat || ""
      );
    });

    this.authService.category().subscribe((res: any) => {
      if (res.error === false) {
        this.category = res.list;
        if (this.selectedtag != "Sub Category") {
          let catId = this.category.find(
            (data: any) => data.categorieName === this.selectedcategory
          )?._id;
          this.authService.subcategoryWithId(catId).subscribe((res: any) => {
            if (res.error === false) {
              this.subcategory = res.list;
            }
          });
        }
      }
    });

    if (this.selectedtag == "Sub Category") {
      this.authService.subcategory().subscribe((res: any) => {
        if (res.error === false) {
          this.subcategory = res.list;
        }
      });
    }

    this.authService.recommendedlist().subscribe((res: any) => {
      if (res.error === false) {
        this.recommended = res.data;
      }
    });
    this.authService.citylist().subscribe((res: any) => {
      this.city = res.data;
    });
    this.displayMode = 1;
    this.collection = [
      {
        count: "510,787",
      },
    ];
    this.sort = [
      {
        sortname: "just_launch",
        name: "Just Launch",
      },
      {
        sortname: "ending_soon",
        name: "Ending Soon",
      },
      {
        sortname: "nearly_funded",
        name: "Nearly Funded",
      },
    ];
    this.list = [
      {
        category: "Product Design",
        location: "Khobar",
        title: "Yellostack - Web-App",
        content:
          " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy",
        author: "By Michael Murdock",
        pledged: "5200 SAR pledged",
        funded: "170%funded",
        time: "49hours to go",
      },
      {
        category: "Product Design",
        location: "Khobar",
        title: "Yellostack - Web-App",
        content:
          " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy",
        author: "By Michael Murdock",
        pledged: "5200 SAR pledged",
        funded: "170%funded",
        time: "49hours to go",
      },
      {
        category: "Product Design",
        location: "Khobar",
        title: "Yellostack - Web-App",
        content:
          " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy",
        author: "By Michael Murdock",
        pledged: "5200 SAR pledged",
        funded: "170%funded",
        time: "49hours to go",
      },
    ];
  }
  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;
  }

  clearAll(){
    this.selectedcategory = "Select";
    this.selectedtag = 'Select';
    this.selectedcity = 'Select';
    this.sortedValue = 'Select';
    this.valuesearch = '';
    this.disable = {
      category: false,
      subCategory: false,
      city: false,
      sort: false,
      search: false
    };
  }

  Onchangerecommended(
    value: any,
    value1: any,
    value2: any,
    value3: any,
    value4: any
  ) {

    let temp = this.selectedcategory
    if(value || value4 ){
      this.disable = {
        category: false,
        subCategory: false,
        city: true,
        sort: true,
        search: true
      };
    }else if(value2){
      temp = ''
      this.disable = {
        category: true,
        subCategory: true,
        city: true,
        sort: false,
        search: true
      };
    }else if(value3){
      this.disable = {
        category: true,
        subCategory: true,
        city: false,
        sort: true,
        search: true
      };
    }else if(value1){
      this.disable = {
        category: true,
        subCategory: true,
        city: true,
        sort: true,
        search: false
      };
    }

    this.authService
      .recommendededatas(value || temp , value1, value2, value3, value4)
      .subscribe((res: any) => {
        this.recommendeddata = res.data;
        this.recommendeddata.forEach((element: any) => {
          this.recommendeddataAmount = element.basicInfoId.goalAmount;

          this.recommendeddataPleadged = element._amount_Pleadged_;
          this.recommendeddatapercentage =
            this.recommendeddataPleadged / this.recommendeddataAmount;
          var taktotPercent = this.recommendeddatapercentage * 100;
          if (taktotPercent >= 100) {
            element.takinglastper = 100;
          } else {
            element.takinglastper = taktotPercent;
          }
          element.takinglastpercentage = taktotPercent;
        });
        

        if(value){
          let catId = this.category?.find(
            (data: any) => data.categorieName === value
          )?._id;

          this.subcategory = this.AllSubCat?.filter((resp: any)=> {
            return resp.categorieId === catId
          })
          this.selectedtag = null
          console.log(this.subcategory)
        }
        

        this.selectedcategory = value ? value : this.selectedcategory;
        this.selectedtag = value4 ? value4 : this.selectedtag;
        this.selectedcity = value3 ? value3 : this.selectedcity;
        this.sortedValue = value2 ? value2 : this.sortedValue;
      });
  }

  onquerySelected() {
    if(this.valuesearch){
      this.disable = {
        category: true,
        subCategory: true,
        city: true,
        sort: true,
        search: false
      };
    }else{
      this.disable = {
        category: false,
        subCategory: false,
        city: false,
        sort: false,
        search: false
      };
    }
   
    this.authService
      .advancesearchapi(this.valuesearch)
      .subscribe((res: any) => {
        this.recommendeddata = res.data;
      });
  }

  localprojectid() {
    this.route.params.subscribe((params) => {
      this.params = params.id;
    });
    localStorage.setItem("projectid", JSON.stringify(this.params));
  }
  addtolike(values: any) {
    this.saveform = this.fb.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      projectId: [values],
    });
    this.authService
      .addlikeproject(this.saveform.value)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.toaster.success( res.message);
          this.ngOnInit();
        } else {
          this.toaster.warning(res.message);
        }
      });
  }
  addtosave(values: any) {
    this.saveform = this.fb.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      projectId: [values],
    });
    this.authService
      .addsaveproject(this.saveform.value)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.toaster.success( res.message);
          this.ngOnInit();
        } else {
          this.toaster.warning( res.message);
        }
      });
  }
  notuser() {
    // this.toaster.info("Please Login to Access");
  }
}
