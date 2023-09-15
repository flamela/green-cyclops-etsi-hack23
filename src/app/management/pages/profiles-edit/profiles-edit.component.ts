import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileEntityService } from '../../services/profile-entity.service';
import { first, map } from 'rxjs';
import { Profile } from '../../model/Profile';

@Component({
  selector: 'app-profiles-edit',
  templateUrl: './profiles-edit.component.html',
  styleUrls: ['./profiles-edit.component.css']
})
export class ProfilesEditComponent implements OnInit {

  form!: FormGroup;
  id!:string;

  isAddMode!: boolean;
  loading = false;
  submitted = false;
  checked = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private profileEntityService: ProfileEntityService
  ) { }


  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      profile: ['', Validators.required],
      description: ['', Validators.required],
      active: [''],
      created: [''],
      lastUpdate: [''],
    });

    if (!this.isAddMode) {

      this.profileEntityService.entities$
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

    const newDevice: Profile = {
      ...this.form.value,
      created: new Date().toISOString(),
      lastUpdate: new Date().toISOString(),
      active: active
    }


    this.profileEntityService.add(newDevice)
      .pipe(first())
      .subscribe({
        next: () => {
          this.openSnackBar(`Profile created successed!!`, 'right', 'top');
          this.router.navigate(['/management/profiles']);
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

    let {name,plate,serial,description} = this.form.value

    const updateData : Profile = {
      ...this.form.value,
      lastUpdate: new Date().toISOString(),
      id:this.id
    }

    this.profileEntityService.update(updateData)
      .pipe(first())
      .subscribe({
        next: () => {
          this.openSnackBar(`${updateData.profile} updated successed!!`, 'right', 'top');
          this.router.navigate(['/management/profiles']);
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
