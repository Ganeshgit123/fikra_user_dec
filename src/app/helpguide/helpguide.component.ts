import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-helpguide',
  templateUrl: './helpguide.component.html',
  styleUrls: ['./helpguide.component.css']
})
export class HelpguideComponent implements OnInit {
  guide:any;
  List:any;
  params:any;
  dir:any;

  constructor(public authService: AuthService,    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.dir=localStorage.getItem('dir') || 'ltr';

    this.authService.helpguide().subscribe(
    
      (res:any)=>{
        console.log('guide',res.data);
       this.guide = res.data;
      }
    );
  }
  onbuttonselect(value: String) {
    this.authService.helpguidebyid(value).subscribe((res: any) => {
      this.List = res.data;
      console.log('city', this.List);
    });
  }


}
