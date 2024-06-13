import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/static/navbar/navbar.component';
import { HomeComponent } from './components/static/home/home.component';
import { AcceuilComponent } from './components/dynamic/home/acceuil/acceuil.component';
import { AllAteliersComponent } from './components/dynamic/Atelier/all-ateliers/all-ateliers.component';
import { AtelierDetailsComponent } from './components/dynamic/Atelier/atelier-details/atelier-details.component';
import { AllEventsComponent } from './components/dynamic/Events/all-events/all-events.component';
import { AllForumsComponent } from './components/dynamic/Forum/all-forums/all-forums.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'acceuil', pathMatch: 'full' },
      { path: 'acceuil', title: ' Acceuil', component: AcceuilComponent },
      { path: 'atelier', title: ' Ateliers', component: AllAteliersComponent },
      { path: 'event', title: ' Event', component: AllEventsComponent },
      { path: 'forum', title: ' Forum', component: AllForumsComponent },
      { path: 'atelier-details/:id', component: AtelierDetailsComponent },
      
      { path: '**', redirectTo: 'acceuil' },
    ],
  },
  {path: 'forum',title:"Forum", component: AllForumsComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
