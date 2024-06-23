import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CardComponent } from './components/card/card.component';
import { RemoteComponent } from './components/remote/remote.component';
import { TestcaseComponent } from './components/testcase/testcase.component';
import { TestComponent } from './components/test/test.component';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';
import { CardModule } from './components/card/card.module';
import { NavigationModule } from './components/navigation/navigation.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent],
  imports: [
    BrowserModule,
    NavigationModule,
    HttpClientModule, FormsModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["easpyciapi.azurewebsites.net"],
        disallowedRoutes: []
      }
    }),
    CardModule,
    NgbModule,
    AngularEditorModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
