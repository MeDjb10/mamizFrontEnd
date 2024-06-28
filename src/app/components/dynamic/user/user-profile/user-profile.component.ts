import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/serverSide/auth/auth-service.service';
import { MedcinService } from 'src/app/serverSide/services/medcin.service';
import { UserService } from 'src/app/serverSide/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  visible: boolean = false;
  isEditMode = false;
  user: any;
  atelier:any[]=[];
  filteredAtelier:any[]=[];
  searchTerm: string = '';
  private readonly USER_ID_KEY = 'user_id';
  logedIn = this.auth.isAuthenticated();
  isMedcin!: boolean;

  constructor(
    private router: Router,
    private auth: AuthServiceService,
    private userService: UserService,
    private medcinService: MedcinService,

  ) { }
  ngOnInit(): void {
    this.visible = false;
    const userId = this.auth.getCurrentUserId();
    this.userService.getById(Number(userId)).subscribe((data) => {
      this.user = data;
      this.isMedcin = (data.medcin === true);
    })
    if (this.isMedcin) {
      this.medcinService.getById(Number(userId)).subscribe((data) => {
        this.user = data;
      })
    }
    this.userService.getAteliersByUser(Number(userId)).subscribe((data)=> {this.atelier=data;this.filteredAtelier=data})
  }

  showDialog() {
    this.visible = !this.visible;
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  logOut() {
    this.auth.logout();
    this.logedIn = this.auth.isAuthenticated();
    this.router.navigate(['/home']);
  }
  navigateToDetails(id: string): void {
    this.router.navigate(['home/atelier-details', id]);
  }
  onSearchChange(event: any) {
    this.searchTerm = event.target.value.trim().toLowerCase();
    this.filterAteliers();
  }
  
  // Filter ateliers based on search term
  filterAteliers() {
    if (!this.searchTerm) {
      this.filteredAtelier = this.atelier; // Show all ateliers if search term is empty
    } else {
      this.filteredAtelier = this.atelier.filter((atelier) => {
        return atelier.title.toLowerCase().includes(this.searchTerm) ||
               atelier.description.toLowerCase().includes(this.searchTerm);
      });
    }
  }
}
