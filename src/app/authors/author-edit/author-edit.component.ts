import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/black4-common/services/author.service';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Author } from 'src/black4-common/models/author';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {

  authorForm = this.fb.group({
    name: ['', Validators.required],
    origin: [''],
    // records: this.fb.array([
    //   this.fb.group({
    //     title: [''],
    //     date: [''],
    //   })
    // ]),
    records: this.fb.group({
      title: [''],
      date: [''],
    }),
  })

  author: Author
  // authorForm: FormGroup;

  constructor(
    private authorService: AuthorService,
    private fb: FormBuilder
  ) {
    // this.authorForm = this.createFormGroup();
  }

  ngOnInit() {

  }

  createFormGroup(fb: FormBuilder) {
    return fb.group({
      name: ['fff', Validators.required],
      origin: ['ffdd', Validators.required],
      // records: this.fb.array([
      //   this.fb.group({
      //     title: [''],
      //     date: [''],
      //   })
      // ]),
      records: this.fb.group({
        title: ['dfdf'],
        date: ['dffd'],
      }),
    })
  }
  get records() {
    return this.authorForm.get('records') as FormArray;
  }


  onSubmit() {
    console.warn(this.authorForm.value);
    console.log(this.authorForm.value);

    this.authorForm.patchValue({
      name: 'Placebo',
      origin: 'UK',
      // records: {
      //   title: 'Black Market Music',
      //   date: '1997',
      // }
    });
  }

}
