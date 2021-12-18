import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ModalModule } from "ngx-bootstrap/modal";
import { AuthService } from "src/app/shared/auth.service";
import Swal, { SweetAlertOptions } from "sweetalert2";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"],
})
export class PaymentComponent implements OnInit {
  user: any;
  email: any;
  banknumber: any;
  iban: any;
  tabHead: any;
  tabHead_Ar: any;
  description: any;
  description_Ar: any;
  tabName: any;
  tabName_Ar: any;
  dir: any;
  prjtitle: any;
  prjtitle_Ar: any;
  prjdes: any;
  prjdes_Ar: any;

  prjtitle1: any;
  prjtitle1_Ar: any;
  prjdes1: any;
  prjdes1_Ar: any;

  prjtitle2: any;
  prjtitle2_Ar: any;
  prjdes2: any;
  prjdes2_Ar: any;

  prjtitle3: any;
  prjtitle3_Ar: any;
  prjdes3: any;
  prjdes3_Ar: any;
  contentLan: any = {};
  banksList: any;
  bankName: any;
  bankAvailable = false
  openCard = false;
  params: any;


  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.params = params.id;
    });
  }

  myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(this.arabicCotent());
    }, 2000);
  });

  async arabicCotent() {
    let sameContent = await JSON.parse(localStorage.getItem("transkey")!);

    const lang = localStorage.getItem("lang") || "en";

    await sameContent.reduce(async (promise: any, element: any) => {
      if (lang == "en") {
        this.contentLan[element.key] = element.en;
      } else {
        this.contentLan[element.key] = element.ar;
      }
      await promise;
    }, Promise.resolve());
  }
  ngOnInit(): void {
    this.myPromise;

    this.authService.projectpreview().subscribe((res: any) => {
      this.banknumber = res.data.accountNumber;
      this.iban = res.data.iban;
      this.bankName = res.data.bankName;
      this.bankAvailable = res.data._isBankAdded_ || false
    })

    this.dir = localStorage.getItem("dir") || "ltr";
    this.authService.getprojectpayment().subscribe((res: any) => {
      this.tabHead = res.data.tabHead;
      this.tabHead_Ar = res.data.tabHead_Ar;
      this.description = res.data.description;
      this.description_Ar = res.data.description_Ar;
      this.tabName = res.data.tabName;
      this.tabName_Ar = res.data.tabName_Ar;
      this.prjtitle = res.data.fields[0].feildHead;
      this.prjtitle_Ar = res.data.fields[0].feildHead_Ar;
      this.prjdes = res.data.fields[0].feildDescription;
      this.prjdes_Ar = res.data.fields[0].feildDescription_Ar;

      this.prjtitle1 = res.data.fields[1].feildHead;
      this.prjtitle1_Ar = res.data.fields[1].feildHead_Ar;
      this.prjdes1 = res.data.fields[1].feildDescription;
      this.prjdes1_Ar = res.data.fields[1].feildDescription_Ar;

      this.prjtitle2 = res.data.fields[2].feildHead;
      this.prjtitle2_Ar = res.data.fields[2].feildHead_Ar;
      this.prjdes2 = res.data.fields[2].feildDescription;
      this.prjdes2_Ar = res.data.fields[2].feildDescription_Ar;

      this.prjtitle3 = res.data.fields[3].feildHead;
      this.prjtitle3_Ar = res.data.fields[3].feildHead_Ar;
      this.prjdes3 = res.data.fields[3].feildDescription;
      this.prjdes3_Ar = res.data.fields[3].feildDescription_Ar;
    });

    this.authService.userprofile().subscribe((res: any) => {
      this.user = res.data;
      this.email = res.data.email;
    });

    this.authService.getActiveBankaccount().subscribe((res: any) => {
      this.banksList = res.data;
      console.log(this.banksList)
    });

  }

  changeStatus(){
      this.openCard = !this.openCard
  }

  onSave(value: any){
    let data = this.banksList.find((bank: any) => bank._id == value)

    let dataPost = {
      userId: JSON.parse(localStorage.getItem('userId')!),
      projectId: this.params,
      userType: 'creator',
      bankName: data.bankName,
      accountNumber: data.accountNumber,
      iban: data.iban
    }

    this.authService.postPayment(dataPost);
  }

}
