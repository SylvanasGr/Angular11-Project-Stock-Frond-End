import {Injectable} from '@angular/core';
import {SsoService} from './sso.service';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
  
  constructor(private ssoService: SsoService) {}
  
  login() {
    let domain = window.location.origin;
    
    let organizationPosition = this.ssoService.isFederationDomain(domain);
  
    if (organizationPosition !== -1) {
      let federationOrganizations = environment.ssoFederationOrganizations.split(',');
    
      window.location.href = environment.ssoUrl + '/extended_api/feds/federationPrelogin?fedType=wso2' +
        '&application=' + environment.ssoApplication +
        '&organization=' + encodeURI(federationOrganizations[organizationPosition]) +
        '&client_id=' + environment.ssoClientId +
        '&response_type=' + environment.ssoResponseType +
        '&redirect_uri=' + encodeURI(domain + '/logincallback');
    }
    else {
      window.location.href = environment.ssoUrl + '/authorize' +
        '?application=' + environment.ssoApplication +
        '&client_id=' + environment.ssoClientId +
        '&response_type=' + environment.ssoResponseType +
        '&redirect_uri=' + encodeURI(domain + '/logincallback');
    }
  }
  
  logout() {
    let ssoAuth = JSON.parse(localStorage.getItem('ssoAuth'));
    if (ssoAuth) {
      this.removeAuthAndUserStorage();
      this.ssoService.logoutByIdToken(ssoAuth.idToken);
    }
  }
  
  removeAuthAndUserStorage() {
    localStorage.removeItem('ssoAuth');
    localStorage.removeItem('ssoToitsuUserInfo');
    localStorage.removeItem('ssoToitsuUserAddress');
    localStorage.removeItem('ssoToitsuUserPrivileges');
    localStorage.removeItem('ssoToitsuUserData');
    this.removeAllArgsAndPagingFromStorage();
  }
  
  removeAllArgsAndPagingFromStorage() {
    let localStorageKeys = Object.entries(localStorage);
    for (let localStorageKey of localStorageKeys) {
      if (localStorageKey[0].startsWith('ToitsuTable')) {
        localStorage.removeItem(localStorageKey[0]);
      }
    }
  }
  
  dateInFuture(expirationDateString) {
    let expirationDate = new Date(expirationDateString);
    let now = new Date();
    return expirationDate > now;
  }
  
  isAuthStorageCreated() {
    let ssoAuth = JSON.parse(localStorage.getItem('ssoAuth'));
    
    if (ssoAuth) {
      return this.dateInFuture(ssoAuth['expires']);
    }
    return false;
  }
  
  areUserStoragesCreated() {
    return !!(localStorage.getItem('ssoToitsuUserInfo') && localStorage.getItem('ssoToitsuUserAddress') && localStorage.getItem('ssoToitsuUserPrivileges'));
  }
  
  isLoggedIn() {
    if (this.isAuthStorageCreated()) {
      return true;
    }
    else {
      this.removeAuthAndUserStorage();
      return false;
    }
  }
  
  isLoggedInWithUserStorage() {
    let ssoAuth = JSON.parse(localStorage.getItem('ssoAuth'));
    if (ssoAuth) {
      if (this.dateInFuture(ssoAuth['expires'])) {
        if (!this.areUserStoragesCreated()) {
          this.ssoService.getUserInfo().subscribe(
            responseData => {
              return true;
            },
            responseError => {
              this.removeAuthAndUserStorage();
              return false;
            }
          );
        }
        else {
          return true;
        }
      }
      else {
        this.removeAuthAndUserStorage();
        return false;
      }
    }
    else {
      this.removeAuthAndUserStorage();
      return false;
    }
  }
  
  getUserDisplayName() {
    let displayName = '';
    let ssoToitsuUserInfo = JSON.parse(localStorage.getItem('ssoToitsuUserInfo'));
    if (ssoToitsuUserInfo) {
      if (ssoToitsuUserInfo['name']) {
        displayName = ssoToitsuUserInfo['name'];
      }
      else if (ssoToitsuUserInfo['preferredUsername']) {
        displayName = ssoToitsuUserInfo['preferredUsername'];
      }
      else if (ssoToitsuUserInfo['nickname']) {
        displayName = ssoToitsuUserInfo['nickname'];
      }
      else if (ssoToitsuUserInfo['email']) {
        displayName = ssoToitsuUserInfo['email'];
      }
    }
    return displayName;
  }
  
  getUserOrgName() {
    let orgName = '';
    let ssoToitsuUserInfo = JSON.parse(localStorage.getItem('ssoToitsuUserInfo'));
    if (ssoToitsuUserInfo) {
      if (ssoToitsuUserInfo['org']) {
        orgName = ssoToitsuUserInfo['org'];
      }
    }
    return orgName;
  }
  
  hasPermission(permission: string) {
    
    if (!this.isAuthStorageCreated()) {
      return false;
    }
    
    if (!permission) {
      return true;
    }
    
    let ssoToitsuUserPrivileges = JSON.parse(localStorage.getItem('ssoToitsuUserPrivileges'));
    
    if (ssoToitsuUserPrivileges) {
      if (ssoToitsuUserPrivileges['openonesso_scope'].indexOf(permission) >= 0) {
        return true;
      }
    }
    
    return false;
  }
  
  hasAnyPermission(permissions: string[]) {
    
    if (!this.isAuthStorageCreated()) {
      return false;
    }
    
    if (!permissions || !permissions.length) {
      return true;
    }
    
    let ssoToitsuUserPrivileges = JSON.parse(localStorage.getItem('ssoToitsuUserPrivileges'));
    
    if (ssoToitsuUserPrivileges) {
      for (let permission of permissions) {
        if (ssoToitsuUserPrivileges['openonesso_scope'].indexOf(permission) >= 0) {
          return true;
        }
      }
    }
    
    return false;
  }
  
  hasAllPermissions(permissions: string[]) {
    
    if (!this.isAuthStorageCreated()) {
      return false;
    }
    
    if (!permissions || !permissions.length) {
      return true;
    }
    
    let ssoToitsuUserPrivileges = JSON.parse(localStorage.getItem('ssoToitsuUserPrivileges'));
    
    if (ssoToitsuUserPrivileges) {
      for (let permission of permissions) {
        if (ssoToitsuUserPrivileges['openonesso_scope'].indexOf(permission) === -1) {
          return false;
        }
      }
    }
    
    return true;
  }
}
