import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-medecin-details',
  templateUrl: './medecin-details.component.html',
  styleUrls: ['./medecin-details.component.css']
})
export class MedecinDetailsComponent {
  @Input() nom?: string;
  @Input() prenom?: string;
  @Input() specialite?: string;
  @Input() numero?: string;
  @Input() profilePic?: string;
  @Input() adresse?: string;
}
