import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../shared/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-startproject',
  templateUrl: './startproject.component.html',
  styleUrls: ['./startproject.component.css']
})
export class StartprojectComponent implements OnInit {
  topSection: any;
  quotes:any;
  questions:any;
  videoExplanation:any = [];
  whyFikra:any;
  dir:any;
  Url:any;
  visible:boolean = false;
  visible1:boolean = false;

  visibleq:boolean = false;
 
  role:any;
  menu: any;
  list:any;
  creatorhandbook:any;
  createHand:any = [];
  selectedItem:any;
 
  content:any;
  contentLan: any = {};
 handBookSecShow:any;
 questionSecShow:any;
  quoteSecShow:any;
  videoSecShow:any;
  whyFikraSecShow:any;

  constructor(public translate: TranslateService,public fb: FormBuilder,public authService: AuthService,
    private sanitizer: DomSanitizer,    private router: Router,) { }
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

    this.dir=localStorage.getItem('dir') || 'ltr';
    this.role = this.readLocalStorageValue('role');
    this.authService.startaproject().subscribe(
    
      (res:any)=>{
        if(res.error === false){
          // console.log("dd",res.data)
          this.handBookSecShow = res.data._is_HandBook_on_;
          this.questionSecShow = res.data._is_question_on_;
          this.quoteSecShow = res.data._is_quotes_on_;
          this.videoSecShow = res.data._is_videoExp_on_;
          this.whyFikraSecShow = res.data._is_why_Fikra_on_;
          this.topSection = res.data.topSection;
          this.quotes = res.data.quotes;
          this.questions = res.data.questions;
          this.videoExplanation = res.data.videoExplanation;
         
          for (let item of this.videoExplanation) {
            this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(item.videoLink);
        }   
          this.whyFikra = res.data.whyFikra;
          this.createHand = res.data.creatorHandbook;
        }        
       }
     );
     this.authService.gethandbook().subscribe(
    
      (res:any)=>{
        if(res.error === false){
          this.creatorhandbook = res.data;   
          // console.log('creatorhandbook',res);    
       }}
     );
     

    //  console.log('video',this.Url);

  }

  redirect() {
    this.router.navigateByUrl("/createaccount");
    this.loggedout()
  }
  singoutForm = this.fb.group({
    lat: [""],
    lang: [""],
  });
  loggedout() {
    this.authService.doLogout(this.singoutForm.value);
  }
  onclick()
  {
   //not equal to condition
    this.visible = !this.visible
  }
  onclickq()
  {
   //not equal to condition
    this.visibleq = !this.visibleq
  }
  onclick1(){
    this.visible1=!this.visible1
  }
  readLocalStorageValue(key: string): string {
    // console.log("hi",localStorage.getItem(key));
    return JSON.parse(localStorage.getItem(key)!)
  
  }
}
