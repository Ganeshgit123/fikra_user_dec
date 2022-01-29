import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-trustsafety',
  templateUrl: './trustsafety.component.html',
  styleUrls: ['./trustsafety.component.css']
})
export class TrustsafetyComponent implements OnInit {
  rules:any;
  topBanner:any;
  bodySection:any;
  ruless:any;
  dir:any;
  accDescription:any;
  accordCont:any = [];
  selectedItem = 0;
  img:any;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.dir=localStorage.getItem('dir') || 'ltr';

    this.authService.gettrustandsafety().subscribe((res: any) => {
      this.ruless = res.data[0];
      this.topBanner = this.ruless.topBanner;
      this.bodySection=this.ruless.middleSection;
      this.bodySection.forEach((ord:any) =>{
        this.img = ord.imageURL 
    })
    //  console.log(this.img)
      this.accDescription=this.ruless.accDescription;
      this.accordCont = res.data[0].accordian;
    });
  }

}
