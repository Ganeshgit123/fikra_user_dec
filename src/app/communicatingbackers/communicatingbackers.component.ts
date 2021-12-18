import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-communicatingbackers',
  templateUrl: './communicatingbackers.component.html',
  styleUrls: ['./communicatingbackers.component.css']
})
export class CommunicatingbackersComponent implements OnInit {
data:any;



  constructor() { }
  @Input() label: string | undefined;
  @Output() onClick = new EventEmitter<any>();
  ngOnInit(): void {
    
  }
  onClickButton(event: any) {
    this.onClick.emit(event);
  }
}
