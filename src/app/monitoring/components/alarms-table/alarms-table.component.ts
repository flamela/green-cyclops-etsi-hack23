import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDeleteComponent } from 'src/app/share/dialog-delete/dialog-delete.component';
import { catchError, finalize, first, tap, throwError } from 'rxjs';
import { AlarmHttpService } from '../../services/alarm-http.service';
import { Alarms } from '../../model/Alarms';
import { Alarm } from '../../model/Alarm';

@Component({
  selector: 'app-alarms-table',
  templateUrl: './alarms-table.component.html',
  styleUrls: ['./alarms-table.component.css']
})
export class AlarmsTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'created', 'lastupdate', 'state', 'status', 'type', 'subtype', 'level', 'info'];

  @Input()
  dataInput!: Alarms;

  dataSource!: any;
  alarmsCount!: number;

  loading: boolean = false;
  alarms!: Alarms;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  ALARMS_SUMMARY: string = '/monitoring/alarms-summary';


  constructor(
    public dialogo: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
    private alarmHttpService: AlarmHttpService
  ) { }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.addId(this.dataInput._embedded.Alarm));
    this.alarmsCount = this.dataInput.page.totalElements
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
    this.paginator.page
      .pipe(
        tap(() => this.loadAlarmsPage())
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
    this.router.navigate([this.ALARMS_SUMMARY, id]);
  }

  edit(id: string) {
    this.router.navigate([this.ALARMS_SUMMARY, id]);
  }

  delete(id: string) {
    this.dialogo
      .open(DialogDeleteComponent)
      .afterClosed()
      .subscribe((confirmado: Boolean) => {

        if (confirmado) {
          this.alarmHttpService.delete(id)
            .pipe(first())
            .subscribe({
              next: () => {
                this.openSnackBar(`Alarm deleted successed!!`, 'right', 'top');
                //Update table Important!! 
                this.loadAlarmsPage()
              },
              error: error => {
                this.openSnackBar("ERROR!", 'right', 'top');
              }
            })
        }
      });
  }

  loadAlarmsPage() {
    this.loading = true;
    this.alarmHttpService.getAlarms(
      {
        page: this.paginator?.pageIndex ?? 0,
        size: this.paginator?.pageSize ?? 5
      }).pipe(
        tap(alarms => this.alarms = alarms),
        finalize(() => this.loading = false)
      ).subscribe(x => {
        this.dataSource = new MatTableDataSource(this.addId(x._embedded.Alarm));
        this.alarmsCount = x.page.totalElements
      }
      );
  }

  addId(alarms:Alarm[]):Alarm[]{

    let alarmsArray: Alarm[] = [];
    const dataNew: Alarm[] = alarms
    
    dataNew.forEach(alarm => {
      let newAlarm = {
        ...alarm,
        id: alarm._links.alarm.href.split("/").reverse()[0]
      }
      alarmsArray.push(newAlarm)
    })
    return alarmsArray;
  }

  public openSnackBar(message: string, horizontalPosition: MatSnackBarHorizontalPosition, verticalPosition: MatSnackBarVerticalPosition) {
    this._snackBar.open(message, 'Exit', {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      duration: 3000,
    });
  }
}