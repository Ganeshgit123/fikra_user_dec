import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-verifypayment',
  templateUrl: './verifypayment.component.html',
  styleUrls: ['./verifypayment.component.css']
})
export class VerifypaymentComponent implements OnInit {
  checkstatusform:any;
  checkstatusformbill:any;
  checkstatuspledgebill:any;
  redirection:any;
  dir: any;
  isSuccess = false;
  loading = true;
  transactionId: any;
  contentLan: any = {};
  constructor(   private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    ) { }
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
    // this.updatewalletsuccess();
    // this.updatebillsuccess();
    this.redirection = JSON.parse(localStorage.getItem('redirection')!);
    this.updatestatus();
    if (this.redirection == 'wallet'){
      this.updatewalletsuccess()
     }if (this.redirection == 'pledge'){
       this.checkoutpledge()
     }if (this.redirection == 'bill'){
       this.updatebillsuccess()
     }
     if (this.redirection == 'walletpledge'){
      // this.updatebillsuccess()
      this.router.navigate(['/mypledge']);
    }
    // if (this.redirection == 'activity'){
    //   // this.updatebillsuccess()
    //   this.router.navigate(['/activity']);
    // }
  }

  updatestatus(){

  }

  updatewalletsuccess(){
    this.checkstatusform =this.formBuilder.group({
      checkoutId:  JSON.parse(localStorage.getItem('checkoutId')!),
      userId:JSON.parse(localStorage.getItem('userId')!),
      userType:JSON.parse(localStorage.getItem('role')!),
      paymentMethod:JSON.parse(localStorage.getItem('paymentMethod')!),
      transactionId:JSON.parse(localStorage.getItem('transactionId')!),
    });
    this.transactionId = JSON.parse(localStorage.getItem('transactionId')!)
    this.authService.updatewalletsuccess(this.checkstatusform.value)
    .subscribe((res: any) => {
      if (res.error == false) {
        this.loading = false;
        setTimeout(()=>{
          this.router.navigate(["/account/6"]);
        }, 5000)
        this.toastr.success("", res.message);
        this.isSuccess= true;
      } else {
        this.loading = false;
        this.toastr.warning("", res.message);
        this.isSuccess= false;
      }
    });
  }
  updatebillsuccess(){
    this.checkstatusformbill =this.formBuilder.group({
      checkoutId:  JSON.parse(localStorage.getItem('checkoutId')!),
      userId:JSON.parse(localStorage.getItem('userId')!),
      userType:JSON.parse(localStorage.getItem('role')!),
      paymentMethod:JSON.parse(localStorage.getItem('paymentMethod')!),
      transactionId:JSON.parse(localStorage.getItem('transactionId')!),
    });
    this.transactionId = JSON.parse(localStorage.getItem('transactionId')!)
    this.authService.updatebillstatussuccess(this.checkstatusformbill.value)
    .subscribe((res: any) => {
      if (res.error == false) {
        this.isSuccess= true;
        this.loading = false;
        setTimeout(()=>{
          this.router.navigate(["/activity"]);
        }, 5000)
        this.toastr.success("Success ", res.message);
      } else {
        this.isSuccess= false;
        this.loading = false;
        this.toastr.warning("", res.message);
      }
    });
  }
  checkoutpledge(){
    this.checkstatuspledgebill =this.formBuilder.group({
      checkoutId:  JSON.parse(localStorage.getItem('checkoutId')!),
      status:true,
      // userId:JSON.parse(localStorage.getItem('userId')!),
      // userType:JSON.parse(localStorage.getItem('role')!),
      paymentMethod:JSON.parse(localStorage.getItem('paymentMethod')!),
      // transactionId:JSON.parse(localStorage.getItem('transactionId')!),
    });
    this.transactionId = JSON.parse(localStorage.getItem('checkoutId')!)
    this.authService.checkoutpayment(this.checkstatuspledgebill.value)
    .subscribe((res: any) => {
      if (res.error == false) {
        this.isSuccess= true;
        this.loading = false;
        setTimeout(()=>{
          this.router.navigate(["/mypledge"]);
        }, 5000)
        this.toastr.success("Success ", res.message);
      } else {
        this.isSuccess= false;
        this.loading = false;
        this.toastr.warning("", res.message);
      }
    });
  }
}

