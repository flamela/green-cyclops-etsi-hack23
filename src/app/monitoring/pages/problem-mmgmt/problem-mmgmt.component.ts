import { Component, OnInit } from '@angular/core';
import { Problems } from '../../model/Problems';
import { ProblemHttpService } from '../../services/problem-http.service';
import { finalize, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-problem-mmgmt',
  templateUrl: './problem-mmgmt.component.html',
  styleUrls: ['./problem-mmgmt.component.css']
})
export class ProblemMmgmtComponent implements OnInit {

  loading:boolean = false;
  problems!:Problems;

  
  routerNavigate: string = ''
  PROBLEMS_EDIT: string = '/monitoring/problem-mmgmt-edit';

  constructor(
    private router: Router,
    private problemsHttpService: ProblemHttpService) { }

  ngOnInit(): void {

    this.loading  = true;

    this.problemsHttpService.getProblems({page:  0,size:  5}).pipe(
      map(x=>this.problems = x),
      finalize(() => this.loading = false)
    ).subscribe();
  }

  create() {
    this.router.navigate([this.PROBLEMS_EDIT]);
  }
}
