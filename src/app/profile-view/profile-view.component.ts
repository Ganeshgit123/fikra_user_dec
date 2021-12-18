import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  fileUpload:any;
  user!:any;
  some:any;
  profileImage:any;
  // imageuploadform: any;
  imgfile : any;
  dob:any;
  // role:any;
  imgprf:any;
  profileLogo:any;
  role!: String;
  bio:any;
  backed:any;
  popup:any;
  popup1:any;
  popup2:any;
  displayMode= 1;
  editform:any;
  about:any;
  profileimg:any;
  value:any;
  value1:any;
  params:any;
  contentLan: any = {};
  paramsrole:any;
  constructor(private router: Router, private formBuilder: FormBuilder,
    public authService: AuthService,
    private http: HttpClient,
    private route: ActivatedRoute, 
    private activatedRoute: ActivatedRoute) { }
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

    this.route.params.subscribe(params =>{
      this.params =params.id; 
    });
    this.route.params.subscribe(params =>{
      this.paramsrole =params.role; 
    });
 
    this.authService.userprofileviewWithout(this.params,this.paramsrole).subscribe(
    
      (res: any) =>{
        this.role = res.data._userRole_;
        this.user = res.data.fullName;
        this.dob =res.data.createdAt;
        this.imgprf=res.data.investorImage;
        this.backed=res.data._is_Pledged_Count_;
        this.bio=res.ProfileData;
        this.profileLogo = res.data &&res.data['profileImage'] ? res.data['profileImage'] : 'assets/image/avatar-placeholder.png';
      }
    ),100;
    // this.authService.aboutdetailscreator(this.value).subscribe(
    
    //   (res: any) =>{
    //     console.log('about',res);
    //    this.about = res.data;
    //    this.bio =res.data.userBio;
    //   //  this.savebiographyform.patchValue({
    //   //   userBio: this.about.userBio,
    //   //   _isUserBio_On_:this.about._isUserBio_On_
    //   // });
    //   // this.saveweburlform.patchValue({
    //   //   webSiteURL: this.about.webSiteURL,
    //   //   _isWebURL_On_:this.about._isWebURL_On_
    //   // });
    //   }
    // )
  }
  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;

  }

  capitalize = (s: any) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  readLocalStorageValue(key: string): string {
    // console.log("hi",localStorage.getItem(key));
    return JSON.parse(localStorage.getItem(key)!);
  }

}
