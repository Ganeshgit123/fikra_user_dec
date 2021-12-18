import { Component, OnInit } from '@angular/core';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons/faTwitterSquare';

@Component({
  selector: 'app-furtherreading',
  templateUrl: './furtherreading.component.html',
  styleUrls: ['./furtherreading.component.css']
})
export class FurtherreadingComponent implements OnInit {
  fbIcon = faFacebookSquare;
  tweetIcon = faTwitterSquare;
  constructor() { }

  ngOnInit(): void {
  }

}
