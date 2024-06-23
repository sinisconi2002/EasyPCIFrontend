import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SSHConnection } from 'src/app/models/sshConnection';
import { RemoteService } from '../remote.service';
import { v4 as uuidv4 } from 'uuid';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-remote',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './create-remote.component.html',
  styleUrl: './create-remote.component.css'
})
export class CreateRemoteComponent implements OnInit{
  remote: SSHConnection = {
    id: '',
    name: '',
    serverAddress: '',
    username: '',
    password: ''
  };

  constructor( private router: Router, private remoteService: RemoteService ) { }

  ngOnInit(): void {
    this.remote.id = uuidv4(); // Generate a new GUID for the card ID
  }
  onSubmit(): void {
    this.remoteService.createRemote(this.remote).subscribe(
      response => {
        this.router.navigate(['/navigation/remotes']);
      },
      error => {
        console.error('Error creating remote:', error);
      }
    );
  }
}