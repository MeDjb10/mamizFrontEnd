import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-medcin-card',
  templateUrl: './medcin-card.component.html',
  styleUrls: ['./medcin-card.component.css']
})
export class MedcinCardComponent {
  @Input() nom?: string ;
  @Input() prenom?: string ;
  @Input() specialite?: string ;

}
