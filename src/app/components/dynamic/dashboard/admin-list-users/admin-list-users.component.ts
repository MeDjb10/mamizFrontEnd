import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/serverSide/classes/user';
import { UserService } from 'src/app/serverSide/services/user.service';

@Component({
  selector: 'app-admin-list-users',
  templateUrl: './admin-list-users.component.html',
  styleUrls: ['./admin-list-users.component.css'],
})
export class AdminListUsersComponent {
  users: any[] = [];
  filteredusers: any[] = [];
  displayDialog: boolean = false;
  selectedUser: User | null = null;
  originalMedcinStatus: boolean = false;
  displayDialog2: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe((data) => {
      this.users = data;
      this.filteredusers = data;
    });
  }

  onMedcinChange(user: User): void {
    this.selectedUser = user;
    this.originalMedcinStatus = user.medcin;
    this.displayDialog = true;
  }

  onSearchChange(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    if (input === '') {
      this.filteredusers = this.users;
    } else {
      this.filteredusers = this.users.filter(
        (data) =>
          (data.nom ? data.nom.toLowerCase().includes(input) : false) ||
          (data.prenom ? data.prenom.toLowerCase().includes(input) : false) ||
          (data.email ? data.email.toLowerCase().includes(input) : false),
      );
    }
  }

  confirmChangeRole() {
    if (this.selectedUser) {
      const updatedUser = {
        ...this.selectedUser,
        medcin: !this.selectedUser.medcin,
      };
      this.userService.updateUser(updatedUser).subscribe({
        next: () => {
          // Update local user list
          const index = this.users.findIndex(
            (u) => u.id === this.selectedUser!.id,
          );
          if (index !== -1) {
            this.users[index] = updatedUser;
            this.filteredusers[index] = updatedUser;
          }
          this.selectedUser = null;
          this.displayDialog = false;
        },
        error: (err) => {
          console.error('Error updating user', err);
        },
      });
    }
  }

  cancelChangeRole() {
    this.selectedUser = null;
    this.displayDialog = false;
  }

  deleteUser(user: User) {
    this.selectedUser = user;
    this.displayDialog2 = true;
  }

  confirmSup() {
    if (this.selectedUser) {
      this.userService.delete(this.selectedUser.id).subscribe({
        next: () => {
          alert('User deleted successfully'); // Step 1: Show an alert/message
          // Step 2: Update the users list
          this.users = this.users.filter(
            (user) => user.id !== this.selectedUser!.id,
          );
          this.filteredusers = this.filteredusers.filter(
            (user) => user.id !== this.selectedUser!.id,
          );
          this.selectedUser = null; // Reset selectedUser
          this.displayDialog2 = false; // Close the dialog
        },
        error: (err) => {
          console.error('Error deleting user', err);
          alert('Failed to delete user'); // Optionally, show an error message
        },
      });
    }
  }
  cancelSup() {
    this.selectedUser = null;
    this.displayDialog2 = false;
  }
}
