import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, first, map } from 'rxjs';
import { SiteEntityService } from '../../services/site-entity.service';
import { Profile } from 'src/app/management/model/Profile';
import { ProfileEntityService } from 'src/app/management/services/profile-entity.service';
import { Path } from 'leaflet';
import { Zone } from '../../model/Zone';

@Component({
  selector: 'app-sites-edit',
  templateUrl: './sites-edit.component.html',
  styleUrls: ['./sites-edit.component.css']
})
export class SitesEditComponent implements OnInit {

  form!: FormGroup;
  id!:string;

  profiles$!: Observable<Profile[]>;

  isAddMode!: boolean;
  loading = false;
  submitted = false;
  checked = false;

  latRegx = "^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})$";
  lonRegx = "^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$";
  radioRegx = "^([0-9]{1,3})$";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private siteEntityService: SiteEntityService,
    private profileEntityService: ProfileEntityService
  ) { }


  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      created: [''],
      lastUpdate: [''],
      name: ['', Validators.required],
      profile: ['', Validators.required],
      description: [''],
      longitude: ['', [Validators.required,Validators.pattern(this.lonRegx)]],
      latitude: ['', [Validators.required,Validators.pattern(this.latRegx)]],
      radio: ['', [Validators.required,Validators.pattern(this.radioRegx)]],
      active: [''],
    });

    if (!this.isAddMode) {

      this.siteEntityService.entities$
        .pipe(
          map(x => {
            let result = x.filter(x => x.id === this.id)
            return result[0];
          })
        ).subscribe(x => {
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

    const newDevice: Zone = {
      ...this.form.value,
      created: new Date().toISOString(),
      lastUpdate: new Date().toISOString(),
      active: active
    }


    this.siteEntityService.add(newDevice)
      .pipe(first())
      .subscribe({
        next: () => {
          this.openSnackBar(`Side created successed!!`, 'right', 'top');
          this.router.navigate(['/resources/sites']);
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

    const updateData : Zone = {
      ...this.form.value,
      lastUpdate: new Date().toISOString(),
      id:this.id

    }

    this.siteEntityService.update(updateData)
      .pipe(first())
      .subscribe({
        next: () => {
          this.openSnackBar(`Path ${updateData.name} updated successed!!`, 'right', 'top');
          this.router.navigate(['/resources/sites']);
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
