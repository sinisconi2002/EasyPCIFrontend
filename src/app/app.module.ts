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
import { BackendHttpService } from './services/backend.service';

export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CardComponent,
    RemoteComponent,
    TestcaseComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, FormsModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["easpyciapi.azurewebsites.net"],
        disallowedRoutes: []
      }
    }),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'cards', component: CardComponent},
      { path: '', redirectTo: 'login', pathMatch: 'full'}
    ]
    ),
    NgbModule

  ],
  providers: [BackendHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
