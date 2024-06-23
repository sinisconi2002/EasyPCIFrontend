import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SSHConnection } from 'src/app/models/sshConnection';
import { RemoteService } from '../remote.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-remote',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './view-remote.component.html',
  styleUrl: './view-remote.component.css'
})

export class ViewRemoteComponent implements OnInit {
  remote: SSHConnection= {
    id: '',
    serverAddress: '',
    username: '',
    password: '',
    name: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private remoteService: RemoteService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const remoteId = params['id'];
      this.remoteService.getRemoteById(remoteId).subscribe(
        (data: any) => {
          this.remote = data.result;
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  goBack(): void {
    this.router.navigate(['/remotes']);
  }
}
