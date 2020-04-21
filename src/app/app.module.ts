import { AppConfigService } from './_services/app-config.service';
import { BrowserModule, Title } from '@angular/platform-browser';
import { LOCALE_ID, NgModule, APP_INITIALIZER } from '@angular/core';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WaitComponent } from './wait/wait.component';
import { AdminlistComponent } from './adminlist/adminlist.component';
import { AppRoutingModule } from './_routes/app-routing.module';
import { WizardComponent } from './wizard/wizard.component';

import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { AuthGuardService } from './_services/auth-guard.service';
import { AuthInterceptor } from './_interceptors/auth.interceptor'

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { WizardModule } from './modules/wizard/wizard.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { environment } from '../environments/environment';

registerLocaleData(en);

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function initializeApp(appConfig: AppConfigService) {
  return () => appConfig.load();
}

// export function createTranslateLoader(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

@NgModule({
  exports: [MatAutocompleteModule],
  declarations: [
    AppComponent,
    LoginComponent,
    WaitComponent,
    AdminlistComponent,
    WizardComponent,
    AuthCallbackComponent,
  ],
  imports: [
    SweetAlert2Module.forRoot(),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    WizardModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    NgxMaskModule.forRoot(options),
    ModalModule.forRoot()
  ],
  providers: [
    AppConfigService,
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppConfigService], multi: true },
    { provide: NZ_I18N, useValue: en_US },
    Title,
    { provide: 'API_BASE_URL', useValue: environment.apibaseURL },
    { provide: 'IDENTITY_SERVER_URL', useValue: environment.identityserverURL },
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
