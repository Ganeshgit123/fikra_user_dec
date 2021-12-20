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
  takinggoalAmount:any;
  takingamountPleadged:any;
  takingpercentage:any;
  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    public fb: FormBuilder
  ) {}
  myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(this.arabicCotent());
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
    this.userver = JSON.parse(localStorage.getItem("userId")!);

    this.myPromise;

    this.authService.takingoffhome().subscribe((res: any) => {
      if (res.error === false) {
        this.takingoffhome = res.data;
        this.takingoffhome.forEach((element: any) => {
          this.takinggoalAmount = element.basicInfoId.goalAmount;

          this.takingamountPleadged = element._amount_Pleadged_;
          this.takingpercentage =
            this.takingamountPleadged / this.takinggoalAmount;
          var taktotPercent = this.takingpercentage * 100;
          if (taktotPercent >= 100) {
            element.takinglastper = 100;
          } else {
            element.takinglastper = taktotPercent;
          }

          element.takinglastpercentage = taktotPercent;
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