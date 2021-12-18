import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  displayMode: number | undefined;
  role:any;
  following:any;
  followers:any;
  profileLogo:any;
  contentLan: any = {};
  dir: any;
  followform: any;
  followcount= 0;
  followerscount=0;
  constructor(public authService: AuthService,
    private router: Router,private route: ActivatedRoute, private formBuilder: FormBuilder) { }
    myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          this.arabicCotent()
        );
      }, 2000);
    });
  
    async arabicCotent() {
        let sameContent = await JSON.parse(localStorage.getItem("transkey")!);
  
        const lang = localStorage.getItem("lang") || "en";
  
        await sameContent.reduce(async (promise: any, element: any) => {
          // console.log(element)
          if (lang == "en") {
            this.contentLan[element.key] = element.en;
          } else {
            this.contentLan[element.key] = element.ar;
          }
          await promise;
        }, Promise.resolve());
    }
  ngOnInit(): void {
    this.myPromise

    this.dir = localStorage.getItem("dir") || "ltr";

    this.displayMode = 2;
    this.role = this.readLocalStorageValue('role');
    this.authService.followinglist().subscribe(
      (res:any)=>{
        
       this.following = res.data;
       this.followcount =res.data.length;
       console.log('following', this.followcount);
      }
    );
    this.authService.followerlist().subscribe(
      (res:any)=>{
        console.log('follower', res);
       this.followers = res.data;
       this.followerscount =res.data.length;
      
      //  this.profileLogo = this.followers.userDetails && this.followers.userDetails['investorImage'] ? this.followers.userDetails['investorImage'] : 'assets/image/avatar-placeholder.png';

      }
    );
  }
  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;
  }
  readLocalStorageValue(key: string): string {
    // console.log("hi",localStorage.getItem(key));
    return JSON.parse(localStorage.getItem(key)!)
  
  }
  unfollow(value:any){
  this.followform = this.formBuilder.group({
    userId: JSON.parse(localStorage.getItem("userId")!),
    userType: JSON.parse(localStorage.getItem("role")!),
    creatorId: [value],
  });
  this.authService.followpost(this.followform.value);
  this.ngOnInit();
}
}
