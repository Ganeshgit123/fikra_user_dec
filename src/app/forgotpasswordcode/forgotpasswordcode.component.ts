import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-forgotpasswordcode',
  templateUrl: './forgotpasswordcode.component.html',
  styleUrls: ['./forgotpasswordcode.component.css']
})
export class ForgotpasswordcodeComponent implements OnInit {
  verifypassForm: any;
  isSuccessful = false;
  some:any;
  otp:any;
  catchEmail: any;
  params:any;
  roles:any;
  role:any;
  dir:any;
  contentLan: any = {};
  passcrt:any;
  errors:any
  // verifypassForm:any;
  constructor(public fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute, private formBuilder: FormBuilder,    private toaster: ToastrService,

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
    this.localprojectid(),600;
    this.verifypassForm = this.fb.group({
      email:this.params,
      _code_: this.roles,
      newPass:['',[Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!%*?&])[a-z\d$@$!%*?&].{8,}')
      ]]
    })
  }
  localprojectid(){
   
    this.route.params.subscribe(params =>{this.params =params.email; 
      console.log(params.email)
    });
    this.route.params.subscribe(params =>{this.roles =params.code; 
      console.log(params.code)
    });
  
  }

  checkpass(event: any) {
    var p = event.target.value;
        this.errors = [];
    if (p.length < 8) {
        this.errors.push("Your password must be at least 8 characters"); 
    }
    if (p.search(/[a-z]/i) < 0) {
        this.errors.push("Your password must contain at least one letter.");
    }
    if (p.search(/[0-9]/) < 0) {
        this.errors.push("Your password must contain at least one digit."); 
    }
    if (this.errors.length > 0) {
        // alert(this.errors.join("\n"));
        // this.toastr.warning(this.errors.join("\n"));
        this.passcrt = true;
        return false;
    }
    this.passcrt = false;
    return true;
    
  
}
  
Onsubmitpass(){
  if(this.passcrt == true){
    this.toaster.warning("Enter New Password With requested Format")
  }
  else{
   
    this.authService.verifyfgpassword(this.verifypassForm.value);
  }
  

}
}
