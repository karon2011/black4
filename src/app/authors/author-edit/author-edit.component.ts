import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/black4-common/services/author.service';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Author } from 'src/black4-common/models/author';
import { ActivatedRoute, Router } from '@angular/router';
// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {

  author: Author;
  messages: any[] = [];
  authorForm: FormGroup;

  // authorForm = this.fb.group({
  //   id: this.route.snapshot.params.id,
  //   name: ['', Validators.required],
  //   origin: [''],
  //   // records: this.fb.array([
  //   //   this.fb.group({
  //   //     title: [''],
  //   //     date: [''],
  //   //   })
  //   // ]),
  //   records: this.fb.group({
  //     title: [''],
  //     date: [''],
  //   }),
  // })

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.authorForm = this.fb.group({
      id: this.route.snapshot.params.id,
      name: ['', Validators.required],
      origin: ['', Validators.required],
      // records: this.fb.array([
      //   this.fb.group({
      //     title: [''],
      //     date: [''],
      //   })
      // ]),
      // records: this.fb.group({
      //   title: [''],
      //   date: [''],
      // }),
    })
    // this.authorForm = this.createFormGroup();

  }

  ngOnInit() {
    let authorId = +this.route.snapshot.params.id;
    if (authorId) {
      console.log('authorId', authorId);
      this.authorService.getAuthorById(authorId)
        .subscribe(author => {
          this.author = author;
          console.log('author ?', author);
          this.authorForm.patchValue(this.author)
        })
    }
    // else {
    //   console.log("to create");
    //   this.authorService.createAuthor(this.author)
    //     .subscribe(author => {
    //       console.log(" New Author");

    //     })
    // }
  }

  // createFormGroup(fb: FormBuilder) {
  //   return fb.group({
  //     name: ['fff', Validators.required],
  //     origin: ['ffdd', Validators.required],
  //     // records: this.fb.array([
  //     //   this.fb.group({
  //     //     title: [''],
  //     //     date: [''],
  //     //   })
  //     // ]),
  //     records: this.fb.group({
  //       title: ['dfdf'],
  //       date: ['dffd'],
  //     }),
  //   })
  // }
  get records() {
    return this.authorForm.get('records') as FormArray;
  }

  onSubmit() {
    let author_Id = this.route.snapshot.params.id;
    let f = this.authorForm.value
    console.log("f ? ", f);
    this.authorForm.patchValue({
      name: f.name,
      origin: f.origin,
      // records: {
      //   title: 'Black Market Music',
      //   date: '1997',
      // }
    });

    if (author_Id) {
      this.authorService.updateAuthor(f)
        .subscribe(
          data => {
            this.router.navigate(['authors', author_Id, 'show'])
          }
        )
    } else {
      this.authorService.createAuthor(f)
        .subscribe(author => {
          this.author = author
          console.log(" New Author", author);
        })
    }
  }

  deleteAuthor(id: number): void {
    let author_Id = this.route.snapshot.params.id;
    this.authorService.deleteAuthor(author_Id)
    .subscribe(data => {
      console.log("Author Deleted success");
      // this.router.navigate(['home'])
    })
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
  }
}
