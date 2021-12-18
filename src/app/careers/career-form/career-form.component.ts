import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-career-form',
  templateUrl: './career-form.component.html',
  styleUrls: ['./career-form.component.css']
})
export class CareerFormComponent implements OnInit {
params:any;
jobdetail:any;
sendjobform:any;
fileUpload:any;
file:any;
dir:any;

jobVacancies:any;
jobTitle:any;
jobTitleAr:any;
criteria:any;
criteriaAr:any;
jobDescription:any;
jobDescriptionAr:any;
cityList:any;
imgUplod:any;
photoUrl:any;
resumeUrl:any;
submitted = false;
contentLan: any = {};

  constructor(private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute) { 
      this.sendjobform =this.fb.group({
        resume:['',Validators.required],
        name:['',Validators.required],
        phone:['',Validators.required],
        country:['Saudi Arabia'],
        city:['',Validators.required],
        nationality:['',Validators.required],
        gender:['',Validators.required],
        email:['',Validators.required],
        photo:[''],
        experiance:[''],
        discription:[''],
        jobId:this.params
        });
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
    
    this.dir=localStorage.getItem('dir') || 'ltr';
    this.localprojectid(),600;
    this.authService.getjobdetailid().subscribe(
    
      (res: any)=>{
       this.jobdetail = res.data;
       this.jobTitle =res.data.jobTitle;
       this.jobTitleAr =res.data.jobTitleAr;
       this.jobVacancies=res.data.jobVacancies;
       this.criteria=res.data.criteria;
       this.criteriaAr=res.data.criteriaAr;
       this.jobDescription=res.data.jobDescription;
       this.jobDescriptionAr=res.data.jobDescriptionAr;
      }
    );

    
      this.authService.city('Saudi Arabia').subscribe((res: any) => {
        this.cityList = res.data;
        // console.log('city', this.cityList);
      });
    
  }
  get f() { return this.sendjobform.controls; }

  localprojectid(){
    this.route.params.subscribe(params =>{
      this.params =params.id;
      //  console.log(params.id)
      });
    localStorage.setItem('jobId',JSON.stringify(this.params));
  }
 
  uploadResume(event: any){
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.file = event.target.result;
      // this.imgfile=event.target.files[0];
    }
    reader.readAsDataURL(event.target.files[0]);
    this.fileUpload = event.target.files[0];
        // console.log("file",this.fileUpload);
        const formdata = new FormData();
        formdata.append('imageToStore', this.fileUpload);
        this.authService.s3upload(formdata).subscribe((res: any) => {
      
          if (res.error == false) {
            this.resumeUrl = res.data.Location
          }
        });
  }

  uploadImageFile(event: any){
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.file = event.target.result;
      // this.imgfile=event.target.files[0];
    }
    reader.readAsDataURL(event.target.files[0]);
    this.imgUplod = event.target.files[0];
        // console.log("file",this.imgUplod);
        const formdata = new FormData();
        formdata.append('imageToStore', this.imgUplod);
        this.authService.s3upload(formdata).subscribe((res: any) => {
      
          if (res.error == false) {
            this.photoUrl = res.data.Location
          }
        });
  }

  onRequest(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.sendjobform.invalid) {
        return;
    }
    const data = this.sendjobform.value;
    data['resume'] = this.resumeUrl;
    data['country'] = "Saudi Arabia";
    data['photo'] = this.photoUrl;
    data['jobId'] = this.params;

    this.authService.applyjobrequest(data).subscribe((res: any) => {
          if (res.error == false) {
            this.toastr.success('Success ', res.message);
            this.ngOnInit();
            this.submitted = false;
            this.sendjobform.reset();
          } else {
            this.toastr.warning('Enter valid ', res.message);
          }
        });
    }
   
}
