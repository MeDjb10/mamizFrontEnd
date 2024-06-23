import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/static/navbar/navbar.component';
import { HomeComponent } from './components/static/home/home.component';
import { AcceuilComponent } from './components/dynamic/home/acceuil/acceuil.component';
import { AllAteliersComponent } from './components/dynamic/Atelier/all-ateliers/all-ateliers.component';
import { AtelierDetailsComponent } from './components/dynamic/Atelier/atelier-details/atelier-details.component';
import { AllEventsComponent } from './components/dynamic/Events/all-events/all-events.component';
import { AllForumsComponent } from './components/dynamic/Forum/all-forums/all-forums.component';
import { AllDepotsComponent } from './components/dynamic/Depot/all-depots/all-depots.component';
import { ListeDepotComponent } from './components/dynamic/Depot/liste-depot/liste-depot.component';
import { DepotDetailsComponent } from './components/dynamic/Depot/depot-details/depot-details.component';
import { AllMedecinComponent } from './components/dynamic/medecin/all-medecin/all-medecin.component';
import { FormsComponent } from './components/dynamic/info/forms/forms.component';
import { LoginComponent } from './components/dynamic/info/login/login.component';
import { SignupComponent } from './components/dynamic/info/signup/signup.component';
import { EventDetailsComponent } from './components/dynamic/Events/event-details/event-details.component';
import { AllArticleComponent } from './components/dynamic/Article/all-article/all-article.component';
import { YourPostsComponent } from './components/dynamic/user/your-posts/your-posts.component';
import { UserProfileComponent } from './components/dynamic/user/user-profile/user-profile.component';
import { GeneralInfoComponent } from './components/static/general-info/general-info.component';
import { AboutUsComponent } from './components/static/about-us/about-us.component';
import { DepotTermsComponent } from './components/static/depot-terms/depot-terms.component';
import { FAQComponent } from './components/static/faq/faq.component';
import { PolitiqueConfiComponent } from './components/static/politique-confi/politique-confi.component';
import { DashboardComponent } from './components/dynamic/dashboard/dashboard/dashboard.component';
import { AdminListArticleComponent } from './components/dynamic/dashboard/admin-list-article/admin-list-article.component';
import { AdminFormArticleComponent } from './components/dynamic/dashboard/admin-form-article/admin-form-article.component';
import { AdminListDepotsComponent } from './components/dynamic/dashboard/admin-list-depots/admin-list-depots.component';
import { AdminListEventComponent } from './components/dynamic/dashboard/admin-list-event/admin-list-event.component';
import { AdminFormEventComponent } from './components/dynamic/dashboard/admin-form-event/admin-form-event.component';
import { AdminListAtelierComponent } from './components/dynamic/dashboard/admin-list-atelier/admin-list-atelier.component';
import { AdminFormAtelierComponent } from './components/dynamic/dashboard/admin-form-atelier/admin-form-atelier.component';
import { AdminListPostsComponent } from './components/dynamic/dashboard/admin-list-posts/admin-list-posts.component';
import { AdminListUsersComponent } from './components/dynamic/dashboard/admin-list-users/admin-list-users.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'acceuil', pathMatch: 'full' },
      { path: 'acceuil', title: ' Acceuil', component: AcceuilComponent },
      { path: 'article', title: ' Articles', component: AllArticleComponent },
      { path: 'atelier', title: ' Ateliers', component: AllAteliersComponent },
      { path: 'event', title: ' Evenement', component: AllEventsComponent },
      { path: 'forum', title: ' Forum', component: AllForumsComponent },
      { path: 'atelier-details/:id', component: AtelierDetailsComponent },
      { path: 'event-details/:id', component: EventDetailsComponent },
      {
        path: 'depot',
        title: 'Depots',
        component: AllDepotsComponent,
        children: [
          { path: 'listedepots', component: ListeDepotComponent },
          { path: 'depot-details/:id', component: DepotDetailsComponent },
          { path: '', redirectTo: 'listedepots', pathMatch: 'full' },
        ],
      },
      { path: 'medcin', title: ' Medcin', component: AllMedecinComponent },
      { path: 'userProfile', title: ' Votre compte', component: UserProfileComponent },
      { path: 'yourPosts', title: 'Vous Questions', component: YourPostsComponent },
      {
        path: 'info', component: GeneralInfoComponent, children: [
          { path: 'aboutUs', component: AboutUsComponent },
          { path: 'DepotTerms', component: DepotTermsComponent },
          { path: 'FAQ', component: FAQComponent },
          { path: 'PolitiqueDeConfidentialité', component: PolitiqueConfiComponent },
          { path: '', redirectTo: 'aboutUs', pathMatch: 'full' },
        ]
      },

      { path: '**', redirectTo: 'acceuil' },
    ],
  },
  {
    path: 'form',
    component: FormsComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'listArticle', component: AdminListArticleComponent },
      { path: 'formArticle', component: AdminFormArticleComponent },
      { path: 'listAtelier', component: AdminListAtelierComponent },
      { path: 'formAtelier', component: AdminFormAtelierComponent },
      { path: 'listEvents', component: AdminListEventComponent },
      { path: 'formEvent', component: AdminFormEventComponent },
      { path: 'listUsers', component: AdminListUsersComponent },
      { path: 'listDepots', component: AdminListDepotsComponent },
      { path: 'listPosts', component: AdminListPostsComponent },
      { path: '', redirectTo: 'listArticle', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
