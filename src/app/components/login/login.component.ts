import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticatedResponse } from 'src/app/models/authenticatedResponse';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    invalidLogin: boolean = false;
    credentials: User = {username:'', password:''};

    constructor(private router: Router, private httpService: UserService, private jwtHelper: JwtHelperService) { }

    public login ( form: NgForm) {
      if (form.valid) {
        this.httpService.authenticate(this.credentials).subscribe(
        {
            next: (response: AuthenticatedResponse) => {
              const token = response.token;
              localStorage.setItem("jwt", token); 
              this.invalidLogin = false; 
              const decodedToken = this.jwtHelper.decodeToken(token);
              console.log(decodedToken);
              const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
              this.router.navigate(["navigation/cards"]);
            },
            error: (err: HttpErrorResponse) => this.invalidLogin = true
        });
      }
      else {
        this.markFormGroupTouched(form);
      }
    }

    private markFormGroupTouched(formGroup: NgForm) {
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.controls[key];
        control.markAsTouched();
      });
    }
}