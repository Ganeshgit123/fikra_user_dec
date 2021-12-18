import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { AuthService } from "../shared/auth.service";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-tellingstory",
  templateUrl: "./tellingstory.component.html",
  styleUrls: ["./tellingstory.component.css"],
})
export class TellingstoryComponent implements OnInit {
  checkoutId: any;
  url: any;
  checkstatusform: any;
  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.checkoutId = JSON.parse(localStorage.getItem("checkoutId")!);
    // console.log(this.checkoutId)
    // this.url ="https://test.oppwa.com/v1/checkouts/F9665FCB872C708ED6F79F53C014D6BB.uat01-vm-tx04/payment"
    // this.opaystatus();
    let str =
      "https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=" +
      this.checkoutId;
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = str;
    this.elementRef.nativeElement.appendChild(s);
  }
  opaystatus() {
    this.authService.paymentreward();
  }
  oncheckoutstatus() {
    this.checkstatusform = this.formBuilder.group({
      checkoutId: JSON.parse(localStorage.getItem("checkoutId")!),
      status: true,
    });
    this.authService.checkoutpayment(this.checkstatusform.value);
  }

  takepay() {
    this.url =
      "https://test.oppwa.com/v1/checkouts/'+this.checkoutId+'/payment";
  }
}
