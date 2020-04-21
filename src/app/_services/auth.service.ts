import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserManager, UserManagerSettings, User } from 'oidc-client';

import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private manager = new UserManager(getClientSettings());
  private user: User | null;
  authUrl = "account/authenticate";

  constructor(private http: HttpClient, @Inject('IDENTITY_SERVER_URL') authserverUrl:string) {
    this.authUrl = authserverUrl + this.authUrl
    this.manager.getUser().then(user => {
        this.user = user;
        this._authNavStatusSource.next(this.isAuthenticated());
    });
  }

  login(Creds) {
    return this.http.post(this.authUrl, Creds, httpOptions);
    //return this.manager.signinRedirect();
  }

  async completeAuthentication() {
      this.user = await this.manager.signinRedirectCallback();
      console.log('completeAuthentication: user name=' + this.user.profile.name);
    this._authNavStatusSource.next(this.isAuthenticated());
  }

  isAuthenticated(): boolean {
    return this.user != null && !this.user.expired;
  }

  getauthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  getname(): string {
    return this.user != null ? this.user.profile.name : '';
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    //this.manager.signoutRedirect();
  }
}

// export function getClientSettings(): UserManagerSettings {
//     return {
//       authority: "https://pt-identityserver.azurewebsites.net/",
//       client_id: "angular_spa",
//       redirect_uri: "http://ptcscheduler.z19.web.core.windows.net/auth-callback",
//       post_logout_redirect_uri: "http://ptcscheduler.z19.web.core.windows.net/",
//       response_type: "id_token token",
//       scope: "openid profile userapi",
//       filterProtocolClaims: true,
//       loadUserInfo: true,
//       automaticSilentRenew: true,
//       silent_redirect_uri: "http://ptcscheduler.z19.web.core.windows.net/auth-callback"
//     };
// }

export function getClientSettings(): UserManagerSettings {
    return {
      authority: "https://pt-identityserver.azurewebsites.net/",
      client_id: "angular_spa",
      redirect_uri:
        "https://ptcscheduler.z19.web.core.windows.net/auth-callback",
      post_logout_redirect_uri:
        "https://ptcscheduler.z19.web.core.windows.net/",
      response_type: "id_token token",
      scope: "openid profile userapi",
      filterProtocolClaims: true,
      loadUserInfo: true,
      automaticSilentRenew: true,
      silent_redirect_uri:
        "https://ptcscheduler.z19.web.core.windows.net/auth-callback"
    };
}


// export function getClientSettings(): UserManagerSettings {
//   return {
//     authority: "http://localhost:5000/",
//     client_id: "angular_spa",
//     redirect_uri: "http://ptcscheduler.z19.web.core.windows.net/auth-callback",
//     post_logout_redirect_uri: "http://ptcscheduler.z19.web.core.windows.net/",
//     response_type: "id_token token",
//     scope: "openid profile userapi",
//     filterProtocolClaims: true,
//     loadUserInfo: true,
//     automaticSilentRenew: true,
//     silent_redirect_uri: "http://ptcscheduler.z19.web.core.windows.net/auth-callback"
//   };
// }