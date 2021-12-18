import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-cookiepolicy',
  templateUrl: './cookiepolicy.component.html',
  styleUrls: ['./cookiepolicy.component.css']
})
export class CookiepolicyComponent implements OnInit {

  policy: any;
  policyAr:any;
  dir:any;

  constructor(public authService: AuthService,) { }

  ngOnInit(): void {
    this.dir=localStorage.getItem('dir') || 'ltr';

    this.authService.cookiepolicy().subscribe(
    
      (res:any)=>{
        // console.log('policy',res.data);
       this.policy = res.data.cookieContent;
       this.policyAr = res.data.cookieContent_Ar;
      }
    );
  }

}
