import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Article } from 'src/app/serverSide/classes/article';
import { ArticleService } from 'src/app/serverSide/services/article.service';

declare var FB: any;
@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  articles: Article[] = [];
  latestArticle: Article[] = [];

  constructor(
    private el: ElementRef,
    private articleService: ArticleService,
  ) { }

  ngOnInit(): void {
    this.articleService.getAll().subscribe((data) => {
      this.articles = data;
      this.latestArticle = this.getLatestArticle();
    });
    this.loadFacebookSDK();

  }

  getLatestArticle(): Article[] {
    return this.articles.sort((a, b) => b.date.localeCompare(a.date));
  }


  loadFacebookSDK(): void {
    if (!document.getElementById('facebook-jssdk')) {
      let js: HTMLScriptElement, fjs = document.getElementsByTagName('script')[0];
      if (document.getElementById('facebook-jssdk')) { return; }
      js = document.createElement('script'); js.id = 'facebook-jssdk';
      js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
      if (fjs && fjs.parentNode) {
        fjs.parentNode.insertBefore(js, fjs);
      } else {
        console.error('Failed to load Facebook SDK: script tag not found');
      }
    }
  }

  shareOnFacebook(): void {
    FB.ui({
      method: 'share',
      href: window.location.href, // Share the current page URL
    }, function(response: any) {
      if (response) {
        console.log('Article shared successfully:', response);
      } else {
        console.error('Error sharing article');
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const element = this.el.nativeElement.querySelector('.sticky-container');
    if (window.pageYOffset > element.offsetTop) {
      element.classList.add('sticky-bg');
    } else {
      element.classList.remove('sticky-bg');
    }
  }
}
