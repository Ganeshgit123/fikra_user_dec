import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/shared/auth.service";
import { AngularEditorConfig } from "@kolkov/angular-editor";

@Component({
  selector: "app-story",
  templateUrl: "./story.component.html",
  styleUrls: ["./story.component.css"],
})
export class StoryComponent implements OnInit {
  htmlContent: any;
  storyForm: any;
  params: any;
  loading= false;
  projectpreview: any;
  tabHead: any;
  tabHead_Ar: any;
  description: any;
  description_Ar: any;
  tabName: any;
  tabName_Ar: any;
  dir: any;
  projectStoryHead: any;
  projectStoryHead_Ar: any;
  projectStoryDescr: any;
  projectStoryDescr_Ar: any;
  riskHead: any;
  riskDescr: any;
  riskHead_Ar: any;
  riskDescr_Ar: any;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "600px",
    placeholder: "Enter text here...",
  };
  contentLan: any = {};
 
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.params = params.id;
    });

    localStorage.setItem("projectid", JSON.stringify(this.params));

    this.storyForm = this.fb.group({
      risk_chalenges: [""],
      projectId: this.params,
      description: [""],
      userId: JSON.parse(localStorage.getItem("userId")!),
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
    this.authService.getprojectstory().subscribe((res: any) => {
      this.tabHead = res.data.tabHead;
      this.tabHead_Ar = res.data.tabHead_Ar;
      this.description = res.data.description;
      this.description_Ar = res.data.description_Ar;
      this.tabName = res.data.tabName;
      this.tabName_Ar = res.data.tabName_Ar;
      this.projectStoryHead = res.data.projectStoryHead;
      this.projectStoryHead_Ar = res.data.projectStoryHead_Ar;
      this.projectStoryDescr = res.data.projectStoryDescr;
      this.projectStoryDescr_Ar = res.data.projectStoryDescr_Ar;
      this.riskHead = res.data.riskHead;
      this.riskDescr = res.data.riskDescr;
      this.riskHead_Ar = res.data.riskHead_Ar;
      this.riskDescr_Ar = res.data.riskDescr_Ar;

      // console.log('country', this.tabHead);
    });
    this.authService.projectpreview().subscribe((res: any) => {
      // console.log('projectpreviewstory',res.data.storyTableId);
      if (res.data.storyTableId !== undefined) {
        this.projectpreview = res.data.storyTableId;
        this.storyForm.patchValue({
          description: this.projectpreview.description,
          risk_chalenges: this.projectpreview.risk_chalenges,
        });
      }
    });
  }
  onSubmit() {
    
    if (this.projectpreview === undefined) {
      this.authService.story(this.storyForm.value);
      // console.log('story',this.storyForm.value)
    } else {
      this.loading = true;
      this.authService.storyedit(this.storyForm.value);
    }
  }
}
