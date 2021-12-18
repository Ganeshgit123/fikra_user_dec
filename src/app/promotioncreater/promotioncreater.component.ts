import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-promotioncreater',
  templateUrl: './promotioncreater.component.html',
  styleUrls: ['./promotioncreater.component.css']
})
export class PromotioncreaterComponent implements OnInit {
search:any;
valuesearch='';
  constructor(public fb: FormBuilder,public authService: AuthService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.authService.advancesearchapi(this.valuesearch).subscribe((res: any) => {
      this.search = res.data;
      console.log('search22', this.search);
    });
  }

}
