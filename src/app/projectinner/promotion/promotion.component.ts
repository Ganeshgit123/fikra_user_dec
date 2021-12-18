import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/shared/auth.service";
import { ToastrService } from "ngx-toastr";
declare var $: any;

@Component({
  selector: "app-promotion",
  templateUrl: "./promotion.component.html",
  styleUrls: ["./promotion.component.css"],
})
export class PromotionComponent implements OnInit {
  @ViewChild("myModalClose") modalClose: any;
  params: any;
  listform: any;
  specialrequestform: any;
  requestspecial: any;
  display = "none";
  tabHead: any;
  tabHead_Ar: any;
  description: any;
  description_Ar: any;
  tabName: any;
  tabName_Ar: any;
  dir: any;
  prjtitle: any;
  prjtitle_Ar: any;
  prjdes: any;
  prjdes_Ar: any;

  prjtitle1: any;
  prjtitle1_Ar: any;
  prjdes1: any;
  prjdes1_Ar: any;

  prjtitle2: any;
  prjtitle2_Ar: any;
  prjdes2: any;
  prjdes2_Ar: any;
  submitted = false;
  contentLan: any = {};
  listreq: any;
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
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
      comments: [""],
      serviceType: ["", Validators.required],
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
    this.getsplist();
    this.myPromise;

    this.dir = localStorage.getItem("dir") || "ltr";
    this.authService.getprojectpromotion().subscribe((res: any) => {
      this.tabHead = res.data.tabHead;
      this.tabHead_Ar = res.data.tabHead_Ar;
      this.description = res.data.description;
      this.description_Ar = res.data.description_Ar;
      this.tabName = res.data.tabName;
      this.tabName_Ar = res.data.tabName_Ar;
      this.prjtitle = res.data.fields[0].feildHead;
      this.prjtitle_Ar = res.data.fields[0].feildHead_Ar;
      this.prjdes = res.data.fields[0].feildDescription;
      this.prjdes_Ar = res.data.fields[0].feildDescription_Ar;

      this.prjtitle1 = res.data.fields[1].feildHead;
      this.prjtitle1_Ar = res.data.fields[1].feildHead_Ar;
      this.prjdes1 = res.data.fields[1].feildDescription;
      this.prjdes1_Ar = res.data.fields[1].feildDescription_Ar;

      this.prjtitle2 = res.data.fields[2].feildHead;
      this.prjtitle2_Ar = res.data.fields[2].feildHead_Ar;
      this.prjdes2 = res.data.fields[2].feildDescription;
      this.prjdes2_Ar = res.data.fields[2].feildDescription_Ar;
    });
    this.authService.specialrequestlist().subscribe((res: any) => {
      // console.log('like',res);
      this.requestspecial = res.data;
    });
  }
  openModal() {
    this.display = "block";
  }

  getsplist() {
    this.listform = this.fb.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      userType: JSON.parse(localStorage.getItem("role")!),
      projectId: JSON.parse(localStorage.getItem("projectid")!),
    });
    this.authService.specialrequestprojectlist().subscribe((res: any) => {
      console.log("list", res);
      this.listreq = res.data;
    });
  }
  onCloseHandled() {
    this.display = "none";
    this.specialrequestform.reset();
  }
  get f() {
    return this.specialrequestform.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.specialrequestform.invalid) {
      return;
    }
    const data = this.specialrequestform.value;
    this.authService.specialrequest(data).subscribe((res: any) => {
      if (res.error == false) {
        this.modalClose.nativeElement.click();
        this.toastr.success("Success ", "Send To Admin Successfully");
        this.ngOnInit();
        this.submitted = false;
        this.specialrequestform.reset();
      } else {
        this.toastr.warning("Enter valid ", res.message);
      }
    });
  }
}
