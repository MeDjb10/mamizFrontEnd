import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/serverSide/auth/auth-service.service';
import { MedcinService } from 'src/app/serverSide/services/medcin.service';
import { UserService } from 'src/app/serverSide/services/user.service';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {
  isMedcin: any;
  user: any;
  private readonly USER_ID_KEY = 'user_id';
  logedIn = this.auth.isAuthenticated();
  generalInfoForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private auth: AuthServiceService,
    private userService: UserService,
    private medcinService: MedcinService,
    private fb: FormBuilder
  ) {
    this.generalInfoForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      numTel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: [''],
      specialite: ['']
    });

    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const userId = this.auth.getCurrentUserId();
    this.userService.getById(Number(userId)).subscribe((data) => {
      this.user = data;
      this.isMedcin = (data.medcin === true);
      this.populateGeneralInfoForm(data);
    })
    if (this.isMedcin) {
      this.medcinService.getById(Number(userId)).subscribe((data) => {
        this.user = data;
        this.populateGeneralInfoForm(data);
      })
    }
  }

  populateGeneralInfoForm(data: any): void {
    this.generalInfoForm.patchValue({
      nom: data.nom,
      prenom: data.prenom,
      numTel: data.numTel,
      email: data.email,
      adresse: data.adresse,
      specialite: data.specialite
    });
  }

  onSubmitGeneralInfo(): void {
    if (this.generalInfoForm.valid) {
      if (this.isMedcin) {
        this.medcinService.update(this.user.id, this.generalInfoForm.value).subscribe(() => console.log("oui")
        )
      }
    }
  }

  // onChangePassword(): void {
  //   if (this.passwordForm.valid) {
  //     const { oldPassword, newPassword } = this.passwordForm.value;
  //     const userId = this.auth.getCurrentUserId();
  //     this.userService.updatePassword(userId, newPassword).subscribe(() => {
  //       console.log('Password updated successfully');
  //     });
  //   }
  // }

}
