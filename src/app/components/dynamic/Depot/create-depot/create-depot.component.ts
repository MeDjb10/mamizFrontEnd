import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DepotService } from 'src/app/serverSide/services/depot.service';
import { Depot } from 'src/app/serverSide/classes/depot';
import { UserService } from 'src/app/serverSide/services/user.service';
import { AuthServiceService } from 'src/app/serverSide/auth/auth-service.service';

@Component({
  selector: 'app-create-depot',
  templateUrl: './create-depot.component.html',
  styleUrls: ['./create-depot.component.css'],
  providers: [MessageService],
})
export class CreateDepotComponent {
  depot: FormGroup;
  uploadedFiles: any[] = [];
  user: any;
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private depotService: DepotService,
    private userService: UserService,
    private auth: AuthServiceService,
  ) {
    this.depot = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      adresse: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const userEmail = this.auth.getCurrentUserEmail();
    if (userEmail) {
      this.userService.getUserByEmail(userEmail).subscribe((user) => {
        this.user = user;
      });
    }
  }
  onSubmit() {
    if (this.depot.valid) {
      const newDepot: Depot = {
        id: 0, // This will be set by the backend
        name: this.depot.value.name,
        description: this.depot.value.description,
        adresse: this.depot.value.adresse,
        price: this.depot.value.price,
        depotDate: new Date().toISOString(),
        photos: this.uploadedFiles.map((file) => file.name), // Adjust as needed
        user: this.user, // Replace with the actual user data
      };
      console.log(newDepot);

      this.depotService.create(newDepot).subscribe({
        next: (response) => {
          console.log('Depot created', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Depot created successfully',
          });
          this.depot.reset();
          this.uploadedFiles = [];
        },
        error: (error) => {
          console.error('Error creating depot', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create depot',
          });
        },
      });
    }
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    console.log(this.uploadedFiles);

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }

  myUploader(event:any) {
    console.log('onUpload() START');
    for (let file of event.files) {
      console.log('FILE TO BE UPLOADED: ', file);
      this.uploadedFiles.push(file);
    }
    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }
}
