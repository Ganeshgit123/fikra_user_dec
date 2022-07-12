import { Injectable, Injector } from "@angular/core";
import { User } from "./user";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Basic } from "./basic";
import { Story } from "./story";
import { People } from "./people";
import { Reward } from "./reward";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment.prod";
import { Account } from "./account";
import { CoreEnvironment } from "@angular/compiler/src/compiler_facade_interface";
// import { AnyAaaaRecord } from 'dns';
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  }),
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  endpoint = environment.baseUrl;
  getendpoint = environment.baseUrl;
  paymenturl = "https://eu-prod.oppwa.com/v1/paymentWidgets.js?";
  // endpoint: string = 'https://fikra.app/api/user';
  // endpoint: string = 'http://127.0.0.1:8080/user'
  headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Access-Control-Allow-Origin", "*")
    .set("Access-Control-Allow-Credentials", "true");
  currentUser = {};
  toaster: any;
  Users: any = [];
  list!: any;
  Value: any;
  productid: any;
  params: any;
  projectid: any;
  creator: any;
  checkoutId: any;
  role: any;
  id: any;
  constructor(
    private http: HttpClient,
    public router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private injector: Injector
  ) { }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/investor/investorRegistration`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  signUpCreator(user: any): Observable<any> {
    let api = `${this.endpoint}/creatorRegistration`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/commonLogin`, user)
  }
  signIncreator(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/commonLogin`, user)
      .subscribe((res: any) => {
        if (res._is_email_verified_ === false) {
          // this.router.navigate(['/verify']);
          // this.showSuccess();
          this.toastr.warning(res.message);
        }
        if (res.error === true) {
          this.router.navigate(["/login" + res.message]);
          this.toastr.warning("", res.message);
        }
        if (res._is_email_verified_ === true) {
          localStorage.setItem("access_token", res.token);
          localStorage.setItem("userId", JSON.stringify(res.userId));
          localStorage.setItem("role", JSON.stringify(res.role));
          // localStorage.setItem('_is_admin_arroved_', JSON.stringify(res._is_admin_arroved_));
          localStorage.setItem(
            "_is_email_verified_",
            JSON.stringify(res._is_email_verified_)
          );
          localStorage.setItem(
            "profileImage",
            JSON.stringify(res.profileImage)
          );
          localStorage.setItem("email", JSON.stringify(res.email));
          this.router.navigate(["/"]);
          this.showSuccess();
        }
      });
  }
  forgetpassword(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/sentActiveLinkforResetPassword`, user)
    // .subscribe((res: any) => {
    //   // this.router.navigate(['/login']);
    //   if (res.error == false) {
    //     this.toastr.success(res.message);
    //     // this.router.navigate(['/login']);
    //   } else {
    //     this.router.navigate(["/account-recovery" + res.message]);
    //     this.toastr.warning("Enter valid ", res.message);
    //   }
    // });
  }
  mobileotp(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/investor/verifyMobileOtp`, user)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.router.navigate(["/account/1"]);
          this.toastr.success(res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }
  sendmobileotp(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/investor/sendOtpToMobile`, user)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.toastr.success(res.message);
        } else {
          this.router.navigate(["/account-recovery" + res.message]);
          this.toastr.warning("", res.message);
        }
      });
  }

  shippingadd(user: User) {
    return this.http.post<any>(`${this.endpoint}/setting/addAddress`, user);
  }
  // verifyusername(user: any) {
  //   return this.http.post<any>(
  //     `${this.endpoint}/verifyUserNameAvailable`,
  //     user
  //   );
  // }


  verifyusername(user: any) {
    console.log(user)
    return this.http.get(`${this.endpoint}/getUserNameVerifyed`, {
      params: user
    });
  }

  resendotpemail(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/investor/resendOtpEmail`, user)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.toastr.success("Successfully", res.message);
        } else {
          this.router.navigate(["/account-recovery" + res.message]);
          this.toastr.warning("", res.message);
        }
      });
  }
  savebiography(user: User) {
    return this.http.post<any>(
      `${this.endpoint}/investor/addUserBiography`,
      user
    );
  }

  savewebsiteurl(user: User) {
    return this.http.post<any>(`${this.endpoint}/investor/addUserWebURL`, user);
  }

  deleteRequest(data: User) {
    return this.http.post<any>(`${this.endpoint}/deleteAccountRequest`, data);
  }

  updatemobilenumber(user: User) {
    return this.http
      .put<any>(`${this.endpoint}/investor/verifyMobileOtpandUpdate`, user)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.showSuccess();
        } else {
          this.router.navigate(["/account-recovery" + res.message]);
          this.toastr.warning("", res.message);
        }
      });
  }

  // getUserProfile(_id: any) {
  //   throw new Error('Method not implemented.');
  // }

  getToken() {
    return localStorage.getItem("access_token");
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem("access_token");
    return authToken !== null ? true : false;
  }
  //   get isAdmin() {
  //     return this.isLoggedIn && this.role === "creator";
  // }
  //   get role(): any {
  //     let _is_admin_arroved_ = localStorage.getItem('_is_admin_arroved_');
  //     return _is_admin_arroved_ !== null ? true : false;
  //   }
  get Role() {
    this.role = JSON.parse(localStorage.getItem("role")!);
    return this.role;
  }

  doLogout(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/creatorLogout`, user)
      .subscribe((res: any) => {
        let removeToken = localStorage.removeItem("access_token");
        let removeuser = localStorage.removeItem("userId");
        let removeusertype = localStorage.removeItem("role");
        let removeisemailverified = localStorage.removeItem("_is_email_verified_");
        let removeisemail = localStorage.removeItem("email");
        let removeisImage = localStorage.removeItem("profileImage");
        let removeprojectid = localStorage.removeItem("projectid");
        let removetranskey = localStorage.removeItem("transkey");
        if (removeToken == null) {
          removeuser;
          removeusertype;
          removeisemailverified;
          removeisemail;
          removeisImage;
          removeprojectid;
          removetranskey;
          window.location.reload();
          this.router.navigate(["/"]);
        }
      });
  }

  // autologoout(){
  //   let param1=new HttpParams()
  //     .set('email', JSON.parse(localStorage.getItem('email')!));
  //   return this.http.get<any>(`${this.endpoint}/getSesstion`, { params: param1 })

  // }
  // User profile
  // getUserProfile(id: any): Observable<any> {
  //   let api = `${this.endpoint}/user-profile/${id}`;
  //   return this.http.get(api, { headers: this.headers }).pipe(
  //     map((res: Response) => {
  //       return res || {}
  //     }),
  //     catchError(this.handleError)
  //   )
  // }
  prfimg(event: any) {
    return this.http
      .post<any>(`${this.endpoint}/setting/addProfileImage`, event)
      .subscribe((res: any) => {
        if (res.error == false) {
          // let param1 = res;
          // console.log('basic',res.data_id)
          //  JSON.parse(localStorage.getItem('userId')!);
          if (res.data._userRole_ == "investor") {
            localStorage.setItem(
              "profileImage",
              JSON.stringify(res.data.investorImage)
            );
          } else {
            localStorage.setItem(
              "profileImage",
              JSON.stringify(res.data.profileImage)
            );
          }

          this.toastr.success("Success ", res.message);
          window.location.reload();
          // this.router.navigate(['/projectinner/'+param1+'/projectoverview']);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }
  basic(basic: any) {
    return this.http
      .post<any>(`${this.endpoint}/saveBasicInfo`, basic)
      .subscribe((res: any) => {
        if (res.error == false) {
          let param1 = res.data._id;
          // console.log('basic', res.data_id);
          //  JSON.parse(localStorage.getItem('userId')!);
          this.toastr.success("Success ", res.message);
          this.router.navigate([
            "/projectinner/" + param1 + "/projectoverview/basic",
          ]);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }
  basicedit(basic: any) {
    return this.http
      .put<any>(`${this.endpoint}/updateBasicInfo`, basic)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.toastr.success("Success ", res.message);
          let param1 = JSON.parse(localStorage.getItem("projectid")!);

          // this.router.navigateByUrl('../rewards');
          this.router.navigate([
            "/projectinner/" + param1 + "/projectoverview/rewards",
          ]);
        } else {
          this.toastr.warning("", res.message);
        }

        // this.getUserProfile(res._id).subscribe((res) => {
        //   this.currentUser = res;
        //   this.router.navigate(['/' + res.msg._id]);
        // })
      });
  }
  projectdelete(basic: Basic) {
    return this.http
      .put<any>(`${this.endpoint}/user_ProjectDelete`, basic)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.toastr.success("Success ", res.message);
          this.router.navigate(["/"]);
        } else {
          this.toastr.warning("", res.message);
        }

        // this.getUserProfile(res._id).subscribe((res) => {
        //   this.currentUser = res;
        //   this.router.navigate(['/' + res.msg._id]);
        // })
      });
  }
  story(story: Story) {
    return this.http
      .post<any>(`${this.endpoint}/saveStory`, story)
      .subscribe((res: any) => {
        if (res.error == false) {
          let param1 = JSON.parse(localStorage.getItem("projectid")!);
          //  console.log(param1);
          this.router.navigate([
            "/projectinner/" + param1 + "/projectoverview/payment",
          ]);
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }
  storyedit(story: Story) {
    return this.http
      .put<any>(`${this.endpoint}/updateStory`, story)
      .subscribe((res: any) => {
        if (res.error == false) {
          let param1 = JSON.parse(localStorage.getItem("projectid")!);
          //  console.log(param1);
          this.router.navigate([
            "/projectinner/" + param1 + "/projectoverview/payment",
          ]);
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }
  people(people: People) {
    return this.http
      .post<any>(`${this.endpoint}/savePeople`, people)
      .subscribe((res: any) => {
        if (res.error == false) {
          // this.router.navigate(['./people']);
          this.toastr.success("Success ", res.message);
        } else {
          // this.showWarning();
          this.toastr.warning("", res.message);
        }
        // this.router.navigate(['./promotion']);
        // this.getUserProfile(res._id).subscribe((res) => {
        //   this.currentUser = res;
        //   this.router.navigate(['/' + res.msg._id]);
        // })
      });
  }
  reward(reward: Reward) {
    return this.http
      .post<any>(`${this.endpoint}/saveReward`, reward)
      .subscribe((res: any) => {
        // console.log('rewardop', res);
        if (res.error == false) {
          let param1 = JSON.parse(localStorage.getItem("projectid")!);
          // console.log(param1);
          this.router.navigate([
            "/projectinner/" + param1 + "/projectoverview/story",
          ]);
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  postPayment(payment: any) {
    return this.http
      .post<any>(`${this.endpoint}/savePayment`, payment)
      .subscribe((res: any) => {
        console.log(res);
        if (res.error == false) {
          let param1 = JSON.parse(localStorage.getItem("projectid")!);
          this.router.navigate([
            "/projectinner/" + param1 + "/projectoverview/promotion",
          ]);
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  pledgereward(reward: any) {
    console.log("hello", reward);
    return this.http
      .post<any>(`${this.endpoint}/pledgeAProject`, reward)
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        // console.log('checkout',res);
        if (res.error == false) {
          this.toastr.success("Success ", res.message);
          localStorage.setItem(
            "checkoutId",
            JSON.stringify(res.data.checkoutId)
          );
          localStorage.setItem(
            "transactionId",
            JSON.stringify(res.transactionId)
          );
          this.router.navigate(["/paymentcard"]);
          // console.log('checkout', res);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }
  pledgerewardwallet(reward: any) {
    console.log("hello", reward);
    return this.http
      .post<any>(`${this.endpoint}/pledgeAProjectUsingWallet`, reward)
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        // console.log('checkout',res);
        if (res.error == false) {
          this.toastr.success("Success ", res.message);
          // localStorage.setItem(
          //   'checkoutId',
          //   JSON.stringify(res.data.checkoutId)
          // );
          // localStorage.setItem(
          //   'transactionId',
          //   JSON.stringify(res.transactionId)
          // );
          this.router.navigate(["/mypledge"]);
          // console.log('checkout', res);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }
  verifyshipreward(reward: any) {
    return this.http.post<any>(
      `${this.endpoint}/rewardValidationForShipping`,
      reward
    );
  }

  checkoutpayment(reward: any) {
    return this.http
      .post<any>(`${this.endpoint}/checkoutValidation`, reward)
  }

  paymentreward() {
    let params1 = new HttpParams().set(
      "checkoutId",
      JSON.parse(localStorage.getItem("checkoutId")!)
    );

    return this.http
      .get<any>(`${this.paymenturl}`, { params: params1 })
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        // console.log('checkout',res);
        if (res.error == false) {
          this.toastr.success("Success ", res.message);
          localStorage.setItem(
            "checkoutId",
            JSON.stringify(res.data.checkoutId)
          );

          this.router.navigate(["/tell-your-story"]);
          // console.log('checkout', res);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  rewardedit(reward: Reward) {
    return this.http
      .put<any>(`${this.endpoint}/updateReward`, reward)
      .subscribe((res: any) => {
        // console.log('rewardop', res);
        if (res.error == false) {
          let param1 = JSON.parse(localStorage.getItem("projectid")!);
          // console.log(param1);
          this.router.navigate([
            "/projectinner/" + param1 + "/projectoverview/story",
          ]);
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }
  rewarddelete(reward: Reward) {
    return this.http
      .put<any>(`${this.endpoint}/deleteReward`, reward)
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        if (res.error == false) {
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }
  addaddress(account: Account) {
    return this.http
      .post<any>(`${this.endpoint}/setting/addAddress`, account)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }
  // Project Faq
  faqask(reward: any) {
    return this.http
      .post<any>(`${this.endpoint}/postFAQQuestion`, reward)
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        if (res.error == false) {
          window.location.reload();
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }
  // Project Faq
  faqanscreator(reward: any) {
    return this.http
      .post<any>(`${this.endpoint}/postFAQAnswer`, reward)
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        if (res.error == false) {
          // window.location.reload();
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }
  // Project Faq
  faqdeleteanswer(reward: any) {
    return this.http
      .post<any>(`${this.endpoint}/deleteProjectFAQ`, reward)
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        if (res.error == false) {
          // window.location.reload();
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }
  // Project Faq
  faqstatuseanswer(reward: any) {
    return this.http
      .post<any>(`${this.endpoint}/updateFAQAnswerStatus`, reward)
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        if (res.error == false) {
          // window.location.reload();
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }
  backerpostcomment(reward: any) {
    return this.http
      .post<any>(`${this.endpoint}/postProjectComments`, reward)
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        if (res.error == false) {
          // window.location.reload();
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  creatorpostcomment(reward: any) {
    return this.http
      .post<any>(`${this.endpoint}/updateProjectComments`, reward)
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        if (res.error == false) {
          // window.location.reload();
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  creatorcommentdelete(reward: any) {
    return this.http
      .post<any>(`${this.endpoint}/deleteProjectComments`, reward)
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        if (res.error == false) {
          // window.location.reload();
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  creatorupdatepost(reward: any) {
    return this.http
      .post<any>(`${this.endpoint}/postProjectUpdates`, reward)
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        if (res.error == false) {
          // window.location.reload();
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  backerpostupdatecomment(reward: any) {
    return this.http
      .post<any>(`${this.endpoint}/commentProjectUpdates`, reward)
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        if (res.error == false) {
          // window.location.reload();
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  creatorupdatedelete(reward: any) {
    return this.http
      .post<any>(`${this.endpoint}/deleteProjectUpdates`, reward)
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        if (res.error == false) {
          // window.location.reload();
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  creatorcmtupdatedelete(reward: any) {
    return this.http
      .post<any>(`${this.endpoint}/removeCommentProjectUpdates`, reward)
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        if (res.error == false) {
          // window.location.reload();
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  updatelike(reward: any) {
    return this.http
      .post<any>(`${this.endpoint}/likeProjectUpdates`, reward)
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        if (res.error == false) {
          // window.location.reload();
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }
  followpost(reward: any) {
    return this.http
      .post<any>(`${this.endpoint}/followUser`, reward)
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        if (res.error == false) {
          // window.location.reload();
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }


  reportproject(reward: Reward) {
    return this.http.post<any>(`${this.endpoint}/investor/postReportAboutProject`, reward);
  }

  remdinme(reward: any) {
    return this.http
      .post<any>(`${this.endpoint}/setRemainMe`, reward)
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        if (res.error == false) {
          this.toastr.success("Success ", res.message);
          // window.location.reload();
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  shippingdelete(user: any) {
    return this.http
      .post<any>(`${this.endpoint}/setting/deleteAddress`, user)
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        if (res.error == false) {
          this.toastr.success("Success ", res.message);
          // window.location.reload();
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  bankaccdelete(user: any) {
    return this.http
      .post<any>(`${this.endpoint}/deleteBankDetails`, user)
  }

  shippingdefault(user: any) {
    return this.http
      .post<any>(`${this.endpoint}/makeAddressDefault`, user)
  }

  getadminpayment(user: any) {
    return this.http.post<any>(
      `${this.endpoint}/getTrasactionDetailsForProject`,
      user
    );
  }
  getrewardpayment(user: any) {
    return this.http.post<any>(`${this.endpoint}/getPledgedByRewardId`, user);
  }

  userprofile(): Observable<User[]> {
    let param1 = new HttpParams()
      .set("userId", JSON.parse(localStorage.getItem("userId")!))
      .set("role", JSON.parse(localStorage.getItem("role")!));

    return this.http.get<User[]>(
      `${this.endpoint}/investor/get_account_details`,
      { params: param1 }
    );
  }

  userprofileview(): Observable<User[]> {
    // console.log("auth",value)

    let param1 = new HttpParams()
      .set("userId", localStorage.getItem("viewid")!)
      .set("role", "creator");
    // console.log("checkparam",param1)
    return this.http.get<User[]>(
      `${this.endpoint}/investor/get_account_details`,
      { params: param1 }
    );
  }

  userprofileviewWithout(Value: any, Value1: any): Observable<User[]> {
    let param1 = new HttpParams()
      .set("userId", Value)
      .set("role", Value1);
    return this.http.get<User[]>(
      `${this.endpoint}/investor/get_account_detailsWithoutLogin`,
      { params: param1 }
    );
  }

  category() {
    // let param1 = new HttpParams()
    //   .set('userId', '60bf1a4b07526947b02ab3bd')
    //   .set('userType', 'user');
    return this.http.get(`${this.endpoint}/getallCategories`);
  }
  subcategory() {
    return this.http.get(`${this.getendpoint}/getAllSubCategoriy`);
  }

  subcategoryWithId(catId: any) {
    let param1 = new HttpParams().set("categorieId", catId);
    return this.http.get(`${this.endpoint}/getSubCategoryByCategoryId`, {
      params: param1,
    });
  }

  getinvestordetail() {

    let param1 = new HttpParams().set(
      "porjectId",
      JSON.parse(localStorage.getItem("projectid")!)
    ).set("userId", JSON.parse(localStorage.getItem("userId")!))
      .set("userType", JSON.parse(localStorage.getItem("role")!));
    return this.http.get(`${this.endpoint}/getInvestorForReward`, {
      params: param1,
    });
  }
  projectpreview() {
    let user = JSON.parse(localStorage.getItem("userId")!);
    if (user == null) {
      let param1 = new HttpParams().set(
        "projectId",
        JSON.parse(localStorage.getItem("projectid")!)
      );

      return this.http.get(`${this.endpoint}/getProjectDetails`, {
        params: param1,
      });
    } else {
      let param1 = new HttpParams()
        .set("userId", JSON.parse(localStorage.getItem("userId")!))
        .set("projectId", JSON.parse(localStorage.getItem("projectid")!));

      return this.http.get(`${this.endpoint}/getProjectDetails`, {
        params: param1,
      });
    }
  }
  projectpreviewreward() {
    let param1 = new HttpParams()
      .set("userId", JSON.parse(localStorage.getItem("userId")!))
      .set("userType", JSON.parse(localStorage.getItem("role")!))
      .set("projectId", JSON.parse(localStorage.getItem("projectid")!));

    return this.http.get(`${this.endpoint}/getRewardsDetails`, {
      params: param1,
    });
  }
  creatorfaqget() {
    let param1 = new HttpParams()
      .set("userId", JSON.parse(localStorage.getItem("userId")!))
      .set("userType", JSON.parse(localStorage.getItem("role")!))
      .set("projectId", JSON.parse(localStorage.getItem("projectid")!));

    return this.http.get(`${this.endpoint}/getFAQQuestion`, {
      params: param1,
    });
  }
  getprojectcomments() {
    let param1 = new HttpParams()
      .set("userId", JSON.parse(localStorage.getItem("userId")!))
      .set("userType", JSON.parse(localStorage.getItem("role")!))
      .set("projectId", JSON.parse(localStorage.getItem("projectid")!));

    return this.http.get(`${this.endpoint}/getProjectComments`, {
      params: param1,
    });
  }

  getprojectupdates() {
    let param1 = new HttpParams()
      .set("userId", JSON.parse(localStorage.getItem("userId")!))
      .set("userType", JSON.parse(localStorage.getItem("role")!))
      .set("projectId", JSON.parse(localStorage.getItem("projectid")!));

    return this.http.get(`${this.endpoint}/getProjectUpdates`, {
      params: param1,
    });
  }

  specialrequest(reward: Reward) {
    return this.http.post<any>(`${this.endpoint}/sendSpecialRequestToAdmin`, reward);
  }

  visitnotification(user: any) {
    // console.log("check",user);
    return this.http
      .post<any>(`${this.endpoint}/isVisitedNotification`, user)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.toastr.success("Success ", res.message);
          // window.location.reload();
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }
  deletenotification(user: any) {
    // console.log('delete', user);
    return this.http
      .post<any>(`${this.endpoint}/deleteNotification`, user)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.toastr.success("Success ", res.message);
          // window.location.reload();
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  s3upload(user: any): Observable<any> {
    let apis3 = `https://fikra.app/api/admin/postImagetoS3`;
    return this.http.post(apis3, user).pipe(catchError(this.handleError));
  }

  s3uploadvideo(user: any): Observable<any> {
    let apis3 = `https://fikra.app/api/admin/postVideotoS3`;
    return this.http.post(apis3, user).pipe(catchError(this.handleError));
  }
  addsaveproject(user: any) {
    return this.http
      .post<any>(`${this.endpoint}/addToSavedProject`, user)
  }

  addlikeproject(user: any) {
    return this.http
      .post<any>(`${this.endpoint}/addToLinkedProject`, user)
  }

  projectadminrequest(reward: Reward) {
    return this.http
      .post<any>(`${this.endpoint}/sendRequestToAdmin`, reward)
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        if (res.error == false) {
          this.toastr.success("Success ", res.message);
          this.router.navigate(["/activity"]);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  // bankadminrequest(reward: Reward) {
  //   return this.http
  //     .post<any>(`${this.endpoint}/creatorBankDetailsEdit`, reward)
  //     .subscribe((res: any) => {
  //       // console.log('rewardop',res)
  //       if (res.error == false) {
  //         this.toastr.success("Success ", res.message);
  //         this.router.navigate(["/"]);
  //       } else {
  //         this.toastr.warning("", res.message);
  //       }
  //     });
  // }addNewBankAccount
  bankadminrequest(reward: Reward) {
    return this.http
      .post<any>(`${this.endpoint}/addNewBankAccount`, reward)
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        if (res.error == false) {
          this.toastr.success("Success ", res.message);
          // this.router.navigate(["/"]);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  sendbankadminrequest(reward: Reward) {
    return this.http
      .post<any>(`${this.endpoint}/sendBankRequestToAdmin`, reward)
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        if (res.error == false) {
          this.toastr.success("Success ", res.message);
          // this.router.navigate(["/"]);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  contactusrequest(user: User) {
    return this.http.post<any>(`${this.endpoint}/postContactMessage`, user);
  }
  applyjobrequest(fd: any) {
    return this.http.post<any>(`${this.endpoint}/applyNewJob`, fd);
  }
  // account(){
  //   let param1= new HttpParams()
  //   .set('userId', JSON.parse(localStorage.getItem('userId')!))
  //   .set('userType',"user");
  //    return this.http.get(`${this.endpoint}/setting/get_Account`,{params:param1});
  // }

  homenewsletter(user: any) {
    return this.http
      .post<any>(`${this.endpoint}/investor/subscribeNewsletter`, user)
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        if (res.error == false) {
          this.toastr.success("Success ", res.message);
          // window.location.reload();
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  notificationstatusupdate(user: any) {
    return this.http
      .post<any>(`${this.endpoint}/updateNotification`, user)
      .subscribe((res: any) => {
        // console.log('rewardop',res)
        if (res.error == false) {
          this.toastr.success("Success ", res.message);
          // window.location.reload();
        } else {
          this.toastr.warning(res.message);
        }
      });
  }

  //profileedit
  profileedit(user: User) {
    // console.log('useredit',user);
    return this.http
      .put<any>(`${this.endpoint}/investor/investorDetailsEdit`, user)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  creatoredit(user: User) {
    return this.http.put<any>(`${this.endpoint}/creatorDetailsEdit`, user);
  }

  userfeedbackfaq(user: User) {
    return this.http
      .put<any>(`${this.endpoint}/investor/putFAQUserFeedback`, user)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }
  makemeascreator(user: User) {
    return this.http
      .put<any>(`${this.endpoint}/investor/req_to_admin_for_make_creator`, user)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.toastr.success(res.message);
          window.location.reload();
        } else {
          this.toastr.warning(res.message);
        }
      });
  }
  passwordedit(user: User) {
    return this.http
      .put<any>(`${this.endpoint}/investor/update_Account_password`, user)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.toastr.success("Success ", res.message);
          this.doLogout(user);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }
  emailedit(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/investor/editEmailForUser`, user)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.toastr.success("Success ", res.message);
          this.doLogout(user);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  verifymail(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/investor/verifyActiveLink`, user)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.router.navigate(["/login"]);
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  verifymobile(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/verifyMobileLink`, user)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.router.navigate(["/login"]);
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }
  verifymailnewsletter(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/investor/verifyNewletterMail`, user)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.router.navigate(["/"]);
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  verifyfgpassword(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/updatePasswordWithResetCode`, user)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.router.navigate(["/login"]);
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  posthelpquestion(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/postAQuestion`, user)
      .subscribe((res: any) => {
        if (res.error == false) {
          // this.router.navigate(['/login']);
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  addmoneytowallet(user: User) {
    // console.log('wallettest',user);
    return this.http
      .post<any>(`${this.endpoint}/addMoneyToWallet`, user)
      .subscribe((res: any) => {
        if (res.error == false) {
          localStorage.setItem("checkoutId", JSON.stringify(res.checkoutId));
          localStorage.setItem(
            "transactionId",
            JSON.stringify(res.transactionId)
          );
          this.router.navigate(["/paymentcard"]);
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }
  makePaymentForBill(user: User) {
    // console.log('test',user);
    return this.http
      .post<any>(`${this.endpoint}/makePaymentForBill`, user)
      .subscribe((res: any) => {
        if (res.error == false) {
          localStorage.setItem("checkoutId", JSON.stringify(res.checkoutId));
          localStorage.setItem(
            "transactionId",
            JSON.stringify(res.transactionId)
          );
          this.router.navigate(["/paymentcard"]);
          this.toastr.success("Success ", res.message);
        } else {
          this.toastr.warning("", res.message);
        }
      });
  }

  updatewalletsuccess(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/updateSuccessStatusForMoney`, user)
  }

  updatebillstatussuccess(user: User) {
    this.router.navigate(["/activity"]);
    return this.http
      .post<any>(`${this.endpoint}/updateStatusFroBill`, user)
  }
  //privacypolicy
  singupfield(): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.getendpoint}/investor/getUserProfileCreationField`
    );
  }
  singupfieldcreator(): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.getendpoint}/investor/getCreatorProfileCreationField`
    );
  }
  // listproject(): Observable<User[]> {
  //   return this.http.get<User[]>(
  //     `${this.endpoint}/investor/getProjectswithFilters`
  //   );
  // }
  homeapi(): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.getendpoint}/investor/getHomePageContent`
    );
  }
  careercontent(): Observable<User[]> {
    return this.http.get<User[]>(`${this.getendpoint}/getCareerContentUser`);
  }
  homecreative(): Observable<User[]> {
    return this.http.get<User[]>(`${this.getendpoint}/getCreativeIndepentent`);
  }
  startaproject(): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.getendpoint}/investor/getStartProjectContent`
    );
  }
  footer(): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.getendpoint}/investor/getFooterContent`
    );
  }
  country(): Observable<User[]> {
    return this.http.get<User[]>(`${this.getendpoint}/investor/getAllCountry`);
  }
  city(value: any): Observable<any> {
    // console.log('countryID', value);
    let param = new HttpParams().set("countryId", value);

    return this.http.get<any>(
      `${this.getendpoint}/investor/getAllCityByCountryId`,
      { params: param }
    );
  }
  categoryIdWithSubCateg(value: any): Observable<any> {
    // console.log('countryID', value);
    let param = new HttpParams().set("categorieId", value);

    return this.http.get<any>(
      `${this.getendpoint}/getSubCategoryByCategoryId`,
      { params: param }
    );
  }
  carrerdetail(value: any): Observable<any> {
    // console.log('countryID', value);
    let param = new HttpParams().set("branchId", value);

    return this.http.get<any>(`${this.getendpoint}/getBranchDetailsUserById`, {
      params: param,
    });
  }
  advancesearchapi(value: any): Observable<any> {
    let user = JSON.parse(localStorage.getItem("userId")!);
    if (user == null) {

      let param = new HttpParams().set("queryString", value).
        set("userId", "")
        .set("userType", "");

      return this.http.get<any>(`${this.getendpoint}/getAdvanceSearch`, {
        params: param,
      }

      );
    } else {
      let param = new HttpParams().set("queryString", value).
        set("userId", JSON.parse(localStorage.getItem("userId")!))
        .set("userType", JSON.parse(localStorage.getItem("role")!));

      return this.http.get<any>(`${this.getendpoint}/getAdvanceSearch`, {
        params: param,
      }

      );
    }
  }

  recommendededatas(
    value: any,
    value1: any,
    value2: any,
    value3: any,
    value4: any
  ): Observable<any> {
    let user = JSON.parse(localStorage.getItem("userId")!);
    if (user == null) {

      let param = new HttpParams()
        .set("categories", value)
        .set("tags", value1)
        .set("sort", value2)
        .set("city", value3)
        .set("subCategory", value4)
        .set("userId", "")
        .set("userType", "");
      return this.http.get<any>(
        `${this.getendpoint}/investor/getProjectswithFilters`,
        { params: param }
      );
    } else {
      let param = new HttpParams()
        .set("categories", value)
        .set("tags", value1)
        .set("sort", value2)
        .set("city", value3)
        .set("subCategory", value4)
        .set("userId", JSON.parse(localStorage.getItem("userId")!))
        .set("userType", JSON.parse(localStorage.getItem("role")!));
      return this.http.get<any>(
        `${this.getendpoint}/investor/getProjectswithFilters`,
        { params: param }
      );
    }
  }

  aboutdetails(): Observable<User[]> {
    let param1 = new HttpParams()
      .set("userId", JSON.parse(localStorage.getItem("userId")!))
      .set("userType", JSON.parse(localStorage.getItem("role")!));

    return this.http.get<User[]>(
      `${this.endpoint}/investor/getUserAboutDetails`,
      { params: param1 }
    );
  }

  aboutdetailscreator(value: any): Observable<User[]> {
    let param1 = new HttpParams()
      .set("userId", value)
      .set("userType", "creator");

    return this.http.get<User[]>(
      `${this.endpoint}/investor/getUserAboutDetails`,
      { params: param1 }
    );
  }
  // aboutdetailskn(value:any,value1:any): Observable<User[]> {
  //   let param1 = new HttpParams()
  //     .set('userId', value)
  //     .set('userType', value1);

  //   return this.http.get<User[]>(
  //     `${this.endpoint}/investor/getUserAboutDetails`,
  //     { params: param1 }
  //   );
  // }
  getwalletstatus(): Observable<User[]> {
    let param1 = new HttpParams()
      .set("userId", JSON.parse(localStorage.getItem("userId")!))
      .set("userType", JSON.parse(localStorage.getItem("role")!));

    return this.http.get<User[]>(`${this.endpoint}/getWalletInfo`, {
      params: param1,
    });
  }
  // searchapi(): Observable<User[]> {
  //   let param1=new HttpParams()
  //   .set('userId', JSON.parse(localStorage.getItem('userId')!))
  //   .set('userType', JSON.parse(localStorage.getItem('role')!));

  //   return this.http.get<User[]>(`${this.endpoint}/getWalletInfo`, { params: param1 });
  // }
  savedproject(): Observable<User[]> {
    let param1 = new HttpParams()
      .set("userId", JSON.parse(localStorage.getItem("userId")!))
      .set("userType", JSON.parse(localStorage.getItem("role")!));

    return this.http.get<User[]>(`${this.endpoint}/getSavedProject`, {
      params: param1,
    });
  }
  getpledgedetail(): Observable<User[]> {
    let param1 = new HttpParams()
      .set("userId", JSON.parse(localStorage.getItem("userId")!))
      .set("userType", JSON.parse(localStorage.getItem("role")!));

    return this.http.get<User[]>(`${this.endpoint}/getMyPledge`, {
      params: param1,
    });
  }

  likedproject(): Observable<User[]> {
    let param1 = new HttpParams()
      .set("userId", JSON.parse(localStorage.getItem("userId")!))
      .set("userType", JSON.parse(localStorage.getItem("role")!));

    return this.http.get<User[]>(`${this.endpoint}/getLinkedProject`, {
      params: param1,
    });
  }
  deletedproject(): Observable<User[]> {
    let param1 = new HttpParams()
      .set("userId", JSON.parse(localStorage.getItem("userId")!))
      .set("userType", JSON.parse(localStorage.getItem("role")!));

    return this.http.get<User[]>(`${this.endpoint}/getDeletedProject_User`, {
      params: param1,
    });
  }
  specialrequestprojectlist(): Observable<User[]> {
    let param1 = new HttpParams()
      .set("userId", JSON.parse(localStorage.getItem("userId")!))
      .set("userType", JSON.parse(localStorage.getItem("role")!))
      .set("projectId", JSON.parse(localStorage.getItem("projectid")!));

    return this.http.get<User[]>(`${this.endpoint}/getCreatorSpecialRequestUserId`, {
      params: param1,
    });
  }
  followinglist(): Observable<User[]> {
    let param1 = new HttpParams()
      .set("userId", JSON.parse(localStorage.getItem("userId")!))
      .set("userType", JSON.parse(localStorage.getItem("role")!));

    return this.http.get<User[]>(`${this.endpoint}/getFollowingList`, {
      params: param1,
    });
  }
  specialrequestlist(): Observable<User[]> {
    let param1 = new HttpParams()
      .set("userId", JSON.parse(localStorage.getItem("userId")!))
      .set("userType", JSON.parse(localStorage.getItem("role")!));

    return this.http.get<User[]>(`${this.endpoint}/getAllServicesForSR`, {
      params: param1,
    });
  }
  getbill(): Observable<User[]> {
    let param1 = new HttpParams()
      .set("userId", JSON.parse(localStorage.getItem("userId")!))
      .set("userType", JSON.parse(localStorage.getItem("role")!));
    return this.http.get<User[]>(`${this.endpoint}/getAllBillsUser`, {
      params: param1,
    });
  }
  getbillbyid(value: any) {
    return this.http.get(`${this.endpoint}/getBillsByIdUser`, {
      params: value,
    });
  }
  followerlist(): Observable<User[]> {
    let param1 = new HttpParams()
      .set("userId", JSON.parse(localStorage.getItem("userId")!))
      .set("userType", JSON.parse(localStorage.getItem("role")!));

    return this.http.get<User[]>(`${this.endpoint}/getFollowersList`, {
      params: param1,
    });
  }
  requestbycreator(): Observable<User[]> {
    let param1 = new HttpParams()
      .set("userId", JSON.parse(localStorage.getItem("userId")!))
      .set("userType", JSON.parse(localStorage.getItem("role")!));

    return this.http.get<User[]>(`${this.endpoint}/getMyRequests`, {
      params: param1,
    });
  }
  activitycreated(): Observable<User[]> {
    let param1 = new HttpParams()
      .set("userId", JSON.parse(localStorage.getItem("userId")!))
      .set("userType", JSON.parse(localStorage.getItem("role")!));

    return this.http.get<User[]>(`${this.endpoint}/getAllProjectDetails`, {
      params: param1,
    });
  }
  //Helpguide category
  helpguidebyid(value: any): Observable<any> {
    console.log("helpguidid", value);
    let param = new HttpParams().set("ebookId", value);

    return this.http.get<any>(`${this.getendpoint}/getHelpGuideById`, {
      params: param,
    });
  }
  helpguidebyid1(): Observable<User[]> {
    let param1 = new HttpParams().set(
      "ebookId",
      JSON.parse(localStorage.getItem("ebookId")!)
    );

    return this.http.get<User[]>(`${this.endpoint}/getHelpGuideById`, {
      params: param1,
    });
  }
  //Privacy Policy
  privacypolicy(): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.getendpoint}/investor/getPrivacyContent`
    );
  }
  //Faq
  faq(): Observable<User[]> {
    return this.http.get<User[]>(`${this.getendpoint}/investor/getUserFAQ`);
  }
  //Fees
  fikraFees(): Observable<User[]> {
    return this.http.get<User[]>(`${this.getendpoint}/getFikraFees`);
  }
  // Term of Use
  termofuse(): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.getendpoint}/investor/getTermsContent`
    );
  }
  //Cookie Policy
  cookiepolicy(): Observable<any> {
    return this.http.get<any>(`${this.getendpoint}/investor/getCookieContent`);
  }
  //Help Guide
  helpguide(): Observable<any> {
    return this.http.get<any>(`${this.getendpoint}/getAllHelpGuide`);
  }
  //About Us
  aboutus(): Observable<any> {
    return this.http.get<any>(
      `${this.getendpoint}/investor/getAboutContentUser`
    );
  }
  //taglist
  recommendedlist(): Observable<any> {
    return this.http.get<any>(`${this.getendpoint}/listRecommendedList`);
  }
  //citylist
  citylist(): Observable<any> {
    return this.http.get<any>(`${this.getendpoint}/investor/getAllCitysOnly`);
  }
  //percentage
  percentage(): Observable<any> {
    return this.http.get<any>(`${this.getendpoint}/getAllChargesListUSer`);
  }
  branchcontact(): Observable<any> {
    return this.http.get<any>(`${this.getendpoint}/getBranchDetailsUser`);
  }
  enquiry(): Observable<User[]> {
    return this.http.get<User[]>(`${this.getendpoint}/getAllEnquiryUser`);
  }
  joblist(): Observable<any> {
    return this.http.get<any>(`${this.getendpoint}/getAllJobsList`);
  }
  // Continuous Call
  ContinuousCall(): Observable<any> {
    let param1 = new HttpParams().set("email", JSON.parse(localStorage.getItem("email")!)).set("userType", JSON.parse(localStorage.getItem("role")!)).set("userId", JSON.parse(localStorage.getItem("userId")!))
    return this.http.get<any>(`${this.endpoint}/getSesstion`, {
      params: param1,
    }).pipe(catchError(this.logOutWithoutApi));
  }
  //Get Notification
  getnotification(): Observable<any> {
    let param1 = new HttpParams().set(
      "email",
      JSON.parse(localStorage.getItem("email")!)
    );
    return this.http.get<any>(`${this.endpoint}/getNotification`, {
      params: param1,
    });
  }

  // visitnotification(user:any) {
  //   console.log("check",user);
  //   return this.http.post<any>(`${this.endpoint}/isVisitedNotification`,user);
  // }
  // deletenotification(user:any): Observable<any> {
  //   let param1=new HttpParams()
  //     .set('email', JSON.parse(localStorage.getItem('email')!));
  //   return this.http.post<any>(`${this.endpoint}/deleteNotification`, user);
  // }
  //Taking off
  takingoffhome(): Observable<any> {
    let user = JSON.parse(localStorage.getItem("userId")!);
    if (user == null) {
      let param1 = new HttpParams().set("userId", "");
      return this.http.get<any>(
        `${this.getendpoint}/getTakingoffProjects`,
        { params: param1 }
      );
    } else {
      let param1 = new HttpParams()
        .set("userId", JSON.parse(localStorage.getItem("userId")!))
        .set("startIndex", "0")
        .set("endIndex", "10");
      return this.http.get<any>(
        `${this.getendpoint}/getTakingoffProjects`,
        { params: param1 }
      );
    }
  }
  homestretch(): Observable<any> {
    let user = JSON.parse(localStorage.getItem("userId")!);
    if (user == null) {
      let param1 = new HttpParams().set("userId", "");
      return this.http.get<any>(
        `${this.getendpoint}/investor/getHomestetch`,
        { params: param1 }
      );
    } else {
      let param1 = new HttpParams()
        .set("userId", JSON.parse(localStorage.getItem("userId")!))
        .set("startIndex", "0")
        .set("endIndex", "10");
      return this.http.get<any>(
        `${this.getendpoint}/investor/getHomestetch`,
        { params: param1 }
      );
    }

  }
  featureprojecthome(): Observable<any> {
    let user = JSON.parse(localStorage.getItem("userId")!);
    if (user == null) {
      let param1 = new HttpParams().set("userId", "");
      return this.http.get<any>(
        `${this.getendpoint}/getFeatureProjects`,
        { params: param1 }
      );
    } else {
      let param1 = new HttpParams()
        .set("userId", JSON.parse(localStorage.getItem("userId")!))
        .set("startIndex", "0")
        .set("endIndex", "10");
      return this.http.get<any>(
        `${this.getendpoint}/getFeatureProjects`,
        { params: param1 }
      );
    }
    return this.http.get<any>(`${this.getendpoint}/getFeatureProjects`);
  }
  statichomepage(): Observable<any> {
    return this.http.get<any>(
      `${this.getendpoint}/investor/getCountStatusforHomePage`
    );
  }
  gethandbook(): Observable<any> {
    return this.http.get<any>(`${this.getendpoint}/getAllHandbook`);
  }
  getarabic(): Observable<any> {
    return this.http.get<any>(`${this.getendpoint}/getArabicContentUser`);
  }
  getprojectoverview(): Observable<any> {
    return this.http.get<any>(
      `${this.getendpoint}/getProjectRequestPageContent`
    );
  }
  bannerhome(): Observable<any> {
    return this.http.get<any>(
      `${this.getendpoint}/investor/getProjectForHomeBanner`
    );
  }
  gethandbookpage(): Observable<any> {
    let param1 = new HttpParams().set(
      "handBookId",
      JSON.parse(localStorage.getItem("handbook")!)
    );

    return this.http.get(`${this.endpoint}/getHandbookById`, {
      params: param1,
    });
  }
  recommendedprojecthome(): Observable<any> {
    let user = JSON.parse(localStorage.getItem("userId")!);
    if (user == null) {
      let param1 = new HttpParams().set("userId", "");
      return this.http.get<any>(
        `${this.getendpoint}/investor/getRecommenedProjects`,
        { params: param1 }
      );
    } else {
      let param1 = new HttpParams()
        .set("userId", JSON.parse(localStorage.getItem("userId")!))
        .set("startIndex", "0")
        .set("endIndex", "10");
      return this.http.get<any>(
        `${this.getendpoint}/investor/getRecommenedProjects`,
        { params: param1 }
      );
    }
  }
  getjobdetailid(): Observable<any> {
    let param1 = new HttpParams().set(
      "jobId",
      JSON.parse(localStorage.getItem("jobId")!)
    );
    return this.http.get<any>(`${this.getendpoint}/getJobsById`, {
      params: param1,
    });
  }
  //featured project
  featuredhome(): Observable<any> {
    return this.http.get<any>(`${this.getendpoint}/getFeatureProjects`);
  }
  //shipping
  getAllSippingAddress(): Observable<any> {
    let param1 = new HttpParams()
      .set("userId", JSON.parse(localStorage.getItem("userId")!))
      .set("userType", JSON.parse(localStorage.getItem("role")!));
    return this.http.get<any>(`${this.getendpoint}/getAllSippingAddress`, {
      params: param1,
    });
  }

  getnotificationstatus(): Observable<any> {
    let param1 = new HttpParams()
      .set("userId", JSON.parse(localStorage.getItem("userId")!))
      .set("userType", JSON.parse(localStorage.getItem("role")!));
    return this.http.get<any>(`${this.getendpoint}/getNotificationStatus`, {
      params: param1,
    });
  }

  getAllBankaccount(): Observable<any> {
    let param1 = new HttpParams()
      .set("userId", JSON.parse(localStorage.getItem("userId")!))
      .set("userType", JSON.parse(localStorage.getItem("role")!));
    return this.http.get<any>(`${this.getendpoint}/getAllBankDetails`, {
      params: param1,
    });
  }

  getActiveBankaccount(): Observable<any> {
    let param1 = new HttpParams()
      .set("userId", JSON.parse(localStorage.getItem("userId")!))
      .set("userType", JSON.parse(localStorage.getItem("role")!));
    return this.http.get<any>(`${this.getendpoint}/getAllVerifiedBankDetails`, {
      params: param1,
    });
  }

  getprojectbasic(): Observable<any> {
    return this.http.get<any>(`${this.getendpoint}/getProjectBasicPageCMS`);
  }
  getprojectreward(): Observable<any> {
    return this.http.get<any>(`${this.getendpoint}/getProjectRewardPageCMS`);
  }
  getprojectstory(): Observable<any> {
    return this.http.get<any>(`${this.getendpoint}/getProjectStoryPageCMS`);
  }
  getprojectpayment(): Observable<any> {
    return this.http.get<any>(`${this.getendpoint}/getProjectPaymentPageCMS`);
  }
  getprojectpromotion(): Observable<any> {
    return this.http.get<any>(`${this.getendpoint}/getProjectPromotionPageCMS`);
  }
  getcreateproject(): Observable<any> {
    return this.http.get<any>(`${this.getendpoint}/getProjectCreationCMS`);
  }
  getfootercontent(): Observable<any> {
    return this.http.get<any>(`${this.getendpoint}/getFooterLableCMS`);
  }
  getcities(): Observable<any> {
    return this.http.get<any>(`${this.getendpoint}/investor/getAllCitysOnly`);
  }
  getourrules(): Observable<any> {
    return this.http.get<any>(`${this.getendpoint}/getOurRoleCMS`);
  }
  gettrustandsafety(): Observable<any> {
    return this.http.get<any>(`${this.getendpoint}/getTrustSafty`);
  }
  getwhatwedo(): Observable<any> {
    return this.http.get<any>(`${this.getendpoint}/getWhatWeDoCMS`);
  }
  showSuccess() {
    this.toastr.success("Successfully Logged In", "Success");
  }
  showWarning() {
    this.toastr.warning("", "Error");
  }
  transalteFunc(): Observable<any> {
    return this.http.get<any>(`${this.getendpoint}/getArabicContentUser`);
  }
  // public sendGetRequest(): Observable<User[]>{
  //   return this.http.get<User[]>(`${this.endpoint}/user`);
  // }
  // REST_API_SERVER(REST_API_SERVER: any) {
  //   throw new Error('Method not implemented.');
  // }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.status === 401 || error.status === 403) {
        // this.injector.get(UserService).purgeAuth();
        // this.injector.get(ToasterService).showError(`Unauthorized`, errorMsg);
        // this.injector.get(Router).navigateByUrl(`/login`);
        this.router.navigate(["/login"]);
        console.log("errorthrows");
      }

      console.log("error", msg);
    }
    return throwError(msg);
  }

  logOutWithoutApi(error: HttpErrorResponse) {
    let removeToken = localStorage.removeItem("access_token");
    let removeuser = localStorage.removeItem("userId");
    let removeusertype = localStorage.removeItem("role");
    let removeisemailverified = localStorage.removeItem("_is_email_verified_");
    let removeisemail = localStorage.removeItem("email");
    let removeisImage = localStorage.removeItem("profileImage");
    let removeprojectid = localStorage.removeItem("projectid");
    let removetranskey = localStorage.removeItem("transkey");
    if (removeToken == null) {
      removeuser;
      removeusertype;
      removeisemailverified;
      removeisemail;
      removeprojectid;
      removetranskey;
      window.location.reload();
      window.open('/', '_self');
    }
    return throwError(error.error.message);
  }

}


