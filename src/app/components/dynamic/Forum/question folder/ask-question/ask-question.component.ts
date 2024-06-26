import { Component, OnInit, AfterViewInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthServiceService } from 'src/app/serverSide/auth/auth-service.service';
import { Post } from 'src/app/serverSide/classes/post';
import { PostService } from 'src/app/serverSide/services/post.service';
import { UserService } from 'src/app/serverSide/services/user.service';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css'],
  providers: [MessageService],
})
export class AskQuestionComponent implements OnInit, AfterViewInit {
  question: FormGroup;
  user: any;
  selectedSpecialty: any;
  filteredSpecialties: any[] = [];
  specialties: any[] = [];
  isChecked = false;
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private postService: PostService,
    private userService: UserService,
    private messageService: MessageService,
    private auth:AuthServiceService
  ) {
    this.question = this.fb.group({
      theme: ['', Validators.required],
      qst: ['', Validators.required],
      detail: ['', Validators.required],
      taille: [''],
      poids: [''],
      traitement: [false],
      detailTrait: [''],
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
  }

  ngOnInit(): void {
    const userId = this.auth.getCurrentUserId();
    if (userId) {
      this.userService.getById(Number(userId)).subscribe((user) => {
        this.user = user;
      });
    }
    
      
  }

  ngAfterViewInit(): void {
    // Ensure change detection is run after the view has been initialized
    this.cdr.detectChanges();
  }

  onSubmit() {
    if (this.question.valid) {
      const newPost: Post = {
        id: 0, // Backend will generate the ID
        title: this.question.get('qst')?.value, // Add logic if title is required
        postDate: new Date().toISOString(),
        theme: this.question.get('theme')?.value.name,
        question: this.question.get('detail')?.value,
        responded: false,
        poid: this.question.get('poids')?.value,
        taille: this.question.get('taille')?.value,
        traitement: this.question.get('traitement')?.value,
        detailTrait: this.question.get('detailTrait')?.value,
        user: this.user, // Replace with actual user data
      };

      console.log(newPost);

      this.postService.addPost(newPost).subscribe({
        next: (response) => {
          console.log('post created', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Depot created successfully',
          });
          this.question.reset();
          
        },
        error: (error) => {
          console.error('Error creating post', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create depot',
          });
        },
      });;
    
      

      
    }
  }

  toggleCheckbox() {
    console.log(this.isChecked);

    this.isChecked = !this.isChecked;
  }

  filterSpecialty(event: any) {
    const query = event.query.toLowerCase();
    this.filteredSpecialties = this.specialties.filter((specialty) =>
      specialty.name.toLowerCase().includes(query),
    );
  }
}
