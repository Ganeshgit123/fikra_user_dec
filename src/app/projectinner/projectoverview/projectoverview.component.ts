import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { RoundProgressModule } from "angular-svg-round-progressbar";
import { AuthService } from "src/app/shared/auth.service";

@Component({
  selector: "app-projectoverview",
  templateUrl: "./projectoverview.component.html",
  styleUrls: ["./projectoverview.component.css"],
})
export class ProjectoverviewComponent implements OnInit {
  params: any;
  projectpreview: any;
  projectdel: any;
  projectreqform: any;
  tabName: any;
  tabHead: any;
  description: any;
  message: any;
  rules: any;
  contentLan: any = {};
  basicContent: any;
  rewardContent: any;
  storyContent: any;
  paymentContent: any;
  promotionContent: any;
  lang: any;
  previewContent: any;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe((params) => {
      this.params = params.id;
      console.log(params.id);
    });
    this.projectdel = this.fb.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      projectId: this.params,
      userType: "creator",
    });
    this.projectreqform = this.fb.group({
      userId: JSON.parse(localStorage.getItem("userId")!),
      projectId: this.params,
      userType: "creator",
    });
  }

  myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(this.arabicCotent());
    }, 2000);
  });

  async arabicCotent() {
    let sameContent = await JSON.parse(localStorage.getItem("transkey")!);

    this.lang = localStorage.getItem("lang") || "en";

    await sameContent.reduce(async (promise: any, element: any) => {
      // console.log(element)
      if (this.lang == "en") {
        this.contentLan[element.key] = element.en;
      } else {
        this.contentLan[element.key] = element.ar;
      }
      await promise;
    }, Promise.resolve());
  }

  ngOnInit(): void {
    this.myPromise;

    this.authService.projectpreview().subscribe((res: any) => {
      console.log("projectpreviewstory", res.data._is_User_Requested_);
      this.projectpreview = res.data._is_User_Requested_;
    });
    this.authService.getprojectoverview().subscribe((res: any) => {
      this.previewContent = res.data;
      this.tabName = res.data.tabName;
      this.tabHead = res.data.tabHead;
      this.description = res.data.description;
      this.message = res.data.message;
      this.rules = res.data.rules;
    });

    this.authService.getprojectbasic().subscribe((res: any) => {
      this.basicContent = res.data;
    });

    this.authService.getprojectreward().subscribe((res: any) => {
      this.rewardContent = res.data;
    });

    this.authService.getprojectstory().subscribe((res: any) => {
      this.storyContent = res.data;
    });

    this.authService.getprojectpayment().subscribe((res: any) => {
      this.paymentContent = res.data;
    });

    this.authService.getprojectpromotion().subscribe((res: any) => {
      this.promotionContent = res.data;
    });
  }
  // "data": {
  //       "uid": "projectRequest",
  //       "_id": "61540abcf287da53408e1c16",
  //       "createdBy": "$2a$10$PeOF5j0FBSNhDkWfzG8SXeNXC2dBd4irpbMqua3qEYyYvQf4Kfd9u",
  //       "userType": "admin",
  //       "role": "s_a_r",
  //       "tabName": "Project Rewuest",
  //       "tabHead": "Start with the basics",
  //       "description": "Lorem Ipsum is simply dummy text of the printing",
  //       "message": "",
  //       "rules": "ruleOne,ruleTwo,ruleThree",
  //       "tabName_Ar": "Basic_Ar",
  //       "tabHead_Ar": "Start with the basics _ updated_Ar",
  //       "description_Ar": "Lorem Ipsum is simply dummy text of the printing_Ar",
  //       "message_Ar": "",
  //       "rules_Ar": "",
  // }

  onSubmit() {
    this.authService.projectdelete(this.projectdel.value);
  }
  onRequest() {
    this.authService.projectadminrequest(this.projectreqform.value);
  }
}

// "error": false,
// "message": "Data fetched successfully",
// "data": {
//     "uid": "projectRequest",
//     "_id": "61540abcf287da53408e1c16",
//     "createdBy": "$2a$10$PeOF5j0FBSNhDkWfzG8SXeNXC2dBd4irpbMqua3qEYyYvQf4Kfd9u",
//     "userType": "admin",
//     "role": "s_a_r",
//     "tabName": "Project Rewuest",
//     "tabHead": "Start with the basics",
//     "description": "Lorem Ipsum is simply dummy text of the printing",
//     "message": "",
//     "rules": "ruleOne,ruleTwo,ruleThree",
//     "tabName_Ar": "Basic_Ar",
//     "tabHead_Ar": "Start with the basics _ updated_Ar",
//     "description_Ar": "Lorem Ipsum is simply dummy text of the printing_Ar",
//     "message_Ar": "",
//     "rules_Ar": "",
//     "__v": 0
