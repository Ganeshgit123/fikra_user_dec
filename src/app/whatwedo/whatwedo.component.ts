import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../shared/auth.service';
import Swal, { SweetAlertOptions } from "sweetalert2";
@Component({
  selector: 'app-whatwedo',
  templateUrl: './whatwedo.component.html',
  styleUrls: ['./whatwedo.component.css']
})
export class WhatwedoComponent implements OnInit {
  whatewedo:any;
  topBanner:any;
  bodySection:any;
  background:any;
  videoDescSection:any; 
  videourl:any;
  imageDescSection:any;
  homenewsletterform: any;
  subscriptionSection:any;
  multipleSection:any;
  containerSection:any;
  multipleSectiontitle:any;
  multipleSectiondescription:any;
  multipleSectiontitlear:any;
  multipleSectiondescriptionar:any;
  multipleSectionreadMoreURL:any;
  multipleSectionimageURL:any;
  multipleSectiontitle1:any;
  multipleSectiondescription1:any;
  multipleSectiontitle1ar:any;
  multipleSectiondescription1ar:any;
  multipleSectionreadMoreURL1:any;
  multipleSectionimageURL1:any;
  multipleSectiontitle2:any;
  multipleSectiondescription2:any;
  multipleSectiontitle2ar:any;
  multipleSectiondescription2ar:any;
  multipleSectionreadMoreURL2:any;
  multipleSectionimageURL2:any;
  dir:any;
  contentLan: any = {};
  checksub:any;
  errors:any;
  errValue:any;
  banerImgCheck:any;
  vidUrlCheck:any;
  constructor(public authService: AuthService,private sanitizer: DomSanitizer,public fb: FormBuilder,) { 
    this.homenewsletterform = this.fb.group({
      email: ["", [Validators.required,]],
    });
  }
  myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(this.arabicCotent());
    }, 2000);
  });

  async arabicCotent() {
    let sameContent = await JSON.parse(localStorage.getItem("transkey")!);

    const lang = localStorage.getItem("lang") || "en";

    await sameContent.reduce(async (promise: any, element: any) => {
      if (lang == "en") {
        this.contentLan[element.key] = element.en;
      } else {
        this.contentLan[element.key] = element.ar;
      }
      await promise;
    }, Promise.resolve());
  }

  ngOnInit(): void {
    this.dir=localStorage.getItem('dir') || 'ltr';

    this.authService.getwhatwedo().subscribe((res: any) => {
      this.whatewedo = res.data[0];
      this.topBanner = this.whatewedo.topBanner;
      this.videoDescSection=this.whatewedo.videoDescSection;
      this.imageDescSection=this.whatewedo.imageDescSection;
      this.subscriptionSection=this.whatewedo.subscriptionSection;
      this.multipleSectiontitle=this.whatewedo.multipleSection[0].title;
      this.multipleSectiondescription=this.whatewedo.multipleSection[0].description;
      this.multipleSectiontitlear=this.whatewedo.multipleSection[0].title_Ar;
      this.multipleSectiondescriptionar=this.whatewedo.multipleSection[0].description_Ar;
      this.multipleSectionreadMoreURL=this.whatewedo.multipleSection[0].readMoreURL;
      this.multipleSectionimageURL=this.whatewedo.multipleSection[0].imageURL;
      this.multipleSectiontitle1=this.whatewedo.multipleSection[1].title;
      this.multipleSectiondescription1=this.whatewedo.multipleSection[1].description;
      this.multipleSectiontitle1ar=this.whatewedo.multipleSection[1].title_Ar;
      this.multipleSectiondescription1ar=this.whatewedo.multipleSection[1].description_Ar;
      this.multipleSectionreadMoreURL1=this.whatewedo.multipleSection[1].readMoreURL;
      this.multipleSectionimageURL1=this.whatewedo.multipleSection[1].imageURL;
      this.multipleSectiontitle2=this.whatewedo.multipleSection[2].title;
      this.multipleSectiondescription2=this.whatewedo.multipleSection[2].description;
      this.multipleSectiontitle2ar=this.whatewedo.multipleSection[2].title_Ar;
      this.multipleSectiondescription2ar=this.whatewedo.multipleSection[2].description_Ar;
      this.multipleSectionreadMoreURL2=this.whatewedo.multipleSection[2].readMoreURL;
      this.multipleSectionimageURL2=this.whatewedo.multipleSection[2].imageURL;
      this.containerSection=this.whatewedo.containerSection;
      this.background=this.sanitizer.bypassSecurityTrustStyle(`url(${this.topBanner[0].bannerImage}) no-repeat`);
      this.videourl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoDescSection[0].viderURL);
      var banImg = this.topBanner[0].bannerImage;
      if(banImg == ""){
        this.banerImgCheck = false;
      }
      var vidUrl = this.videoDescSection[0].viderURL;
      if(vidUrl == ""){
        this.vidUrlCheck = false;
      }
    });
  }
  checksubscribe(event: any) {
    this.checksub = event.target.checked;

  }
  homenewsletter() {
    if (this.homenewsletterform.value) {
      if (this.checksub == true) {
         var e = this.homenewsletterform.value.email;
        this.errors = [];
        const regularExpression =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var check = regularExpression.test(String(e).toLowerCase());
        if (check == false) {
          Swal.fire({
            text: "Check the Email entered",
            icon: "warning",
          })}else{
 this.authService.homenewsletter(this.homenewsletterform.value);
          }
       
        this.errValue = "";
        //this.ngOnInit();
        this.homenewsletterform.reset();
      } else {
        this.errValue = "Please accept the privacy policy";
      }
    } else {
      this.errValue = "Please enter your email to subscribe newsletter";
    }
  }

}
