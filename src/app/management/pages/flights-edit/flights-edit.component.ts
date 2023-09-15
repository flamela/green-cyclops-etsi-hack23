import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightEntityService } from '../../services/flight-entity.service';
import { Observable, first, map } from 'rxjs';
import { Flight } from '../../model/Flight';
import { ProfileEntityService } from '../../services/profile-entity.service';
import { Profile } from '../../model/Profile';
import { SiteEntityService } from 'src/app/resources/services/site-entity.service';
import { Zone } from 'src/app/resources/model/Zone';
import { PathEntityService } from 'src/app/resources/services/path-entity.service';
import { Path } from 'src/app/resources/model/Path';
import { OperationEntityService } from '../../services/operation-entity.service';
import { Operation } from '../../model/Operation';
import { DeviceEntityService } from 'src/app/resources/services/device-entity.service';
import { Device } from 'src/app/resources/model/Device';

@Component({
  selector: 'app-flights-edit',
  templateUrl: './flights-edit.component.html',
  styleUrls: ['./flights-edit.component.css']
})
export class FlightsEditComponent implements OnInit {

  form!: FormGroup;
  id!: string;

  isAddMode!: boolean;
  loading = false;
  submitted = false;

  profiles$!: Observable<Profile[]>;
  sites$!: Observable<Zone[]>;
  paths$!: Observable<Path[]>;
  operations$!: Observable<Operation[]>;
  devices$!: Observable<Device[]>;

  flight!:Flight;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private flightEntityService: FlightEntityService,
    private profileEntityService: ProfileEntityService,
    private siteEntityService: SiteEntityService,
    private pathEntityService: PathEntityService,
    private operationEntityService: OperationEntityService,
    private deviceEntityService: DeviceEntityService,
  ) { }


  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      state: ['', Validators.required],
      status: ['', Validators.required],
      profileName: ['', Validators.required],
      zoneId: ['', Validators.required],
      flightPath: ['', Validators.required],
      parent: ['', Validators.required],
      relatedTo: ['', Validators.required],
    });

    if (!this.isAddMode) {

      this.flightEntityService.entities$
        .pipe(
          map(x => {
            let result = x.filter(x => x.id === this.id)
            return result[0];
          })
        ).subscribe(x => {
          this.flight = x;
          this.form.patchValue(x)
          //extract id from incommind data atribute href
          this.id = x._links.self.href.split("/").reverse()[0]
        })
    }

    //Load profiles
    this.profileEntityService.loaded$.subscribe(loaded => {
      if (loaded === false) {
        this.profileEntityService.getAll()
      }
      this.profiles$ = this.profileEntityService.entities$;
    })
    //Load sites
    this.siteEntityService.loaded$.subscribe(loaded => {
      if (loaded === false) {
        this.siteEntityService.getAll()
      }
      this.sites$ = this.siteEntityService.entities$;
    })
    //Load paths
    this.pathEntityService.loaded$.subscribe(loaded => {
      if (loaded === false) {
        this.pathEntityService.getAll()
      }
      this.paths$ = this.pathEntityService.entities$;
    })
    //Load operation
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

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  create() {

    if (!this.form.valid) {
      return;
    }

    let { active } = this.form.value;

    if (active === '') {
      active = false;
    }

    const newDevice: Flight = {
      ...this.form.value,
      created: new Date().toISOString(),
      lastUpdate: new Date().toISOString(),
    }


    this.flightEntityService.add(newDevice)
      .pipe(first())
      .subscribe({
        next: () => {
          this.openSnackBar(`Profile created successed!!`, 'right', 'top');
          this.router.navigate(['/management/flights']);
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

    const updateData: Flight = {
      ...this.form.value,
      created: this.flight.created,
      lastUpdate: new Date().toISOString(),
      id: this.id
    }

    this.flightEntityService.update(updateData)
      .pipe(first())
      .subscribe({
        next: () => {
          this.openSnackBar(`${updateData.name} updated successed!!`, 'right', 'top');
          this.router.navigate(['/management/flights']);
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

