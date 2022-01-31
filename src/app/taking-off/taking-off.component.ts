import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../shared/auth.service";
import { ToastrService } from "ngx-toastr";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-taking-off",
  templateUrl: "./taking-off.component.html",
  styleUrls: ["./taking-off.component.css"],
})
export class TakingOffComponent implements OnInit {
  takingoffhome: any;
  params: any;
  contentLan: any = {};
  saveform: any;
  userver: any;
  date1: any;
  date2: any;
  lastdate: any;
  currentdate: any;
  projectdate: any;
  inter: any;
  luncont: any;
  featuregoalAmount: any;
  featureamountPleadged: any;
  featurepercentage: any;
  takingCou = 5;
  takingReduce: any = [];
  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    public fb: FormBuilder
  ) { }
  myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(this.arabicCotent());
    }, 2000);
  });

  async arabicCotent() {
    let sameContent = await JSON.parse(localStorage.getItem("transkey")!);

    const lang = localStorage.getItem("lang") || "en";

    await sameContent.reduce(async (promise: any, elementss: any) => {
      // console.log(elementss)
      if (lang == "en") {
        this.contentLan[elementss.key] = elementss.en;
      } else {
        this.contentLan[elementss.key] = elementss.ar;
      }
      await promise;
    }, Promise.resolve());
  }
  ngOnInit(): void {
    this.userver = JSON.parse(localStorage.getItem("userId")!);

    this.myPromise;

    this.authService.takingoffhome().subscribe((res: any) => {
      if (res.error === false) {
        this.takingoffhome = res.data;
        this.takingReduce = this.paginate(res.data, this.takingCou, 1);
        this.takingoffhome.forEach((elementss: any) => {
          this.featuregoalAmount = elementss.basicInfoId.goalAmount;

          this.featureamountPleadged = elementss._amount_Pleadged_;
          this.featurepercentage =
            this.featureamountPleadged / this.featuregoalAmount;
          var taktotPercent = this.featurepercentage * 100;
          if (taktotPercent >= 100) {
            elementss.takinglastper = 100;
          } else {
            elementss.takinglastper = taktotPercent;
          }
          elementss.categoryName = elementss.basicInfoId.categoryName;
          elementss.subCategoryName = elementss.basicInfoId.subCategoryName;
          elementss.city = elementss.basicInfoId.city;
          elementss.decription = elementss.basicInfoId.decription;
          elementss.projectImage = elementss.basicInfoId.projectImage_Sharp;
          elementss.goalAmount = elementss.basicInfoId.goalAmount;
          elementss.userName = elementss.userId.fullName;
          elementss._is_All_Nothing_ = elementss._is_All_Nothing_;
          elementss._is_Keep_It_All_ = elementss._is_Keep_It_All_;
          elementss.featurelastpercentage = taktotPercent;
        });
        this.takingoffhome.forEach((value: any, key: any) => {
          this.currentdate = new Date();
          this.projectdate = new Date(value.basicInfoId.launchDate);
          var Days = Math.abs(this.projectdate - this.currentdate);
          value.lastdate = Math.ceil(Days / (1000 * 60 * 60 * 24));
          this.lastdate = Math.ceil(Days / (1000 * 60 * 60 * 24));
          var second = 1000,
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24,
            week = day * 7;
          this.date1 = this.currentdate;
          this.date2 = this.projectdate;
          if (this.lastdate <= 1) {
            var timediff = this.date2 - this.date1;
            value.inter = "hours";
          } else {
            var timediff = this.date2 - this.date1;
            value.inter = "days";
          }
          switch (value.inter) {
            case "days":
              value.inter = Math.floor(timediff / day);
              value.luncont = "days to go";
              break;
            case "minutes":
              value.inter = Math.floor(timediff / minute);
              break;
            case "hours":
              value.inter = Math.floor(timediff / hour);
              value.luncont = "hours to go";
              break;
            default:
              return undefined;
          }
        });
      }
    });
  }

  paginate(array: string | any[], page_size: number, page_number: number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  paginationNext() {
    this.takingCou += 5;
    this.takingReduce = this.paginate(
      this.takingoffhome,
      this.takingCou,
      1
    );
    this.ngOnInit();
  }
  paginationLess() {
    this.takingCou = 5;
    this.takingReduce = this.paginate(
      this.takingoffhome,
      this.takingCou,
      1
    );
    this.ngOnInit();
  }


  localprojectid() {
    this.route.params.subscribe((params) => {
      this.params = params.id;
      //  console.log(params.id)
    });
    localStorage.setItem("projectid", JSON.stringify(this.params));
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
          this.toaster.success(res.message);
          this.ngOnInit();
        } else {
          this.toaster.warning(res.message);
        }
      });
  }
  addtosave(values: any) {
    this.saveform = this.fb.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      projectId: [values],
    });
    this.authService
      .addsaveproject(this.saveform.value)
      .subscribe((res: any) => {
        if (res.error == false) {
          this.toaster.success(res.message);
          this.ngOnInit();
        } else {
          this.toaster.warning(res.message);
        }
      });
  }
  notuser() {
    // this.toaster.info("Please Login to Access");
  }
}
