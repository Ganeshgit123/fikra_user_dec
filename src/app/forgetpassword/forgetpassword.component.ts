import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  isLoggedIn = false;
  dir:any;
  contentLan: any = {};
  isEmailExist: any;
  loading = false;
  constructor( 
    public fb: FormBuilder,
    public authService: AuthService,
    private toastr: ToastrService,
    private router: Router) { }

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

  }
  passwordForm = this.fb.group({
    email: ['', [Validators.required]],
  });

  checkemail(event:any){
    var e = event.target.value;
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var check=regularExpression.test(String(e).toLowerCase());
    if(check == false){
     this.isEmailExist = 'Enter valid email address'
    }else{
      this.isEmailExist = false
    }
   }

  loginUser() {
    this.loading = true;
    this.authService.forgetpassword(this.passwordForm.value)
    .subscribe((res: any) => {
      if (res.error == false) {
        this.toastr.success(res.message);
        setTimeout(() => {
          this.loading = false;
          this.router.navigate(['/login']);
        },2000)
      } else {
        this.loading = false;
        this.router.navigate(["/account-recovery" + res.message]);
        this.toastr.warning("Enter valid ", res.message);
      }
    });
  }
}
