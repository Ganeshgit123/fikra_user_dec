import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, 
UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn !== true) {
      // window.alert("Access not allowed!");
      this.router.navigate(['login'])
      // const role = next.data.role;
    }
    return true;
    
  }
 
  // canActivateproject(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<any> | Promise<boolean> | boolean {
  //     const expectedRole = next.data.expectedRole;
  //     if ( this.authService.Role !== expectedRole) {
  //       console.log("success");
  //       // this.authService.showToast('You are not authorized to access !!', 'Error', 'errorToastr')
  //       this.router.navigate(['/'] 
  //     // {
  //     //      queryParams: {
  //     //        return: state.url
  //     //    }
  //     //  }
  //     );
  //        return false;
  //      }
  // }
}