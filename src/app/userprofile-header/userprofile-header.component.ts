import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-userprofile-header',
  templateUrl: './userprofile-header.component.html',
  styleUrls: ['./userprofile-header.component.css']
})
export class UserprofileHeaderComponent implements OnInit {
  popup:any;
  active: any;
  // @HostListener('document:click', ['$event']) clickedOutside($event: any){

  //   this.popup=false;
  // }
  constructor() { }

  ngOnInit(): void {
  }
  

}
