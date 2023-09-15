import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Problem, Problems } from '../../model/Problems';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ProblemHttpService } from '../../services/problem-http.service';
import { MatTableDataSource } from '@angular/material/table';
import { finalize, first, tap } from 'rxjs';
import { DialogDeleteComponent } from 'src/app/share/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-problems-table',
  templateUrl: './problems-table.component.html',
  styleUrls: ['./problems-table.component.css']
})
export class ProblemsTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id','created','lastupdate','relatesTo', 'parent', 'state', 'status', 'info'];

  @Input()
  dataInput!: Problems;

  dataSource!: any;
  problemsCount!: number;

  loading: boolean = false;
  problems!: Problems;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  PROBLEMS_SUMMARY: string = '/monitoring/problem-mmgmt-summary';
  PROBLEMS_EDIT: string = '/monitoring/problem-mmgmt-edit';


  constructor(
    public dialogo: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
    private problemHttpService: ProblemHttpService
  ) { }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.addId(this.dataInput._embedded.Problem));
    this.problemsCount = this.dataInput.page.totalElements
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
    this.paginator.page
      .pipe(
        tap(() => this.loadPage())
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
    this.router.navigate([this.PROBLEMS_SUMMARY, id]);
  }

  edit(id: string) {
    this.router.navigate([this.PROBLEMS_EDIT, id]);
  }

  delete(id: string) {
    this.dialogo
      .open(DialogDeleteComponent)
      .afterClosed()
      .subscribe((confirmado: Boolean) => {

        if (confirmado) {
          this.problemHttpService.delete(id)
            .pipe(first())
            .subscribe({
              next: () => {
                this.openSnackBar(`Problem deleted successed!!`, 'right', 'top');
                //Update table Important!! 
                this.loadPage()
              },
              error: error => {
                this.openSnackBar("ERROR!", 'right', 'top');
              }
            })
        }
      });
  }

  loadPage() {
    this.loading = true;
    this.problemHttpService.getProblems(
      {
        page: this.paginator?.pageIndex ?? 0,
        size: this.paginator?.pageSize ?? 5
      }).pipe(
        tap(problems => this.problems = problems),
        finalize(() => this.loading = false)
      ).subscribe(x => {
        this.dataSource = new MatTableDataSource(this.addId(x._embedded.Problem));
        this.problemsCount = x.page.totalElements
      }
      );
  }

  addId(problems:Problem[]):Problem[]{

    let problemsArray: Problem[] = [];
    const dataNew: Problem[] = problems
    
    dataNew.forEach(alarm => {
      let newAlarm = {
        ...alarm,
        id: alarm._links.problem.href.split("/").reverse()[0]
      }
      problemsArray.push(newAlarm)
    })
    return problemsArray;
  }

  public openSnackBar(message: string, horizontalPosition: MatSnackBarHorizontalPosition, verticalPosition: MatSnackBarVerticalPosition) {
    this._snackBar.open(message, 'Exit', {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      duration: 3000,
    });
  }
}