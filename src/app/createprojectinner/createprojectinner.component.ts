import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-createprojectinner',
  templateUrl: './createprojectinner.component.html',
  styleUrls: ['./createprojectinner.component.css']
})
export class CreateprojectinnerComponent implements OnInit {
  notify:any;
  deleteform:any;
  visitform:any;
  constructor(private fb: FormBuilder,
    public authService: AuthService,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.getnotification().subscribe((res: any) => {
      this.notify = res.notification;
      console.log('notify', this.notify);
    });
  }
  deletenotify(values:any){
    this.deleteform = this.fb.group({
      notificationId:[values],
    });
    this.authService.deletenotification(this.deleteform.value);
    this.ngOnInit()
  }
  verifyenotify(values:any){
    
    this.visitform = this.fb.group({
      notificationId:[values],
    });
    
    this.authService.visitnotification(this.visitform.value);
  }
  
}
