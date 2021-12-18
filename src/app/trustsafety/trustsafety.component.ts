import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  background:any;
  ruless:any;
  dir:any;
  accDescription:any;
  accordCont:any = [];
  selectedItem = 0;
  constructor(public authService: AuthService,private sanitizer: DomSanitizer,) { }

  ngOnInit(): void {
    this.dir=localStorage.getItem('dir') || 'ltr';

    this.rules=[{
      banner_head:"Our Rules",
      banner_desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
      banner_head:"Our Rules",
      banner_desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
      banner_head:"Our Rules",
      banner_desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
      banner_head:"Our Rules",
      banner_desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }]

    this.authService.gettrustandsafety().subscribe((res: any) => {
      this.ruless = res.data[0];
      this.topBanner = this.ruless.topBanner;
      this.bodySection=this.ruless.middleSection;
      this.accDescription=this.ruless.accDescription;
      this.accordCont = res.data[0].accordian;
      this.background=this.sanitizer.bypassSecurityTrustStyle(`url(${this.topBanner[0].bannerImage}) no-repeat`);
    });
  }

}
