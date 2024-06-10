import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { ForumComponent } from './components/dynamic/home/forum/forum.component';
import { FilterAtelierComponent } from './components/dynamic/Atelier/filter-atelier/filter-atelier.component';
import { AllAteliersComponent } from './components/dynamic/Atelier/all-ateliers/all-ateliers.component';
import { AtelierDetailsComponent } from './components/dynamic/Atelier/atelier-details/atelier-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AtelierCardComponent } from './components/dynamic/home/atelierFolder/atelier-card/atelier-card.component';
import { EventCardComponent } from './components/dynamic/home/eventFolder/event-card/event-card.component';
import { DepotCardComponent } from './components/dynamic/home/depotFolder/depot-card/depot-card.component';


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
  
  ],
  
  imports: [BrowserModule, AppRoutingModule,HttpClientModule,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
