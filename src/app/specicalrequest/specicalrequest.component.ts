import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../shared/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-specicalrequest",
  templateUrl: "./specicalrequest.component.html",
  styleUrls: ["./specicalrequest.component.css"],
})
export class SpecicalrequestComponent implements OnInit {
  requestspecial: any;
  specialrequestform: any;
  params: any;
  sreq = false;
  dir: any;
  contentLan: any = {};
  requestspeciallist:any;
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.params = params.id;
    });
    localStorage.setItem("projectid", JSON.stringify(this.params));
    this.specialrequestform = this.fb.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      projectId: this.params,
      userType: "creator",
      comments: ["", [Validators.required]],
      serviceType: ["", [Validators.required]],
    });
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
    this.myPromise;

    this.dir = localStorage.getItem("dir") || "ltr";
    this.authService.specialrequestlist().subscribe((res: any) => {
      this.requestspecial = res.data;
    });
    this.authService.requestbycreator().subscribe((res: any) => {
      this.requestspeciallist = res.data;
    });
  }
  onSelected(val: any) {
    this.sreq = val;
  }
  onSubmit() {
    this.authService
      .specialrequest(this.specialrequestform.value)
      .subscribe((res: any) => {
        this.specialrequestform.reset();
        if (res.error == false) {
          this.toastr.success("Success ", "Send To Admin Successfully");
          this.specialrequestform.reset();
        } else {
          this.toastr.warning("Enter valid ", res.message);
        }
      });
    this.ngOnInit();
  }
}
