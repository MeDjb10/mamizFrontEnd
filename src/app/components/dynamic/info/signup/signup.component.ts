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
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.signupForm = this.fb.group({
      nom: ['',[Validators.required, Validators.minLength(3)]],
      prenom: ['',[Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      numTel: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      gender: ['homme', Validators.required],
      birthDate: ['', Validators.required],
      motPasse: ['', [Validators.required, Validators.minLength(6)]],
      confirmMotPasse: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    this.formSubmitted = true;

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

    console.log('User to create', user);

    this.userService.create(user).subscribe({
      next: (response) => {
        console.log('User created successfully', response);
        this.router.navigate(['/form/login']); // Navigate to the home page or login page after signup
      },
      error: (error) => {
        console.error('Error creating user', error);
      },
    });
  }

  NavigateTo() {
    this.router.navigate(['form/login']);
  }
}
