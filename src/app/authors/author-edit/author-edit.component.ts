import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/black4-common/services/author.service';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {

  constructor(
    private authorService: AuthorService,
  ) { }

  ngOnInit() {
  }

}
