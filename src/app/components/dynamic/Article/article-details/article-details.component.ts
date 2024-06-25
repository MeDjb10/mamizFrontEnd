import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/serverSide/classes/article';
import { ArticleService } from 'src/app/serverSide/services/article.service';

import { Location } from '@angular/common';
import { ReactionType } from 'src/app/serverSide/enum/reaction-type';
import { AuthServiceService } from 'src/app/serverSide/auth/auth-service.service';
import { ReactionService } from 'src/app/serverSide/services/reaction.service';
import { Chapter } from 'src/app/serverSide/classes/chapter';
declare var FB: any;
@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  articles: Article[] = [];
  latestArticle: Article[] = [];
  article: any;
  currentReaction: ReactionType | null = null;
  userId: any;
  articleid: any;

  categories = [
    { name: 'Tous les articles', value: '', color: '#007F73' },
    { name: 'Maman', value: 'maman', color: '#FF9EAA'},
    { name: 'Bébé', value: 'bébé', color: '#5BBCFF' },
    { name: 'Enfant', value: 'enfant', color: '#91DDCF'},
    { name: 'Grossesse', value: 'grossesse', color: '#667BC6' },
    { name: 'Préconception', value: 'préconception', color: '#FF0000' }
  ];


  constructor(
    private el: ElementRef,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private location: Location,
    private auth: AuthServiceService,
    private reactionService: ReactionService,
  ) { }

  ngOnInit(): void {
    this.articleid = Number(this.route.snapshot.paramMap.get('id'));
    this.articleService.getById(this.articleid).subscribe(data => { 
      this.article = data});
    this.userId = this.auth.getCurrentUserId();

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
    }, function (response: any) {
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

  isArabic(text: string): boolean {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text);
  }
  goBack(): void {
    this.location.back();
  }

  reactionTypeMap: { [key: string]: ReactionType } = {
    'LIKE': ReactionType.LIKE,
    'LOVE': ReactionType.LOVE,
    'HAHA': ReactionType.HAHA,
    'WOW': ReactionType.WOW,
    'SAD': ReactionType.SAD
  };


  reactToArticle(type: string) {
    if (!(type in this.reactionTypeMap)) {
      console.error(`Invalid reaction type: ${type}`);
      return;
    }
    const selectedReactionType = this.reactionTypeMap[type];

    if (this.currentReaction !== null) {
      this.reactionService.removeReaction(this.userId, this.articleid).subscribe(
        () => {
          console.log(`Removed previous reaction: ${this.currentReaction}`);
          this.currentReaction = null;
        },
      );
    }

    this.reactionService.addReaction(this.userId, this.articleid, selectedReactionType).subscribe(
      () => {
        console.log(`Reacted with ${selectedReactionType}`);
        this.currentReaction = selectedReactionType;
      },
    );
  }

  getThemeColor(theme: string): string {
    const category = this.categories.find(cat => cat.value === theme);
    return category ? category.color : '#007F73'; // Default color
  }
}
