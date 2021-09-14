import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class UserService {
  
  constructor(private http: HttpClient) {}
  
  getUserData() {
    let ssoAuth = JSON.parse(localStorage.getItem('ssoAuth'));
    
    return this.http
      .get(
        environment.apiBaseUrl  + '/cm/users/data'
      ).pipe(
        map(response => {
          localStorage.setItem('ssoToitsuUserData', JSON.stringify(response));
        })
      );
  }
}
