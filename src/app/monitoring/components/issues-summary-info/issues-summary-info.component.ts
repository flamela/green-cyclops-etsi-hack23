import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../../model/Issue';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-issues-summary-info',
  templateUrl: './issues-summary-info.component.html',
  styleUrls: ['./issues-summary-info.component.css']
})
export class IssuesSummaryInfoComponent implements OnInit {

  @Input()
  dataInput!: Observable<Issue>;
  form: any;

  issue!: Issue

  constructor() { }

  ngOnInit(): void {
    this.dataInput.subscribe(issue => {
      this.issue = issue;
    })
  }
}
