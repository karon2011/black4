import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthorService } from 'src/black4-common/services/author.service';
import { Author } from 'src/black4-common/models/author';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';



@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements AfterViewInit {

  public loading = true;
  public authors: Author[];
  public matdatasource;
  dataSource=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  length: number = 0;
  pageSize: number = 3;  //displaying three cards each row
  pageSizeOptions: number[] = [3, 6, 9, 12];

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.loading = true;
    this.matdatasource = new MatTableDataSource([]);

    this.authorService.getAllAuthors()
    .subscribe(data => {
      
      this.loading = false;
      this.authors = data;
      this.dataSource = data;
      this.matdatasource.data = data;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    console.log("this.dataSource.paginator", this.dataSource.paginator);
  }
  
  ngOnInit() {
    // this.getAuthors();
  }

  // getAuthors(): void {
  //   this.loading = true;
  //   this.authorService.getAllAuthors()
  //     .subscribe(data => {
  //       this.authors = data;
  //       console.log("data", data);
  //       this.loading = false;
  //       this.dataSource = data;
  //       // this.dataSource.paginator = this.paginator;
  //       console.log("this.paginator", this.paginator)
  //     });
  // }

}
