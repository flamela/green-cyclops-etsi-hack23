import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceEntityService } from '../../services/device-entity.service';
import { Observable, first, map } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Device } from '../../model/Device';
import { Zone } from '../../model/Zone';
import { SiteEntityService } from '../../services/site-entity.service';
import { Profile } from 'src/app/management/model/Profile';
import { ProfileEntityService } from 'src/app/management/services/profile-entity.service';
import { Flight } from 'src/app/management/model/Flight';
import { FlightEntityService } from 'src/app/management/services/flight-entity.service';
import { DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-devices-edit',
  templateUrl: './devices-edit.component.html',
  styleUrls: ['./devices-edit.component.css']
})
export class DevicesEditComponent implements OnInit {

  form!: FormGroup;
  name: string = '';
  plate: string = '';
  serial: string = '';
  description: string = '';
  id!: string;

  isAddMode!: boolean;
  loading = false;
  submitted = false;
  checked = false;

  sites$!: Observable<Zone[]>;
  profiles$!: Observable<Profile[]>;
  flights$!: Observable<Flight[]>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<Date>,
    private deviceEntityService: DeviceEntityService,
    private siteEntityService: SiteEntityService,
    private profileEntityService: ProfileEntityService,
    private flightEntityService: FlightEntityService
  ) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
   }


  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      created: [''],
      lastUpdate: [''],
      expiration: ['', Validators.required],
      name: ['', Validators.required],
      plate: ['', Validators.required],
      serial: ['', Validators.required],
      state: ['', Validators.required],
      status: ['', Validators.required],
      assignedGroup: ['', Validators.required],
      assignedProfile: ['', Validators.required],
      assignedCenter: ['', Validators.required],
      relatedTo: [''],
      isParent: [''],
      description: ['', Validators.required],
      zoneId: ['', Validators.required],
      active: [''],
    });

    if (!this.isAddMode) {

      // disable fields 
      this.form.get('name')?.disable()
      this.form.get('plate')?.disable()
      this.form.get('serial')?.disable()
      this.form.get('description')?.disable()

      this.deviceEntityService.entities$
        .pipe(
          map(x => {
            let result = x.filter(x => x.id === this.id)
            return result[0];
          })
        ).subscribe(x => {
          this.form.patchValue(x)
          this.name = x.name
          this.plate = x.plate
          this.serial = x.serial
          this.description = x.description
          //extract id from incommind data atribute href
          this.id = x._links.device.href.split("/").reverse()[0]
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
    //Load flights
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

    let { active } = this.form.value;

    if (active === '') {
      active = false;
    }

    const newDevice: Device = {
      ...this.form.value,
      created: new Date().toISOString(),
      lastUpdate: new Date().toISOString(),
      active: active,
      //TODO
      isParent: null,
    }


    this.deviceEntityService.add(newDevice)
      .pipe(first())
      .subscribe({
        next: () => {
          this.openSnackBar(`Device created successed!!`, 'right', 'top');
          this.router.navigate(['/resources/devices']);
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

    let { name, plate, serial, description } = this.form.value

    const updateData: Device = {
      ...this.form.value,
      lastUpdate: new Date().toISOString(),
      name: this.name,
      plate: this.plate,
      serial: this.serial,
      description: this.description,
      id: this.id

    }

    this.deviceEntityService.update(updateData)
      .pipe(first())
      .subscribe({
        next: () => {
          this.openSnackBar(`Device ${updateData.name} updated successed!!`, 'right', 'top');
          this.router.navigate(['/resources/devices']);
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