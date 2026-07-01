import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EasyPCI';
  constructor() {
    // localStorage.setItem('apiUrl', 'easypcibackend.onrender.com');
    localStorage.setItem('apiUrl', 'localhost:7206');
  }
}
