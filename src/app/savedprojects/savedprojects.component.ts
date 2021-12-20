import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-savedprojects',
  templateUrl: './savedprojects.component.html',
  styleUrls: ['./savedprojects.component.css']
})
export class SavedprojectsComponent implements OnInit {
  list:any;
  saveddata:any;
  saveform:any
  savedatacount =0;
  contentLan: any = {};
  savegoalAmount:any;
  saveamountPleadged:any;
  savepercentage:any;
  constructor(private fb: FormBuilder,
    public authService: AuthService,
    private http: HttpClient,
    private router: Router) {
     
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
    
      (res: any)=>{
        console.log('user',res);
       this.saveddata = res.data;
       this.savedatacount = this.saveddata.length;
       this.saveddata.forEach((elementss: any) => {
        this.savegoalAmount = elementss.savedProjectId.basicInfoId.goalAmount;

        this.saveamountPleadged = elementss.savedProjectId._amount_Pleadged_;
        this.savepercentage =
          this.saveamountPleadged / this.savegoalAmount;
        var totPercent = this.savepercentage * 100;
        if (totPercent >= 100) {
          elementss.savelastper = 100;
        } else {
          elementss.savelastper = totPercent;
        }

        elementss.savelastpercentage = totPercent;
      });
      }
    );
    this.list=[
      {
        category:'Product Design',
        location:'Khobar',
        title:'Yellostack - Web-App',
        content:' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy',
        author:'By Michael Murdock',
        pledged:'5200 SAR pledged',
        funded:'170%funded',
        time:'49hours to go'
      },
      {
        category:'Product Design',
        location:'Khobar',
        title:'Yellostack - Web-App',
        content:' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy',
        author:'By Michael Murdock',
        pledged:'5200 SAR pledged',
        funded:'170%funded',
        time:'49hours to go'
      },
      {
        category:'Product Design',
        location:'Khobar',
        title:'Yellostack - Web-App',
        content:' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy',
        author:'By Michael Murdock',
        pledged:'5200 SAR pledged',
        funded:'170%funded',
        time:'49hours to go'
      }
        ]
  }

  addtosave(values:any){
    this.saveform = this.fb.group({
      userId: JSON.parse(localStorage.getItem('userId')!),
      userType: JSON.parse(localStorage.getItem('role')!),
      projectId:[values['_id']],
    });
    console.log(this.saveform)
    this.authService.addsaveproject(this.saveform.value).subscribe((res: any) => {
      this.ngOnInit()
    });
  }

}
