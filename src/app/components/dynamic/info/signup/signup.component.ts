import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/serverSide/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  passwordsMismatch: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.signupForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numTel: ['', Validators.required],
      gender: ['homme', Validators.required],
      birthDate: ['', Validators.required],
      motPasse: ['', [Validators.required, Validators.minLength(6)]],
      confirmMotPasse: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    if (
      this.signupForm.value.motPasse !== this.signupForm.value.confirmMotPasse
    ) {
      this.passwordsMismatch = true;
      return;
    }

    const user = { ...this.signupForm.value };
    delete user.confirmMotPasse;

    this.userService.create(user).subscribe({
      next: (response) => {
        console.log('User created successfully', response);
        this.router.navigate(['/']); // Navigate to the home page or login page after signup
      },
      error: (error) => {
        console.error('Error creating user', error);
      },
    });
  }

  NavigateTo(){
    this.router.navigate(['form/login']);
  }
}
