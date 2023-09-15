import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationEntityService } from '../../services/operation-entity.service';
import { Observable, Subject, debounce, first, map, tap, throttleTime } from 'rxjs';
import { Operation } from '../../model/Operation';
import { ProfileEntityService } from '../../services/profile-entity.service';
import { Profile } from '../../model/Profile';
import { FlightEntityService } from '../../services/flight-entity.service';
import { Flight } from '../../model/Flight';

@Component({
  selector: 'app-operations-edit',
  templateUrl: './operations-edit.component.html',
  styleUrls: ['./operations-edit.component.css']
})
export class OperationsEditComponent implements OnInit {

  form!: FormGroup;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  id!: string;

  profile_view!: string;
  name_view!: string;
  description_view!: string;

  profiles$!: Observable<Profile[]>;
  flights$!: Observable<Flight[]>;

  sendFlightActionToFlightForm = new Subject<string>();

  isAddMode!: boolean;
  loading = false;
  submitted = false;
  checked = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private operationEntityService: OperationEntityService,
    private profileEntityService: ProfileEntityService,
    private flightEntityService: FlightEntityService,
  ) { }


  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    //firstFormGroup
    this.firstFormGroup = this.formBuilder.group({
      created: [''],
      lastUpdate: [''],
      name: ['', Validators.required],
      value: ['', Validators.required],
      description: ['', Validators.required],
      state: [''],
      status: [''],
      assignedDeviceType: ['', Validators.required],
      comments: ['']
    });

    //secondFormGroup
    this.secondFormGroup = this.formBuilder.group({
      assignedFlight: ['', Validators.required],
    });

    //Join all form groups
    this.form = this.formBuilder.group({
      ...this.firstFormGroup,
      ...this.secondFormGroup
    });


    //Form is filled by Operation id  
    if (!this.isAddMode) {
      this.operationEntityService.entities$
        .pipe(
          first(),
          map(x => {
            let result = x.filter(x => x.id === this.id)
            return result[0];
          })
        ).subscribe(x => {
          try {
            //hydrate formsGroups
            this.firstFormGroup.patchValue(x)
            this.secondFormGroup.patchValue(x)
            //extract id from incommind data atribute href
            this.id = x._links.self.href.split("/").reverse()[0]
          } catch (e: any) { }
        })
    }

    //Load proflies
    this.profileEntityService.loaded$.subscribe(loaded => {
      if (loaded === false) {
        this.profileEntityService.getAll()
      }
      this.profiles$ = this.profileEntityService.entities$;
    })
    //Load flight
    this.flightEntityService.loaded$.subscribe(loaded => {
      if (loaded === false) {
        this.flightEntityService.getAll()
      }
      this.flights$ = this.flightEntityService.entities$;
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  create() {
    if (!this.form.valid) {
      return;
    }

    const newOperation: Operation = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      created: new Date().toISOString(),
      lastUpdate: new Date().toISOString(),
    }

    console.log(newOperation)

    //First add operation 
    this.operationEntityService.add(newOperation)
      .pipe(first())
      .subscribe({
        next: () => {
          this.openSnackBar(`Operation cretated successed!!`, 'right', 'top');
          //Then add a flight 
          this.sendFlightActionToFlightForm.next(this.firstFormGroup.value.name)
          this.router.navigate(['/management/operations']);
        },
        error: error => {
          this.openSnackBar("ERROR!", 'right', 'top');
        }
      })
  }

  update() {

    if (!this.form.valid) {
      return;
    }

    const updateData: Operation = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      lastUpdate: new Date().toISOString(),
      id: this.id,
    }

    //First update flight
    this.sendFlightActionToFlightForm.next('update')

    //Then update operation
    this.operationEntityService.update(updateData)
      .pipe(first())
      .subscribe({
        next: () => {
          this.openSnackBar(`${updateData.name} updated successed!!`, 'right', 'top');
          this.router.navigate(['/management/operatons']);
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
