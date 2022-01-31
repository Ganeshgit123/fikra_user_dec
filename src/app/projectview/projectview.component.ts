import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { OwlOptions } from "ngx-owl-carousel-o";
import { AuthService } from "../shared/auth.service";
import { AngularCsv } from "angular-csv-ext/dist/Angular-csv";
import { ClipboardService } from "ngx-clipboard";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { ToastrService } from "ngx-toastr";
import { ViewportScroller } from "@angular/common";
import { interval } from "rxjs";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: "app-projectview",
  templateUrl: "./projectview.component.html",
  styleUrls: ["./projectview.component.css"],
})
export class ProjectviewComponent implements OnInit {
  @ViewChild('myModalClose') modalClose: any;
  ReadMore: boolean = true;
  links: any[] = ["link1.com", "link2.com", "link3.com"];
  //hiding info box
  visible: boolean = false;
  list: any;
  displayMode: number | undefined;
  popup: any;
  popup1: any;
  popup2: any;
  popupwr: any;
  projectpreview: any;
  shippingaddress: any;
  rewardId: any;
  pledgeAmount: any;
  shipid: any;
  showreward: any;
  mail: any;
  lastdate: any;
  // pledgeform: any;
  pledgewalletform: any;
  verifyshipform: any;
  display = "none";
  submitted = false;
  featOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    pullDrag: true,
    dots: false,
    margin: 50,
    navSpeed: 700,
    navText: [
      '<i class="fas fa-arrow-left"></i>',
      '<i class="fas fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 2,
      },
      940: {
        items: 3,
      },
    },
    nav: true,
  };
  followform: any;
  params: any;
  currentdate: any;
  projectdate: any;
  faqaskform: any;
  btnVal = "Button";
  faqgetquestion: any;
  selectedadd = false;
  getupdates: any;
  faqansform: any;
  faqdeleteform: any;
  commentdeleteform: any;
  valueChange = false;
  faqstatuschange: any;
  backerpostform: any;
  getcomment: any;
  creatorcommentform: any;
  creatorupdateform: any;
  profileimg: any;
  profileImage: any;
  updatecommentform: any;
  updatedeleteform: any;
  updatecommentdeleteform: any;
  updatelikeform: any;
  userId: any;
  test: any;
  remindmeform: any;
  mailText: any;
  reportprojectform: any;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "500px",
    placeholder: "Enter text here...",
  };
  isCopied: any;
  currenturl: any;
  getcity: any;
  dir: any;
  cardpay: any;
  cardpay1: any;
  buskiades: any;
  buskiadesar: any;
  busarndesar: any;
  busarndes: any;
  addcityform: any;
  walletstatus: any;
  walletamt: any;
  percent: any;
  VAT: any;
  processing_Fees: any;
  keepItAllCommissionper: any;
  allAreNothingCommissionper: any;
  calvat: any;
  caltotalal: any;
  calvatwr: any;
  caltotalalwr: any;
  methodpayed: any;
  noShipping = false;
  popuppay = false;
  pledgeamt: any;
  date1: any;
  date2: any;
  projectpreviewvideo: any;
  videourl: any;
  addmoneyform = this.formBuilder.group({
    userId: JSON.parse(localStorage.getItem("userId")!),
    userType: JSON.parse(localStorage.getItem("role")!),
    amount: ["", Validators.required],
    paymentMethod: ["", Validators.required],
  });
  pledgeform = this.formBuilder.group({
    userId: JSON.parse(localStorage.getItem("userId")!),
    userType: JSON.parse(localStorage.getItem("role")!),
    projectId: ["", Validators.required],
    pledgeAmount: ["", Validators.required],
    rewardId: ["", Validators.required],
    paymentMethod: ["", Validators.required],
    sippingAddress: ["", Validators.required],
    processing_Fees_Percent: ["", Validators.required],
    processing_Fees: ["", Validators.required],
    VAT_Percent: ["", Validators.required],
    VAT: ["", Validators.required],
    paymentModel_Percent: ["", Validators.required],
    paymentModel: ["", Validators.required],
    totalAmount: ["", Validators.required],
  });
  calproces: any;
  caltotal: any;
  calkeep: any;
  calallrnot: any;
  calproceswr: any;
  caltotalwr: any;
  calkeepwr: any;
  calallrnotwr: any;
  userid: any;
  discount: any;
  originalvalue: any;
  totalshow: any;
  profileLogo: any;
  followers: any;
  finialshow: any;
  contentLan: any = {};
  featurelastper: any = [];
  featurelastpercentage: number | undefined;
  takinglastper: any = [];
  takinglastpercentage: any = [];
  featureamountPleadged: any;
  featurepercentage: any;
  featuregoalAmount: any;
  inter: any;
  luncont: any;
  userver: any;
  getinvestorform: any;
  data: any = [];
  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _clipboardService: ClipboardService,
    private toastr: ToastrService,
    private _vps: ViewportScroller,
    private sanitizer: DomSanitizer,
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
    this.userver = JSON.parse(localStorage.getItem("userId")!);
    this.dir = localStorage.getItem("dir") || "ltr";
    this.userid = this.readLocalStorageValue("userId");
    this.localprojectid(), 600;
    // this.profileImage = localStorage.getItem('profileImage');
    //   if(this.profileImage !== 'undefined'){
    //     this.profileimg = JSON.parse(localStorage.getItem('profileImage')!);
    //   }
    this.currenturl = this.router.url;
    this.userId = JSON.parse(localStorage.getItem("userId")!);
    this.route.params.subscribe((params) => {
      this.params = params.id;
    });

    this.faqaskform = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      projectId: this.params,
      question: ["", Validators.required],
    });

    this.faqansform = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      projectId: this.params,
      answer: ["", Validators.required],
      // faqId:['', Validators.required],
    });

    this.faqdeleteform = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      projectId: this.params,
      // faqId:['', Validators.required],
    });

    this.faqstatuschange = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      projectId: this.params,
      _isVisibleToUser_: ["", Validators.required],
      // faqId:['', Validators.required],
    });

    this.backerpostform = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      projectId: this.params,
      comments: ["", Validators.required],
    });

    this.creatorcommentform = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      projectId: this.params,
      comments: ["", Validators.required],
      commentId: ["", Validators.required],
    });

    this.commentdeleteform = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      projectId: this.params,
      commentId: ["", Validators.required],
    });

    this.creatorupdateform = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      projectId: this.params,
      updateTitle: ["", Validators.required],
      updateMessage: ["", Validators.required],
    });

    this.updatecommentform = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      projectId: this.params,
      updatePostId: ["", Validators.required],
      comment: ["", Validators.required],
    });

    this.updatedeleteform = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      projectId: this.params,
      updatesId: ["", Validators.required],
    });

    this.updatecommentdeleteform = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      projectId: this.params,
      updatesId: ["", Validators.required],
      commentId: ["", Validators.required],
    });
    this.addcityform = this.formBuilder.group({
      creatorcity: [""],
    });
    this.updatelikeform = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      projectId: this.params,
      updatePostId: ["", Validators.required],
    });

    this.reportprojectform = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      projectId: this.params,
      reportComment: ["", Validators.required],
    });

    this.remindmeform = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      projectId: this.params,
    });
    this.authService.getcreateproject().subscribe((res: any) => {
      this.buskiades = res.data.model[0].business_KIA_Desc;
      this.busarndes = res.data.model[0].business_AON_Desc;
      this.buskiadesar = res.data.model[0].business_KIA_Desc_Ar;
      this.busarndesar = res.data.model[0].business_AON_Desc_Ar;
    });
    this.displayMode = 1;
    this.authService.projectpreview().subscribe((res: any) => {
      //
      this.projectpreview = res.data;
      this.projectpreviewvideo = res.data.basicInfoId.projectVideo;
      // console.log("withoutsant",this.projectpreviewvideo )
      this.videourl = this.sanitizer.bypassSecurityTrustResourceUrl(res.data.basicInfoId.projectVideo);
      // console.log("san",this.videourl ) 
      this.profileLogo =
        this.projectpreview.userId && this.projectpreview.userId["profileImage"]
          ? this.projectpreview.userId["profileImage"]
          : "assets/image/avatar-placeholder.png";
      this.showreward = res.data.rewardTableId;
      this.discount = res.data.rewardTableId;
      this.discount.forEach((value: any, key: any) => {
        this.originalvalue = (value.amount * value.discountAmount) / 100;
        this.totalshow = value.amount - Math.round(this.originalvalue);

        this.finialshow = +this.totalshow + +this.pledgeform.value.pledgeAmount;
      });

      // Math.floor(
      //   (this.pledgeform.value.pledgeAmount * this.VAT) / 100
      // );
      //  this.pledgeform.patchValue({
      //   rewardId: this.showreward.rewardId,
      //   pledgeAmount: this.showreward.pledgeAmount,
      // });
      this.currentdate = new Date();
      this.projectdate = new Date(this.projectpreview.basicInfoId.launchDate);
      var Days = Math.abs(this.projectdate - this.currentdate);
      if (this.projectdate <= this.currentdate) {
        // console.log("bye")
        this.lastdate = "0";
      } else { this.lastdate = Math.ceil(Days / (1000 * 60 * 60 * 24)); }


      this.featuregoalAmount = this.projectpreview.basicInfoId.goalAmount;

      this.featureamountPleadged = this.projectpreview._amount_Pleadged_;
      this.featurepercentage =
        this.featureamountPleadged / this.featuregoalAmount;
      var totPercent = this.featurepercentage * 100;
      // console.log("lastda",totPercent)
      if (totPercent >= 100) {
        this.featurelastper = 100;
      } else {
        this.featurelastper = totPercent;
      }
      this.featurelastpercentage = totPercent;

      var second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24, week = day * 7;
      this.date1 = this.currentdate;
      this.date2 = this.projectdate;
      if (this.lastdate <= 1) {
        var timediff = this.date2 - this.date1;
        this.inter = "hours";
      } else {
        var timediff = this.date2 - this.date1;
        this.inter = "days";
      }
      switch (this.inter) {
        case "days": this.inter = Math.floor(timediff / day)
          this.luncont = this.contentLan.DAYSTOGO || "days to go";
          break;
        case "minutes": this.inter = Math.floor(timediff / minute);
          break;
        case "hours": this.inter = "Ending Today"
          this.luncont = "";
          break;
        default: return undefined;
      }

    });
    this.authService.creatorfaqget().subscribe((res: any) => {
      this.faqgetquestion = res.data;
      this.faqansform.patchValue({
        answer: this.faqgetquestion.answer,
      });
    });
    this.authService.getprojectcomments().subscribe((res: any) => {
      this.getcomment = res;
    });
    this.authService.getprojectupdates().subscribe((res: any) => {
      this.getupdates = res;
    });

    if (this.userid) {
      this.authService.getwalletstatus().subscribe((res: any) => {
        this.walletstatus = res.data._history_;
        this.walletamt = res.data.walletAmount;
      });
    }

    this.authService.percentage().subscribe((res: any) => {
      this.VAT = res.data.VAT;
      this.processing_Fees = res.data.processing_Fees;
      this.keepItAllCommissionper = res.data.keepItAllCommission;
      this.allAreNothingCommissionper = res.data.allAreNothingCommission;
    });
    this.authService.followerlist().subscribe((res: any) => {
      this.followers = res.data;
    });
    this.authService.getprojectupdates().subscribe((res: any) => {
      this.test = res;
    });
    this.list = [
      {
        category: "Product Design",
        location: "Khobar",
        title: "Yellostack - Web-App",
        content:
          " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy",
        author: "By Michael Murdock",
        pledged: "5200 SAR pledged",
        funded: "170%funded",
        time: "49hours to go",
      },
      {
        category: "Product Design",
        location: "Khobar",
        title: "Yellostack - Web-App",
        content:
          " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy",
        author: "By Michael Murdock",
        pledged: "5200 SAR pledged",
        funded: "170%funded",
        time: "49hours to go",
      },
      {
        category: "Product Design",
        location: "Khobar",
        title: "Yellostack - Web-App",
        content:
          " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy",
        author: "By Michael Murdock",
        pledged: "5200 SAR pledged",
        funded: "170%funded",
        time: "49hours to go",
      },
    ];
  }
  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;
  }

  copy(text: string) {
    this._clipboardService.copy(text);
  }
  localprojectid() {
    this.route.params.subscribe((params) => {
      this.params = params.id;
    });
    localStorage.setItem("projectid", JSON.stringify(this.params));
  }
  readLocalStorageValue(key: string): string {
    return JSON.parse(localStorage.getItem(key)!);
  }
  status: number = 0;
  onAsk() {
    this.authService.faqask(this.faqaskform.value);
  }

  toggleVideo() {
    //this.videoplayer.nativeElement.play();
  }

  Onfaqans(id: any) {
    const postData = this.faqansform.value;
    postData["faqId"] = id;
    this.authService.faqanscreator(postData);
    // this.authService.faqanscreator(this.faqansform.value);
  }

  Onfaqdel(id: any) {
    const postData = this.faqdeleteform.value;
    postData["faqId"] = id;
    this.authService.faqdeleteanswer(this.faqdeleteform.value);
  }
  Onfaqcreatorstactus(id: any) {
    const postData = this.faqstatuschange.value;
    postData["faqId"] = id;
    this.authService.faqstatuseanswer(this.faqstatuschange.value);
  }
  onValueChange(value: boolean) {
    this.valueChange = value;
  }
  onclick() {
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible = !this.visible;
  }
  Postcomment() {
    this.authService.backerpostcomment(this.backerpostform.value);
  }
  CreatorPostcomment() {
    this.authService.creatorpostcomment(this.creatorcommentform.value);
  }
  Creatordeletecomment() {
    this.authService.creatorcommentdelete(this.commentdeleteform.value);
  }
  copytoast() {
    this.toastr.success("Copied Successfully");
  }
  Onupdatecreator() {
    this.authService.creatorupdatepost(this.creatorupdateform.value);
  }

  Onupdatecreatorcomment() {
    this.authService.backerpostupdatecomment(this.updatecommentform.value);
  }
  Onupdatedelete() {
    this.authService.creatorupdatedelete(this.updatedeleteform.value);
  }

  Onupdatecmtdelete() {
    this.authService.creatorcmtupdatedelete(this.updatecommentdeleteform.value);
  }

  Onupdatelike() {
    this.authService.updatelike(this.updatelikeform.value);
  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
    this.reportprojectform.reset();
  }
  get f() { return this.reportprojectform.controls; }

  Onreportproject() {
    this.submitted = true;
    if (this.reportprojectform.invalid) {
      return;
    }
    const data = this.reportprojectform.value;
    this.authService.reportproject(data).subscribe((res: any) => {
      if (res.error == false) {
        this.onCloseHandled()
        // this.modalClose.nativeElement.click();
        this.toastr.success('Success ', 'Send To Admin Successfully');
        // this.reportprojectform.reset();

      } else {
        this.toastr.warning('Enter valid ', res.message);
      }
    });
  }

  Onremindme() {
    this.authService.remdinme(this.remindmeform.value);
    this.ngOnInit();
  }
  click(value: any) {
    this.selectedadd = true;
    this.shipid = value._id;
  }
  unclick(value: any) {
    this.selectedadd = false;
  }
  pledgewithoutreward() {
    if (this.pledgeform.value.pledgeAmount >= 1) {
      this.popupwr = true;
    }
    this.pledgeamt = this.pledgeform.value.pledgeAmount;
    this.calvatwr = Math.floor(
      (this.pledgeform.value.pledgeAmount * this.VAT) / 100
    );
    this.calproceswr = Math.floor(
      (this.pledgeform.value.pledgeAmount * this.processing_Fees) / 100
    );
    this.calkeepwr = Math.floor(
      (this.pledgeform.value.pledgeAmount * this.keepItAllCommissionper) / 100
    );
    this.calallrnotwr = Math.floor(
      (this.pledgeform.value.pledgeAmount * this.allAreNothingCommissionper) /
      100
    );
    this.caltotalwr =
      +this.calvatwr +
      +this.calproceswr +
      +this.pledgeform.value.pledgeAmount +
      +this.calkeepwr;
    this.caltotalalwr =
      +this.calvatwr +
      +this.calproceswr +
      +this.pledgeform.value.pledgeAmount +
      +this.calallrnotwr;
  }
  rewardpopu(reward: any) {
    if (reward["sippingType"] == "NO Shipping(Digital copy only)") {
      this.popup1 = true;
      this.authService.getAllSippingAddress().subscribe((res: any) => {
        this.shippingaddress = res.data;
      });

      (this.pledgeAmount = [reward["amount"]]),
        (this.rewardId = [reward["_id"]]);
      this.calvat = Math.floor((this.pledgeAmount * this.VAT) / 100);
      this.calproces = Math.floor(
        (this.pledgeAmount * this.processing_Fees) / 100
      );
      this.calkeep = Math.floor(
        (this.pledgeAmount * this.keepItAllCommissionper) / 100
      );
      this.calallrnot = Math.floor(
        (this.pledgeAmount * this.allAreNothingCommissionper) / 100
      );
      this.caltotal =
        +this.calvat + +this.calproces + +this.pledgeAmount + +this.calkeep;
      this.caltotalal =
        +this.calvat + +this.calproces + +this.pledgeAmount + +this.calallrnot;

      this.noShipping = true;
    } else {

      this.verifyshipform = this.formBuilder.group({
        userId: JSON.parse(localStorage.getItem("userId")!),
        userType: JSON.parse(localStorage.getItem("role")!),
        rewardId: [reward["_id"]],
      });
      this.authService
        .verifyshipreward(this.verifyshipform.value)
        .subscribe((res: any) => {
          if (res.verificationStatus == false) {
            this.popup2 = true;
            this.popup1 = false;
            this.authService.getcities().subscribe((res: any) => {
              this.getcity = res.data;
            });
          } else {
            this.popup1 = true;
            this.authService.getAllSippingAddress().subscribe((res: any) => {
              this.shippingaddress = res.data;
              (this.pledgeAmount = [reward["amount"]]),
                (this.rewardId = [reward["_id"]]);
              this.calvat = Math.floor((this.pledgeAmount * this.VAT) / 100);
              this.calproces = Math.floor(
                (this.pledgeAmount * this.processing_Fees) / 100
              );
              this.calkeep = Math.floor(
                (this.pledgeAmount * this.keepItAllCommissionper) / 100
              );
              this.calallrnot = Math.floor(
                (this.pledgeAmount * this.allAreNothingCommissionper) / 100
              );
              this.caltotal =
                +this.calvat +
                +this.calproces +
                +this.pledgeAmount +
                +this.calkeep;
              this.caltotalal =
                +this.calvat +
                +this.calproces +
                +this.pledgeAmount +
                +this.calallrnot;
            });

            (this.pledgeAmount = [reward["amount"]]),
              (this.rewardId = [reward["_id"]]);
          }
        });
    }
  }
  followcreator(value: any) {
    this.followform = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      creatorId: [value],
    });
    this.authService.followpost(this.followform.value);
    this.ngOnInit();
    if (this.projectpreview._is_Followed == true) {
      this.projectpreview._is_Followed == false;
    } else {
      this.projectpreview._is_Followed == true;
    }
  }
  Onpledge() {
    localStorage.setItem("redirection", JSON.stringify("pledge"));
    if (this.projectpreview._is_Keep_It_All_ == true) {
      this.caltotal =
        +this.calvat + +this.calproces + +this.pledgeAmount + +this.calkeep;
      this.pledgeform = this.formBuilder.group({
        userId: JSON.parse(localStorage.getItem("userId")!),
        userType: JSON.parse(localStorage.getItem("role")!),
        projectId: this.params,
        pledgeAmount: this.pledgeAmount,
        rewardId: this.rewardId,
        paymentMethod: this.methodpayed,
        sippingAddress: this.shipid,
        processing_Fees_Percent: this.processing_Fees,
        processing_Fees: this.calproces,
        VAT_Percent: this.VAT,
        VAT: this.calvat,
        paymentModel_Percent: this.keepItAllCommissionper,
        paymentModel: this.calkeep,
        totalAmount: this.caltotal,
      });
      this.pledgeform.value.paymentMethod;
      this.authService.pledgereward(this.pledgeform.value);
    } else {
      this.caltotalal =
        +this.calvat + +this.calproces + +this.pledgeAmount + +this.calallrnot;
      this.pledgeform = this.formBuilder.group({
        userId: JSON.parse(localStorage.getItem("userId")!),
        userType: JSON.parse(localStorage.getItem("role")!),
        projectId: this.params,
        pledgeAmount: this.pledgeAmount,
        rewardId: this.rewardId,
        paymentMethod: this.methodpayed,
        sippingAddress: this.shipid,
        processing_Fees_Percent: this.processing_Fees,
        processing_Fees: this.calproces,
        VAT_Percent: this.VAT,
        VAT: this.calvat,
        paymentModel_Percent: this.allAreNothingCommissionper,
        paymentModel: this.calallrnot,
        totalAmount: this.caltotalal,
      });
      this.pledgeform.value.paymentMethod;
      this.authService.pledgereward(this.pledgeform.value);
    }
  }

  //withoutrewardpledge
  Onpledgewithoutreward() {
    localStorage.setItem("redirection", JSON.stringify("pledge"));
    if (this.projectpreview._is_Keep_It_All_ == true) {
      this.pledgeform = this.formBuilder.group({
        userId: JSON.parse(localStorage.getItem("userId")!),
        userType: JSON.parse(localStorage.getItem("role")!),
        projectId: this.params,
        pledgeAmount: this.pledgeamt,
        paymentMethod: this.methodpayed,
        processing_Fees_Percent: this.processing_Fees,
        processing_Fees: this.calproceswr,
        VAT_Percent: this.VAT,
        VAT: this.calvatwr,
        paymentModel_Percent: this.keepItAllCommissionper,
        paymentModel: this.calkeepwr,
        totalAmount: this.caltotalwr,
      });
      this.pledgeform.value.paymentMethod;
      this.authService.pledgereward(this.pledgeform.value);
    } else {
      // this.caltotalalwr =
      //   +this.calvatwr +
      //   +this.calproceswr +
      //   +this.pledgeAmount +
      //   +this.calallrnotwr;
      this.pledgeform = this.formBuilder.group({
        userId: JSON.parse(localStorage.getItem("userId")!),
        userType: JSON.parse(localStorage.getItem("role")!),
        projectId: this.params,
        pledgeAmount: this.pledgeamt,
        paymentMethod: this.methodpayed,
        processing_Fees_Percent: this.processing_Fees,
        processing_Fees: this.calproceswr,
        VAT_Percent: this.VAT,
        VAT: this.calvatwr,
        paymentModel_Percent: this.allAreNothingCommissionper,
        paymentModel: this.calallrnotwr,
        totalAmount: this.caltotalalwr,
      });
      this.pledgeform.value.paymentMethod;
      this.authService.pledgereward(this.pledgeform.value);
    }
  }

  paywalletwithoutreward() {
    if (this.projectpreview._is_Keep_It_All_ == true) {
      this.caltotal =
        +this.calvat + +this.calproces + +this.pledgeAmount + +this.calkeep;
      this.pledgewalletform = this.formBuilder.group({
        userId: JSON.parse(localStorage.getItem("userId")!),
        userType: JSON.parse(localStorage.getItem("role")!),
        projectId: this.params,
        pledgeAmount: this.pledgeamt,
        paymentMethod: "WALLET",
        processing_Fees_Percent: this.processing_Fees,
        processing_Fees: this.calproceswr,
        VAT_Percent: this.VAT,
        VAT: this.calvatwr,
        paymentModel_Percent: this.keepItAllCommissionper,
        paymentModel: this.calkeepwr,
        totalAmount: this.caltotalwr,
      });
      this.authService.pledgerewardwallet(this.pledgewalletform.value);
    } else {
      this.caltotalal =
        +this.calvat + +this.calproces + +this.pledgeAmount + +this.calallrnot;
      this.pledgewalletform = this.formBuilder.group({
        userId: JSON.parse(localStorage.getItem("userId")!),
        userType: JSON.parse(localStorage.getItem("role")!),
        projectId: this.params,
        pledgeAmount: this.pledgeamt,
        paymentMethod: "WALLET",
        processing_Fees_Percent: this.processing_Fees,
        processing_Fees: this.calproceswr,
        VAT_Percent: this.VAT,
        VAT: this.calvatwr,
        paymentModel_Percent: this.allAreNothingCommissionper,
        paymentModel: this.calallrnotwr,
        totalAmount: this.caltotalalwr,
      });
      this.authService.pledgerewardwallet(this.pledgewalletform.value);
    }
  }

  paywallet() {
    localStorage.setItem("redirection", JSON.stringify("walletpledge"));
    if (this.projectpreview._is_Keep_It_All_ == true) {
      this.caltotal =
        +this.calvat + +this.calproces + +this.pledgeAmount + +this.calkeep;
      this.pledgewalletform = this.formBuilder.group({
        userId: JSON.parse(localStorage.getItem("userId")!),
        userType: JSON.parse(localStorage.getItem("role")!),
        projectId: this.params,
        pledgeAmount: this.pledgeAmount,
        rewardId: this.rewardId,
        paymentMethod: "WALLET",
        sippingAddress: this.shipid,
        processing_Fees_Percent: this.processing_Fees,
        processing_Fees: this.calproces,
        VAT_Percent: this.VAT,
        VAT: this.calvat,
        paymentModel_Percent: this.keepItAllCommissionper,
        paymentModel: this.calkeep,
        totalAmount: this.caltotal,
      });
      this.authService.pledgerewardwallet(this.pledgewalletform.value);
    } else {
      this.caltotalal =
        +this.calvat + +this.calproces + +this.pledgeAmount + +this.calallrnot;
      this.pledgewalletform = this.formBuilder.group({
        userId: JSON.parse(localStorage.getItem("userId")!),
        userType: JSON.parse(localStorage.getItem("role")!),
        projectId: this.params,
        pledgeAmount: this.pledgeAmount,
        rewardId: this.rewardId,
        paymentMethod: "WALLET",
        sippingAddress: this.shipid,
        processing_Fees_Percent: this.processing_Fees,
        processing_Fees: this.calproces,
        VAT_Percent: this.VAT,
        VAT: this.calvat,
        paymentModel_Percent: this.allAreNothingCommissionper,
        paymentModel: this.calallrnot,
        totalAmount: this.caltotalal,
      });
      this.authService.pledgerewardwallet(this.pledgewalletform.value);
    }
  }

  // datae = [
  //   {
  //     _id: "6149aaf55e4ec709dc0dd06b",
  //     backedInvestorId: {
  //       _is_Pledged_Count_: 18,
  //       _id: "61177a843e36fc3558a41f63",
  //       country: "Saudi",
  //       city: "Riyadh",
  //       street: "Allabe",
  //       mobileNumber: "504278039",
  //       email: "liai.pasupathi@gmail.com",
  //     },
  //   },
  //   {
  //     _id: "6149aaf55e4ec709dc0dd06b",
  //     backedInvestorId: {
  //       _is_Pledged_Count_: 98,
  //       _id: "61177a843e36fc3558a41f63",
  //       country: "Saudi",
  //       city: "Riyadh",
  //       street: "Allabe",
  //       mobileNumber: "504278039",
  //       email: "pasupathi@gmail.com",
  // name : "pasupathi"
  //     },
  //   },
  // ];

  // data=[this.datae[1].backedInvestorId.email,
  // this.datae[0].backedInvestorId.street,
  // this.datae[0].backedInvestorId.city,
  // this.datae[0].backedInvestorId.country,
  // this.datae[1].backedInvestorId._is_Pledged_Count_,];
  // data = [
  //   {
  //     name: "Test 1",
  //     age: 13,
  //     average: 8.2,
  //     approved: true,
  //     description: "using 'Content here, content here' ",
  //   },
  //   {
  //     name: "Test 2",
  //     age: 11,
  //     average: 8.2,
  //     approved: true,
  //     description: "using 'Content here, content here' ",
  //   },
  //   {
  //     name: "Test 4",
  //     age: 10,
  //     average: 8.2,
  //     approved: true,
  //     description: "using 'Content here, content here' ",
  //   },
  // ];
  getdata() {
    let obj = {
      name: "",
      email: '',
      country: '',
      city: '',
      street: '',
      mobile: "",
      //reward: "",
      role: ""
    };

    this.authService
      .getinvestordetail()
      .subscribe((res: any) => {
        if (res.error == false) {
          this.toastr.success(res.message);

          res.data.forEach((element: any) => {
            if (element.backedInvestorId != null) {
              obj = {
                name: element.backedInvestorId.fullName,
                email: element.backedInvestorId.email,
                country: element.backedInvestorId.country,
                city: element.backedInvestorId.city,
                street: element.backedInvestorId.street,
                mobile: element.backedInvestorId.mobileNumber,
                //reward: element.backedInvestorId.rewardName,
                role: element.backedInvestorId._userRole_
              }
            }
          });


          this.data.push(obj)
          this.filedownload();
          console.log("down", this.data)
        } else {
          this.toastr.warning(res.message);
        }
      });
  }
  filedownload() {
    // this.getdata()
    var options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalseparator: ".",
      showLabels: true,
      showTitle: true,
      title: "Investor Details",
      useBom: true,
      noDownload: false,
      headers: ["Name", "Email", "Country", "City", "Street", "Mobile Number", "Reward Name", "Role"],
      useHeader: false,
      nullToEmptyString: true,
    };


    new AngularCsv(this.data, "report", options);
  }
  // filedownloads(){
  //   this.getdata()
  //   var myInterval = setInterval(() => this.filedownload(), 1800);
  //   clearInterval(myInterval),2000;

  // }

  saveform: any;
  //function
  scrollFn(anchor: string): void {
    this._vps.scrollToAnchor(anchor);
  }
  addtolike() {
    this.saveform = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      projectId: this.params,
    });
    this.authService
      .addlikeproject(this.saveform.value)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.toastr.success(res.message);
          this.ngOnInit()
        } else {
          this.toastr.warning(res.message);
        }
      });
  }
  addtosave() {
    this.saveform = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      projectId: this.params,
    });
    this.authService
      .addsaveproject(this.saveform.value)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.toastr.success(res.message);
          this.ngOnInit()
        } else {
          this.toastr.warning(res.message);
        }
      });
  }
  mailMe() {
    this.mail = JSON.parse(localStorage.getItem("email")!);
    this.mailText =
      "mailto:" +
      this.mail +
      "?subject=City Request&body=" +
      this.addcityform.value.creatorcity +
      "";
    window.location.href = this.mailText;
  }
  openpay() {
    this.popuppay = true;
  }

  addmoney() {
    localStorage.setItem(
      "paymentMethod",
      JSON.stringify(this.addmoneyform.value.paymentMethod)
    );
    localStorage.setItem("redirection", JSON.stringify("wallet"));
    this.authService.addmoneytowallet(this.addmoneyform.value);
  }
  notuser() {
    // this.toastr.info('Please Login to Access');
  }
  getpaym() {
    localStorage.setItem(
      "paymentMethod",
      JSON.stringify(this.pledgeform.value.paymentMethod)
    );
    this.methodpayed = this.pledgeform.value.paymentMethod;
  }

  editprojectredirect(value: any) {
    this.router.navigate(['/projectinner/' + value + '/projectoverview/basic']);
  }
}
