import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import {UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    isPasswordMatching: boolean = false;
    credentials: User = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    private httpService: UserService;

    constructor(httpService: UserService, private router: Router) { 
      this.httpService  = httpService;
    }

    public register(form: NgForm): void {
      this.isPasswordMatching = this.checkPasswordsMatch();
      if(form.valid) {
        if(this.isPasswordMatching) {
          this.router.navigate(["/login"]);
          this.httpService.register(this.credentials).subscribe((data:User) => { });
        }
        else this.router.navigate(["/register"]);
      }
      else {
        this.markFormGroupTouched(form);
      }
    }
    private checkPasswordsMatch(): boolean {
      return this.credentials.password === this.credentials.confirmPassword;
    }

    private markFormGroupTouched(formGroup: NgForm) {
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.controls[key];
        control.markAsTouched();
      });
    }
}
