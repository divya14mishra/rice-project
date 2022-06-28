import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeLayoutComponent } from './home/home-layout.component';
import { ComponentsModule } from './components/components.module';
import { InvalidrouteComponent } from './invalidroute/invalidroute.component';
import { RestrictedrouteComponent } from './restrictedroute/restrictedroute.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmdialogComponent } from './components/dialogs/confirmdialog/confirmdialog.component';
import { FiledetaildialogComponent } from './components/dialogs/filedetaildialog/filedetaildialog.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import {ChartsModule} from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeLayoutComponent,
    InvalidrouteComponent,
    RestrictedrouteComponent,
    ConfirmdialogComponent,
    FiledetaildialogComponent,
    SignupComponent,
    CreatePasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    MatInputModule ,
    MatDialogModule,
    MatCardModule,
    ComponentsModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
