import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.css']
})
export class PrivacypolicyComponent implements OnInit {
  
  policy: any;
  policyAr:any;
  dir:any;

  constructor(public authService: AuthService,) { }

  ngOnInit(): void {
    this.dir=localStorage.getItem('dir') || 'ltr';

    this.authService.privacypolicy().subscribe(
    
      (res:any)=>{
        // console.log('policy',res.data);
       this.policy = res.data.privacyContent;
       this.policyAr = res.data.privacyContent_Ar;
      }
    );
  }

}
