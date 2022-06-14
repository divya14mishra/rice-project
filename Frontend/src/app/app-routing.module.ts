import { CreatePasswordComponent } from './create-password/create-password.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './home/home-layout.component';
import { InvalidrouteComponent } from './invalidroute/invalidroute.component';
import { LoginComponent } from './login/login.component';
import { RestrictedrouteComponent } from './restrictedroute/restrictedroute.component';
import { AuthService } from './services/auth-service.service';
import { SignupComponent } from './signup/signup.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home', component: HomeLayoutComponent, canActivate: [AuthService],
    children: [{
      path: '',
      loadChildren: () => import('./home/home-layout.module').then(m => m.HomeLayoutModule)
    }]
  },
  { path: 'login', component: LoginComponent },
  { path: 'createPassword', component: CreatePasswordComponent},
  { path: 'unauthorized', component: RestrictedrouteComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: InvalidrouteComponent },
];


@NgModule({
  imports: [CommonModule,
    BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }