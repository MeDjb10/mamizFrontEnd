import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-ask-question-step1',
  templateUrl: './ask-question-step1.component.html',
  styleUrls: ['./ask-question-step1.component.css']
})
export class AskQuestionStep1Component {
  @Input()
  formGroup!: FormGroup;

  isChecked = false;

  toggleCheckbox() {
    this.isChecked = !this.isChecked;
  }

  selectedSpecialty: any;
  filteredSpecialties!: any[];
  specialties: any[];

  constructor() {
    this.specialties = [
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
      { name: 'Je ne sais pas' }
    ];
  }

  filterSpecialty(event: any) {
    const query = event.query.toLowerCase();
    this.filteredSpecialties = this.specialties.filter(specialty => specialty.name.toLowerCase().includes(query));
  }
}
