import { Component, OnInit } from '@angular/core';
import { IssueHttpService } from '../../services/issue-http.service';
import { Issues } from '../../model/Issues';
import { finalize, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  loading:boolean = false;
  issues!:Issues;

  ISSUES_EDIT: string = '/monitoring/issues-edit';

  constructor(
    private router: Router,
    private issueHttpService: IssueHttpService) { }

    ngOnInit(): void {

      this.loading  = true;
  
      this.issueHttpService.getIssues({page:  0,size:  5}).pipe(
        map(x=>this.issues = x),
        finalize(() => this.loading = false)
      ).subscribe();
    }

    create() {
      this.router.navigate([this.ISSUES_EDIT]);
    }
  }
  
