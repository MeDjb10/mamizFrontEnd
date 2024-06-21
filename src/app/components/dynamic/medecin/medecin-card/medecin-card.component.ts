import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-medecin-card',
  templateUrl: './medecin-card.component.html',
  styleUrls: ['./medecin-card.component.css'],
})
export class MedecinCardComponent implements AfterViewInit {
  @Input() nom?: string;
  @Input() prenom?: string;
  @Input() specialite?: string;
  @Input() numTel?: string;
  @Input() profilePic?: string;
  @Input() adresse?: string;

 
  ngAfterViewInit() {
    const profileCards = document.querySelectorAll('.profile-card');
    profileCards.forEach((card) => {
      card.addEventListener('click', () => {
        const cardElement = card as HTMLElement;
        const additionalInfo = cardElement.querySelector('.additional-info') as HTMLElement;
        const isExpanded = cardElement.style.maxHeight === '200px';
        if (window.innerWidth < 1024) {
          if (isExpanded) {
            cardElement.style.maxHeight = '80px';
            if (additionalInfo) {
              additionalInfo.style.display = 'none';
            }
          } else {
            cardElement.style.maxHeight = '200px';
            if (additionalInfo) {
              additionalInfo.style.display = 'block';
            }
          }
        }
      });
    });
  }
}
