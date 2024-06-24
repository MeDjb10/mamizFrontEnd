import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EventService } from 'src/app/serverSide/services/event.service';

@Component({
  selector: 'app-admin-form-event',
  templateUrl: './admin-form-event.component.html',
  styleUrls: ['./admin-form-event.component.css'],
})
export class AdminFormEventComponent {
  eventForm: FormGroup;

  constructor(private fb: FormBuilder,private messageService:MessageService,private eventService:EventService) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      photo: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onPhotoSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.eventForm.patchValue({ photo: file.name });
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
    if (this.eventForm.valid) {
      const dateControl = this.eventForm.get('date');
      if (dateControl) {
        const date = new Date(dateControl.value);
        const formattedDate = this.formatDate(date);
        this.eventForm.patchValue({ date: formattedDate });
      }

      const eventData = this.eventForm.value;
      console.log('Event Data:', eventData);
      this.eventService.create(eventData).subscribe({
        next: (response) => {
          console.log('event created', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Article created successfully',
          });
          this.eventForm.reset();
        },
        error: (error) => {
          console.error('Error creating event', error);
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
    this.eventForm.reset();
  }
}
