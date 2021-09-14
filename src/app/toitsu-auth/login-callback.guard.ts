import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {SsoService} from './sso.service';
import {UserService} from './user.service';
import {ToitsuNavService} from '../toitsu-layout/toitsu-nav/toitsu-nav.service';

@Injectable({providedIn: 'root'})
export class LoginCallbackGuard implements CanActivate {
  
  constructor(private router: Router,
              private authService: AuthService,
              private ssoService: SsoService,
              private userService: UserService,
              private toitsuNavService: ToitsuNavService
  ) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    
    if (!this.ssoService.loginCallback(window.location.href)) {
      return this.router.createUrlTree(['/']);
    }
    else {
      let userInfoCall = this.ssoService.getUserInfo();
      let userDataCall = this.userService.getUserData();
      
      return forkJoin([userInfoCall, userDataCall]).pipe(
        map(response => {
          this.toitsuNavService.initializeModel();
          return this.router.createUrlTree(['/']);
        }),
        catchError(error => {
          this.authService.logout();
          this.router.navigate(['/']);
          return of(false);
        })
      );
    }
  }
}
