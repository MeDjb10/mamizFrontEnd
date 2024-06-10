import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AtelierService } from 'src/app/serverSide/services/atelier.service';

@Component({
  selector: 'app-atelier-details',
  templateUrl: './atelier-details.component.html',
  styleUrls: ['./atelier-details.component.css'],
})
export class AtelierDetailsComponent {
  atelier: any; // Adjust the type as needed

  constructor(
    private route: ActivatedRoute,
    private atelierService: AtelierService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.atelierService.getById(id).subscribe((data) => {
      // Adjust the type as needed
      this.atelier = data;
    });
  }
}
