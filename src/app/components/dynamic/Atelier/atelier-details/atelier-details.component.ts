import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/serverSide/auth/auth-service.service';
import { AtelierService } from 'src/app/serverSide/services/atelier.service';
import { UserService } from 'src/app/serverSide/services/user.service';

@Component({
  selector: 'app-atelier-details',
  templateUrl: './atelier-details.component.html',
  styleUrls: ['./atelier-details.component.css'],
})
export class AtelierDetailsComponent implements OnInit {
  atelier: any;
  user: any;
  atelierFull: boolean = false;
  loggedIn: boolean = false; // Assuming this will be set based on authentication status
  userId!: number; // Initialize as undefined

  constructor(
    private route: ActivatedRoute,
    private atelierService: AtelierService,
    private authService: AuthServiceService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    const atelierId = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch atelier details by id
    this.atelierService.getAtelierById(atelierId).subscribe((data) => {
      this.atelier = data;
    });

    // Get current user's ID
    this.userId = Number(this.authService.getCurrentUserId());

    // Fetch user details if logged in
    if (this.userId) {
      this.userService.getById(this.userId).subscribe((user) => {
        this.user = user;
        this.loggedIn = true;
      });
    }
  }

  subscribe(): void {
    if (!this.userId) {
      console.error('User not logged in');
      return;
    }

    this.atelierService
      .subscribeToAtelier(this.userId, this.atelier.id)
      .subscribe({
        next: (response) => {
          console.log(response); // Log the response for debugging
          // Handle success here if needed
          alert("you subscribed"); // Display the message to the user
        },
        error: (error) => {
          console.error(error);
          this.atelierFull = true; // Show atelier full message or handle error as needed
        },
      });
  }
}
