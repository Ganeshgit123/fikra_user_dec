import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.component.html',
  styleUrls: ['./verifyotp.component.css']
})
export class VerifyotpComponent implements OnInit {

  verifyemailForm: any;
  isSuccessful = false;
  resendotpForm:FormGroup;
  some:any;
  otp:any;
  catchEmail: any;
  params:any;
  roles:any;
  role:any;
  dir: any;
  contentLan: any = {};
  constructor(public fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router) { 
      // this.verifyemailForm = this.fb.group({
      //   email: new FormControl(JSON.parse(localStorage.getItem('email')!)||'', Validators.required),
      //   _otp_: new FormControl('', Validators.required),
      // })
      this.resendotpForm = this.fb.group({
        email: new FormControl('', Validators.required),
        // fullName: localStorage.getItem('fullName'),
      })
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
    this.localprojectid(),600;
    this.catchEmail = JSON.parse(localStorage.getItem('email')!)
  }


  veifyemail(): void {
    // Process checkout data here
    // this.authService.verifymail(this.verifyemailForm.value);
  }

  localprojectid(){
    this.route.params.subscribe(params =>{this.params =params.id; 
      // console.log(params.id)
    });
    this.route.params.subscribe(params =>{this.roles =params.role; 
      // console.log(params.id)
    });
    this.verifyemailForm = this.fb.group({
      userId:this.params,
      role: this.roles
    })
    
    this.authService.verifymail(this.verifyemailForm.value);
    // this.authService.verifymobile(this.verifyemailForm.value);
  }

  resendemail(): void {
    // Process checkout data here
    // console.log('resend',this.resendotpForm.value);
    // this.authService.resendotpemail(this.verifyemailForm.value);
  }
}
