import { Component } from '@angular/core';
import { SSHConnection } from 'src/app/models/sshConnection';
import { RemoteService } from './remote.service';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-remote',
  templateUrl: './remote.component.html',
  styleUrls: ['./remote.component.css']
})
export class RemoteComponent {
  remotes: SSHConnection[] = [];
  currentPage = 1;
  pageSize = 3;
  searchText: string = '';

  constructor(private remoteService: RemoteService, private router: Router) {}

  ngOnInit(): void {
    this.loadRemotes();
  }

  loadRemotes(): void {
    if (this.searchText.trim() !== '') {
      this.remoteService.getRemotesBySearch(this.searchText)
        .subscribe(data => {
          this.remotes = data;
          this.currentPage = 1;
        });
    } else {
      this.remoteService.getRemotes()
        .subscribe(data => {
          this.remotes = data;
          this.currentPage = 1; 
        });
    }
  }

  onSearchChange(searchText: string): void {
    this.searchText = searchText;
    this.loadRemotes();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.remotes.length / this.pageSize);
  }

  get paginatedRemotes(): SSHConnection[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.remotes.slice(startIndex, startIndex + this.pageSize);
  }
}
