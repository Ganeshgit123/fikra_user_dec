import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-helpguidecategory',
  templateUrl: './helpguidecategory.component.html',
  styleUrls: ['./helpguidecategory.component.css']
})
export class HelpguidecategoryComponent implements OnInit {

  guide:any;
  dataList:any = [];
  value:any;
  params:any;
  dir:any;
  visible:boolean = false;
  // submitquestionform:any;
  status='61497fa7b25e5ed52377e803';
  selectedItem = 0;
  submitquestionform = this.fb.group({
    question: [''],
    ebookId:''
  });
  contentLan: any = {};

  constructor(public authService: AuthService,    private route: ActivatedRoute,private fb: FormBuilder,
    ) { }

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
    this.route.params.subscribe((params) => {
      this.params = params.id;
      // console.log("dd",params.id)
    });
    localStorage.setItem('ebookId', JSON.stringify(this.params));

    this.authService.helpguidebyid1().subscribe((res: any) => {
      console.log('comment', res);
      this.dataList = res.data;
    });
}
opentext(){
  this.visible = !this.visible;
}

onquessubmit(){
  
  this.submitquestionform.value.ebookId=this.params;

  this.authService.posthelpquestion(this.submitquestionform.value)
  this.submitquestionform.reset();

}

}
