import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  @ViewChild('carousel', { static: true }) carousel!: ElementRef;

  currentSlide = 0;
  slides: HTMLElement[] = [];
  slideInterval: any;

  ngAfterViewInit() {
    this.slides = Array.from(this.carousel.nativeElement.querySelectorAll('[data-carousel-item]'));
    if (this.slides.length > 0) {
      this.showSlide(this.currentSlide);
    }

    this.startAutoSlide();
  }

  ngOnDestroy() {
    clearInterval(this.slideInterval);
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000); // Change slide every 3 seconds
  }

  showSlide(index: number) {
    this.slides.forEach((slide, idx) => {
      slide.classList.toggle('hidden', idx !== index);
      slide.classList.toggle('block', idx === index);
    });
  }

  nextSlide() {
    if (this.slides.length > 0) {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      this.showSlide(this.currentSlide);
    }
  }

  prevSlide() {
    if (this.slides.length > 0) {
      this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
      this.showSlide(this.currentSlide);
    }
  }
}
