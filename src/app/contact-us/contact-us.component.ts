import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  lat: number = 24.774265;
  lng: number = 46.738586;
  markers: any;
  zoom: number = 5;
  cityselected!: Number;
  previous:any;
  sendcontactform:any;
  submitted = false;
  dir:any;
  def:any;
  cityList:any;
  country:any;
  enquiryList:any;
  contentLan: any = {};

  constructor(public authService: AuthService, private formBuilder: FormBuilder,
    private toastr: ToastrService,
    ) {
    
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
    // this._fetchData();
    this.sendcontactform =this.formBuilder.group({
      name:['', Validators.required],
      email:['',Validators.required],
      phone:[''],
      country:[''],
      city:[''],
      message:['',Validators.required],
      inqueryType:['',Validators.required],
      inqueryMessage:['']
      });
    this.authService.country().subscribe((res: any) => {
      this.country = res.data;
      // console.log('country', this.country);
    });
    this.authService.branchcontact().subscribe((res: any) => {
      this.markers = res.data;
      this.def=res.data;

      // console.log("dd",this.def)
      // const name=this.def;
      // this.oncitySelected(name);
      // console.log('default', this.def);
    });
   
    this.authService.enquiry().subscribe((res: any) => {
      this.enquiryList = res.data;
      // console.log('enq', this.enquiryList);
    });
    }
    get f() { return this.sendcontactform.controls; }


  // private _fetchData() {
  //   this.markers = [
  //     { latitude: 24.774265, longitude: 46.738586 }
  //   ];
  // }

  clickedMarker(infowindow:any) {
    if (this.previous) {
        this.previous.close();
    }
    this.previous = infowindow;
 }
 oncountrySelected(value:any){
  // console.log("the selected val" + value);
  // this.authService.city(value);
  this.authService.city(value).subscribe((res: any) => {
    this.cityList = res.data;
    // console.log('city', this.cityList);
  });
}
// oncitySelected(name:any){
//   console.log("the selected val" + name);
//   // this.authService.city(value);
//   this.authService.carrerdetail(name).subscribe((res: any) => {
//     console.log("res",res.data)
   
//     // this.temp.push(this.cityList);
//   });
// }
 onRequest(){
  this.submitted = true;

        // stop here if form is invalid
        if (this.sendcontactform.invalid) {
            return;
        }
      this.authService.contactusrequest(this.sendcontactform.value).subscribe((res: any) => {
        if (res.error == false) {
          this.toastr.success('Success ', res.message);
          this.sendcontactform.reset();
          this.ngOnInit();
          this.submitted = false;
        } else {
          this.toastr.warning('Enter valid ', res.message);
        }
      });
}
}
