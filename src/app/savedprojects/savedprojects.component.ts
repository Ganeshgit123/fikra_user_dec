import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-savedprojects',
  templateUrl: './savedprojects.component.html',
  styleUrls: ['./savedprojects.component.css']
})
export class SavedprojectsComponent implements OnInit {
  list: any;
  saveddata: any;
  saveform: any
  savedatacount = 0;
  contentLan: any = {};
  savegoalAmount: any;
  saveamountPleadged: any;
  savepercentage: any;
  saveddatas: any;
  creatorCou = 5;
  CreatorReduce: any = [];
  constructor(private fb: FormBuilder,
    public authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private toaster: ToastrService,) {

  }
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

    this.authService.savedproject().subscribe(
      (res: any) => {
        // console.log('user', res);
        this.saveddatas = res.data;
        this.CreatorReduce = this.paginate(res.data, this.creatorCou, 1);
        this.saveddata = res.data;
        this.savedatacount = this.saveddata.length;
        this.saveddata.forEach((elementss: any) => {
          this.savegoalAmount = elementss.basicInfoId.goalAmount;

          this.saveamountPleadged = elementss._amount_Pleadged_;
          this.savepercentage =
            this.saveamountPleadged / this.savegoalAmount;
          var totPercent = this.savepercentage * 100;
          if (totPercent >= 100) {
            elementss.savelastper = 100;
          } else {
            elementss.savelastper = totPercent;
          }
          elementss.categoryName = elementss.basicInfoId.categoryName;
          elementss.subCategoryName = elementss.basicInfoId.subCategoryName;
          elementss.city = elementss.basicInfoId.city;
          elementss.decription = elementss.basicInfoId.decription;
          elementss.projectImage = elementss.basicInfoId.projectImage;
          elementss.goalAmount = elementss.basicInfoId.goalAmount;
          elementss.userName = elementss.userId.fullName;
          elementss._is_All_Nothing_ = elementss._is_All_Nothing_;
          elementss._is_Keep_It_All_ = elementss._is_Keep_It_All_;
          elementss.launchDate = elementss.basicInfoId.launchDate;
          elementss._is_Saved_Project = true;
          elementss.featurelastpercentage = totPercent;
        });
      }
    );
    this.list = [
      {
        category: 'Product Design',
        location: 'Khobar',
        title: 'Yellostack - Web-App',
        content: ' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy',
        author: 'By Michael Murdock',
        pledged: '5200 SAR pledged',
        funded: '170%funded',
        time: '49hours to go'
      },
      {
        category: 'Product Design',
        location: 'Khobar',
        title: 'Yellostack - Web-App',
        content: ' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy',
        author: 'By Michael Murdock',
        pledged: '5200 SAR pledged',
        funded: '170%funded',
        time: '49hours to go'
      },
      {
        category: 'Product Design',
        location: 'Khobar',
        title: 'Yellostack - Web-App',
        content: ' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy',
        author: 'By Michael Murdock',
        pledged: '5200 SAR pledged',
        funded: '170%funded',
        time: '49hours to go'
      }
    ]
  }

  paginate(array: string | any[], page_size: number, page_number: number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  paginationNext() {
    this.creatorCou += 5;
    this.CreatorReduce = this.paginate(
      this.saveddatas,
      this.creatorCou,
      1
    );
    console.log("CreatorReduce", this.CreatorReduce.length)
    console.log("saveddatas", this.saveddatas.length)
    console.log("creatorCou", this.creatorCou)
    this.ngOnInit();
  }
  paginationLess() {
    this.creatorCou = 5;
    this.CreatorReduce = this.paginate(
      this.saveddatas,
      this.creatorCou,
      1
    );
    console.log("CreatorReduceless", this.CreatorReduce.length)
    console.log("saveddatasles", this.saveddatas.length)
    console.log("creatorCousles", this.creatorCou)
    this.ngOnInit();
  }

  addtosave(values: any) {
    this.saveform = this.fb.group({
      userId: JSON.parse(localStorage.getItem('userId')!),
      userType: JSON.parse(localStorage.getItem('role')!),
      projectId: [values],
    });
    console.log(this.saveform)
    this.authService.addsaveproject(this.saveform.value).subscribe((res: any) => {
      this.ngOnInit()
    });
  }


}
