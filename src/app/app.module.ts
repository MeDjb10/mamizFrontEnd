import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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





@NgModule({
  declarations: [
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
    ScrollTopModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
