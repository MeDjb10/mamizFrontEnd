import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ArticleType } from 'src/app/serverSide/enum/article-type';
import { ArticleService } from 'src/app/serverSide/services/article.service';

@Component({
  selector: 'app-admin-form-article',
  templateUrl: './admin-form-article.component.html',
  styleUrls: ['./admin-form-article.component.css'],
  providers: [MessageService],
})
export class AdminFormArticleComponent {
  articleForm: FormGroup;
  themes = Object.values(ArticleType);

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private articleService: ArticleService,
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      theme: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      mainPic: ['', Validators.required],
      chapters: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.addChapter(); // Initialize with one chapter
  }

  get chapters(): FormArray {
    return this.articleForm.get('chapters') as FormArray;
  }

  addChapter(): void {
    const chapterForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      photo: ['', Validators.required],
    });
    this.chapters.push(chapterForm);
  }

  removeChapter(index: number): void {
    this.chapters.removeAt(index);
  }

  onMainPicSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.articleForm.patchValue({ mainPic: file.name });
    }
  }

  onChapterPhotoSelected(event: Event, index: number): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.chapters.at(index).patchValue({ photo: file.name });
    }
  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    const timezoneOffset = -date.getTimezoneOffset();
    

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      
     
      const dateControl = this.articleForm.get('date');
      if (dateControl) {
        const date = new Date(dateControl.value);
        const formattedDate = this.formatDate(date);
        this.articleForm.patchValue({ date: formattedDate });
      }

      const articleData = this.articleForm.value;
       console.log(articleData);
      this.articleService.create(articleData).subscribe({
        next: (response) => {
          console.log('Article created', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Article created successfully',
          });
          this.articleForm.reset();
        },
        error: (error) => {
          console.error('Error creating article', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create article',
          });
        },
      });
    }
  }
} 
