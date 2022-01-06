import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  topImage:any;
  topContent:any;
  middileContend:any;
  mission:any;
  vision:any;
  middileContendAR:any;
  topContentAr:any;
  dir:any;
  _is_Sec_On_:any;
  middleHead:any
  middleHeadar:any;
  status:any;
  _is_Top_On_:any;
  _is_Middle_On_:any;
  constructor(private route: ActivatedRoute,    public authService: AuthService,
    ) { }

  ngOnInit(): void {
    this.dir=localStorage.getItem('dir') || 'ltr';

    this.authService.aboutus().subscribe(
    
      (res: any) =>{
        this.status =res.data;
        this._is_Top_On_=res.data._is_Top_On_;
        this._is_Middle_On_=res.data._is_Middle_On_;
       this.topImage = res.data.topImage;
       this.topContent = res.data.topContent;
       this.topContentAr = res.data.topContentAr;
       this.middileContend = res.data.middileContend;
       this.middileContendAR = res.data.middileContendAr;
       this.middleHead=res.data.middleHead;
       this.mission = res.data.Sections;
       this.middleHeadar=res.data.middleHeadAr;
      //  this.vision = res.data.Sections;
       this._is_Sec_On_=res.data.Sections[0]._is_Sec_On_;
      }
    )
  }

}
