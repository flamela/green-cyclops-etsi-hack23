import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Problem } from '../../model/Problem';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-problems-summary-info',
  templateUrl: './problems-summary-info.component.html',
  styleUrls: ['./problems-summary-info.component.css']
})
export class ProblemsSummaryInfoComponent implements OnInit {

  @Input()
  dataInput!: Observable<Problem>;
  form: any;

  problem!: Problem

  constructor(
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.dataInput.subscribe(problem => {
      this.problem = problem;
      console.log(this.problem)
    })
  }
}
