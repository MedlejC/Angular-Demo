import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiResponse, UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, HttpClientModule, UserModalComponent, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  allUsers: User[] = [];
  selectedUser?: User | undefined;
  modalVisible = false;
  currentPage: number = 1;
  totalPages: number = 0; // Used to keep track of total pages to avoid infinite skipping
  searchTerm: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers(this.currentPage);
  }

  getUsers(page: number): void {
    this.userService.getUsers(page).subscribe({
      next: (response: ApiResponse) => {
        this.allUsers = response.data;
        this.totalPages = response.total_pages;
        this.filterUsers();
      },
      error: (err) => console.error('Failed to load users', err),
    });
  }

  filterUsers(): void {
    const term = this.searchTerm.toLowerCase();
    if (!term) {
      this.users = this.allUsers; // Display all users if search term is empty
    } else if (!isNaN(Number(term))) {
      // Search by user ID if the search term is a number
      this.users = this.allUsers.filter((user) => user.id.toString() === term);
    } else {
      // Search by first name or last name
      this.users = this.allUsers.filter(
        (user) =>
          user.first_name.toLowerCase().includes(term) ||
          user.last_name.toLowerCase().includes(term)
      );
    }
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

  onOpenModal(user: User): void {
    this.selectedUser = user;
    this.modalVisible = true;
  }

  closeModal(): void {
    this.modalVisible = false;
    this.selectedUser = undefined;
  }
}
