import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../shared/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  data:any;
  pledgecount:any;
  visible: boolean = false;
  data1:any;
  displayMode= 1;
  getadmincount =0;
  displayModein=1;
  popup:any;
  popup1:any;
  rewardpopup:any;
  role: any;
  lastdate:any;
  created:any;
  value:any;
  billdetail:any;
  billAddress:any;
  billName:any;
  addressOne:any;
  addressTwo:any;
  city:any;
  state:any;
  pin:any;
  phone:any;
  likedata:any;
  saveform:any;
  deletedata:any;
  requestdata:any;
  getbilldata:any;
  IsmodelShow:any;
  billxdate:any;
  getadmin:any;
  invoicedate:any;
  billid:any;
  paymentvisform:any;
  rewardgetform:any;
  getreward:any;
  contentLan: any = {};
  popuppay = false;
  createdcount = 0;
  featuregoalAmount:any;
  featureamountPleadged:any;
  featurepercentage:any;
  likegoalAmount:any;
  likeamountPleadged:any;
  likepercentage:any;
  addmoneyform = this.fb.group({
    userId: JSON.parse(localStorage.getItem('userId')!),
    userType: JSON.parse(localStorage.getItem('role')!),
    billId: '',
    paymentMethod:['',Validators.required]
  });  constructor(  private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private toaster: ToastrService,
    private activatedRoute: ActivatedRoute) { }

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
this.onclick(this.value);
    this.role = this.readLocalStorageValue('role');
    this.authService.activitycreated().subscribe(
    
      (res: any) =>{
       this.created = res;
        this.createdcount = res.data.length;
        this.created.forEach((elementss: any) => {
          this.featuregoalAmount = elementss.basicInfoId.goalAmount;

          this.featureamountPleadged = elementss._amount_Pleadged_;
          this.featurepercentage =
            this.featureamountPleadged / this.featuregoalAmount;
          var totPercent = this.featurepercentage * 100;
          if (totPercent >= 100) {
            elementss.featurelastper = 100;
          } else {
            elementss.featurelastper = totPercent;
          }

          elementss.featurelastpercentage = totPercent;
        });
      }
    );
    this.authService.likedproject().subscribe(
    
      (res: any)=>{
        console.log('like',res);
       this.likedata = res.data;
       this.likedata.forEach((elementss: any) => {
        this.likegoalAmount = elementss.likedProjectId.basicInfoId.goalAmount;

        this.likeamountPleadged = elementss.likedProjectId._amount_Pleadged_;
        this.likepercentage =
          this.likeamountPleadged / this.likegoalAmount;
        var totPercent = this.likepercentage * 100;
        if (totPercent >= 100) {
          elementss.likelastper = 100;
        } else {
          elementss.likelastper = totPercent;
        }

        elementss.likelastpercentage = totPercent;
      });
      }
    );
    this.authService.deletedproject().subscribe(
    
      (res: any)=>{
        // console.log('like',res);
       this.deletedata = res.data;
      }
    );

    this.authService.requestbycreator().subscribe(
    
      (res: any)=>{
        // console.log('requestget',res);
       this.requestdata = res.data;
      }
    );
    this.authService.getbill().subscribe(
      (res: any)=>{
        console.log('getbill',res);
       this.getbilldata = res.data;
      }
    );
  }

  calLikeAPI(){
    this.authService.likedproject().subscribe((res: any) => {
      this.likedata = res.data;
    });
  }

  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;
  }

  onDisplayModeinChange(mode: number): void {
    this.displayModein = mode;
  }

  isDisabled(): boolean {
    var userRole = localStorage.getItem(`role`);

    if (userRole === "creator") {
      return true;
    } else {
      return false;
    }
  }

  readLocalStorageValue(key: string): string {
    return JSON.parse(localStorage.getItem(key)!);
  }

  close() {
    this.IsmodelShow = true; // set false while you need open your model popup
  }

  addtolike(values: any) {
    this.saveform = this.fb.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      projectId: [values],
    });
    this.authService
      .addlikeproject(this.saveform.value)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.calLikeAPI()
        } else {
          this.toaster.warning("Enter valid ", res.message);
        }
      });
  }

  billpopup(value: any) {
    this.popup = true;
    this.billdetail = this.fb.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      billId: [value["_id"]],
    });
    this.authService
      .getbillbyid(this.billdetail.value)
      .subscribe((res: any) => {
        this.billdetail = res.data;
        this.billxdate = new Date(this.billdetail.dueDate);
        this.invoicedate = new Date(this.billdetail.invoiceData);
        var Days = Math.abs(this.invoicedate - this.billxdate);
        this.lastdate = Math.ceil(Days / (1000 * 60 * 60 * 24));
      });
  }
  openpay() {
    this.popuppay = true;
  }

  paybill(value: any) {
    this.popup1 = true;
    this.billid = value["_id"];
    this.billdetail = this.fb.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      billId: [value["_id"]],
    });
    this.authService
      .getbillbyid(this.billdetail.value)
      .subscribe((res: any) => {
        console.log("checkbill", res.data);
        this.billdetail = res.data;
      });
  }

  billpayment() {
    localStorage.setItem("redirection", JSON.stringify("bill"));
    this.addmoneyform.value.billId = this.billid;
    console.log("checkpay", this.addmoneyform.value);
    this.authService.makePaymentForBill(this.addmoneyform.value);
  }
  paywallet() {
    localStorage.setItem("redirection", JSON.stringify("bill"));
    this.addmoneyform.value.billId = this.billid;
    this.addmoneyform.value.paymentMethod = "WALLET";
    // localStorage.setItem("redirection", JSON.stringify("wallet"));
    this.authService.makePaymentForBill(this.addmoneyform.value);
    }
  onclick(value: any) {
    this.visible = !this.visible;
    this.paymentvisform = this.fb.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      // projectId: [value["_id"]],
    });
    this.authService
      .getadminpayment(this.paymentvisform.value)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.getadmin = res.data;
          this.getadmincount =res.data.length;
        } else {
        }
      });
  }

  // addmoney() {
  //   localStorage.setItem(
  //     "paymentMethod",
  //     JSON.stringify(this.addmoneyform.value.paymentMethod)
  //   );
  //   localStorage.setItem("redirection", JSON.stringify("wallet"));
  //   this.authService.addmoneytowallet(this.addmoneyform.value);
  // }

  


  openreward(value: any, datas: any) {
    this.rewardpopup = true;

    this.rewardgetform = this.fb.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      projectId: [datas["_id"]],
      rewardId: [value["_id"]],
    });
    this.authService
      .getrewardpayment(this.rewardgetform.value)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.getreward = res.data;
          this.pledgecount = res.pledgedCount;
        } else {
        }
      });
  }
  capitalize = (s: any) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
}
