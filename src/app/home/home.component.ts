import { HttpClient } from "@angular/common/http";
import { Component, OnInit ,ChangeDetectorRef } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { OwlOptions } from "ngx-owl-carousel-o";
import { ToastrService } from "ngx-toastr";
import { AuthGuard } from "../shared/auth.guard";
import { AuthService } from "../shared/auth.service";
import { DomSanitizer } from "@angular/platform-browser";
import Swal, { SweetAlertOptions } from "sweetalert2";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  errors:any;
  creator: any;
  creatives: any;
  creative: any;
  homenewsletterform: any;
  takingoffhome: any;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fal fa-chevron-circle-left"></i>',
      '<i class="fal fa-chevron-circle-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
    rtl: true,
  };
  menu: any;
  recommended: any;
  feature: any;
  creativeblog: any;
  popup1: any;
  popup2: any;
  IsmodelShow: any;
  opensearch =false;
  notify: any;
  seetodo: any;
  valuesearch: any;
  search: any;
  visitform: any;
  deleteform: any;
  errValue: any;
  recomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    pullDrag: true,
    dots: false,
    margin: 30,
    navSpeed: 700,
    navText: [
      '<i class="fal fa-chevron-circle-left"></i>',
      '<i class="fal fa-chevron-circle-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 3,
      },
    },
    nav: true,
    rtl: true,
  };

  featOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    pullDrag: true,
    dots: false,
    margin: 40,
    navSpeed: 700,
    navText: [
      '<i class="fas fa-arrow-left"></i>',
      '<i class="fas fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1 
      },
      480: {
        items: 2
      },
      1000: {
        items: 0
      }
    },
    nav: true,
    rtl: true,
  };

  clientOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    pullDrag: true,
    dots: false,
    margin: 30,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 3,
      },
      740: {
        items: 3,
      },
      940: {
        items: 5,
      },
    },    nav: false,
    rtl: true,
  };
  contentLan: any = {};
  isAuthenticated: any;
  verify: any;
  role!: String;
  email: any;
  products: any;
  saveform: any;
  error!: any;
  profileimg: any;
  user: any = [];
  title!: any;
  popup: any;
  bannerhome: any;
  clientlog: any;
  home: any;
  profileImage: any;
  category: any;
  newsletter: any;
  lang: any;
  staticstic: any;
  dir: any;
  currentdate: any;
  lastdate: any = [];
  homelastdate:any=[];
  lastdaterec: any;
  recommendedprojectgoal: any;
  recommendedprojectloc: any;
  projectdate: any;
  homestretch: any;
  featureproject: any;
  recommendedproject: any;
  recommendedprojectimg: any;
  recommendedprojecttitle: any;
  recommendedprojectname: any;
  recommendedprojectdes: any;
  takinggoalAmount: any;
  recommendedproject_Id: any;
  params: any;
  homestretchmsg: any;
  longstory: any;
  cou: any;
  Url: any;
  takingoffhomemsg: any;
  successProjectCount: any;
  creatorCount: any;
  projectCount: any;
  takingamountPleadged: any;
  takingpercentage: any;
  featurelastper: any = [];
  featurelastpercentage: any = [];
  takinglastper: any = [];
  takinglastpercentage: any = [];
  featureamountPleadged: any=[];
  featurepercentage: any;
  featuregoalAmount: any;
  stylewidthgr: any;
  checksub: any;
  longstory1: any;
  longstory2: any;
  Url1: any;
  Url2: any;
  userver: any;
  subcategoryList = [];
  subCatList: any = [];
  currentCat: any;
  notifyl: any;
  homecurrentdate:any;
