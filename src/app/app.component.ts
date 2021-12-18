import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "./shared/auth.service";
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from "@angular/router";
import Swal, { SweetAlertOptions } from "sweetalert2";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  keyCode:number | undefined;
  constructor(
    private translateservice: TranslateService,
    public authService: AuthService,
    private router: Router
  ) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });

    const lang = localStorage.getItem("lang") || "en";
    const dir = localStorage.getItem("dir") || "ltr";
    this.translateservice.use(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;

    document.addEventListener('keydown', function(event) {
      if (event.keyCode == 123) {
        // Swal.fire({
        //   text:"You Can not Do This!",
        //   icon: "warning",
        // });
        
        return false;
      } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
        // Swal.fire({
        //   text:"You Can not Do This!",
        //   icon: "warning",
        // });
        
        return false;
      } else if (event.ctrlKey && event.keyCode == 85) {
        // Swal.fire({
        //   text:"You Can not Do This!",
        //   icon: "warning",
        // });
        
        return false;
      }
    }, false);
    
    if (document.addEventListener) {
      document.addEventListener('contextmenu', function(e) {
        // Swal.fire({
        //   text:"You Can not Do This!",
        //   icon: "warning",
        // });
        
        e.preventDefault();
      }, false);
    } 
    else {
      document.addEventListener('oncontextmenu', function() {
        // Swal.fire({
        //   text:"You Can not Do This!",
        //   icon: "warning",
        // });
        
        // window.event.returnValue = false;
      });
    }
  }
  translateKey: any;
  content: any;
  ShowOverlays = true

  

  ngOnInit(): void {
    let transkey = JSON.parse(localStorage.getItem("transkey")!)
    if(transkey === undefined || transkey === null){
      this.authService.transalteFunc().subscribe(async (res: any) => {
        await localStorage.setItem("transkey", JSON.stringify(res.data));
      });
    }
  }
  
  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.ShowOverlays = true;
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => {
        this.ShowOverlays = false;
      },2000)
    }

    //Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      setTimeout(() => {
        this.ShowOverlays = false;
      },2000)
    }
    if (event instanceof NavigationError) {
      setTimeout(() => {
        this.ShowOverlays = false;
      },2000)
    }
  }
}
