import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './compnents/static/navbar/navbar.component';
import { HomeComponent } from './compnents/static/home/home.component';
import { AcceuilComponent } from './compnents/Dynamic/acceuil/acceuil.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      {path:'acceuil',title:' Acceuil', component:AcceuilComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
