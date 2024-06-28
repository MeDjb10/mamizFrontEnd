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
  formSubmitted = false;
  oldpassTest:boolean=false;
  newpassTest:boolean=false;
  specialties = [
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
    { name: 'Néouser'},
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
  ];
  constructor(
    private auth: AuthServiceService,
    private userService: UserService,
    private medcinService: MedcinService,
    private fb: FormBuilder
  ) {
    this.generalInfoForm = this.fb.group({
      nom: ['',[Validators.required, Validators.minLength(3)]],
      prenom: ['',[Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      numTel: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      adresse: [''],
      specialite: [this.user?.specialite,Validators.required]
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
      adresse: data.adresse,
      specialite: data.specialite
    });
  }

  onSubmitGeneralInfo(): void {
    this.formSubmitted = true;
  
    const updatedUser = {
      ...this.user,
      nom: this.generalInfoForm.get('nom')?.value,
      prenom: this.generalInfoForm.get('prenom')?.value,
      numTel: this.generalInfoForm.get('numTel')?.value,
      adresse: this.generalInfoForm.get('adresse')?.value,
      specialite: this.generalInfoForm.get('specialite')?.value
    };
  
    if (this.generalInfoForm.valid) {
      if (this.isMedcin) {
        this.medcinService.update(this.user.id, updatedUser).subscribe(() => {
          console.log("Medcin info updated");
        }, error => {
          console.error("Error updating medcin info", error);
        });
      } else {
        const { adresse, specialite, ...userInfo } = updatedUser;
        userInfo.id = this.user.id;  // Add the id to the userInfo object
        this.userService.updateUser(userInfo).subscribe(() => {
          console.log("User info updated");
        }, error => {
          console.error("Error updating user info", error);
        });
      }
    }
  }
  changePassword() {
    if (this.user && this.passwordForm.valid) {
      const { oldPassword, newPassword } = this.passwordForm.value;
      if (oldPassword === this.user.motPasse) {
        if (oldPassword !== newPassword) {
          const updatedUser = {
            ...this.user,
            motPasse: newPassword,
          };
  
          if (this.user.medcin) {
            this.medcinService.update(this.user.id, updatedUser).subscribe({
              next: () => {
                alert('Mot de passe mis à jour avec succès');
              },
              error: (err) => {
                alert('Erreur lors de la mise à jour du mot de passe');
                console.error('Erreur lors de la mise à jour du mot de passe du médecin', err);
              },
            });
          } else {
            this.userService.updateUser(updatedUser).subscribe({
              next: () => {
                alert('Mot de passe mis à jour avec succès');
              },
              error: (err) => {
                alert('Erreur lors de la mise à jour du mot de passe');
                console.error('Erreur lors de la mise à jour du mot de passe utilisateur', err);
              },
            });
          }
        } else {
          this.newpassTest=!this.newpassTest
          console.error('New password must be different from the old password');
        }
      } else {
        this.oldpassTest=!this.oldpassTest;
        console.error('Old password does not match');
      }
    }
  }
  

}
