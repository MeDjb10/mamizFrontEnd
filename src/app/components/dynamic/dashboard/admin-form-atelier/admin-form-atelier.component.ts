import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AtelierService } from 'src/app/serverSide/services/atelier.service';
import { EventService } from 'src/app/serverSide/services/event.service';
import { ChangeDetectorRef } from '@angular/core';

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
  selectedFile!: File;
  atelierPhoto: string = '';

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private eventService: EventService,
    private atelierService: AtelierService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(255),
        ],
      ],
      photo: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9 ^éèàù]+.(jpg|jpeg|png)'),
        ],
      ],
      date: ['', Validators.required],
      place: ['', [Validators.required, Validators.minLength(5)]],
      price: [0, Validators.required],
      maxPlaces: [0, Validators.required],
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
      this.atelierService.getAtelierById(this.id).subscribe((data) => {
        this.form.patchValue(data);
        this.atelierPhoto = data.photoURL;
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
      this.selectedFile = file;
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

      const atelierDTO = this.form.value;
      const file: File | null = this.selectedFile || null;

      if (this.isAtelier) {
        if (this.isUpdate) {
          this.updateAtelier(this.id, JSON.stringify(atelierDTO), file);
        } else {
          this.atelierService
            .createAtelier(file, JSON.stringify(atelierDTO))
            .subscribe({
              next: () => this.router.navigate(['/dashboard/listAtelier']),
              error: (error) =>
                this.handleError('Failed to create atelier', error),
            });
        }
      } else {
        if (this.isUpdate) {
          this.eventService.update(this.id, atelierDTO).subscribe({
            next: () => this.router.navigate(['/dashboard/listEvents']),
            error: (error) => this.handleError('Failed to update event', error),
          });
        } else {
          this.eventService.create(atelierDTO).subscribe({
            next: () => this.router.navigate(['/dashboard/listEvents']),
            error: (error) => this.handleError('Failed to create event', error),
          });
        }
      }
    }
  }

  updateAtelier(id: number, updatedAtelier: any, file: File) {
    this.atelierService.getAtelierById(id).subscribe((atelier) => {
      this.atelierPhoto = '';
      this.changeDetectorRef.detectChanges();

      const formData = new FormData();
      formData.append('id', id.toString());
      formData.append('atelierDTO', JSON.stringify(updatedAtelier));
      if (file) {
        formData.append('file', file, file.name);
      }

      this.atelierService.updateAtelier(id,file, JSON.stringify(formData)).subscribe(
        (updatedAtelierResponse) => {
          this.atelierPhoto = updatedAtelierResponse.photoURL;
          this.router.navigate(['/dashboard/listAtelier']);
        },
        (error) => {
          console.error('Error updating atelier:', error);
          this.atelierPhoto = atelier.photoURL;
          this.handleError('Failed to update atelier', error);
        },
      );
    });
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
