import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  popup:any;
options:any;
radioStatus =false;
manageStatus = false;
coordinatStatus = false;
params: any;
user!:any;
type!:any;
type1!:any;
type2!:any;
  peopleForm: any;
  constructor(public fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { 
      this.route.params.subscribe(params =>{this.params =params.id; console.log(params.id)});
      this.peopleForm = this.fb.group({
       
        collaborators: [{
          email:'',
          title:'',
          permission:[
            {
              edit_project:[
                {
                  edit_project:'',
                  update_faq: ''
                }
              ],
            manage_community: [
                {
                    puplish: '',
                    comments:''
                }
            ],
            coordinate: [
                {
                    view_backing: '',
                    manage_backing:''
                }
            ]
            }
          ]
        }],
        projectId:this.params,        
        userId:   JSON.parse(localStorage.getItem('userId')!),
        userType:"creator"
      })
    }

  ngOnInit(): void {
    this.authService.userprofile().subscribe(
    
      (res: any) =>{
        console.log('user',res.data.dob);
       this.user = res.data;
      }
    )
  }
  edit() {
    this.radioStatus = true;
 }
 manage() {
  this.manageStatus = true;
}
coordinate() {
  this.coordinatStatus = true;
}
onSubmit() {
  this.authService.people(this.peopleForm.value)
  // console.log(this.peopleForm)
}
}
