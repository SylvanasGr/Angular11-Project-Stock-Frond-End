import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  
  constructor(public translate: TranslateService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.startsWith(environment.apiBaseUrl)) {
      
      let headers = req.headers;
      
      let ssoAuth = JSON.parse(localStorage.getItem('ssoAuth'));
      if (ssoAuth) {
        headers = headers.append('Authorization', 'Bearer ' + ssoAuth.accessToken + '&organization=' + ssoAuth.organization);
      }
      
      let toitsuLanguage = localStorage.getItem('toitsuLanguage') ? localStorage.getItem('toitsuLanguage') : this.translate.defaultLang;
      if (toitsuLanguage) {
        headers = headers.append('Accept-Language', toitsuLanguage);
      }
      
      const modifiedReq = req.clone({
        headers: headers
      });
      return next.handle(modifiedReq);
      
    }
    return next.handle(req);
  }
}
