import { Component, OnInit } from '@angular/core';
import { FbCountService } from 'src/app/services/fb-count.service';
import { InstaCountService } from 'src/app/services/insta-count.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit{
  fbCount: number | null = null;
  instaCount: number | null = null;
  errorMessage: string | null = null;

  constructor(private facebookService: FbCountService, private instaService: InstaCountService) { }

  ngOnInit(): void {
    // this.facebookService.getFollowersCount().subscribe(
    //   data => this.fbCount = data.followers_count,
    //   error => this.errorMessage = 'Error fetching data'
    // );
    // this.instaService.getFollowersCount().subscribe(
    //   data => this.instaCount = data.followers_count,
    //   error => this.errorMessage = 'Error fetching data'
    // );
  }
}
