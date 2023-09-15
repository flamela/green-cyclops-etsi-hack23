import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-sites-summary-info',
  templateUrl: './sites-summary-info.component.html',
  styleUrls: ['./sites-summary-info.component.css']
})
export class SitesSummaryInfoComponent implements OnInit {

  displayedColumns: string[] = ['name', 'active', 'created','lastUpdate','longitude','latitude','radio', 'description'];

  @Input()
  dataInput!: any;

  dataSource!: any;

  constructor(
    public dialogo: MatDialog,
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dataInput);
  }

}
