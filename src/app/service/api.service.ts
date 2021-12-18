import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { ToastrManager } from 'ng6-toastr-notifications';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
const AUTH_API = 'https://fikra.app/api/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.baseUrl;
  accToken = sessionStorage.getItem('access_token');
  constructor(private http: HttpClient,){ }
 
  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/creatorLogin', {
      email,
      password
    }, httpOptions);
  }
  
  register(fullname: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/creatorRegistration', {
      fullname,
      email,
      password
    }, httpOptions);
  }
  basic(title: string, subTitle: string, location: string, goalAmount: string): Observable<any> {
    return this.http.post(AUTH_API + '/saveBasicInfo', {
      title,
      subTitle,
      location,
      goalAmount
    }, httpOptions);
  }
}
