import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AtelierService } from 'src/app/serverSide/services/atelier.service';
import { EventService } from 'src/app/serverSide/services/event.service';

@Component({
  selector: 'app-admin-form-atelier',
  templateUrl: './admin-form-atelier.component.html',
  styleUrls: ['./admin-form-atelier.component.css'],
})
export class AdminFormAtelierComponent {
  form: FormGroup;
  isUpdate = false;
  isAtelier = false;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private eventService: EventService,
    private atelierService: AtelierService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      photo: [''],
      date: ['', Validators.required],
      place: [''],
      price: [0],
      maxPlaces: [0],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.isAtelier = params['type'] === 'atelier';
      if (this.id) {
        this.isUpdate = true;
        this.loadData();
      }
    });
  }

  loadData(): void {
    if (this.isAtelier) {
      this.atelierService.getById(this.id).subscribe((data) => {
        this.form.patchValue(data);
      });
    } else {
      this.eventService.getById(this.id).subscribe((data) => {
        this.form.patchValue(data);
      });
    }
  }

  onPhotoSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.form.patchValue({ photo: file.name });
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
   

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const dateControl = this.form.get('date');
      if (dateControl) {
        const date = new Date(dateControl.value);
        const formattedDate = this.formatDate(date);
        this.form.patchValue({ date: formattedDate });
      }

      const data = this.form.value;
      if (this.isAtelier) {
        if (this.isUpdate) {
          this.atelierService.update(this.id, data).subscribe({
            next: () => this.router.navigate(['/dashboard/listAtelier']),
            error: (error) =>
              this.handleError('Failed to update atelier', error),
          });
        } else {
          this.atelierService.create(data).subscribe({
            next: () => this.router.navigate(['/dashboard/listAtelier']),
            error: (error) =>
              this.handleError('Failed to create atelier', error),
          });
        }
      } else {
        if (this.isUpdate) {
          this.eventService.update(this.id, data).subscribe({
            next: () => this.router.navigate(['/dashboard/listEvents']),
            error: (error) => this.handleError('Failed to update event', error),
          });
        } else {
          this.eventService.create(data).subscribe({
            next: () => this.router.navigate(['/dashboard/listEvents']),
            error: (error) => this.handleError('Failed to create event', error),
          });
        }
      }
    }
    
  }

  handleSuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
    
  }

  handleError(message: string, error: any): void {
    console.error(message, error);
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
}
