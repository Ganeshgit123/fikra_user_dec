import { Component, OnInit } from "@angular/core";
import { AuthService } from "../shared/auth.service";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "app-rules",
  templateUrl: "./rules.component.html",
  styleUrls: ["./rules.component.css"],
})
export class RulesComponent implements OnInit {
  rules: any;
  faq: any;
  dir: any;
  policy: any;
  topBanner:any;
  bodySection:any;
  background:any;
  constructor(public authService: AuthService,private sanitizer: DomSanitizer,  ) {}

  ngOnInit(): void {
    this.dir = localStorage.getItem("dir") || "ltr";
    this.authService.faq().subscribe((res: any) => {
      this.faq = res.data;
      // console.log(this.faq);
    });
    this.authService.getourrules().subscribe((res: any) => {
      this.rules = res.data[0];
      this.topBanner = this.rules.topBanner;
      this.bodySection=this.rules.bodySection;
      this.background=this.sanitizer.bypassSecurityTrustStyle(`url(${this.topBanner[0].bannerImage}) no-repeat`);
    });
  }
}
