import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-sites-summary-paths',
  templateUrl: './sites-summary-paths.component.html',
  styleUrls: ['./sites-summary-paths.component.css']
})
export class SitesSummaryPathsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'locationArray'];

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