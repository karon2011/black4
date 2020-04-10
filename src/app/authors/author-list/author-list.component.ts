import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/black4-common/services/author.service';
import { Author } from 'src/black4-common/models/author';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  public loading = true;
  public authors: Author[];

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors(): void {
    this.loading = true;
    this.authorService.getAllAuthors()
      .subscribe(data => {
        this.authors = data;
        console.log("data", data);
        this.loading = false;

      });
  }

}
