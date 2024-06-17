import { Component } from '@angular/core';
import { Article } from 'src/app/serverSide/classes/article';
import { Medcin } from 'src/app/serverSide/classes/medcin';
import { Post } from 'src/app/serverSide/classes/post';
import { ArticleService } from 'src/app/serverSide/services/article.service';
import { MedcinService } from 'src/app/serverSide/services/medcin.service';
import { PostService } from 'src/app/serverSide/services/post.service';
import { ResponseService } from 'src/app/serverSide/services/response.service';

@Component({
  selector: 'app-all-medecin',
  templateUrl: './all-medecin.component.html',
  styleUrls: ['./all-medecin.component.css']
})
export class AllMedecinComponent {
  articles: Article[] = [];
  latestArticle: Article[] = [];
  doctors:any[]=[];
  selectedSpec:string|null=null;
  search:string='';
  filtredDoctors:any[]=[];

  constructor(
    private articleService: ArticleService,
    private medcinService: MedcinService,
  ) {}

  ngOnInit(): void {
    this.articleService.getAll().subscribe((data) => {
      this.articles = data;
      this.latestArticle = this.getLatestArticle();
    });
    this.medcinService.getAll().subscribe((data) => {
      this.doctors = data;
      this.filtredDoctors = data;
    })
  }

  getLatestArticle(): Article[] {
    return this.articles.sort((a, b) => b.date.localeCompare(a.date));
  }

  
  onSpecialtySelected(specialty: string) {
    this.selectedSpec = specialty;
    this.applyFilters();
  }

  onSearchChanged(searchTerm: string) {
    this.search = searchTerm;
    this.applyFilters();
  }

  applyFilters() {
    if(!this.search && !this.selectedSpec  || this.selectedSpec==='Afficher tous'){
      this.filtredDoctors = this.doctors;
    }else {
    this.filtredDoctors = this.doctors.filter(data => {
      const matchesSpecialty = !this.selectedSpec || data.specialite.includes(this.selectedSpec);
      const matchesSearchTerm = !this.search || 
                                data.nom.toLowerCase().includes(this.search) ||
                                data.prenom.toLowerCase().includes(this.search)||
                                data.adresse.toLowerCase().includes(this.search)  ;
      return matchesSpecialty && matchesSearchTerm;
    });}
  }

}
