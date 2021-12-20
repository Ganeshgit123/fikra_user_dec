import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import Swal, { SweetAlertOptions } from "sweetalert2";


@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css'],
})
export class BasicComponent implements OnInit {
  errorMessage: any;
  basic: any = [];
  params: any;
  imgfile: any;
  fileUpload: any;
  cityList: any;
  projectImage: any;
  country: any;
  ll: any;
  showimgon = false;
  filevideoUpload:any;
  dateFormatedthree:any;
  // form: any = {
  //   title: null,
  //   subTitle: null,
  //   location: null,
  //   categoryName:null,
  //   userId:localStorage.getItem('userId')
  // };
  basicForm: any;
  // launchdateshow: any;
  content:any;
  selectedValue1=false;
  selectedValue2=false;
  selectedValue3=false;
  dateFormated:any;
  projectpreviewbasic: any;
  newdate:any;
  tabHead:any;
  tabHead_Ar:any;
  description:any;
  description_Ar:any;
  tabName:any;
  tabName_Ar:any;
 dir:any;
 prjtitle:any;
 prjtitle_Ar:any;
 prjdes:any;
 prjdes_Ar:any;
 urlloc:any;
 prjtitle1:any;
 prjtitle1_Ar:any;
 prjdes1:any;
 prjdes1_Ar:any;

 prjtitle2:any;
 prjtitle2_Ar:any;
 prjdes2:any;
 prjdes2_Ar:any;

 prjtitle3:any;
 prjtitle3_Ar:any;
 prjdes3:any;
 prjdes3_Ar:any;

 prjtitle4:any;
 prjtitle4_Ar:any;
 prjdes4:any;
 prjdes4_Ar:any;

 prjtitle5:any;
 prjtitle5_Ar:any;
 prjdes5:any;
 prjdes5_Ar:any;

 prjtitle6:any;
 prjtitle6_Ar:any;
 prjdes6:any;
 prjdes6_Ar:any;

 prjtitle7:any;
 prjtitle7_Ar:any;
 prjdes7:any;
 prjdes7_Ar:any;

