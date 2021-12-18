import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../shared/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-investor",
  templateUrl: "./investor.component.html",
  styleUrls: ["./investor.component.css"],
})
export class InvestorComponent implements OnInit {
  isLoading = false;
  displayMode = 1;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = "";
  roles: string[] = [];
  saveUser: any;
  saveToken: any;
  getUser: any;
  error!: boolean;
  lat!: number;
  lon!: number;
  dir: any;
  loading= false;
  contentLan: any = {};

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      this.signinForm = this.fb.group({
        email: ["", [Validators.required]],
        password: [""],
        lat: this.lat,
        lang: this.lon,
      });
    });
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
  }
  signinForm = this.fb.group({
    email: ["", [Validators.required]],
    password: [""],
    lat: [""],
    lang: [""],
  });

  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;
  }

  navigateToLogin() {
    this.router.navigateByUrl("/account/1");
  }

  loginUser() {
    this.loading = true;
    this.authService.signIn(this.signinForm.value)
    .subscribe((res: any) => {
          this.loading = false;
          if (res._is_email_verified_ === false) {
            this.toastr.warning(res.message);
          }
          if (res.error === true) {
            this.router.navigate(["/login" + res.message]);
            this.toastr.warning("Enter valid ", res.message);
          }
          if (res._is_email_verified_ === true) {
            localStorage.setItem("access_token", res.token);
            localStorage.setItem("userId", JSON.stringify(res.userId));
            localStorage.setItem("role", JSON.stringify(res.role));
            localStorage.setItem(
              "_is_email_verified_",
              JSON.stringify(res._is_email_verified_)
            );
            localStorage.setItem(
              "profileImage",
              JSON.stringify(res.profileImage|| res.investorImage || undefined)
            );
            localStorage.setItem("email", JSON.stringify(res.email));
            this.router.navigate(["/"]);
            //this.showSuccess();
          }
        }
      )
  }

  reloadPage(): void {
    window.location.reload();
  }
  get getControl() {
    return this.signinForm.controls;
  }
}
