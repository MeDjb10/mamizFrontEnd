import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-medecin-card',
  templateUrl: './medecin-card.component.html',
  styleUrls: ['./medecin-card.component.css'],
})
export class MedecinCardComponent {
  @Input() nom?: string;
  @Input() prenom?: string;
  @Input() specialite?: string;
  @Input() numTel?: string;
  @Input() profilePic?: string;
  @Input() adresse?: string;
}
