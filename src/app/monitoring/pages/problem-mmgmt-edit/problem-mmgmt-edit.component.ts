import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProblemHttpService } from '../../services/problem-http.service';
import { Problem } from '../../model/Problem';
import { Observable, first, switchMap, tap } from 'rxjs';
import { OperationEntityService } from 'src/app/management/services/operation-entity.service';
import { Operation } from '../../../management/model/Operation';
import { Issue } from '../../model/Issue';
import { IssueHttpService } from '../../services/issue-http.service';

@Component({
  selector: 'app-problem-mmgmt-edit',
  templateUrl: './problem-mmgmt-edit.component.html',
  styleUrls: ['./problem-mmgmt-edit.component.css']
})
export class ProblemMmgmtEditComponent implements OnInit {

  form!: FormGroup;
  id!: string;

  isAddMode!: boolean;
  loading = false;
  submitted = false;

  operations$!: Observable<Operation[]>;
  issues$!: Observable<Issue[]>;

  problem!: Problem;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private problemHttpService: ProblemHttpService,
    private operationEntityService: OperationEntityService,
    private issueHttpService: IssueHttpService
  ) { }


  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      state: ['', Validators.required],
      status: ['', Validators.required],
      type: ['', Validators.required],
      subtype: ['', Validators.required],
      level: ['', Validators.required],
      description: ['', Validators.required],
      observerId: ['', Validators.required],
      relatesTo: ['', Validators.required],
      parent: ['', Validators.required],
    });

    if (this.isAddMode) {
      this.form.get('parent')?.disable()
    }

    if (!this.isAddMode) {
      this.problemHttpService.getProblemById(this.id)
        .subscribe(x => {
          this.problem = x;
          this.form.patchValue(x);        
          //extract id from incommind data atribute href
          this.id = x._links.problem.href.split("/").reverse()[0]
        })
    }

    //Load operation
    this.operationEntityService.loaded$.subscribe(loaded => {
      if (loaded === false) {
        this.operationEntityService.getAll()
      }
      this.operations$ = this.operationEntityService.entities$;
    })

    //Load operation
    this.issues$ = this.issueHttpService.getAll()
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }


  onOperationChange(operation: string) {
    this.issues$ = this.operations$.pipe(
      switchMap(x => {
        return this.issueHttpService.findIssueByRelated(operation)
      }),
      tap(x => {
        if (x.length == 0) {
          this.form.get('parent')?.disable()
        } else {
          this.form.get('parent')?.enable()
        }
      })
    );
  }

  create() {

    if (!this.form.valid) {
      return;
    }

    const newDevice: Problem = {
      ...this.form.value,
      created: new Date().toISOString(),
      lastupdate: new Date().toISOString(),
    }

    this.problemHttpService.add(newDevice)
      .pipe(first())
      .subscribe({
        next: () => {
          this.openSnackBar(`Problem created successed!!`, 'right', 'top');
          this.router.navigate(['/monitoring/problem-mmgmt']);
        },
        error: error => {
          console.log(error)
          this.openSnackBar("ERROR!", 'right', 'top');
        }
      })
  }

  update() {

    if (!this.form.valid) {
      return;
    }

    const updateData: Problem = {
      ...this.form.value,
      id: this.id,
      created: this.problem.created,
      lastupdate: new Date().toISOString(),
    }
    console.log(updateData)

    this.problemHttpService.update(updateData)
      .pipe(first())
      .subscribe({
        next: () => {
          this.openSnackBar(`Problem updated successed!!`, 'right', 'top');
          this.router.navigate(['/monitoring/problem-mmgmt']);
        },
        error: error => {
          this.openSnackBar("ERROR!", 'right', 'top');
        }
      })
  }

  public openSnackBar(message: string, horizontalPosition: MatSnackBarHorizontalPosition, verticalPosition: MatSnackBarVerticalPosition) {
    this._snackBar.open(message, 'Exit', {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      duration: 3000,
    });
  }
}