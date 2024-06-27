import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../../serverSide/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formSubmitted = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router:Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [false],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password, remember } = this.loginForm.value;
    this.authService.login(email, password, remember);
  }

  NavigateTo() {
    this.router.navigate(['form/signup']);
  }
}
