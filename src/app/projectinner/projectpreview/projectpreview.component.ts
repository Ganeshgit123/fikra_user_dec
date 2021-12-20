import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-projectpreview',
  templateUrl: './projectpreview.component.html',
  styleUrls: ['./projectpreview.component.css']
})
export class ProjectpreviewComponent implements OnInit {
  popup:any;
  displayMode: number | undefined;
  list:any;
  lastdate:any;
  showreward:any;
  projectpreview:any;
  dir: any;
  featOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    pullDrag: true,
    dots: false,
    margin: 50,
    navSpeed: 700,
    navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: true
  }
  currentdate:any;
  projectdate:any;
  buskiades: any;
  buskiadesar: any;
  busarndesar: any;
  busarndes: any;
  contentLan: any = {};
  date1:any;
  date2:any;
  inter:any;
  luncont:any;
  constructor(   public authService: AuthService,
    private router: Router,private route: ActivatedRoute) { }
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

    this.dir = localStorage.getItem("dir") || "ltr";
    this.displayMode = 1;
    this.authService.projectpreview().subscribe(
      (res:any)=>{
       this.projectpreview = res.data;
       this.showreward = res.data.rewardTableId;
       this.currentdate = new Date();
       this.projectdate = new Date(this.projectpreview.basicInfoId.launchDate);
       var Days = Math.abs(this.projectdate - this.currentdate);
      //  if(this.projectdate <= this.currentdate){
      //    this.lastdate = "0";
      //  }else{ this.lastdate = Math.ceil(Days / (1000 * 60 * 60 * 24));}
      var second=1000, minute=second*60, hour=minute*60, day=hour*24, week=day*7;
      this.date1 =this.currentdate;
     this.date2 = this.projectdate;
      if(this.lastdate < 1){
        var timediff = this.date2 - this.date1;
        this.inter="hours";
      }else{
        var timediff = this.date2 - this.date1;
        this.inter="days";
      }
      switch (this.inter) {
        case "days"   :  this.inter =  Math.floor(timediff / day)
        this.luncont=  this.contentLan.DAYSTOGO || "days to go"; 
        break;
        case "minutes"   :  this.inter =  Math.floor(timediff / minute); 
        break;
        case "hours"  : this.inter =  Math.floor(timediff / hour)
        this.luncont= this.contentLan.HOURSTOGO || "Hours to go"; 
        break;
        default: return undefined;
      }
      }
    );
    this.authService.getcreateproject().subscribe((res: any) => {
      this.buskiades = res.data.model[0].business_KIA_Desc;
      this.busarndes = res.data.model[0].business_AON_Desc;
      this.buskiadesar = res.data.model[0].business_KIA_Desc_Ar;
      this.busarndesar = res.data.model[0].business_AON_Desc_Ar;
    });
  }
  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;
  }
  goBack() {
    window.history.back();
  }
}
