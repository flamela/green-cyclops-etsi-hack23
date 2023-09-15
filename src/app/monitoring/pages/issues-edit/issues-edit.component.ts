import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, first } from 'rxjs';
import { Operation } from '../../../management/model/Operation';
import { Issue } from '../../model/Issue';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ProblemHttpService } from '../../services/problem-http.service';
import { OperationEntityService } from 'src/app/management/services/operation-entity.service';
import { IssueHttpService } from '../../services/issue-http.service';
import { AlarmHttpService } from '../../services/alarm-http.service';
import { Problem } from '../../model/Problem';
import { DeviceEntityService } from 'src/app/resources/services/device-entity.service';
import { Device } from 'src/app/resources/model/Device';
import { Flight } from 'src/app/management/model/Flight';
import { Path } from 'src/app/resources/model/Path';
import { PathEntityService } from 'src/app/resources/services/path-entity.service';
import { FlightEntityService } from 'src/app/management/services/flight-entity.service';

@Component({
  selector: 'app-issues-edit',
  templateUrl: './issues-edit.component.html',
  styleUrls: ['./issues-edit.component.css']
})
export class IssuesEditComponent implements OnInit {

  form!: FormGroup;
  id!: string;

  isAddMode!: boolean;
  loading = false;
  submitted = false;

  latRegx = "^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})$";
  lonRegx = "^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$";
  radioRegx = "^([0-9]{1,3})$";


  operations$!: Observable<Operation[]>;
  issues$!: Observable<Issue[]>;
  problems$!: Observable<Problem[]>;
  devices$!: Observable<Device[]>;
  flights$!: Observable<Flight[]>;
  paths$!: Observable<Path[]>;

  issue!: Issue;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private issueHttpService: IssueHttpService,
    private operationEntityService: OperationEntityService,
    private deviceEntityService: DeviceEntityService,
    private pathEntityService: PathEntityService,
    private flightEntityService: FlightEntityService,
  ) { }


  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      parent: ['', Validators.required],
      state: ['', Validators.required],
      status: ['', Validators.required],
      type: ['', Validators.required],
      subtype: ['', Validators.required],
      level: ['', Validators.required],
      description: ['', Validators.required],
      longitude: ['', [Validators.required,Validators.pattern(this.lonRegx)]],
      latitude: ['', [Validators.required,Validators.pattern(this.latRegx)]],
      radius: ['', [Validators.required,Validators.pattern(this.radioRegx)]],
      altitude: ['', [Validators.required,Validators.pattern(this.radioRegx)]],
      operatorId: ['', Validators.required],
      relatesTo: ['', Validators.required],
      deviceId: ['', Validators.required],
      flightId: ['', Validators.required],
      flightPath: ['', Validators.required],
      taskId: ['', Validators.required],
      
    });

    if (!this.isAddMode) {
      this.issueHttpService.getIssueById(this.id)
        .subscribe(x => {
          this.issue = x;
          this.form.patchValue(x);        
          //extract id from incommind data atribute href
          this.id = x._links.issue.href.split("/").reverse()[0]
        })
    }

    //Load operations
    this.operationEntityService.loaded$.subscribe(loaded => {
      if (loaded === false) {
        this.operationEntityService.getAll()
      }
      this.operations$ = this.operationEntityService.entities$;
    })

    //Load devices
    this.deviceEntityService.loaded$.subscribe(loaded => {
      if (loaded === false) {
        this.deviceEntityService.getAll()
      }
      this.devices$ = this.deviceEntityService.entities$;
    })

    //Load flights
    this.flightEntityService.loaded$.subscribe(loaded => {
      if (loaded === false) {
        this.flightEntityService.getAll()
      }
      this.flights$ = this.flightEntityService.entities$;
    })

    //Load paths
    this.pathEntityService.loaded$.subscribe(loaded => {
      if (loaded === false) {
        this.pathEntityService.getAll()
      }
      this.paths$ = this.pathEntityService.entities$;
    }) 
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  create() {

    if (!this.form.valid) {
      return;
    }

    const newIssue: Issue = {
      ...this.form.value,
      created: new Date().toISOString(),
      lastupdate: new Date().toISOString(),
    }

    this.issueHttpService.add(newIssue)
      .pipe(first())
      .subscribe({
        next: () => {
          this.openSnackBar(`Issue created successed!!`, 'right', 'top');
          this.router.navigate(['/monitoring/issues']);
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

    const updateData: Issue = {
      ...this.form.value,
      id: this.id,
      created: this.issue.created,
      lastupdate: new Date().toISOString(),
    }

    this.issueHttpService.update(updateData)
      .pipe(first())
      .subscribe({
        next: () => {
          this.openSnackBar(`Issue updated successed!!`, 'right', 'top');
          this.router.navigate(['/monitoring/issues']);
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