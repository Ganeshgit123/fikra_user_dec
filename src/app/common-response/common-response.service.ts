import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonResponseService {
  ErrorCode!: number;
        message!: String;
        data!: Object; 
  constructor() { }
}
