import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/static/navbar/navbar.component';
import { FooterComponent } from './components/static/footer/footer.component';

import { HomeComponent } from './components/static/home/home.component';
import { AteliersComponent } from './components/dynamic/ateliers/ateliers.component';
import { CarouselComponent } from './components/dynamic/carousel/carousel.component';
import { SocialmediaComponent } from './components/dynamic/socialmedia/socialmedia.component';
import { AcceuilComponent } from './components/dynamic/acceuil/acceuil.component';
import { ArticlesComponent } from './components/dynamic/articles/articles.component';
import { EventsComponent } from './components/dynamic/events/events.component';
import { DepotComponent } from './components/dynamic/depot/depot.component';

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
    DepotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