 videourl:any;
 videoSizeError:any;
 campaignDuation:any;
 category:any;
 subcategory:any;
 city:any;
 contentLan: any = {};
 launchdates:any;
 categorieName:any;
 subcategorieName:any;
 loading = false;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,private sanitizer: DomSanitizer,    private toastr: ToastrService,

  ) {
    

    this.basicForm = this.fb.group({
      title: [''],
      subTitle: [''],
      country: [''],
      city: [''],
      goalAmount: [''],
      categoryName: [''],
      subCategoryName: [''],
      decription: [''],
      campaignDuation: [''],
      launchDate: [''],
      projectImage: [''],
      projectVideo:[''],
      userId: JSON.parse(localStorage.getItem('userId')!),
      userType: 'creator',
      projectId: this.params,
    });
  }
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
      this.category = res.list;
      // console.log('country', this.category);
    });
    this.authService.subcategory().subscribe((res: any) => {
      this.subcategory = res.list;
      // console.log('country', this.subcategory);
    });
    this.route.params.subscribe((params) => {
      this.params = params.id;
      // console.log(params.id);
    });
    localStorage.setItem('projectid', JSON.stringify(this.params));
    this.dir=localStorage.getItem('dir') || 'ltr';

    // this.authService.country().subscribe((res: any) => {
    //   this.country = res.data;
    //   // console.log('country', this.country);
    // });
    this.authService.getprojectbasic().subscribe((res: any) => {
      this.prjtitle = res.data.fields[0].feildHead;
      this.prjtitle_Ar = res.data.fields[0].feildHead_Ar;
      this.prjdes = res.data.fields[0].feildDescription;
      this.prjdes_Ar = res.data.fields[0].feildDescription_Ar;

      this.prjtitle1 = res.data.fields[1].feildHead;
      this.prjtitle1_Ar = res.data.fields[1].feildHead_Ar;
      this.prjdes1 = res.data.fields[1].feildDescription;
      this.prjdes1_Ar = res.data.fields[1].feildDescription_Ar;

      this.prjtitle2 = res.data.fields[2].feildHead;
      this.prjtitle2_Ar = res.data.fields[2].feildHead_Ar;
      this.prjdes2 = res.data.fields[2].feildDescription;
      this.prjdes2_Ar = res.data.fields[2].feildDescription_Ar;

      this.prjtitle3 = res.data.fields[3].feildHead;
      this.prjtitle3_Ar = res.data.fields[3].feildHead_Ar;
      this.prjdes3 = res.data.fields[3].feildDescription;
      this.prjdes3_Ar = res.data.fields[3].feildDescription_Ar;

      this.prjtitle4 = res.data.fields[4].feildHead;
      this.prjtitle4_Ar = res.data.fields[4].feildHead_Ar;
      this.prjdes4 = res.data.fields[4].feildDescription;
      this.prjdes4_Ar = res.data.fields[4].feildDescription_Ar;

      this.prjtitle5 = res.data.fields[5].feildHead;
      this.prjtitle5_Ar = res.data.fields[5].feildHead_Ar;
      this.prjdes5 = res.data.fields[5].feildDescription;
      this.prjdes5_Ar = res.data.fields[5].feildDescription_Ar;

      this.prjtitle6 = res.data.fields[6].feildHead;
      this.prjtitle6_Ar = res.data.fields[6].feildHead_Ar;
      this.prjdes6 = res.data.fields[6].feildDescription;
      this.prjdes6_Ar = res.data.fields[6].feildDescription_Ar;

      this.prjtitle7 = res.data.fields[7].feildHead;
      this.prjtitle7_Ar = res.data.fields[7].feildHead_Ar;
      this.prjdes7 = res.data.fields[7].feildDescription;
      this.prjdes7_Ar = res.data.fields[7].feildDescription_Ar;

      this.tabHead=res.data.tabHead;
      this.tabHead_Ar=res.data.tabHead_Ar;
      this.description=res.data.description;
      this.description_Ar=res.data.description_Ar;
      this.tabName=res.data.tabName;
      this.tabName_Ar=res.data.tabName_Ar;

      // console.log('country', this.prjtitle);
    });
   
    this.authService.projectpreview().subscribe((res: any) => {
      // console.log('projectpreviewbasic', res.data.basicInfoId);
      this.projectpreviewbasic = res.data.basicInfoId;
      this.campaignDuation=res.data.basicInfoId.campaignDuation;
      this.projectImage = res.data.basicInfoId.projectImage;
      this.videourl = res.data.basicInfoId.projectVideo;
      this.country =res.data.basicInfoId.country;
      this.categorieName = res.data.basicInfoId.categoryName;
     this.subcategorieName =res.data.basicInfoId.subCategoryName;
      this.city =res.data.basicInfoId.city;
      this.launchdates = res.data.basicInfoId.launchDate;
        this.newdate=new Date().toISOString().substr(0, 10);
      var someDate = new Date();
      someDate.setDate(someDate.getDate() + 60); //number  of days to add, e.x. 15 days
      this.dateFormated = someDate.toISOString().substr(0, 10);
      var thirtyDate = new Date();
      thirtyDate.setDate(thirtyDate.getDate() + 30);
      this.dateFormatedthree=thirtyDate.toISOString().substr(0, 10);
      this.basicForm.patchValue({
        title: this.projectpreviewbasic.title,
        subTitle: this.projectpreviewbasic.subTitle,
        goalAmount: this.projectpreviewbasic.goalAmount,
        decription: this.projectpreviewbasic.decription,
        categoryName: this.projectpreviewbasic.categoryName,
        subCategoryName: this.projectpreviewbasic.subCategoryName,
        city: this.projectpreviewbasic.city,
        country: this.projectpreviewbasic.country,
        campaignDuation: this.projectpreviewbasic.campaignDuation || '',
        launchDate:this.projectpreviewbasic.launchDate || '',
        projectImage: this.projectpreviewbasic.projectImage,
        projectVideo: this.videourl,
      });

    });
    
  }
  setIntoForm(data: any, projectImage: any) {
    this.basicForm.patchValue({
      [projectImage]: data,
    });
  }
  uploadImageFile(event: any,fileName: any) {
  
    console.log('eventimg', event);
    var imgcheck = event.target.files[0].name.split(".").pop();
    if (imgcheck == 'jpg' || imgcheck == 'png' || imgcheck == 'jpeg' || imgcheck == 'PNG' || imgcheck == 'JPG' || imgcheck == 'JPEG') {
            if (event.target.files[0].size >= 589824) {
        Swal.fire({
          text: "Please select this  images size below 5MB and in this ratio 1024*576",
          icon: "warning",
        });
      }else{
        this.showimgon = true;
        this.fileUpload = event.target.files[0];
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imgfile = event.target.result;
          // this.imgfile=event.target.files[0];
        };
        reader.readAsDataURL(event.target.files[0]);
        const formdata = new FormData();
        formdata.append("imageToStore", this.fileUpload);
    
        this.authService.s3upload(formdata).subscribe((res: any) => {
          if (res.error == false) {
            this.setIntoForm(res.data.Location, fileName);
            this.urlloc=res.data.Location;
          }
        });
      }
     
    } else {
      Swal.fire({
        text: "Please select this  images in this format (jpg,png.jpeg) ",
        icon: "warning",
      });
    }
    
  }
  // onSubmit(): void {
  //   const { title, subTitle,  location, goalAmount, userId} = this.form;

  //   this.authService.basic(title, subTitle, location, goalAmount, userId).subscribe(
  //   response => {
  //     localStorage.setItem('access_token', response.token)
  //     // localStorage.setItem('userId', response.userId)
  //       console.log(response);
  //       if(response.error == false){
  //         this.navigateToLogin();
  //                }

  //     },
  //     err => {
  //       this.errorMessage = err.error.message;
  //     }
  //   );
  // }
