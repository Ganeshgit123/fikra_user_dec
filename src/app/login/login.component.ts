import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../shared/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  // form: any = {
  //   name: null,
  //   password: null
  // };
  isLoading = false;
  // loading!:any;
  displayMode = 1;

  // signinForm: FormGroup;
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
  loading: any;
  contentLan: any = {};

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log("Got position", position.coords);
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      this.signinForm = this.fb.group({
        email: ["", [Validators.required]],
        password: [""],
        lat: this.lat,
        lang: this.lon,
      });
    });
    //
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

    this.dir = localStorage.getItem("dir") || "ltr";
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
  // onSubmit(): void {
  // const { email, password } = this.form;

  //     this.apiservice.login(email, password).subscribe(
  //        response => {
  //         // this.saveToken(data.accessToken);
  //         // this.saveUser(data);
  //         // this.router.navigate(['account']);
  //         // if(this.error== false){

  //         // }
  //         console.log(response.error)
  //         if(response.error == false){
  //  this.navigateToLogin();
  //         }

  //         return true;
  //         // this.error = false;
  //         // this.isLoggedIn = true;
  //         // this.roles = this.getUser().roles;
  //               },
  //       err => {
  //         this.errorMessage = err.error.message;
  //         this.isLoginFailed = true;
  //       }
  //     );
  //   }
  navigateToLogin() {
    this.router.navigateByUrl("/account/1");
  }
  loginUser() {
    this.authService.signIn(this.signinForm.value);
  }
  creatorlogin() {
    this.authService.signIncreator(this.signinForm.value);
  }
  reloadPage(): void {
    window.location.reload();
  }
  get getControl() {
    return this.signinForm.controls;
  }
  toogleloading() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
}
