import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {
  jobdata: any;
  content: any;
  head: any;
  advantage: any;
  benifit: any;
  careerimg: any;
  dir: any;
  benifitar: any;
  advantagear: any;
  headAr: any;
  searchTerm: any;
  contentLan: any = {};
  valarr: any;
  constructor(private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
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

    this.dir = localStorage.getItem('dir') || 'ltr';
    this.authService.joblist().subscribe(

      (res: any) => {
        this.jobdata = res.data;
        // console.log('job', this.jobdata);
        this.valarr = [];
        this.jobdata.forEach((value: any) => {
          if (value._is_On_ == true) {
            // console.log("value", value)
            this.valarr.push(value)
          }

        })
      }
    );
    this.authService.careercontent().subscribe(

      (res: any) => {
        this.content = res.data;
        //  console.log('job',this.content);
        this.head = res.data.head;
        this.advantage = res.data.advantageContent;
        this.benifit = res.data.benifitContent;
        this.careerimg = res.data.careerImage;
        this.advantagear = res.data.advantageContentAr;
        this.benifitar = res.data.benifitContentAr;
        this.headAr = res.data.headAr;
      }
    );
  }

}
