import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css'],
})
export class AskQuestionComponent {
  question: FormGroup;
    isChecked:boolean = false;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.question = this.fb.group({
      theme: ['', Validators.required],
      qst: ['', Validators.required],
      detail: ['', Validators.required],
      taille: ['', Validators.required],
      poids: ['', Validators.required],
      traitement: [false, Validators.required],
      deatilTrait: [''],
    });

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
      { name: 'Je ne sais pas' },
    ];

    console.log(this.isChecked);
    
  }

  get stepOne() {
    return this.question.get('stepOne') as FormGroup;
  }

  onSubmit() {
    if (this.question.valid) {
      console.log(this.question.value);
    }
  }


  toggleCheckbox() {
    console.log(this.isChecked);
    
    this.isChecked = !this.isChecked;
  }

  selectedSpecialty: any;
  filteredSpecialties!: any[];
  specialties!: any[];

  filterSpecialty(event: any) {
    const query = event.query.toLowerCase();
    this.filteredSpecialties = this.specialties.filter((specialty) =>
      specialty.name.toLowerCase().includes(query),
    );
  }
}
