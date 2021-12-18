import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { AuthService } from '../shared/auth.service';
import { FormData } from '../shared/formdata';
import { ToastrService } from 'ngx-toastr';
import Swal, { SweetAlertOptions } from "sweetalert2";

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css'],
})
export class CreateaccountComponent implements OnInit {
  registerform!: FormGroup;
  user: any;
  url: any;
  countryList: any = [];
  cityList: any = [];
  country: any;
  city: any;
  value: any;
  creator: any;
  displayMode = 1;
  show = false;
  creatorMandatory: any = [];
  investorMandatory: any = [];
  statusInvestor = false;
  statusCreator = false;
  lang: any;
  registercreatorform: any;
  registeruserform:any;
  rolecreator: any;
  createaccount: any;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  imgfile: any;
  fileUpload: any;
  valuesearch: any;
  passcrt=false;
  loading = false;
  errors: any = [];
  errors1: any = [];
  unamePattern = "(?=.*\d)(?=.*[a-z]).{8,}"; 
  registercreatorformcheck:any;
  nameList:any;
  contentLan: any = {};
  isEmailExist: any;
  isUserExist: any;
  dir: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        this.arabicCotent()
      );
    }, 2000);
  });

  async arabicCotent() {
    this.myPromise

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
    this.dir = localStorage.getItem("dir") || "ltr";

	  this.myPromise
    // Investor Form
    this.lang = localStorage.getItem('lang') || 'en';
    this.registerform = this.fb.group({
      _ispolicy_and_terms_accepted_: ['', [Validators.required]],
      _send_me_newsletter_: [false],
    });
    this.displayMode = 1;

    this.authService.singupfield().subscribe((res: any) => {
      this.user = res.data;
      this.user.forEach((formItem: any) => {
        if (formItem._is_Mandatory_ === true) {
          this.investorMandatory.push(formItem.fieldId);
          this.registerform.addControl(
            formItem.fieldId,
            this.fb.control('', Validators.required)
          );
        } else {
          this.registerform.addControl(formItem.fieldId, this.fb.control(''));
        }
      });
    });

    // Creator Form
    this.registercreatorform = this.fb.group({
      _ispolicy_and_terms_accepted_: ['', [Validators.required]],
      _send_me_newsletter_: [false],
    });

    this.authService.singupfieldcreator().subscribe((res: any) => {
      this.creator = res.data;
      this.creator.forEach((formItem: any) => {
        if (formItem._is_Mandatory_ === true) {
          this.creatorMandatory.push(formItem.fieldId);
          if (formItem.fieldType === 'file') {
            this.registercreatorform.addControl(
              formItem.fieldId,
              this.fb.control(this.url, Validators.required)
            );
          } else {
            this.registercreatorform.addControl(
              formItem.fieldId,
              this.fb.control('', Validators.required)
            );
          }
        } else {
          this.registercreatorform.addControl(
            formItem.fieldId,
            this.fb.control('')
          );
        }
      });
    });

    this.authService.country().subscribe((res: any) => {
      this.country = res.data;
      console.log('country', this.country);
    });

    //Mandatory key validation
    this.registerform.valueChanges.subscribe((x: any) => {
      let pushIt: any = []

      this.investorMandatory.map((data : any) => {
        if(this.registerform.value[data] == ''){
          pushIt.push(true)
        }else{
          pushIt.push(false)
        }
      })  

      if(pushIt.find((ele: any)=> ele)){
        this.statusInvestor = true
      }else{
        this.statusInvestor = false
      }
    });

    this.registercreatorform.valueChanges.subscribe((x: any) => {
      let pushIt: any = []

      this.creatorMandatory.map((data : any) => {
        if(this.registercreatorform.value[data] == ''){
          pushIt.push(true)
        }else{
          pushIt.push(false)
        }
      })  

      if(pushIt.find((ele: any)=> ele)){
        this.statusCreator = true
      }else{
        this.statusCreator = false
      }
    });
  }

  registerUser() {
    if (
      this.registerform.value.password ==
      this.registerform.value.confirmpassword
    ) {
      this.loading = true;
      if (this.registerform.value._ispolicy_and_terms_accepted_) {
        this.authService
          .signUp(this.registerform.value)
          .subscribe((res: any) => {
            this.loading = false;
            if (res.error == false) {
              this.router.navigate(['/login']);
              this.toastr.success(res.message);
            } else {
              this.toastr.warning(res.message);
            }
          });
      } else {
        this.loading = false;
        // this.toastr.warning('Please accept the terms and condition');
        Swal.fire({
          text:"Please accept the terms&condition and Privacy policy",
          icon: "warning",
        });
      }
    } else {
      this.loading = false;
      this.toastr.warning('Confirm password is not matched');
    }
  }

  registerCreator() {
    if ( 
      this.registercreatorform.value.password ==
      this.registercreatorform.value.confirmpassword
    ) {
      this.loading = true
      if (this.registercreatorform.value._ispolicy_and_terms_accepted_) {
        this.registercreatorform.value['iban'] =
          'SA' + this.registercreatorform.value['iban'];
        this.authService
          .signUpCreator(this.registercreatorform.value)
          .subscribe((res: any) => {
            this.loading = false
            if (res.error == false) {
              this.router.navigate(['/login']);
              this.toastr.success(res.message);
            } else {
              this.toastr.warning(res.errMessage.message);
            }
          });
      } else {
        this.loading = false
        // this.toastr.warning('Please Field the from');
        Swal.fire({
          text:"Please accept the terms&condition and Privacy policy",
          icon: "warning",
        });
      }
    } else {
      this.loading = false
      this.toastr.warning('Confirm password is not matched');
    }
  }

  setIntoForm(data: any, fileName: any) {
    this.registercreatorform.patchValue({
      [fileName]: data,
    });
  }

  uploadImageFile(event: any, fileName: any) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgfile = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    this.fileUpload = event.target.files[0];

    // console.log("eventimg",this.fileUpload);
    const formdata = new FormData();
    formdata.append('imageToStore', this.fileUpload);
    this.authService.s3upload(formdata).subscribe((res: any) => {
      // if (res.error == false) {
      //   // console.log('upload',res);
      //   this.url = res.data.Location;
      //   this.registercreatorform.value[fileName] = this.url;
      //   // console.log(this.registercreatorform.value);
      // }
      if (res.error == false) {
        this.setIntoForm(res.data.Location, fileName);
      }
    });
    // console.log('prfimgpro',formdata);
  }

  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;
    this.isEmailExist= false;
    this.isUserExist= false;
  }

  formcreator() {
    this.createaccount = this.rolecreator;
  }

  oncountrySelected(value: String) {
    this.authService.city(value).subscribe((res: any) => {
      this.cityList = res.data;
      // console.log('city', this.cityList: any);
    });
  }

  onchangeusername() {
    // this.registercreatorform.value.userName =value;
    console.log('search',this.valuesearch);
        this.registeruserform =this.fb.group({
          queryString:this.valuesearch,
    
      });
    this.authService.verifyusername( this.registeruserform.value).subscribe((res: any) => {
      this.nameList = res.suggestions;
      if (res.error == true){
        // this.loading = false;
        // Swal.fire({
        //   text: res.message,
        //   icon: "warning",
        // });
        this.isUserExist = res.message
      // this.toastr.warning(res.message);
    }else{
      this.isUserExist = false
    }
      // console.log('city', this.cityList: any);
    });
  }
  // checkpass(event: any){
  //   console.log(event.target.value.length);
  //   const checkalue=event.target.value.length;
  //   // console.log(this.unamePattern);
  //  if(checkalue <= 8 ) {
  //    this.passcrt = true;
  //    console.log(checkalue);
  //  }else{
  //   this.passcrt = false;
  //  }
    
  // }

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
    return true;
}

