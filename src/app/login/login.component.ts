import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Credential } from '../_models/credential.model';
import { first } from 'rxjs/operators';
import swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { CustomValidatorService } from '../_services/custom-validator.service';
import { Router } from '@angular/router';
import { AppConfigService } from '../_services/app-config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  loadAPI: Promise<any>;
  private config;
  access_token: string;
  currenctUser: string;
  expires_in;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
  ) {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
    this.config = AppConfigService.settings;
  }

  //load external javascript
  public loadScript() {
    var isfirst = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
        isfirst = true;
      }
    }

    if (!isfirst) {
      var dynamicScripts1 = ["assets/bundles/libscripts.bundle.js"];
      var dynamicScripts2 = ["assets/bundles/vendorscripts.bundle.js"];
      var dynamicScripts3 = ["assets/bundles/mainscripts.bundle.js"];

      for (var i = 0; i < dynamicScripts1.length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts1 [i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }

      for (var i = 0; i < dynamicScripts2.length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts2 [i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }

      for (var i = 0; i < dynamicScripts3.length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts3 [i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
      rememberme: [false]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    const creds = new Credential();
    creds.UserNameOrEmailAddress = this.f.username.value;
    creds.Password = this.f.password.value;

    this.submitted = true;

    // stop here if form is invalid
    if ((this.loginForm.invalid) || (creds.UserNameOrEmailAddress === '') || (creds.Password === '')) {
      return;
    }
    this.loading =  true;
    let info: string;

    //this.authService.login();

    this.authService.login(creds)
    .pipe(first())
    .subscribe(
      data => {
        for (var key in data){
          if (key == "accessToken"){
            this.access_token = data[key];
          }
          if (key == "userId"){
            this.currenctUser = data[key];
          }
          if (key == "expireInSeconds"){
            this.expires_in = data[key];
          }
        }
        if (this.f.rememberme.value){
          localStorage.setItem('access_token', this.access_token);
          localStorage.setItem('currenctUser', this.currenctUser);
          localStorage.setItem('expires_in', this.expires_in);
        }else{
          sessionStorage.setItem('access_token', this.access_token);
          sessionStorage.setItem('currenctUser', this.currenctUser);
          sessionStorage.setItem('expires_in', this.expires_in);
        }
        if ( data === null) {
          info = this.translate.instant('frontend_error_login_user_not_found_text');
          swal({
            text: info,
            title: '',
            type: 'error',
            toast: true,
            position: 'top',
            timer: this.config.errors.toast_timer,
            showConfirmButton: false
          });
          this.loading = false;
        } else {
            console.log('currenctUser = ' + this.currenctUser);
            console.log('auth service name = ' + this.authService.getname());
            window.location.href = `${this.config.redirectionApp.loggedin}#user=${this.currenctUser}`;
        }
      },
      error => {
        console.log(error);
        if ( error.status === 400 ) {
            info = this.translate.instant('frontend_error_login_email_not_valid_text');
        } else if (error.status === 404) {
            info = this.translate.instant('frontend_error_login_user_not_found_text');
        } else if (error.status === 403) {
            info = this.translate.instant('frontend_error_login_invalid_credentials_text');
        }
        swal({
          text: info,
          title: '',
          type: 'error',
          toast: true,
          position: 'top',
          timer: this.config.errors.toast_timer,
          showConfirmButton: false
        });
        this.loading = false;
      }
    );
  }
}
