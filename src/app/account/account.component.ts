import { Component, OnInit,ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../shared/auth.service";
import { Account } from "../shared/account";
import { first } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import Swal, { SweetAlertOptions } from "sweetalert2";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"],
})
export class AccountComponent implements OnInit {
  @ViewChild("myModalClose") modalClose: any;
  displayMode!: any;
  showSelected: boolean;
  isAddMode: boolean | undefined;
  walletamt: any;
  email: any;
  dir:any;
  countrySs:any;
  citySs:any;
  submitted = false;
  shippingaddressForm:any;
  display = "none";

  // paymentForm:any;
errors:any
  checkoutForm = this.formBuilder.group({
    email: ["", Validators.required],
    password: "",
  });
  notificationForm = this.formBuilder.group({
    emailNotification: ["", Validators.required],
    userId: JSON.parse(localStorage.getItem("userId")!),
    userType: JSON.parse(localStorage.getItem("role")!),
  });

  verifymobile = this.formBuilder.group({
    otp_mobile: ["", Validators.required],
    mobile: ["", Validators.required],
    userId: JSON.parse(localStorage.getItem("userId")!),
    role: JSON.parse(localStorage.getItem("role")!),
  });
  updatemobileform = this.formBuilder.group({
    otp_mobile: ["", Validators.required],
    mobile: ["", Validators.required],
    userId: JSON.parse(localStorage.getItem("userId")!),
    role: JSON.parse(localStorage.getItem("role")!),
  });
  deleteshippingform: any;
  deletebankaccform: any;
  setdefaultshipping: any;
  sendmobileform = this.formBuilder.group({
    mobile: ["", Validators.required],
    userId: JSON.parse(localStorage.getItem("userId")!),
    role: JSON.parse(localStorage.getItem("role")!),
  });
  sendmobileupdateform = this.formBuilder.group({
    mobile: ["", Validators.required],
    userId: JSON.parse(localStorage.getItem("userId")!),
    role: JSON.parse(localStorage.getItem("role")!),
  });
  passwordform = this.formBuilder.group({
    password: ["", Validators.required],
    old_password: ["", Validators.required],
    userId: JSON.parse(localStorage.getItem("userId")!),
    role: JSON.parse(localStorage.getItem("role")!),
  });
  emailform = this.formBuilder.group({
    password: ["", Validators.required],
    old_email: ["", Validators.required],
    email: ["", Validators.required],
    userId: JSON.parse(localStorage.getItem("userId")!),
    role: JSON.parse(localStorage.getItem("role")!),
  });
  notificationFormstatus = this.formBuilder.group({
    emailNotification: ["", Validators.required],
    smsNotification: [true, Validators.required],
    userId: JSON.parse(localStorage.getItem("userId")!),
    userType: JSON.parse(localStorage.getItem("role")!),
  });
  addmoneyform = this.formBuilder.group({
    userId: JSON.parse(localStorage.getItem("userId")!),
    userType: JSON.parse(localStorage.getItem("role")!),
    amount: ["", Validators.required],
    paymentMethod: ["", Validators.required],
  });
  fragment!: string;
  fullName!: string;
  des1: any;
  des2: any;
  dob!: string;
  fileUpload: any;
  mobileNumber!: string;
  password!: any;
  old_password!: any;
  _send_me_newsletter_!: string;
  account: any = [];
  user!: any;
  o!: any;
  des3: any;
  banks: any;
  ibans: any;
  accno: any;
  showSelectedemail: any;
  popup: any;
  editOpen = false;
  registercreatorform: any;
  popup1: any;
  popuppay = false;
  today: any;
  walletstatus: any;
  businessAddress: any;
  shippingaddress:any = [];
  country: any;
  cityList: any;
  error!: any;
  imgfile: any;
  pass: any;
  bankaccount: any;
  _userRole_: any;
  oldpass: any;
  fullname: any;
  creator: any;
  banknumber: any;
  bankname: any;
  iban: any;
  objectKeys = Object.keys;
  role: any;
  editForm: any;
  fieldame: any;
  checkstatusform: any;
  getcity: any;
  bankreqForm: any;
  contentLan: any = {};
  notificationstatus:any;
  passcrt:any;
  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute
  ) {
    this.showSelected = false;
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
    this.dir=localStorage.getItem('dir') || 'ltr';

    this.shippingaddressForm = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      nickName: ['',Validators.required],
      fullName: ['', Validators.required],
      Address_one: [''],
      district_name: [''],
      Address_two: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: [''],
      pin: ['', Validators.required],
      aditional: [''],
      unitNo: [''],
      phone: ['', Validators.required],
    });

    this.route.params.subscribe((params) => {
      if (params?.code) {
        this.onDisplayModeChange(params?.code);
      }
    });

    this.role = this.readLocalStorageValue("role");

    this.authService.country().subscribe((res: any) => {
      this.country = res.data;
    });

    this.authService.getAllSippingAddress().subscribe((res: any) => {
      this.shippingaddress = res.data;
    });
    this.authService.getnotificationstatus().subscribe((res: any) => {
      this.notificationstatus = res.data;
      this.notificationFormstatus.patchValue(this.notificationstatus);
      this.notificationForm.patchValue(this.notificationstatus);
    });
    this.authService.getAllBankaccount().subscribe((res: any) => {
      this.bankaccount = res;
    });

    this.authService.getwalletstatus().subscribe((res: any) => {
      this.walletstatus = res.data._history_
        // .filter((data: any) => {
        //   return data._isSuccess_;
        // })
        .reverse();
      this.walletamt = res.data.walletAmount;
    });

    this.fragment = this.activatedRoute.snapshot.fragment;
    this.editForm = this.formBuilder.group({
      _userRole_: JSON.parse(localStorage.getItem("role")!),
      _creatorId_: JSON.parse(localStorage.getItem("userId")!),
    });

    this.authService.singupfieldcreator().subscribe((res: any) => {
      this.creator = res.data;
      this.authService.userprofile().subscribe((res: any) => {
        this.user = res.data;
        var dobData = new Date(this.user.dob).toISOString().split("T")[0];
        this.email = res.data.email;
        this.editForm.patchValue(this.user);
        this.editForm.patchValue({
          dob: dobData
        });
        // this.paymentForm.patchValue(this.user);
      });

      this.creator.forEach((formItem: any) => {
        if (formItem._is_Mandatory_ === true) {
          this.editForm.addControl(
            formItem.fieldId,
            this.formBuilder.control("", Validators.required)
          );
        } else {
          this.editForm.addControl(
            formItem.fieldId,
            this.formBuilder.control("")
          );
        }
      });
    });

    this.authService.getcities().subscribe((res: any) => {
      this.getcity = res.data;
    });


    this.authService.userprofile().subscribe((res: any) => {
      this.user = res.data;
      this.fullname = res.data.fullName;
      this.dob = res.data.dob;
      this.banknumber = res.data.accountNumber;
      this.iban = res.data.iban;
      this.bankname = res.data.bankName;
      this.mobileNumber = res.data.mobileNumber;
      (this.businessAddress = res.data.businessAddress),
        (this.today = new Date(this.dob).toISOString().split("T")[0]);
      this.newaddressForm.patchValue({
        fullName: this.user.fullName,
        email: this.user.email,
        password: this.user.password,
        userName: this.user.userName,
        country: this.user.country,
        city: this.user.city,
        street: this.user.street,
        businessAddress: this.user.businessAddress,
        dob: this.user.dob,
        mobileNumber: this.user.mobileNumber,
        _send_me_newsletter_: this.user._send_me_newsletter_,
      });

      // this.verifymobile = this.formBuilder.group({
      //   otp_mobile: ["", Validators.required],
      //   mobile: ["", Validators.required],
      //   userId: JSON.parse(localStorage.getItem("userId")!),
      //   role: JSON.parse(localStorage.getItem("role")!),
      // });
      this.bankreqForm = this.formBuilder.group({
        userId: JSON.parse(localStorage.getItem("userId")!),
        userType: JSON.parse(localStorage.getItem("role")!),
      });
      this.sendmobileform = this.formBuilder.group({
        mobile: this.user.mobileNumber,
        userId: JSON.parse(localStorage.getItem("userId")!),
        role: JSON.parse(localStorage.getItem("role")!),
      });
    });
  }

  get f() { return this.shippingaddressForm.controls; }

  newaddressForm = this.formBuilder.group({
    fullName: ["", Validators.required],
    userName: ["", Validators.required],
    email: ["", Validators.required],
    password: ["", Validators.required],
    country: ["", Validators.required],
    city: ["", Validators.required],
    street: ["", Validators.required],
    mobileNumber: ["", Validators.required],
    dob: ["", Validators.required],
    _send_me_newsletter_: "true",
    _investorID_: JSON.parse(localStorage.getItem("userId")!),
    _userRole_: JSON.parse(localStorage.getItem("role")!),
  });

 

  paymentForm = this.formBuilder.group({
    userType: JSON.parse(localStorage.getItem("role")!),
    userId: JSON.parse(localStorage.getItem("userId")!),
    bankName: ["", Validators.required],
    iban: ["", Validators.required],
    accountNumber: ["", Validators.required],
  });

  readLocalStorageValue(key: string): string {
    return JSON.parse(localStorage.getItem(key)!);
  }

  editCreator() {
    this.authService.creatoredit(this.editForm.value).subscribe((res: any) => {
      if (res.error == false) {
        this.toastr.success("Success ", res.message);
        this.modalClose.nativeElement.click();
        this.ngOnInit();
      }
    });
  }

  ToggleButton() {
    this.showSelected = !this.showSelected;
    this.showSelectedemail = false;
  }

  ToggleButtonemail() {
    this.showSelected = false;
    this.showSelectedemail = !this.showSelectedemail;
  }

  onSubmit(): void {
    console.warn("Your email has been submitted", this.checkoutForm.value);
    this.checkoutForm.reset();
    this.ngOnInit();
  }

  onSubmitprofile(): void {
    this.authService.profileedit(this.newaddressForm.value);
    this.ngOnInit();
  }

  onSubmitpassword(): void {
    if (this.passwordform.value.password !== "") {
      this.authService.passwordedit(this.passwordform.value);
    }
  }

  onEmailupdate(): void {
    if (this.emailform.value.password !== "") {
      this.emailform.value.email;
      this.emailform.value.old_email = this.email;
      this.authService.emailedit(this.emailform.value);
    }
  }

  onDisplayModeChange(mode: string): void {
    this.role = this.readLocalStorageValue("role");
    if (this.role === "creator") {
      this.displayMode = mode;
    } else {
      let sum;
      if (
        parseInt(mode) == 1 ||
        parseInt(mode) == 2 ||
        parseInt(mode) == 3 ||
        parseInt(mode) == 4 ||
        parseInt(mode) == 5 ||
        parseInt(mode) == 6
      ) {
        sum = parseInt(mode) + 6;
      } else {
        sum = parseInt(mode);
      }
      this.displayMode = sum;
    }
  }

  onSubmitsendotp() {
    this.authService.sendmobileotp(this.sendmobileform.value);
  }

  onSubmitsendotpupdate() {
    if(this.sendmobileupdateform.value.mobile.length == 9){
    this.authService.sendmobileotp(this.sendmobileupdateform.value);}
    else{
      this.toastr.warning("Please fill the Mobile Number")
    }
  }

  onSubmitnotificationstatus() {
    this.authService.notificationstatusupdate(
      this.notificationFormstatus.value
    );
  }
  onSubmitnotificationForm() {
    this.authService.notificationstatusupdate(this.notificationForm.value);
  }

  onSubmitaddress() {
    this.submitted = true;
    if (this.shippingaddressForm.invalid) {
      return;
  }

      this.authService.shippingadd(this.shippingaddressForm.value).subscribe((res: any) => {
        if (res.error == false) {
          this.toastr.success('Success ', res.message);
      this.shippingaddressForm.reset();
      this.ngOnInit();
          this.submitted = false;
    } else {
          this.toastr.warning('Enter valid ', res.message);
    }
      });
  }

  onSubmitverifymobileotp() {
    this.verifymobile.value.mobile = this.sendmobileupdateform.value.mobile;
    this.authService.mobileotp(this.verifymobile.value);
  }

  onSubmitupdatemobilenumber() {
    this.authService.updatemobilenumber(this.updatemobileform.value);
    // this.ngOnInit();
  }

  oncountrySelected(value: String) {
    this.authService.city(value).subscribe((res: any) => {
      this.cityList = res.data;
    });
  }

  onshipdelete(values: any) {
    this.deleteshippingform = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      addressId: [values["_id"]],
    });
    this.authService.shippingdelete(this.deleteshippingform.value);
    this.shippingaddressForm.reset();
    this.ngOnInit();
  }

  onbankdelete(values: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletebankaccform = this.formBuilder.group({
          userId: JSON.parse(localStorage.getItem("userId")!),
          userType: JSON.parse(localStorage.getItem("role")!),
          bankId: [values["_id"]],
        });
        this.authService
          .bankaccdelete(this.deletebankaccform.value)
          .subscribe((res: any) => {
            if (res.error == false) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            }
          });
        this.ngOnInit();
      } else {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    });
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
    const formdata = new FormData();
    formdata.append("imageToStore", this.fileUpload);

    this.authService.s3upload(formdata).subscribe((res: any) => {
      if (res.error == false) {
        this.setIntoForm(res.data.Location, fileName);
      }
    });
  }

  capitalize = (s: any) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  bankadminrequest() {
    this.authService.bankadminrequest(this.paymentForm.value);
    this.paymentForm = this.formBuilder.group({
      userType: JSON.parse(localStorage.getItem("role")!),
      userId: JSON.parse(localStorage.getItem("userId")!),
      bankName: ["", Validators.required],
      iban: ["", Validators.required],
      accountNumber: ["", Validators.required],
    });
    this.ngOnInit();
    // this.authService.sendbankadminrequest(this.bankreqForm.value);
  }

  makedefaultshipping(id:any) {
    
    this.setdefaultshipping = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      addressId: [id],
    });
    this.authService
      .shippingdefault(this.setdefaultshipping.value)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.toastr.success("Success ", res.message);
          this.getAllShipping();
        } else {
          this.toastr.warning("Enter valid ", res.message);
        }
      });
  }

  openpay() {
    this.popuppay = true;
  }

  cancelOpe() {
    this.popuppay = !this.popuppay;
  }

  addmoney() {
    localStorage.setItem(
      "paymentMethod",
      JSON.stringify(this.addmoneyform.value.paymentMethod)
    );
    localStorage.setItem("redirection", JSON.stringify("wallet"));
    if (
      this.addmoneyform.value.paymentMethod == "" ||
      this.addmoneyform.value.amount == ""
    ) {
      this.toastr.warning("Please Fill the card type and Amount");
    } else {
      this.authService.addmoneytowallet(this.addmoneyform.value);
    }
  }

  generateArray(obj: any) {
    return Object.keys(obj!).map((key) => {
      return { key: key, value: obj[key] };
    });
  }

  capitalizeFirstLetter(strings: any) {
    return strings.charAt(0).toUpperCase() + strings.slice(1);
  }

  getAllShipping() {
    this.authService.getAllSippingAddress().subscribe((res: any) => {
      this.shippingaddress = res.data;
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
    return true;
}
openModal() {
  this.display = "block";
}
onCloseHandled() {
  this.display = "none";
  // this.specialrequestform.reset();
}
}
