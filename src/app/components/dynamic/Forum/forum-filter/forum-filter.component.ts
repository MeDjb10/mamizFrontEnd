import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-forum-filter',
  templateUrl: './forum-filter.component.html',
  styleUrls: ['./forum-filter.component.css']
})
export class ForumFilterComponent {
  @Output() specialtySelected = new EventEmitter<string>();
  @Output() searchChanged = new EventEmitter<string>();
  specialties: any[] = [];
  dropdownVisible: boolean = false;

  constructor() {
    this.specialties = [
      { name: 'Afficher tous' },
      { name: 'Allergologie' },
      { name: 'Anatomie' },
      { name: 'Anesthésie' },
      { name: 'Cardiologie' },
      { name: 'Chirurgie' },
      { name: 'Dermatologie' },
      { name: 'Endocrinologie' },
      { name: 'Gastro-entérologie' },
      { name: 'Gériatrie' },
      { name: 'Gynécologie' },
      { name: 'Hématologie' },
      { name: 'Immunologie' },
      { name: 'Infectiologie' },
      { name: 'Médecine interne' },
      { name: 'Médecine légale' },
      { name: 'Médecine nucléaire' },
      { name: 'Médecine physique et de réadaptation' },
      { name: 'Néonatologie' },
      { name: 'Néphrologie' },
      { name: 'Neurologie' },
      { name: 'Obstétrique' },
      { name: 'Odontologie' },
      { name: 'Oncologie' },
      { name: 'Ophtalmologie' },
      { name: 'Orthopédie' },
      { name: 'Oto-rhino-laryngologie (ORL)' },
      { name: 'Pédiatrie' },
      { name: 'Pneumologie' },
      { name: 'Psychiatrie' },
      { name: 'Radiologie' },
      { name: 'Rhumatologie' },
      { name: 'Urologie' },
      { name: 'Vétérinaire' },
      { name: 'Médecin général' },
      { name: 'Je ne sais pas' },
    ];
  }

  onSpecialtySelected(specialty: string) {
    this.specialtySelected.emit(specialty);
    this.dropdownVisible = false;  // Hide the dropdown after selection
  }

  onSearchChange(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.searchChanged.emit(searchTerm);
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
}
