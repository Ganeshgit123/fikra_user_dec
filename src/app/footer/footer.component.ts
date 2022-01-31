import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  user: any;
  contentdata: any;
  header: any;
  description: any;
  button1: any;
  contactEmail: any;
  // contactNumber:any;
  youtubeURL: any;
  twetterURL: any;
  instaURL: any;
  facebookURL: any;
  footerary = [];
  lang: any;
  dir: any;
  headerAr: any;
  descriptionAr: any;
  buttonAr: any;
  aboutus: any;
  aboutusar: any;
  aboutusurl: any;
  aboutus1: any;
  aboutusar1: any;
  aboutusurl1: any;
  aboutus2: any;
  aboutusar2: any;
  aboutusurl2: any;
  contactus: any;
  contactar: any;
  contacturl: any;
  career: any;
  careerar: any;
  careerurl: any;
  support: any;
  support1: any;
  support2: any;
  support3: any;
  support4: any;
  supportar: any;
  supportar1: any;
  supportar3: any;
  supportar2: any;
  supportar4: any;
  supporturl: any;
  supporturl1: any;
  supporturl2: any;
  supporturl3: any;
  supporturl4: any;
  mff: any;
  mffar: any;
  mffurl: any;
  mff1: any;
  mffar1: any;
  mffurl1: any;
  mff2: any;
  mffar2: any;
  mffurl2: any;
  mff3: any;
  mffar3: any;
  mffurl3: any;
  mff4: any;
  mffar4: any;
  mffurl4: any;
  buttonURL: any;
  drawerHead: any;
  drawerHeadAr: any;
  drawerHead1: any;
  drawerHeadAr1: any;
  drawerHead2: any;
  drawerHeadAr2: any;
  aboutstatus: any;
  supportstatus: any;
  mofstatus: any;
  contentLan: any = {};
  hi = "button label"
  constructor(public fb: FormBuilder, public authService: AuthService,) {
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

    this.lang = localStorage.getItem('lang') || 'en';
    this.dir = localStorage.getItem('dir') || 'ltr';

    this.authService.footer().subscribe(

      (res: any) => {
        // let ftbody=res;
        if (res.error === false) {
          this.header = res.data.header;
          this.headerAr = res.data.header_ar;
          this.description = res.data.discription;
          this.descriptionAr = res.data.discription_ar;
          this.button1 = res.data.buttonName;
          this.buttonAr = res.data.buttonName_ar;
          this.buttonURL = res.data.buttonURL;
          this.contactEmail = res.data.contactEmail;
          // this.contactNumber=res.data.contactNumber;
          this.youtubeURL = res.data.youtubeURL;
          this.twetterURL = res.data.twetterURL;
          this.instaURL = res.data.instaURL;
          this.facebookURL = res.data.facebookURL;
          // console.log('footer', res.data);
        }

        // this.footerary.push(this.user)

      }
    );
    this.authService.getfootercontent().subscribe(

      (res: any) => {
        // let ftbody=res;
        if (res.error === false) {
          this.drawerHead = res.data.content[0].drawerHead;
          this.drawerHeadAr = res.data.content[0].drawerHead_Ar;
          this.drawerHead1 = res.data.content[1].drawerHead;
          this.drawerHeadAr1 = res.data.content[1].drawerHead_Ar;
          this.drawerHead2 = res.data.content[2].drawerHead;
          this.drawerHeadAr2 = res.data.content[2].drawerHead_Ar;
          this.aboutstatus = res.data.content[0]._is_Visible_;
          this.supportstatus = res.data.content[1]._is_Visible_;
          this.mofstatus = res.data.content[2]._is_Visible_;
          this.aboutus = res.data.content[0].firstLable;
          this.aboutusar = res.data.content[0].firstLable_Ar;
          this.aboutusurl = res.data.content[0].firstLable_URL;
          this.contactus = res.data.content[0].secondLable;
          this.contactar = res.data.content[0].secondLable_Ar;
          this.contacturl = res.data.content[0].secondLable_URL;
          this.career = res.data.content[0].thirdLable;
          this.careerar = res.data.content[0].thirdLable_Ar;
          this.careerurl = res.data.content[0].thirdLable_URL;
          this.aboutus1 = res.data.content[0].fourthLable;
          this.aboutusar1 = res.data.content[0].fourthLable_Ar;
          this.aboutusurl1 = res.data.content[0].fourthLable_URL;
          this.aboutus2 = res.data.content[0].fifthLable;
          this.aboutusar2 = res.data.content[0].fifthLable_Ar;
          this.aboutusurl2 = res.data.content[0].fifthLable_URL;
          this.support = res.data.content[1].firstLable;
          this.supportar = res.data.content[1].firstLable_Ar;
          this.supporturl = res.data.content[1].firstLable_URL;
          this.support1 = res.data.content[1].secondLable;
          this.supportar1 = res.data.content[1].secondLable_Ar;
          this.supporturl1 = res.data.content[1].secondLable_URL;
          this.support2 = res.data.content[1].thirdLable;
          this.supportar2 = res.data.content[1].thirdLable_Ar;
          this.supporturl2 = res.data.content[1].thirdLable_URL;
          this.support3 = res.data.content[1].fourthLable;
          this.supportar3 = res.data.content[1].fourthLable_Ar;
          this.supporturl3 = res.data.content[1].fourthLable_URL;
          this.support4 = res.data.content[1].fifthLable;
          this.supportar4 = res.data.content[1].fifthLable_Ar;
          this.supporturl4 = res.data.content[1].fifthLable_URL;
          this.mff = res.data.content[2].firstLable;
          this.mffar = res.data.content[2].firstLable_Ar;
          this.mffurl = res.data.content[2].firstLable_URL;
          this.mff1 = res.data.content[2].secondLable;
          this.mffar1 = res.data.content[2].secondLable_Ar;
          this.mffurl1 = res.data.content[2].secondLable_URL;
          this.mff2 = res.data.content[2].thirdLable;
          this.mffar2 = res.data.content[2].thirdLable_Ar;
          this.mffurl2 = res.data.content[2].thirdLable_URL;
          this.mff3 = res.data.content[2].fourthLable;
          this.mffar3 = res.data.content[2].fourthLable_Ar;
          this.mffurl3 = res.data.content[2].fourthLable_URL;
          this.mff4 = res.data.content[2].fifthLable;
          this.mffar4 = res.data.content[2].fifthLable_Ar;
          this.mffurl4 = res.data.content[2].fifthLable_URL;
          // this.headerAr = res.data.header_ar;
          // this.description=res.data.discription;
          // this.descriptionAr=res.data.discription_ar;
          // this.button1=res.data.buttonName;
          // this.buttonAr=res.data.buttonName_ar;
          // this.contactEmail=res.data.contactEmail;
          // this.contactNumber=res.data.contactNumber;
          // this.youtubeURL=res.data.youtubeURL;
          // this.twetterURL=res.data.twetterURL;
          // this.instaURL=res.data.instaURL;
          // this.facebookURL=res.data.facebookURL;
          // console.log('footer', res.data);
        }
       
        // this.footerary.push(this.user)
        
       }
     );
  }

  switchLang(lang:any) {
    if(lang == 'en'){
      var dir = 'ltr'
    }else{
      var dir = 'rtl'
    }
    localStorage.setItem('lang',lang); 
    localStorage.setItem('dir',dir); 
    // console.log("lang",localStorage)
    window.location.reload(); 
    // this.translate.use(lang);  
  }


  functioncall(event: any) {
    
  }
}
