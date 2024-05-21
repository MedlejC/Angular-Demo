import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiResponse, UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true, // Make sure this is set to true
  imports: [CommonModule, HttpClientModule], // Import CommonModule and HttpClientModule
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  currentPage: number = 1;
  totalPages: number = 0; // Used to keep track of total pages to avoid infinite skipping

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers(this.currentPage);
  }

  getUsers(page: number): void {
    this.userService.getUsers(page).subscribe({
      next: (response: ApiResponse) => {
        this.users = response.data;
        this.totalPages = response.total_pages;
      },
      error: (err) => console.error('Failed to load users', err),
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getUsers(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getUsers(this.currentPage);
    }
  }
}
