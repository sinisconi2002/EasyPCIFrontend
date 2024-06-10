import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { BackendHttpService } from 'src/app/services/backend.service';

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

    private httpService: BackendHttpService;

    constructor(httpService: BackendHttpService, private router: Router) { 
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
    }

    private checkPasswordsMatch(): boolean {
      return this.credentials.password === this.credentials.confirmPassword;
    }
}
