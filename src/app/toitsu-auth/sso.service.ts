import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class SsoService {
  
  constructor(private http: HttpClient) {}
  
  loginCallback(url) {
    let callbackResponse = (url).split('#');
    if (callbackResponse.length === 2) {
      
      let responseParameters = (callbackResponse[1]).split('&');
      if (responseParameters.length >= 5) {
        
        let parameterMap = [];
        for (let i = 0; i < responseParameters.length; i++) {
          let responseParameter = responseParameters[i].split('=');
          parameterMap[responseParameter[0]] = responseParameter[1];
        }
        if (this.validateLoginResponse(parameterMap)) {
          
          let organization = callbackResponse[0].split('organization=')[1];
          let integerPositiveNumberRegex = /^[1-9]\d*$/;
          if (integerPositiveNumberRegex.test(organization)) {
            
            let ssoStorageExpires = new Date();
            ssoStorageExpires.setSeconds(ssoStorageExpires.getSeconds() + parseInt(parameterMap['expires_in']));
            let ssoAuth = {
              accessToken: parameterMap['access_token'],
              organization: organization,
              tokenType: parameterMap['token_type'],
              expiresIn: parameterMap['expires_in'],
              expires: ssoStorageExpires,
              scope: parameterMap['scope'],
              idToken: parameterMap['id_token']
            };
            localStorage.setItem('ssoAuth', JSON.stringify(ssoAuth));
            return true;
          }
          else {
            this.logoutByIdToken(parameterMap['id_token']);
            return false;
          }
        }
        else {
          return false;
        }
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }
  
  validateLoginResponse(parameterMap) {
    if (!parameterMap.access_token) {
      return false;
    }
    if (!parameterMap.token_type) {
      return false;
    }
    if (!parameterMap.expires_in) {
      return false;
    }
    if (!parameterMap.scope) {
      return false;
    }
    if (!parameterMap.id_token) {
      return false;
    }
    return true;
  }
  
  logoutByIdToken(idToken) {
    let domain = window.location.origin;
  
    if (this.isFederationDomain(domain) !== -1) {
      window.location.href = environment.ssoUrl + '/extended_api/feds/endsession' +
        '?id_token_hint=' + idToken +
        '&post_logout_redirect_uri=' + domain;
    }
    else {
      window.location.href = environment.ssoUrl + '/endsession' +
          '?id_token_hint=' + idToken +
          '&post_logout_redirect_uri=' + domain;
    }
  }
  
  isFederationDomain(domain) {
    if (!environment.ssoFederationDomains) {
      return -1;
    }
    
    let federationDomains = environment.ssoFederationDomains.split(',');
    
    for (let i = 0; i < federationDomains.length; i++) {
      if (domain.indexOf(federationDomains[i]) !== -1) {
        return i;
      }
    }
    
    return -1;
  }
  
  getUserInfo() {
    let ssoAuth = JSON.parse(localStorage.getItem('ssoAuth'));
    
    let httpParams = new HttpParams();
    httpParams = httpParams.append('organizationId', ssoAuth.organization);
    httpParams = httpParams.append('application', environment.ssoApplication);
    
    return this.http
      .get(
        environment.ssoUrl  + '/custom/userinfo',
        {
          headers: new HttpHeaders({Authorization: 'Bearer ' + ssoAuth.accessToken}),
          params: httpParams
        }
      ).pipe(
        map(response => {
          let ssoToitsuUserInfo = {
            birthdate: response['userInfo']['birthdate'],
            email: response['userInfo']['email'],
            familyName: response['userInfo']['familyName'],
            gender: response['userInfo']['gender'],
            givenName: response['userInfo']['givenName'],
            id: response['userInfo']['id'],
            locale: response['userInfo']['locale'],
            middleName: response['userInfo']['middleName'],
            name: response['userInfo']['name'],
            nickname: response['userInfo']['nickname'],
            phoneNumber: response['userInfo']['phoneNumber'],
            picture: response['userInfo']['picture'],
            preferredUsername: response['userInfo']['preferredUsername'],
            profile: response['userInfo']['profile'],
            source: response['userInfo']['source'],
            sub: response['userInfo']['sub'],
            website: response['userInfo']['website'],
            zoneinfo: response['userInfo']['zoneinfo'],
          
            app: response['customInfo']['app'],
            org: response['customInfo']['org'],
            orgId: response['customInfo']['orgId'],
            orgUuid: response['customInfo']['orgUuid'],
            orgapi_data: response['customInfo']['orgapi_data']
          };
          let ssoToitsuUserAddress = {};
          if (response['userInfo']['address']) {
            ssoToitsuUserAddress = {
              id: response['userInfo']['address']['id'],
              country: response['userInfo']['address']['country'],
              formatted: response['userInfo']['address']['formatted'],
              locality: response['userInfo']['address']['locality'],
              postalCode: response['userInfo']['address']['postalCode'],
              region: response['userInfo']['address']['region'],
              streetAddress: response['userInfo']['address']['streetAddress']
            };
          }
          let ssoToitsuUserPrivileges = {
            openonesso_scope: response['customInfo']['openonesso_scope'],
            openonesso_authority: response['customInfo']['openonesso_authority'],
          };
          localStorage.setItem('ssoToitsuUserInfo', JSON.stringify(ssoToitsuUserInfo));
          localStorage.setItem('ssoToitsuUserAddress', JSON.stringify(ssoToitsuUserAddress));
          localStorage.setItem('ssoToitsuUserPrivileges', JSON.stringify(ssoToitsuUserPrivileges));
        })
      );
  }
}
