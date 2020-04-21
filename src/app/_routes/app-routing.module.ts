import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { AdminlistComponent } from '../adminlist/adminlist.component';
import { WizardComponent } from '../wizard/wizard.component';
import { AuthCallbackComponent } from '../auth-callback/auth-callback.component';
import { AuthService } from '../_services/auth.service';
import { AuthGuardService } from '../_services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'adminlist', component: AdminlistComponent, canActivate: [AuthGuardService] },
  { path: 'wizard/:id', component: WizardComponent, canActivate: [AuthGuardService] },
  { path: 'auth-callback', component: AuthCallbackComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
