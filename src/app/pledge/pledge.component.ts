import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-pledge',
  templateUrl: './pledge.component.html',
  styleUrls: ['./pledge.component.css']
})
export class PledgeComponent implements OnInit {

  list: any;
  pledgeddata: any;
  saveform: any
  pledgeform: any;
  contentLan: any = {};
  savedatacount: any;
  pledgecount = 5;
  pledgeReduce: any = [];
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

    this.authService.getpledgedetail().subscribe(

      (res: any) => {
        console.log('user', res);
        this.pledgeddata = res.data;
        this.pledgeReduce = this.paginate(res.data, this.pledgecount, 1);
        this.savedatacount = this.pledgeddata.length;
      }
    );

  }
  paginate(array: string | any[], page_size: number, page_number: number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  paginationNext() {
    this.pledgecount += 5;
    this.pledgeReduce = this.paginate(
      this.pledgeddata,
      this.pledgecount,
      1
    );
    this.ngOnInit();
  }
  paginationLess() {
    this.pledgecount = 5;
    this.pledgeReduce = this.paginate(
      this.pledgeddata,
      this.pledgecount,
      1
    );
    this.ngOnInit();
  }
  addtosave(values: any) {
    console.log('save', values);
    this.saveform = this.fb.group({
      userId: JSON.parse(localStorage.getItem('userId')!),
      userType: JSON.parse(localStorage.getItem('role')!),
      projectId: [values['_id']],
    });
    this.authService.addsaveproject(this.saveform.value);
  }
  payprocess(value: any) {
    localStorage.setItem(
      'redirection',
      JSON.stringify('pledge')
    );
    this.pledgeform = this.fb.group({
      userId: JSON.parse(localStorage.getItem('userId')!),
      userType: JSON.parse(localStorage.getItem('role')!),
      projectId: [value['projectId._id']],
      pledgeAmount: [value['pledgeAmount']],
      rewardId: [value['rewardId']],
      paymentMethod: [value['paymentBrand']],
      sippingAddress: [value['sippingAddress']],
      processing_Fees_Percent: [value['processing_Fees_Percent']],
      processing_Fees: [value['processing_Fees']],
      VAT_Percent: [value['VAT_Percent']],
      VAT: [value['VAT']],
      paymentModel_Percent: [value['paymentModel_Percent']],
      paymentModel: [value['paymentModel']],
      totalAmount: [value['totalAmount']],
    });
    // console.log("pledge",this.pledgeform.value)
    this.authService.pledgereward(this.pledgeform.value);
  }



}
