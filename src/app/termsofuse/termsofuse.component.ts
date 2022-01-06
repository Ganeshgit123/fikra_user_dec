import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-termsofuse',
  templateUrl: './termsofuse.component.html',
  styleUrls: ['./termsofuse.component.css']
})
export class TermsofuseComponent implements OnInit {

  policy: any;
  policyAr:any;
  dir:any;

  constructor(public authService: AuthService,) { }

  ngOnInit(): void {
    this.dir=localStorage.getItem('dir') || 'ltr';

    this.authService.termofuse().subscribe(
    
      (res:any)=>{
        // console.log('policy',res.data);
       this.policy = res.data.termsContent;
       this.policyAr = res.data.termsContent_Ar;
      }
    );
  }
  }

