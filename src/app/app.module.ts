import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/static/navbar/navbar.component';
import { FooterComponent } from './components/static/footer/footer.component';

import { HomeComponent } from './components/static/home/home.component';
import { AteliersComponent } from './components/dynamic/home/ateliers/ateliers.component';
import { CarouselComponent } from './components/dynamic/home/carousel/carousel.component';
import { SocialmediaComponent } from './components/dynamic/home/socialmedia/socialmedia.component';
import { AcceuilComponent } from './components/dynamic/home/acceuil/acceuil.component';
import { ArticlesComponent } from './components/dynamic/home/article/articles/articles.component';
import { EventsComponent } from './components/dynamic/home/events/events.component';
import { DepotComponent } from './components/dynamic/home/depot/depot.component';
import { ArticleBigCardComponent } from './components/dynamic/home/article/article-big-card/article-big-card.component';
import { ArticleSmallCardComponent } from './components/dynamic/home/article/article-small-card/article-small-card.component';
import { HttpClientModule } from '@angular/common/http';

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
    ArticlesComponent
  ],
  imports: [BrowserModule, AppRoutingModule,HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
