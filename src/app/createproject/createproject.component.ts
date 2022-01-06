import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
export interface Food {
   value: string;
   display: string;
}
@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css']
})
export class CreateprojectComponent implements OnInit {
  dir:any;
  changeSection:any;
  title = 'materialApp';  
  steps !:number;
  Users: any = [];
  country:any;
  some:any;
  keep:any;
  countrySs:any;
  citySs:any;
  categSs:any;
  subCategSs:any;
  all:any;
cities:any;
citys:any;
citys1:any;
cat1:any;
cat2:any;
des1:any;
des2:any;
  cityList:any;
  category:any;
  subCategList:any;
  subcategory:any;
   firstFormGroup!: FormGroup ;
   secondFormGroup!: FormGroup;
  selectedIndex !: number;
  displayMode =0;
  tabHead:any;
  
  checkoutForm = this.formBuilder.group({
    categoryName: ['',[Validators.required]],
    subCategoryName:['',[Validators.required]],
    decription: ['',[Validators.required]],
    country:['',[Validators.required]],
    city:['',[Validators.required]],
    userId:  JSON.parse(localStorage.getItem('userId')!),
        role:JSON.parse(localStorage.getItem('role')!),
        title:[],
        business:[], 
        launchdate:[]
        // _is_All_Nothing_:[]
});
tabHeadbus:any;
tabHeadloc:any;
tabHeadcat:any;
tabHeadidea:any;
bustabHead:any;
bustabDesc:any;
buskiades:any;
busarndes:any;
busfooter:any;
busimg:any;
tabHeadbusar:any;
bustabHeadar:any;
bustabDescar:any;
buskiadesar:any;
busarndesar:any;
busfooterar:any;
loctabHead:any;
loctabDesc:any;
locfooter:any;
tabHeadlocar:any;
loctabHeadar:any;
loctabDescar:any;
locfooterar:any;
locimg:any;
cattabHead:any;
cattabDesc:any;
catfooter:any;
tabHeadcatar:any;
cattabHeadar:any;
cattabDescar:any;
catfooterar:any;
catimg:any;
prjtabHead:any;
prjtabDesc:any;
prjfooter:any;
tabHeadprjar:any;
prjtabHeadar:any;
prjtabDescar:any;
prjfooterar:any;
prjimg:any;
commonNotes:any;
commonNotesAr:any;
contentLan: any = {};
categorys:any;
   constructor(private formBuilder: FormBuilder,
    public authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService) {}

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
   ngOnInit() {
    this.myPromise

     let role= JSON.parse(localStorage.getItem('role')!);
    //  console.log('ysecer',role);
    //  if(role == 'investor'){
    //   this.router.navigate(['/']);
    //   console.log('ysecer')
    //  }
    this.dir=localStorage.getItem('dir') || 'ltr';
    this.authService.getcreateproject().subscribe((res: any) => {
      this.tabHeadbus=res.data.model[0].tabName;
      this.bustabHead=res.data.model[0].tabHead;
      this.bustabDesc=res.data.model[0].tabDesc;
      this.buskiades=res.data.model[0].business_KIA_Desc; 
      this.busarndes=res.data.model[0].business_AON_Desc;  
      this.busfooter=res.data.model[0].tabFooter; 
      this.tabHeadbusar=res.data.model[0].tabName_Ar;
      this.bustabHeadar=res.data.model[0].tabHead_Ar;
      this.bustabDescar=res.data.model[0].tabDesc_Ar;
      this.buskiadesar=res.data.model[0].business_KIA_Desc_Ar; 
      this.busarndesar=res.data.model[0].business_AON_Desc_Ar;  
      this.busfooterar=res.data.model[0].tabFooter_Ar; 
      this.busimg=res.data.model[0].image; 
      this.tabHeadloc=res.data.location[0].tabName;
      this.loctabHead=res.data.location[0].tabHead;
      this.loctabDesc=res.data.location[0].tabDesc;
      this.locfooter=res.data.location[0].tabFooter; 
      this.tabHeadlocar=res.data.location[0].tabName_Ar;
      this.loctabHeadar=res.data.location[0].tabHead_Ar;
      this.loctabDescar=res.data.location[0].tabDesc_Ar;
      this.locfooterar=res.data.location[0].tabFooter_Ar; 
      this.locimg=res.data.location[0].image; 
      this.tabHeadcat=res.data.category[0].tabName;
      this.cattabHead=res.data.category[0].tabHead;
      this.cattabDesc=res.data.category[0].tabDesc;
      this.catfooter=res.data.category[0].tabFooter; 
      this.tabHeadcatar=res.data.category[0].tabName_Ar;
      this.cattabHeadar=res.data.category[0].tabHead_Ar;
      this.cattabDescar=res.data.category[0].tabDesc_Ar;
      this.catfooterar=res.data.category[0].tabFooter_Ar; 
      this.catimg=res.data.category[0].image; 
      this.tabHeadidea=res.data.projectIdea[0].tabName;
      this.prjtabHead=res.data.projectIdea[0].tabHead;
      this.prjtabDesc=res.data.projectIdea[0].tabDesc;
      this.prjfooter=res.data.projectIdea[0].tabFooter; 
      this.tabHeadprjar=res.data.projectIdea[0].tabName_Ar;
      this.prjtabHeadar=res.data.projectIdea[0].tabHead_Ar;
      this.prjtabDescar=res.data.projectIdea[0].tabDesc_Ar;
      this.prjfooterar=res.data.projectIdea[0].tabFooter_Ar; 
      this.prjimg=res.data.projectIdea[0].image; 
      this.commonNotes=res.data.commonNotes;
      this.commonNotesAr=res.data.commonNotesAr;
      // console.log('checcon', this.tabHead);
     
    });
    // this.authService.category().subscribe(
    
    //   res=>{
    //     // console.log('user',res);
    //    this.Users = res;
    //   }
    // );
    this.authService.country().subscribe((res: any) => {
      this.country = res.data;
      // console.log('country', this.country);
    });
    this.authService.category().subscribe((res: any) => {
      this.category = res;
      // console.log('Categ', this.category);
    });
    this.authService.subcategory().subscribe((res: any) => {
      this.subcategory = res;
      // console.log('country', this.subcategory);
    });
   }
  //  fetchcategory() {
  //   return .subscribe((data: {}) => {
  //     this.Users = data;
  //     console.log("category",data)
  //   })    
  // } 
   selectStepByIndex(index: number): void {
    this.selectedIndex = index;
  }
  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;
  }
  oncountrySelected(value:String){
    // console.log("the selected val" + value);
    // this.authService.city(value);
    this.authService.city(value).subscribe((res: any) => {
      this.cityList = res.data;
      // console.log('city', this.cityList: any);
    });
}
oncategorySelected(value:String){
  this.authService.category().subscribe((res: any) => {
    if (res.error === false) {
      this.categorys = res.list;
  let catId = this.categorys.find(
    (data: any) => data.categorieName === value
  )?._id;

  this.authService.categoryIdWithSubCateg(catId).subscribe((res: any) => {
    this.subCategList = res.list;
    // console.log('sub', this.subCategList);
  })
}});

}
  onSubmit(): void {
    // Process checkout data here
    // console.warn('Your input has been submitted', this.checkoutForm.value);
    if(this.checkoutForm.value.categoryName &&
      this.checkoutForm.value.subCategoryName &&
      this.checkoutForm.value.country &&
      this.checkoutForm.value.city != ""
      ){
        var someDate = new Date(); 
        someDate.setDate(someDate.getDate() + 60);
        this.checkoutForm.value.launchdate = someDate;
        this.authService.basic(this.checkoutForm.value)
        // console.log("checking",this.checkoutForm.value)
      }else{
        if(this.checkoutForm.value.categoryName &&
          this.checkoutForm.value.subCategoryName == ''){
          this.toastr.warning('Please fill the Category Section');
        }
        if(this.checkoutForm.value.country &&
          this.checkoutForm.value.city == ""){
          this.toastr.warning('Please fill the Location Section');
        }
        this.toastr.warning('Please check all the  Section are filled');
      }
    // this.authService.basic(this.checkoutForm.value);
    // this.checkoutForm.reset();
  }
}
