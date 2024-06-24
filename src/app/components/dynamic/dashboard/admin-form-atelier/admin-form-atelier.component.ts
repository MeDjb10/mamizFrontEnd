import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AtelierService } from 'src/app/serverSide/services/atelier.service';

@Component({
  selector: 'app-admin-form-atelier',
  templateUrl: './admin-form-atelier.component.html',
  styleUrls: ['./admin-form-atelier.component.css'],
})
export class AdminFormAtelierComponent {
  atelierForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private atelierService: AtelierService,
  ) {
    this.atelierForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      place: ['', Validators.required],
      price: ['', Validators.required],
      maxPlaces: ['', Validators.required],
      photo: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onPhotoSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.atelierForm.patchValue({ photo: file.name });
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    const timezoneOffset = -date.getTimezoneOffset();

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  onSubmit(): void {
    if (this.atelierForm.valid) {
      const dateControl = this.atelierForm.get('date');
      if (dateControl) {
        const date = new Date(dateControl.value);
        const formattedDate = this.formatDate(date);
        this.atelierForm.patchValue({ date: formattedDate });
      }

      const atelierData = this.atelierForm.value;
      console.log('Atelier Data:', atelierData);
       this.atelierService.create(atelierData).subscribe({
         next: (response) => {
           console.log('Article created', response);
           this.messageService.add({
             severity: 'success',
             summary: 'Success',
             detail: 'Article created successfully',
           });
           this.atelierForm.reset();
         },
         error: (error) => {
           console.error('Error creating article', error);
           this.messageService.add({
             severity: 'error',
             summary: 'Error',
             detail: 'Failed to create article',
           });
         },
       });
    }
  }

  onReset(): void {
    this.atelierForm.reset();
  }
}
