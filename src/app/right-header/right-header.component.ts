import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, HostListener, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { AuthService } from "../shared/auth.service";

@Component({
  selector: "app-right-header",
  templateUrl: "./right-header.component.html",
  styleUrls: ["./right-header.component.css"],
})
export class RightHeaderComponent implements OnInit {
  popup: any;
  popup1: boolean = false;
  popup2: boolean = false;
  IsmodelShow: any;
  notify: any;
  count: any;
  notifyl:any;
  seetodo: any;
  valuesearch: any;
  status!: false;
  profileImage: any;
  visitform: any;
  endpoint: string = "http://localhost:8080/user";
  isAuthenticated: boolean | undefined;
  val = false;
  role!: String;
  _is_email_verified_!: String;
  products: any;
  deleteform: any;
  error!: any;
  // user: User | undefined;
  user: any = [];
  title!: any;
  lat!: number;
  lon!: number;
  profileimg: any;
  email: any;
  dir: any;
  notifys: any;
  lang: any;
  search: any = [];
  cou: any;
  saveInterval: any;
  contentLan: any = {};
  opensearch =false;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private http: HttpClient,
    private location: Location
  ) {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log("Got position", position.coords);
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      this.singoutForm = this.fb.group({
        lat: this.lat,
        lang: this.lon,
      });
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
    if (this.email != null) {
      this.authService.getnotification().subscribe((res: any) => {
        this.notify = res.notification;

        this.notifys = res;
        const result = this.notify.filter(
          (xx: any) => xx._is_Visited_ == false
        );
        this.cou = result.length;
      });
    }

    // if (this.email !== null) {
    //   this.authService.ContinuousCall().subscribe((res: any) => {
    //     if (res.msg == "jwt expired") {
    //       this.loggedout;
    //     }
    //   });
    // }
    this.lang = localStorage.getItem("lang") || "en";
    this.dir = localStorage.getItem("dir") || "ltr";
    this.profileImage = localStorage.getItem("profileImage");
    if (this.profileImage !== "undefined") {
      this.profileimg = JSON.parse(localStorage.getItem("profileImage")!);
    }
    this.role = this.readLocalStorageValue("role");

    this._is_email_verified_ = this.readLocalStorageValue(
      "_is_email_verified_"
    );
    if (this.role == null) {
    } else {
      this.logapi();
    }
  }

  logapi() {
    this.authService.userprofile().subscribe((res: any) => {
      this.user = res;
    });
  }

  WordpressForm = this.fb.group({
    title: ["", [Validators.required]],
  });

  readLocalStorageValue(key: string): string {
    return JSON.parse(localStorage.getItem(key)!);
  }

  singoutForm = this.fb.group({
    lat: [""],
    lang: [""],
  });

  goBack() {
    window.history.back();
  }

  close() {
    this.IsmodelShow = true; // set false while you need open your model popup
  }

  getlocal() {
    localStorage.getItem("error");
  }

  isLoggedIn() {}

  loggedout() {
    this.authService.doLogout(this.singoutForm.value);
  }
  searchenable(){
    this.opensearch=true;
  }
  switchLang(lang: any) {
    // console.log("lng",lang)
    if (lang == "en") {
      var dir = "ltr";
    } else {
      var dir = "rtl";
    }
    localStorage.setItem("lang", lang);
    localStorage.setItem("dir", dir);
    // console.log("lang",localStorage)
    window.location.reload();
    // this.translate.use(lang);
  }

  capitalize = (s: any) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  
  onquerySelected() {
    // console.log('search',this.valuesearch);
    this.authService
      .advancesearchapi(this.valuesearch)
      .subscribe((res: any) => {
        this.search = res.data?.splice(0, 5);
        this.popup1 = true;
      });
  }
  // passquery(){
  //   console.log('checks',this.valuesearch);
  // }

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
    this.ngOnInit();
  }
}
