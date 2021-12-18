import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
faq:any;
dir:any;
contentLan: any = {};
usefullform = this.formBuilder.group({
  faqId: ['',[Validators.required]],
  _isUserFull_:['',[Validators.required]],
  _isNotUserFull_:['',[Validators.required]],
  userId:  JSON.parse(localStorage.getItem('userId')!),
      role:JSON.parse(localStorage.getItem('role')!),
});
  constructor(public authService: AuthService,private formBuilder: FormBuilder,) {
   
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

    this.authService.faq().subscribe(
    (res:any)=>{
       this.faq = res.data;
       console.log(this.faq)
      }
    );
   
  }

  onusefull(values:any){
    this.usefullform = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem('userId')!),
      userType: JSON.parse(localStorage.getItem('role')!),
      faqId:[values],
      _isUserFull_:true,
      _isNotUserFull_:false,
    });
    this.authService.userfeedbackfaq(this.usefullform.value);
  }

  onnotusefull(values:any){
    this.usefullform = this.formBuilder.group({
      userId: JSON.parse(localStorage.getItem('userId')!),
      userType: JSON.parse(localStorage.getItem('role')!),
      faqId:[values],
      _isUserFull_:false,
      _isNotUserFull_:true,
    });
    
    this.authService.userfeedbackfaq(this.usefullform.value);
  }
}
