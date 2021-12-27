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
  notify: any;
  deleteform: any;
  visitform: any;
  messagecount = 5;
  messageReduce: any = [];
  constructor(private fb: FormBuilder,
    public authService: AuthService,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.getnotification().subscribe((res: any) => {
      this.notify = res.notification;
      console.log("notify", this.notify.length)
      this.messageReduce = this.paginate(this.notify, this.messagecount, 1);
      console.log('notify', this.notify);
    });
  }
  paginate(array: string | any[], page_size: number, page_number: number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  paginationNext() {
    this.messagecount += 5;
    this.messageReduce = this.paginate(
      this.notify,
      this.messagecount,
      1
    );
    this.ngOnInit();
  }
  paginationLess() {
    this.messagecount = 5;
    this.messageReduce = this.paginate(
      this.notify,
      this.messagecount,
      1
    );
    this.ngOnInit();
  }
  deletenotify(values: any) {
    this.deleteform = this.fb.group({
      notificationId: [values],
    });
    this.authService.deletenotification(this.deleteform.value);
    this.ngOnInit()
  }
  verifyenotify(values: any) {

    this.visitform = this.fb.group({
      notificationId: [values],
    });

    this.authService.visitnotification(this.visitform.value);
  }
}