homeprojectdate:any;
inter:any;
date1:any;
date2:any;
luncont:any;
lastdates:any;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private http: HttpClient,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private cd : ChangeDetectorRef
  ) {
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
    this.myPromise;
    this.email = this.readLocalStorageValue("email");
    if (this.email !== null) {
      setInterval(() => {
        this.authService.ContinuousCall().subscribe((res) => {
          if (res.notification == "") {
            this.notifyl = false;
          } else {
            this.notifyl = res.notification[0]._is_New_;
          }
        });
      }, 50000);
    }
    this.userver = JSON.parse(localStorage.getItem("userId")!);

    if (this.userver) {
      this.authService.getnotification().subscribe((res: any) => {
        this.notify = res.notification;
        //
        const result = this.notify.filter(
          (xx: any) => xx._is_Visited_ == false
        );
        this.cou = result.length;
      });
    }

    this.localprojectid();
    this.lang = localStorage.getItem("lang") || "en";
    this.dir = localStorage.getItem("dir") || "ltr";

    this.profileImage = localStorage.getItem("profileImage");
    if (this.profileImage != "undefined") {
      this.profileimg = JSON.parse(localStorage.getItem("profileImage")!);
    }
    this.role = this.readLocalStorageValue("role");

    this.authService.category().subscribe((res: any) => {
      if (res.error === false) {
        this.category = res.list;
      }
    });

    this.authService.subcategory().subscribe((res: any) => {
      if (res.error === false) {
        this.subcategoryList = res.list;
      }
    });

    this.authService.bannerhome().subscribe((res: any) => {
      if (res.error === false) {
        this.bannerhome = res.data;
      }
    });

    this.authService.takingoffhome().subscribe((res: any) => {
      if (res.error === false) {
        this.takingoffhome = res.data;
        this.takingoffhomemsg = res.message;
        this.takingoffhome.forEach((element: any) => {
          this.takinggoalAmount = element.basicInfoId.goalAmount;

          this.takingamountPleadged = element._amount_Pleadged_;
          this.takingpercentage =
            this.takingamountPleadged / this.takinggoalAmount;
          var taktotPercent = this.takingpercentage * 100;
          if (taktotPercent >= 100) {
            element.takinglastper = 100;
          } else {
            element.takinglastper = taktotPercent;
          }

          element.takinglastpercentage = taktotPercent;
        });
        this.takingoffhome.forEach((value: any, key: any) => {
          this.currentdate = new Date();
          this.projectdate = new Date(value.basicInfoId.launchDate);
          var Days = Math.abs(this.projectdate - this.currentdate);
          value.lastdates = Math.ceil(Days / (1000 * 60 * 60 * 24));
          this.lastdates =Math.ceil(Days / (1000 * 60 * 60 * 24));
          var second=1000, minute=second*60, hour=minute*60, day=hour*24, week=day*7;
          this.date1 =this.currentdate;
         this.date2 = this.projectdate;
          if(this.lastdates <= 1){
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

    this.authService.featureprojecthome().subscribe((res: any) => {
      if (res.error === false) {
        this.featureproject = res.data;
        var lastdate = Array();
        this.featureproject.forEach((elementss: any) => {
          this.featuregoalAmount = elementss.basicInfoId.goalAmount;

          this.featureamountPleadged = elementss._amount_Pleadged_;
          this.featurepercentage =
            this.featureamountPleadged / this.featuregoalAmount;
          var totPercent = this.featurepercentage * 100;
          if (totPercent >= 100) {
            elementss.featurelastper = 100;
          } else {
            elementss.featurelastper = totPercent;
          }

          elementss.featurelastpercentage = totPercent;
        });

        //width
        this.featureproject.forEach((value: any, key: any) => {
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
      
    

    this.authService.homestretch().subscribe((res: any) => {
      if (res.error === false) {
        this.homestretch = res.data;
        this.homestretchmsg = res.message;
        this.homestretch.forEach((elementss: any) => {
          this.featuregoalAmount = elementss.basicInfoId.goalAmount;

          this.featureamountPleadged = elementss._amount_Pleadged_;
          this.featurepercentage =
            this.featureamountPleadged / this.featuregoalAmount;
          var totPercent = this.featurepercentage * 100;
          if (totPercent >= 100) {
            elementss.featurelastper = 100;
          } else {
            elementss.featurelastper = totPercent;
          }

          elementss.featurelastpercentage = totPercent;
        });
        this.homestretch.forEach((value: any, key: any) => {
          this.homecurrentdate = new Date();
          this.homeprojectdate = new Date(value.basicInfoId.launchDate);
          var homeDays = Math.abs(this.homeprojectdate - this.homecurrentdate);
          value.homelastdate = Math.ceil(homeDays / (1000 * 60 * 60 * 24));
          this.homelastdate =Math.ceil(homeDays / (1000 * 60 * 60 * 24));
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

    this.authService.statichomepage().subscribe((res: any) => {
      if (res.error === false) {
        this.staticstic = res.data;
        this.successProjectCount = res.data.successProjectCount;
        this.creatorCount = res.data.creatorCount;
        this.projectCount = res.data.projectCount;
      }
    });

    this.authService.recommendedprojecthome().subscribe((res: any) => {
      if (res.error === false) {
        this.recommendedproject = res.data;
        let lent = this.recommendedproject.length;
        let intration = 1;
        setInterval(() => {
          this.recommendedprojectimg =
            res.data[intration].basicInfoId.projectImage;
          this.recommendedprojecttitle = res.data[intration].title;
          this.recommendedprojectname = res.data[intration].userId.userName;
          this.recommendedprojectdes =
            res.data[intration].basicInfoId.decription;
          this.recommendedproject_Id = res.data[intration]._id;
          this.recommendedprojectgoal =
            res.data[intration].basicInfoId.goalAmount;
          this.recommendedprojectloc =
            res.data[intration].basicInfoId.categoryName;
          this.currentdate = new Date();
          this.projectdate = new Date(
            res.data[intration].basicInfoId.launchDate
          );
          var Days = Math.abs(this.projectdate - this.currentdate);
          this.lastdaterec = Math.ceil(Days / (1000 * 60 * 60 * 24));
          if (intration < lent - 1) {
            intration += 1;
          } else {
            intration = 0;
          }
        }, 5000);

        this.recommendedprojectimg = res.data[0].basicInfoId.projectImage;
        this.recommendedprojecttitle = res.data[0].title;
        this.recommendedprojectname = res.data[0].userId.userName;
        this.recommendedprojectdes = res.data[0].basicInfoId.decription;
        this.recommendedproject_Id = res.data[0]._id;
        this.recommendedprojectgoal = res.data[0].basicInfoId.goalAmount;
        this.recommendedprojectloc = res.data[0].basicInfoId.categoryName;
        this.currentdate = new Date();
        this.projectdate = new Date(res.data[0].basicInfoId.launchDate);
        var Days = Math.abs(this.projectdate - this.currentdate);
        this.lastdaterec = Math.ceil(Days / (1000 * 60 * 60 * 24));
      }
    });

    if (this.role == null) {
    } else {
      this.authService.userprofile().subscribe((res) => {
        this.user = res;
      });
    }
    this.authService.homeapi().subscribe((res: any) => {
      this.creator = res.data.creator;
      this.creative = res.data.banner;
      this.creatives = res.data.creative;
      this.clientlog = res.data.creative;
      this.newsletter = res.data.newsletter;
      this.feature = res.data.featureAndTakingOf;
      this.longstory = this.sanitizer.bypassSecurityTrustResourceUrl(
        res.data.banner[0].blogURL1
      );
      this.longstory1 = this.sanitizer.bypassSecurityTrustResourceUrl(
        res.data.banner[0].blogURL2
      );
      this.longstory2 = this.sanitizer.bypassSecurityTrustResourceUrl(
        res.data.banner[0].blogURL3
      );
      // this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(this.longstory);
      // this.Url1 = this.sanitizer.bypassSecurityTrustResourceUrl(
      //   this.longstory1
      // );
      // this.Url2 = this.sanitizer.bypassSecurityTrustResourceUrl(
      //   this.longstory2
      // );
    });
    this.authService.homecreative().subscribe((res: any) => {
      this.creativeblog = res.data;
    });
  }

  WordpressForm = this.fb.group({
    title: ["", [Validators.required]],
  });
  singoutForm = this.fb.group({
    lat: [""],
    lang: [""],
  });

  readLocalStorageValue(key: string): string {
    return JSON.parse(localStorage.getItem(key)!);
  }

  isLoggedIn() {
    this.isAuthenticated = this.authService.isLoggedIn;
    return this.isAuthenticated;
  }

  loggedout() {
    this.authService.doLogout(this.singoutForm.value);
  }

  reqtocreator() {
    this.toaster.warning("To create Project request to make as creator");
  }

  profilepopup() {
    if (this.verify === false) {
      this.popup = false;
      this.toaster.warning("Request Send to Admin,Waiting for Approval");
    } else {
      this.popup = true;
    }
  }

  localprojectid() {
    this.route.params.subscribe((params) => {
      this.params = params.id;
    });
    localStorage.setItem("projectid", JSON.stringify(this.params));
  }

  switchLang(lang: any) {
    if (lang == "en") {
      var dir = "ltr";
    } else {
      var dir = "rtl";
    }
    localStorage.setItem("lang", lang);
    localStorage.setItem("dir", dir);
    window.location.reload();
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
          this.toaster.success(res.message);
          this.callRecommentded();
          this.ngOnInit()
        } else {
          this.toaster.warning("Enter valid ", res.message);
        }
      });
  }

  callRecommentded() {
    this.authService.recommendedprojecthome().subscribe((res: any) => {
      if (res.error === false) {
        this.recommendedproject = res.data;
        let lent = this.recommendedproject.length;
        let intration = 1;
        setInterval(() => {
          this.recommendedprojectimg =
            res.data[intration].basicInfoId.projectImage;
          this.recommendedprojecttitle = res.data[intration].title;
          this.recommendedprojectname = res.data[intration].userId.userName;
          this.recommendedprojectdes =
            res.data[intration].basicInfoId.decription;
          this.recommendedproject_Id = res.data[intration]._id;
          this.recommendedprojectgoal =
            res.data[intration].basicInfoId.goalAmount;
          this.recommendedprojectloc =
            res.data[intration].basicInfoId.categoryName;
          this.currentdate = new Date();
          this.projectdate = new Date(
            res.data[intration].basicInfoId.launchDate
          );
          var Days = Math.abs(this.projectdate - this.currentdate);
          this.lastdaterec = Math.ceil(Days / (1000 * 60 * 60 * 24));
          if (intration < lent - 1) {
            intration += 1;
          } else {
            intration = 0;
          }
        }, 5000);

        this.recommendedprojectimg = res.data[0].basicInfoId.projectImage;
        this.recommendedprojecttitle = res.data[0].title;
        this.recommendedprojectname = res.data[0].userId.userName;
        this.recommendedprojectdes = res.data[0].basicInfoId.decription;
        this.recommendedproject_Id = res.data[0]._id;
        this.recommendedprojectgoal = res.data[0].basicInfoId.goalAmount;
        this.recommendedprojectloc = res.data[0].basicInfoId.categoryName;
        this.currentdate = new Date();
        this.projectdate = new Date(res.data[0].basicInfoId.launchDate);
        var Days = Math.abs(this.projectdate - this.currentdate);
        this.lastdaterec = Math.ceil(Days / (1000 * 60 * 60 * 24));
      }
    });
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
          this.toaster.success(res.message);
          this.callRecommentded();
          this.ngOnInit()
        } else {
          this.toaster.warning("Enter valid ", res.message);
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

  capitalize = (s: any) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  onquerySelected() {
    this.authService
      .advancesearchapi(this.valuesearch)
      .subscribe((res: any) => {
        this.search = res.data?.splice(0, 5);
        this.popup1 = true;
      });
  }

  verifynotify(values: any) {
    this.visitform = this.fb.group({
      notificationId: [values],
    });

    this.authService.visitnotification(this.visitform.value);
  }

  deletenotify(values: any) {
    this.deleteform = this.fb.group({
      notificationId: [values],
    });
    this.authService.deletenotification(this.deleteform.value);
this.popup2 =false;
// this.cd.detectChanges();
this.ngOnInit();


  }

searchenable(){
  this.opensearch=true;
}
  listproject(value: any, value1: any, value2: any, value3: any, value4: any) {
    let catName = this.category.find(
      (c: any) => c._id == this.currentCat
    )?.categorieName;
    localStorage.setItem("selectedcategory", JSON.stringify(value));
    this.router.navigate(["/recommended", catName, value4]);
  }

  selectCat(id: any) {
    if (this.currentCat == id) {
      this.currentCat = "";
      this.subCatList = [];
    } else {
      this.currentCat = id;
      this.subCatList = this.subcategoryList.filter(
        (data: any) => data.categorieId === id
      );
    }
  }

  mouseEnter(id: any) {}

  mouseLeave() {
    this.subCatList = [];
  }

  onknow(value: any) {}
  close() {
    this.IsmodelShow = true; // set false while you need open your model popup
  }
  notuser() {
    // this.toaster.info("Please Login to Access");
  }
  redirect() {
    this.router.navigateByUrl("/createaccount");
  }
  redirectfeature() {
    this.router.navigateByUrl("/featureproject");
  }
  redirectstart() {
    this.router.navigateByUrl("/startproject");
  }
  closeSearch(){
    this.opensearch = false;
    this.popup1 = false;
  }
}
