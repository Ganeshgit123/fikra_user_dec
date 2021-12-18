import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-buildingrewards',
  templateUrl: './buildingrewards.component.html',
  styleUrls: ['./buildingrewards.component.css']
})
export class BuildingrewardsComponent implements OnInit {
  catchEmail: any;
  params:any;
  verifysubscribeForm:any;
  constructor(public fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.localprojectid(),600;
    // this.catchEmail = JSON.parse(localStorage.getItem('email')!)
  }
  localprojectid(){
    this.route.params.subscribe(params =>{this.params =params.id; 
      // console.log(params.id)
    });
    this.verifysubscribeForm = this.fb.group({
      subscriptionId:this.params,
      
    })
    
    this.authService.verifymailnewsletter(this.verifysubscribeForm.value);
  }
}
