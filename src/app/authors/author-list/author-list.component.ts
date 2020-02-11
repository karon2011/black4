import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/black4-common/services/author.service';
import { Author } from 'src/black4-common/models/author';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  authors: Author[];

  constructor(
    private authorService: AuthorService,
  ) { }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors(): void {
    this.authorService.getAuthors()
      .subscribe(authors => {
        this.authors = authors;
      })
  }

}
