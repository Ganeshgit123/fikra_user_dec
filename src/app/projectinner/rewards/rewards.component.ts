import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css'],
})
export class RewardsComponent implements OnInit {
  title!: any;
  text = '';
  discountValue:any;
  amt: any;
  _is_Sipping_: any;
  _All_Saudi_: any;
  _Any_Where_: any;
  desc: any;
  month: any;
  year: any;
  shipping: any;
  quantity: any;
  public show: boolean = false;
  public buttonName: any = 'Show';
  // productForm: FormGroup;
  sippingType: any;
  selectedValue: any;
  rewardForm: FormGroup;
  deleteform: any;
  params: any;
  world:any;
  projectpreview: any;
  timeLimit: any;
  showreward: any;
  checkreward: any;
  def: any;
  tabHead: any;
  tabHead_Ar: any;
  description: any;
  description_Ar: any;
  tabName: any;
  tabName_Ar: any;
  dir: any;
  rewardHead: any;
  rewardDescription: any;
  rewardHead_Ar: any;
  rewardDescription_Ar: any;
  contentLan: any = {};
newdate:any;
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe((params) => {
      this.params = params.id;
      // console.log(params.id)
    });
    localStorage.setItem('projectid', JSON.stringify(this.params));

    this.rewardForm = this.fb.group({
      userId: JSON.parse(localStorage.getItem('userId')!),
      projectId: this.params,
      userType: 'creator',
      title: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      description: ['', [Validators.required]],
      discountAmount: ['', [Validators.required]],
      estimateDelivery: [''],
      estimateDeliveryYear: [''],
      items: this.fb.array([]),
      sipping: this.fb.array([]),
      sippingType: [''],
      quantityType: [''],
      timeLimit: [''],
      _is_Sipping_: [''],
      _All_Saudi_: [''],
      _Any_Where_: [''],
      limitDate: [''],
      quantityCount: [''],
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
    var now = new Date();
this.newdate = ("0" + (now.getMonth() + 1)).slice(-2);
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.authService.getprojectreward().subscribe((res: any) => {
      this.tabHead = res.data.tabHead;
      this.tabHead_Ar = res.data.tabHead_Ar;
      this.description = res.data.description;
      this.description_Ar = res.data.description_Ar;
      this.tabName = res.data.tabName;
      this.tabName_Ar = res.data.tabName_Ar;
      this.rewardHead = res.data.rewardHead;
      this.rewardDescription = res.data.rewardDescription;
      this.rewardHead_Ar = res.data.rewardHead_Ar;
      this.rewardDescription_Ar = res.data.rewardDescription_Ar;
      // console.log('chekhead', this.tabHead);
    });

    this.authService.projectpreviewreward().subscribe((res: any) => {
      this.showreward = res.data;
    });
    this.authService.projectpreview().subscribe((res: any) => {
      // console.log('projectpreviewreward',res.data);
      this.projectpreview = res.data.rewardTableId;
      //  this.rewardForm.patchValue({
      //   title: this.projectpreview.title,
      //   amount: this.projectpreview.amount,
      //   description:this.projectpreview.description,
      //   estimateDelivery:this.projectpreview.estimateDelivery,
      //   item:this.projectpreview.item,
      //   titlea:this.projectpreview.title,
      //   quandity:this.projectpreview.quandity,
      //   timeLimit:this.projectpreview.timeLimit
      // });
    });
    this.authService.country().subscribe((res: any) => {
      this.def = res.data[0].countryName;
      const name = this.def;
      this.oncountrySelected(name);
      // console.log('default', this.def);
    });
  }
  onKey(event: any) {
    // without type info
    this.text = event.target.value;
  }
  onamt(event: any) {
    // without type info
    this.amt = event.target.value;
  }
  ondesc(event: any) {
    // without type info
    this.desc = event.target.value;
  }
  onmonth(event: any) {
    // without type info
    this.month = event.target.value;
  }
  onyear(event: any) {
    // without type info
    this.year = event.target.value;
  }
  onKeyworld(event:any){
    this.world=event.target.value
  }
  onshipping(event: any) {
    // without type info

    this.shipping = event.target.value;
    this.show = !this.show;
    // console.log("ship",this.shipping);
    // if(this.shipping == 'NO Shipping(Digital copy only)'){
    //   this._is_Sipping_=false;
    //  this. _All_Saudi_=false;
    //  this. _Any_Where_=false;
    // }
    // CHANGE THE NAME OF THE BUTTON.
    //   if(this.show)
    //     this.buttonName = "Hide";
    //   else
    //     this.buttonName = "Show";
    // }
    this.sippingType = event.target.value;
  }
  onquantity(event: any) {
    // without type info
    this.quantity = event.target.value;
  }
  ontime(event: any) {
    // without type info
    this.timeLimit = event.target.value;
  }
  onDiscount(event: any){
    this.discountValue = event.target.value;
  }
  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show) this.buttonName = 'Hide';
    else this.buttonName = 'Show';
  }
  items(): FormArray {
    return this.rewardForm.get('items') as FormArray;
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      title: '',
      quandity: '',
    });
  }

  addQuantity() {
    this.items().push(this.newQuantity());
  }

  removeQuantity(i: number) {
    this.items().removeAt(i);
  }
  sipping(): FormArray {
    return this.rewardForm.get('sipping') as FormArray;
  }

  newQuantitycountry(): FormGroup {
    return this.fb.group({
      destination: '',
      cost: '',
    });
  }

  addQuantitycountry() {
    this.sipping().push(this.newQuantitycountry());
  }

  removeQuantitycountry(i: number) {
    this.sipping().removeAt(i);
  }
  formclean() {
    this.rewardForm.reset();
    // console.log('hi');
  }
  editrewards(values: any) {
    var arrdata = values.items;
    var arrvalue = [];
    if (arrdata.length > 0) {
      for (var i = 0; i < arrdata.length; i++) {
        arrvalue.push(this.dropDownEditArray(arrdata[i]));
      }
    }
    var arrdataship = values.items;
    var arrvalueship = [];
    if (arrdataship.length > 0) {
      for (var i = 0; i < arrdataship.length; i++) {
        arrvalueship.push(this.dropDownEditArrayship(arrdataship[i]));
      }
    }
    this.checkreward = values._id;
     var estimateVal = values.estimateDelivery
     var estimatearr = estimateVal.split("-");
    this.rewardForm = this.fb.group({
      userId: JSON.parse(localStorage.getItem('userId')!),
      projectId: this.params,
      userType: 'creator',
      rewardId: [values['_id']],
      title: [values['title']],
      amount: [values['amount']],
      description: [values['description']],
      estimateDelivery: [estimatearr[0]],
      estimateDeliveryYear: [estimatearr[1]],
      items: this.fb.array(arrvalue),
      sipping: this.fb.array(arrvalueship),
      sippingType: [values['sippingType']],
      quantityType: [values['quantityType']],
      timeLimit: [values['timeLimit']],
      discountAmount: [values['discountAmount']],
      limitDate: [values['limitDate']],
      quantityCount: [values['quantityCount']],
    });
  }
  dropDownEditArray(obj: any): FormGroup {
    // console.log("droparray",obj)
    return this.fb.group({
      title: [obj.title],
      quandity: [obj.quandity],
    });
  }
  dropDownEditArrayship(objship: any): FormGroup {
    // console.log("droparray",obj)
    return this.fb.group({
      destination: [objship.destination],
      cost: [objship.cost],
    });
  }
  deleterewards(values: any) {
    // console.log('delete',values);
    this.deleteform = this.fb.group({
      userId: JSON.parse(localStorage.getItem('userId')!),
      projectId: this.params,
      userType: 'creator',
      rewardId: [values['_id']],
    });
    this.authService.rewarddelete(this.deleteform.value);
    this.ngOnInit();
  }
  onSubmit() {
    // this.authService.reward(this.rewardForm.value);
    if (this.shipping == 'NO Shipping(Digital copy only)') {
      this.rewardForm.value._is_Sipping_ = false;
      this.rewardForm.value._All_Saudi_ = false;
      this.rewardForm.value._Any_Where_ = false;
    }
    if (this.shipping == '_All_Saudi_') {
      this.rewardForm.value._is_Sipping_ = true;
      this.rewardForm.value._All_Saudi_ = true;
      this.rewardForm.value._Any_Where_ = false;
    }
    if (this.shipping == 'Anywhere in the World') {
      this.rewardForm.value._is_Sipping_ = true;
      this.rewardForm.value._All_Saudi_ = false;
      this.rewardForm.value._Any_Where_ = true;
    }
    if (this.shipping == 'Only Certain Cities') {
      this.rewardForm.value._is_Sipping_ = true;
      this.rewardForm.value._All_Saudi_ = false;
      this.rewardForm.value._Any_Where_ = false;
    }

    if (this.checkreward === undefined) {
      if (
        this.rewardForm.value.title &&
        this.rewardForm.value.amount &&
        this.rewardForm.value.description &&
        this.rewardForm.value.estimateDelivery &&
        this.rewardForm.value.quantityType &&
        this.rewardForm.value.timeLimit != ''
      ) {
        this.rewardForm.value.estimateDelivery = this.rewardForm.value.estimateDelivery + '-' + this.rewardForm.value.estimateDeliveryYear ;
        this.authService.reward(this.rewardForm.value);
        // console.log("checkre",this.rewardForm.value)
      } else {
        this.toastr.warning('Please fill mandatory Fields');
      }

      // console.log('story',this.storyForm.value)
      // window.location.reload();
    } else {
      this.authService.rewardedit(this.rewardForm.value)
      // console.log('story', this.rewardForm.value);
      // window.location.reload();
      // this.ngOnInit();
    }
  }
  cityList: any;

  oncountrySelected(name: any) {
    this.authService.city(name).subscribe((res: any) => {
      this.cityList = res.data;
      // console.log('city', this.cityList: any);
    });
  }

  noship() {}
}
