import { NgModule,LOCALE_ID, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
//primeNG.component
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { SidebarModule } from 'primeng/sidebar';
import { FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListMedcinComponent } from './components/dynamic/Forum/list-medcin/list-medcin.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { GalleriaModule } from 'primeng/galleria';
import { ScrollTopModule } from 'primeng/scrolltop';
import { MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
//othercomponents
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/static/navbar/navbar.component';
import { FooterComponent } from './components/static/footer/footer.component';

import { HomeComponent } from './components/static/home/home.component';
import { AteliersComponent } from './components/dynamic/home/atelierFolder/ateliers/ateliers.component';
import { CarouselComponent } from './components/dynamic/home/carousel/carousel.component';
import { SocialmediaComponent } from './components/dynamic/home/socialmedia/socialmedia.component';
import { AcceuilComponent } from './components/dynamic/home/acceuil/acceuil.component';
import { ArticlesComponent } from './components/dynamic/home/article/articles/articles.component';
import { EventsComponent } from './components/dynamic/home/eventFolder/events/events.component';
import { DepotComponent } from './components/dynamic/home/depotFolder/depot/depot.component';
import { ArticleBigCardComponent } from './components/dynamic/home/article/article-big-card/article-big-card.component';
import { ArticleSmallCardComponent } from './components/dynamic/home/article/article-small-card/article-small-card.component';
import { HttpClientModule } from '@angular/common/http';
import { ForumComponent } from './components/dynamic/home/forumFolder/forum/forum.component';
import { FilterAtelierComponent } from './components/dynamic/Atelier/filter-atelier/filter-atelier.component';
import { AllAteliersComponent } from './components/dynamic/Atelier/all-ateliers/all-ateliers.component';
import { AtelierDetailsComponent } from './components/dynamic/Atelier/atelier-details/atelier-details.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AtelierCardComponent } from './components/dynamic/home/atelierFolder/atelier-card/atelier-card.component';
import { EventCardComponent } from './components/dynamic/home/eventFolder/event-card/event-card.component';
import { DepotCardComponent } from './components/dynamic/home/depotFolder/depot-card/depot-card.component';
import { FilterEventComponent } from './components/dynamic/Events/filter-event/filter-event.component';
import { EventDetailsComponent } from './components/dynamic/Events/event-details/event-details.component';
import { AllEventsComponent } from './components/dynamic/Events/all-events/all-events.component';
import { EventsCardComponent } from './components/dynamic/Events/events-card/events-card.component';
import { AllForumsComponent } from './components/dynamic/Forum/all-forums/all-forums.component';
import { ForumDetailsComponent } from './components/dynamic/Forum/forum-details/forum-details.component';
import { AskQuestionComponent } from './components/dynamic/Forum/question folder/ask-question/ask-question.component';
import { ForumsCardComponent } from './components/dynamic/Forum/forums-card/forums-card.component';
import { AskQuestionDivComponent } from './components/dynamic/Forum/ask-question-div/ask-question-div.component';
import { ForumFilterComponent } from './components/dynamic/Forum/forum-filter/forum-filter.component';
import { QstCardComponent } from './components/dynamic/home/forumFolder/qst-card/qst-card.component';
import { ForumAricleCardComponent } from './components/dynamic/Forum/forum-aricle-card/forum-aricle-card.component';
import { MedcinCardComponent } from './components/dynamic/Forum/medcin-card/medcin-card.component';
import { AllDepotsComponent } from './components/dynamic/Depot/all-depots/all-depots.component';
import { CreateDepotComponent } from './components/dynamic/Depot/create-depot/create-depot.component';
import { DepotDetailsComponent } from './components/dynamic/Depot/depot-details/depot-details.component';
import { CreateDepotCardComponent } from './components/dynamic/Depot/create-depot-card/create-depot-card.component';
import { DepotFilterComponent } from './components/dynamic/Depot/depot-filter/depot-filter.component';
import { DepotscardComponent } from './components/dynamic/Depot/depotscard/depotscard.component';
import { ListeDepotComponent } from './components/dynamic/Depot/liste-depot/liste-depot.component';
import { AllMedecinComponent } from './components/dynamic/medecin/all-medecin/all-medecin.component';
import { MedecinCardComponent } from './components/dynamic/medecin/medecin-card/medecin-card.component';
import { MedecinDetailsComponent } from './components/dynamic/medecin/medecin-details/medecin-details.component';
import { FilterMedecinComponent } from './components/dynamic/medecin/filter-medecin/filter-medecin.component';
import { ForumForMedecinComponent } from './components/dynamic/medecin/forum-for-medecin/forum-for-medecin.component';
import { SignupComponent } from './components/dynamic/info/signup/signup.component';
import { LoginComponent } from './components/dynamic/info/login/login.component';
import { FormsComponent } from './components/dynamic/info/forms/forms.component';
import { AllArticleComponent } from './components/dynamic/Article/all-article/all-article.component';
import { ArticleDetailsComponent } from './components/dynamic/Article/article-details/article-details.component';
import { ScrollDepotComponent } from './components/dynamic/Depot/scroll-depot/scroll-depot.component';
import { ListArticleComponent } from './components/dynamic/Article/list-article/list-article.component';
import { ArticleTabsComponent } from './components/dynamic/Article/article-tabs/article-tabs.component';
import { YourPostsComponent } from './components/dynamic/user/your-posts/your-posts.component';
import { UserProfileComponent } from './components/dynamic/user/user-profile/user-profile.component';
import { NewEventsCardComponent } from './components/dynamic/Events/new-events-card/new-events-card.component';
import { UserDepotsDivComponent } from './components/dynamic/user/user-depots-div/user-depots-div.component';
import { ListDepotComponent } from './components/dynamic/user/list-depot/list-depot.component';
import { UserPostsDivComponent } from './components/dynamic/user/user-posts-div/user-posts-div.component';
import { EditInfoComponent } from './components/dynamic/user/edit-info/edit-info.component';
import { AboutUsComponent } from './components/static/about-us/about-us.component';
import { DepotTermsComponent } from './components/static/depot-terms/depot-terms.component';
import { GeneralInfoComponent } from './components/static/general-info/general-info.component';
import { FAQComponent } from './components/static/faq/faq.component';
import { PolitiqueConfiComponent } from './components/static/politique-confi/politique-confi.component';
import { SidebarComponent } from './components/dynamic/dashboard/sidebar/sidebar.component';
import { DashboardComponent } from './components/dynamic/dashboard/dashboard/dashboard.component';
import { AdminListArticleComponent } from './components/dynamic/dashboard/admin-list-article/admin-list-article.component';
import { AdminFormArticleComponent } from './components/dynamic/dashboard/admin-form-article/admin-form-article.component';
import { AdminListAtelierComponent } from './components/dynamic/dashboard/admin-list-atelier/admin-list-atelier.component';
import { AdminFormAtelierComponent } from './components/dynamic/dashboard/admin-form-atelier/admin-form-atelier.component';
import { AdminFormEventComponent } from './components/dynamic/dashboard/admin-form-event/admin-form-event.component';
import { AdminListEventComponent } from './components/dynamic/dashboard/admin-list-event/admin-list-event.component';
import { AdminListDepotsComponent } from './components/dynamic/dashboard/admin-list-depots/admin-list-depots.component';
import { AdminListPostsComponent } from './components/dynamic/dashboard/admin-list-posts/admin-list-posts.component';
import { AdminListUsersComponent } from './components/dynamic/dashboard/admin-list-users/admin-list-users.component';



registerLocaleData(localeFr, 'fr');


@NgModule({
  declarations: [
    FAQComponent,
    PolitiqueConfiComponent,
    GeneralInfoComponent,
    DepotTermsComponent,
    AboutUsComponent,
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AcceuilComponent,
    AteliersComponent,
    CarouselComponent,
    SocialmediaComponent,
    ArticlesComponent,
    EventsComponent,
    DepotComponent,
    ArticleBigCardComponent,
    ArticleSmallCardComponent,
    ArticlesComponent,
    ForumComponent,
    FilterAtelierComponent,
    AllAteliersComponent,
    AtelierDetailsComponent,
    AtelierCardComponent,
    EventCardComponent,
    DepotCardComponent,
    FilterEventComponent,
    EventDetailsComponent,
    AllEventsComponent,
    EventsCardComponent,
    AllForumsComponent,
    ForumDetailsComponent,
    AskQuestionComponent,
    ForumsCardComponent,
    AskQuestionDivComponent,
    ForumFilterComponent,
    QstCardComponent,
    ListMedcinComponent,
    ForumAricleCardComponent,
    MedcinCardComponent,
    AllDepotsComponent,
    DepotDetailsComponent,
    CreateDepotComponent,
    CreateDepotCardComponent,
    DepotFilterComponent,
    DepotscardComponent,
    ListeDepotComponent,
    AllMedecinComponent,
    MedecinCardComponent,
    MedecinDetailsComponent,
    FilterMedecinComponent,
    ForumForMedecinComponent,
    SignupComponent,
    LoginComponent,
    FormsComponent,
    AllArticleComponent,
    ArticleDetailsComponent,
    ScrollDepotComponent,
    ListArticleComponent,
    ArticleTabsComponent,
    YourPostsComponent,
    UserProfileComponent,
    NewEventsCardComponent,
    UserDepotsDivComponent,
    ListDepotComponent,
    UserPostsDivComponent,
    EditInfoComponent,
    SidebarComponent,
    DashboardComponent,
    AdminListArticleComponent,
    AdminFormArticleComponent,
    AdminListAtelierComponent,
    AdminFormAtelierComponent,
    AdminFormEventComponent,
    AdminListEventComponent,
    AdminListDepotsComponent,
    AdminListPostsComponent,
    AdminListUsersComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    DynamicDialogModule,
    SidebarModule,
    FileUploadModule,
    BrowserAnimationsModule,
    AvatarModule,
    InputNumberModule,
    AutoCompleteModule,
    ToggleButtonModule,
    GalleriaModule,
    ScrollTopModule,
    ToastModule,
    CommonModule,
    TooltipModule,
    PaginatorModule,
    BadgeModule,
    OverlayPanelModule,
    TabViewModule,
    RippleModule,
    StyleClassModule,
    PanelMenuModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }, [MessageService]],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
