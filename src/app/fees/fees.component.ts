import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthService } from "../shared/auth.service";

@Component({
  selector: "app-fees",
  templateUrl: "./fees.component.html",
  styleUrls: ["./fees.component.css"],
})
export class FeesComponent implements OnInit {
  rules: any;
  dir: any;
  topBanner: any;
  accordian: any;
  background:any;
  constructor(public authService: AuthService,private sanitizer: DomSanitizer, ) {}

  ngOnInit(): void {
    this.dir = localStorage.getItem("dir") || "ltr";
    this.rules = [
      {
        banner_head: "Fees",
        banner_desc:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
    ];
    this.authService.fikraFees().subscribe((res: any) => {
      this.topBanner = res.data[0].topBanner;
      this.accordian = res.data[0].accordian;
      this.background=this.sanitizer.bypassSecurityTrustStyle(`url(${this.topBanner[0].bannerImage}) no-repeat`);
    });
  }
}