selectduration(value:any){
  console.log("suhi",value)
  if(value == 1){
    this.selectedValue1 = true;
    this.selectedValue2 = false;
    this.selectedValue3 = false;
    console.log("suhiee", value);
  }
  if(value == 2){
    this.selectedValue2 = true;
    console.log("suhiee", value);
    this.selectedValue1 = false;
    this.selectedValue3 = false;
  }
  if (value == 3) {
    this.selectedValue3 = true;
    this.selectedValue2 = false;
    this.selectedValue1 = false;
    console.log("suhiee", value);
  }
}

canclevideo(){
  this.videourl = null;
}
  uploadVideoFile(event: any) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgfile = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    this.filevideoUpload = event.target.files[0];
    const formdata = new FormData();
    this.loading = true;
    this.videoSizeError = false
    formdata.append('videoToStore', this.filevideoUpload);
    this.authService.s3uploadvideo(formdata).subscribe((res: any) => {
      this.loading = false;
      if (res.error == false) {
        this.videourl=res.data.Location;
      }else{
        this.videoSizeError = true;
        this.toastr.warning('*Too big Upload Video maximum 2mins, and the size of the video should be less than 15MB');
      }
    })
  }

  getDuration(e:any) {
    const duration = e.target.duration;
    this.videoSizeError = duration > 120 || this.videoSizeError;
  }

  onSubmit() {

    
    if(this.fileUpload == undefined){
      console.log('undeifre', this.fileUpload);
      // this.fileUpload = this.projectImage;
      this.basicForm.value.projectImage=this.projectImage;
      this.basicForm.value.projectId =this.params;
      this.basicForm.value.projectVideo =this.videourl;
      this.authService.basicedit(this.basicForm.value);
    }else{
      console.log('sss');
      if(this.videoSizeError == true){
        this.toastr.warning('Check the Video Length');
          }else{
  
            this.basicForm.value.projectImage=this.urlloc;
            this.basicForm.value.projectId =this.params;
            this.basicForm.value.projectVideo =this.videourl;
            this.authService.basicedit(this.basicForm.value);
      }
  
    }
 
  }
  navigateToLogin() {
    this.router.navigateByUrl('/projectinner/rewards');
  }

  // oncountrySelected(value: String) {
  //   // console.log("the selected val" + value);
  //   // this.authService.city(value);
  //   this.authService.city(value).subscribe((res: any) => {
  //     this.cityList = res.data;
  //     // console.log('city', this.cityList: any);
  //   });
  // }

  // oncountrySelected(value:String){
  //   // console.log("the selected val" + value);
  //   // this.authService.city(value);
  //   this.authService.city(value).subscribe((res: any) => {
  //     this.cityList = res.data;
  //     // console.log('city', this.cityList: any);
  //   });
}
