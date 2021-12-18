import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.css']
})
export class GettingStartedComponent implements OnInit {
  params:any;
  handbookpage:any;
  next: any;
  previous: any;
  handbook:any;
  lang: any;
  body: any;
  constructor( public authService: AuthService,
    private router: Router,private route: ActivatedRoute, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    // this.nexbtn();

    this.lang = localStorage.getItem("lang") || "en";

    this.localhandbookid(),800;

    this.authService.gethandbookpage().subscribe(
    
      (res:any)=>{
        if(!res.error){
          this.handbookpage = res.data;  
          this.body = this.lang == 'en' ? this.handbookpage?.handBookBody : this.handbookpage?.handBookBodyAr
          this.next = res.next;   
          this.previous = res.previous;      
       }}
     );
  }
  readLocalStorageValue(key: string): string {
    // console.log("hi",localStorage.getItem(key));
    return JSON.parse(localStorage.getItem(key)!)
  
  }
  localhandbookid(){
    this.route.params.subscribe(params =>{this.params =params.id; 
      // console.log(params.id)
    });
    localStorage.setItem('handbook',JSON.stringify(this.params));
    // window.location.reload(),6000; 
  }

  nexbtn(ele: any){
    location.href = '/creatorhandbook/'+ele;
  }
}
