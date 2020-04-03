import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/black4-common/services/author.service';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/black4-common/models/author';

@Component({
  selector: 'app-author-show',
  templateUrl: './author-show.component.html',
  styleUrls: ['./author-show.component.css']
})
export class AuthorShowComponent implements OnInit {

  public author: Author;

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getAuthor();
  }

  getAuthor(): void {
    const authorId = +this.route.snapshot.paramMap.get('id');
    console.log('id', authorId);
    this.authorService
      .getAuthorById(authorId)
      .subscribe(
        author => {
          this.author = author;
        })
  }
}
