import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Issue } from '../../model/Issue';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { finalize, first, tap } from 'rxjs';
import { Issues } from '../../model/Issues';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IssueHttpService } from '../../services/issue-http.service';
import { DialogDeleteComponent } from 'src/app/share/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-issues-table',
  templateUrl: './issues-table.component.html',
  styleUrls: ['./issues-table.component.css']
})
export class IssuesTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'created', 'lastupdate', 'state', 'status', 'flightId', 'relatesTo', 'deviceId', 'info'];

  @Input()
  dataInput!: Issues;

  dataSource!: any;
  issuesCount!: number;

  loading: boolean = false;
  issues!: Issues;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  ISSUES_SUMMARY: string = '/monitoring/issues-summary';
  ISSUES_EDIT: string = '/monitoring/issues-edit';


  constructor(
    public dialogo: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
    private issueHttpService: IssueHttpService
  ) { }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.addId(this.dataInput._embedded.Issue));
    this.issuesCount = this.dataInput.page.totalElements
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
    this.paginator.page
      .pipe(
        tap(() => this.loadIssuesPage())
      ).subscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  search(id: string) {
    this.router.navigate([this.ISSUES_SUMMARY, id]);
  }

  edit(id: string) {
    this.router.navigate([this.ISSUES_EDIT, id]);
  }

  delete(id: string) {
    this.dialogo
      .open(DialogDeleteComponent)
      .afterClosed()
      .subscribe((confirmado: Boolean) => {

        if (confirmado) {
          this.issueHttpService.delete(id)
            .pipe(first())
            .subscribe({
              next: () => {
                this.openSnackBar(`Path deleted successed!!`, 'right', 'top');
                //Update table Important!! 
                this.loadIssuesPage();
              },
              error: error => {
                this.openSnackBar("ERROR!", 'right', 'top');
              }
            })
        }
      });
  }

  loadIssuesPage() {
    this.loading = true;
    this.issueHttpService.getIssues(
      {
        page: this.paginator?.pageIndex ?? 0,
        size: this.paginator?.pageSize ?? 5
      }).pipe(
        tap(issues => this.issues = issues),
        finalize(() => this.loading = false)
      ).subscribe(x => {
        this.dataSource = new MatTableDataSource(this.addId(x._embedded.Issue));
        this.issuesCount = x.page.totalElements
      }
      );
  }

  addId(issues:Issue[]):Issue[]{

    let issuesArray: Issue[] = [];
    const dataNew: Issue[] = issues
    
    dataNew.forEach(issue => {
      let newIssue = {
        ...issue,
        id: issue._links.issue.href.split("/").reverse()[0]
      }
      issuesArray.push(newIssue)
    })
    return issuesArray;
  }

  public openSnackBar(message: string, horizontalPosition: MatSnackBarHorizontalPosition, verticalPosition: MatSnackBarVerticalPosition) {
    this._snackBar.open(message, 'Exit', {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      duration: 3000,
    });
  }
}

