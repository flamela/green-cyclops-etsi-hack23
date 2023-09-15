import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { PathEntityService } from '../../services/path-entity.service';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDeleteComponent } from 'src/app/share/dialog-delete/dialog-delete.component';
import { first } from 'rxjs';

@Component({
  selector: 'app-paths-table',
  templateUrl: './paths-table.component.html',
  styleUrls: ['./paths-table.component.css']
})
export class PathsTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name','zoneId', 'status', 'state','active', 'created','locationArray' ,'info'];

  @Input()
  dataInput!: any;

  @Input()
  routerNavigate!: string;

  dataSource!: any;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  DEVICES_EDIT: string = '/resources/paths-edit';


  constructor(
    public dialogo: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
    private pathEntityService: PathEntityService
  ) { }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dataInput);
  }

  ngAfterViewInit(): void {


    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  search(id: string) {
    this.router.navigate([this.routerNavigate], { queryParams: { id: id } });
  }

  edit(id: string) {
    this.router.navigate([this.DEVICES_EDIT, id]);
  }

  delete(id: string) {
    this.dialogo
      .open(DialogDeleteComponent)
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        
        if (confirmado) {
          this.pathEntityService.delete(id)
            .pipe(first())
            .subscribe({
              next: () => {
                this.openSnackBar(`Path deleted successed!!`, 'right', 'top');
                //Update table Important!! 
                this.dataSource = new MatTableDataSource(this.dataInput);
              },
              error: error => {
                this.openSnackBar("ERROR!", 'right', 'top');
              }
            })
        }
      });
  }


  public openSnackBar(message: string, horizontalPosition: MatSnackBarHorizontalPosition, verticalPosition: MatSnackBarVerticalPosition) {
    this._snackBar.open(message, 'Exit', {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      duration: 3000,
    });
  }
}