checkpass1(event: any) {
  var p = event.target.value;
      this.errors1 = [];
  if (p.length < 8) {
      this.errors1.push("Your password must be at least 8 characters"); 
  }
  if (p.search(/[a-z]/i) < 0) {
      this.errors1.push("Your password must contain at least one letter");
  }
  if (p.search(/[0-9]/) < 0) {
      this.errors1.push("Your password must contain at least one digit."); 
  }
  if (this.errors1.length > 0) {
      // alert(this.errors.join("\n"));
      // this.toastr.warning(this.errors.join("\n"));
      this.passcrt = true;
      return false;
  }
  return true;
}

checkemail(event:any){
  var e = event.target.value;
  this.errors = [];
  const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var check=regularExpression.test(String(e).toLowerCase());
  if(check == false){
  //  Swal.fire({
  //    text: "Check the Email entered or Email is not available",
  //    icon: "warning",
  //  });
   this.isEmailExist = 'Check the Email entered or Email is not available'
    // this.toastr.warning("Check the Email entered or Email is not available");
  }else{
    this.isEmailExist = false
  }
 }


  selectchange(value: any) {
    if (value == 'Yes') {
      // console.log('select1');
      this.show = true;
      // console.log('select2');
    } else {
      // console.log('select3',value);
      this.show = false;
      // console.log('select4');
    }
  }
}
