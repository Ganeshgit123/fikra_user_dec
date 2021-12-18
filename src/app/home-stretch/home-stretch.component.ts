import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from "ngx-toastr";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home-stretch',
  templateUrl: './home-stretch.component.html',
  styleUrls: ['./home-stretch.component.css']
})
export class HomeStretchComponent implements OnInit {

  homestretch:any;
  params:any;
  dir:any;
  userver: any;

  contentLan: any = {};
  saveform: any;
  date1:any;
  date2:any;
  lastdate: any;
  currentdate: any;
  projectdate: any;
  inter:any;
  luncont:any;
  constructor(public authService: AuthService,private route: ActivatedRoute,    private toaster: ToastrService,    public fb: FormBuilder,) { }
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

    this.userver = JSON.parse(localStorage.getItem("userId")!);
    this.myPromise
    this.dir=localStorage.getItem('dir') || 'ltr';

    this.authService.homestretch().subscribe((res: any) => {
      if (res.error === false) {
        this.homestretch = res.data;
        console.log('homestretch',this.homestretch);
        this.homestretch.forEach((value: any, key: any) => {
          this.currentdate = new Date();
          this.projectdate = new Date(value.basicInfoId.launchDate);
          var Days = Math.abs(this.projectdate - this.currentdate);
          value.lastdate = Math.ceil(Days / (1000 * 60 * 60 * 24));
          this.lastdate =Math.ceil(Days / (1000 * 60 * 60 * 24));
          var second=1000, minute=second*60, hour=minute*60, day=hour*24, week=day*7;
          this.date1 =this.currentdate;
         this.date2 = this.projectdate;
          if(this.lastdate <= 1){
            var timediff = this.date2 - this.date1;
            value.inter="hours";
          }else{
            var timediff = this.date2 - this.date1;
            value.inter="days";
          }
          switch (value.inter) {
            case "days"   :  value.inter =  Math.floor(timediff / day)
            value.luncont="days to go"; 
            break;
            case "minutes"   :  value.inter =  Math.floor(timediff / minute); 
            break;
            case "hours"  : value.inter =  Math.floor(timediff / hour)
            value.luncont="hours to go"; ; 
            break;
            default: return undefined;
          }
        });
      }
    });
  }
  localprojectid() {
    this.route.params.subscribe((params) => {
      this.params = params.id;
      //  console.log(params.id)
    });
    localStorage.setItem('projectid', JSON.stringify(this.params));
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
          this.ngOnInit()
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
          this.ngOnInit()
        } else {
          this.toaster.warning( res.message);
        }
      });
  }
  notuser() {
    // this.toaster.info("Please Login to Access");
  }
}
