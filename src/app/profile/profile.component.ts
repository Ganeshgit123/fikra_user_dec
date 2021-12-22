import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../shared/auth.service";
import { ToastrService } from "ngx-toastr";
import Swal, { SweetAlertOptions } from "sweetalert2";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  popup: any;
  popup1: any;
  popup2: any;
  displayMode = 1;
  editform: any;
  about: any;
  profileimg: any;
  webSiteURL: any;
  private fragmentSetDynamically!: string;
  sendmobileform = this.formBuilder.group({
    userId: JSON.parse(localStorage.getItem("userId")!),
    role: JSON.parse(localStorage.getItem("role")!),
    profileStory: [""],
    businessName: [""],
    businessAddress: [""],
    businessType: [""],
    accountNumber: [""],
    iban: [""],
    _is_businuss_exist_: [""],
  });
  savebiographyform = this.formBuilder.group({
    userId: JSON.parse(localStorage.getItem("userId")!),
    userType: JSON.parse(localStorage.getItem("role")!),
    userBio: ["", Validators.required],
    _isUserBio_On_: ["", Validators.required],
  });
  saveweburlform = this.formBuilder.group({
    userId: JSON.parse(localStorage.getItem("userId")!),
    userType: JSON.parse(localStorage.getItem("role")!),
    webSiteURL: ["", Validators.required],
    _isWebURL_On_: ["", Validators.required],
  });
  deleteRequestForm = this.formBuilder.group({
    userId: JSON.parse(localStorage.getItem("userId")!),
    userType: JSON.parse(localStorage.getItem("role")!),
    userEmail: JSON.parse(localStorage.getItem("email")!),
    deleteReson: ["", Validators.required],
  });

  fileUpload: any;
  user!: any;
  some: any;
  profileImage: any;
  alreadyDelete = true;
  imgfile: any;
  dob: any;

  imgprf: any; 
  role!: String;
  bio: any;
  backed: any;
  contentLan: any = {};
  web:any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private http: HttpClient,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

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
    this.role = this.readLocalStorageValue("role");

    // this.savebio();
    this.sendmobileform = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      role: JSON.parse(localStorage.getItem("role")!),
      profileStory: ["", Validators.required],
      businessName: ["", Validators.required],
      businessAddress: ["", Validators.required],
      businessType: ["", Validators.required],
      accountNumber: ["", Validators.required],
      iban: ["", Validators.required],
      _is_businuss_exist_: ["", Validators.required],
      // profileImage : JSON.parse(localStorage.getItem('profileImage')!),
    });
    this.savebiographyform = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      userBio: ["", Validators.required],
      _isUserBio_On_: ["", Validators.required],
    });
    this.saveweburlform = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      webSiteURL: ["", Validators.required],
      _isWebURL_On_: ["", Validators.required],
    });

    this.deleteRequestForm = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      userEmail: JSON.parse(localStorage.getItem("email")!),
      deleteReson: ["", Validators.required],
    });

    // this.profileImage = this.readLocalStorageValue(JSON.stringify('profileImage'));
    this.profileImage = localStorage.getItem("profileImage");
    if (this.profileImage !== "undefined") {
      this.profileimg = JSON.parse(localStorage.getItem("profileImage")!);
    }
    this.authService.userprofile().subscribe((res: any) => {
      this.alreadyDelete = res._isRequstedDelete_
      this.user = res.data.fullName;
      this.dob = res.data.createdAt;
      this.imgprf = res.data.investorImage;
      this.backed = res.data._is_Pledged_Count_;
    });
    this.authService.aboutdetails().subscribe((res: any) => {
      this.about = res.data;
      this.bio = res.data.userBio;
      this.webSiteURL=res.data.webSiteURL;
      this.web =res.data.webSiteURL;
      // console.log("hi",this.web);
      this.savebiographyform.patchValue({
        userBio: this.about.userBio,
        _isUserBio_On_: this.about._isUserBio_On_,
      });
      this.saveweburlform.patchValue({
        webSiteURL: this.about.webSiteURL,
        _isWebURL_On_: this.about._isWebURL_On_,
      });
    });
    // this.authService.prfimg(this.imageuploadform.value);
  }
  readLocalStorageValue(key: string): string {
    
    return JSON.parse(localStorage.getItem(key)!);
  }

  uploadImageFile(event: any) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgfile = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    this.fileUpload = event.target.files[0];

    // this.imgfile=event.target.files[0];
    // console.log("eventimg",this.fileUpload);
    const formdata = new FormData();
    formdata.append("investorImage", this.fileUpload);
    formdata.append("userId", JSON.parse(localStorage.getItem("userId")!));
    formdata.append("userType", JSON.parse(localStorage.getItem("role")!));
    // console.log('prfimgpro',formdata);
    var imgcheck=this.fileUpload.name.split(".").pop();
    if(imgcheck == 'jpg' || imgcheck == 'png' || imgcheck == 'JPG' || imgcheck == 'PNG' || imgcheck == 'JPEG' ||imgcheck == 'jpeg' ){
      if(event.target.files[0].size <= 25600 ){

      this.authService.prfimg(formdata);
      console.log("ssss",imgcheck);
      }else{
        Swal.fire({
          text: "Please select this size image in 160*160",
          icon: "warning",
        });
      }
    } else {
      // this.toastr.warning("Please select this format images (jpg,png,jpeg)");
      Swal.fire({
        text: "Please select this format images (jpg,png,jpeg)",
        icon: "warning",
      });
    }
    // 
  }

  showDateInput = false;

  radioValueCheck(x: any) {
    this.showDateInput = x === 1;
    // console.log('equal',x)
  }
  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;
  }
  gotoprofile() {
    if (this.role == "creator") {
      this.router.navigate(["/account/1"], { fragment: "editform" }); 
    }else{
      this.router.navigate(["/account/7"], { fragment: "editform" }); 
    }
  }
  // imageupload(){
  //   this.authService.imageup(this)
  // }
  checkradio(event: any) {
    console.log("check", event.target.value);
  }
  makemecreator() {
    this.authService.makemeascreator(this.sendmobileform.value);
    // console.log("vale",this.sendmobileform.value._is_businuss_exist_)
  }
  savebio() {
    this.authService
      .savebiography(this.savebiographyform.value)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.toastr.success("Biography status changed");
          this.about = res.data;
          this.bio = res.data.userBio;
          this.savebiographyform.patchValue({
            userBio: this.about.userBio,
            _isUserBio_On_: this.about._isUserBio_On_,
          });
          this.saveweburlform.patchValue({
            webSiteURL: this.about.webSiteURL,
            _isWebURL_On_: this.about._isWebURL_On_,
          });
        } else {
          this.router.navigate(["/account-recovery" + res.message]);
          this.toastr.warning("Enter valid ", res.message);
        }
      });

    this.popup1 = false;
  }

  capitalize = (s: any) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  
  deleteRequest(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire({
          title: 'Enter your reason to delete this account',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Send request to delete',
          showLoaderOnConfirm: true,
          preConfirm: (login) => {
            this.deleteRequestForm.value['deleteReson'] = login;
            this.authService.deleteRequest(this.deleteRequestForm.value).subscribe((res: any) => {
              if(res.error == false){
                swalWithBootstrapButtons.fire(
                  'Request Sent!',
                  'Your request is under process! We will let you know soon :(.',
                  'success'
                ).then(()=> this.ngOnInit())
              }else{
                swalWithBootstrapButtons.fire(
                  'Cancelled',
                  res.message,
                  'error'
                )
              }
            });
          },
          allowOutsideClick: () => !Swal.isLoading()
          })

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your account is safe :)',
          'error'
        )
      }
    })
  }

  savewebsite() {
    this.authService
      .savewebsiteurl(this.saveweburlform.value)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.toastr.success("Website status changed");
          this.about = res.data;
          this.bio = res.data.userBio;
          this.savebiographyform.patchValue({
            userBio: this.about.userBio,
            _isUserBio_On_: this.about._isUserBio_On_,
          });
          this.saveweburlform.patchValue({
            webSiteURL: this.about.webSiteURL,
            _isWebURL_On_: this.about._isWebURL_On_,
          });
        } else {
          this.router.navigate(["/account-recovery" + res.message]);
          this.toastr.warning("Enter valid ", res.message);
        }
      });
    this.popup2 = false;
  }
}
