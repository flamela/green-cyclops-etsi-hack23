import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PathEntityService } from '../../services/path-entity.service';
import { Observable, first, map } from 'rxjs';
import { Path } from '../../model/Path';


import { Zone } from '../../model/Zone';
import { SiteEntityService } from '../../services/site-entity.service';

@Component({
  selector: 'app-paths-edit',
  templateUrl: './paths-edit.component.html',
  styleUrls: ['./paths-edit.component.css']
})
export class PathsEditComponent implements OnInit {

  form!: FormGroup;
  id!:string;

  sites$!: Observable<Zone[]>;

  isAddMode!: boolean;
  loading = false;
  submitted = false;
  checked = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private pathEntityService: PathEntityService,
    private siteEntityService: SiteEntityService
  ) { }


  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      created: [''],
      lastUpdate: [''],
      name: ['', Validators.required],
      state: ['', Validators.required],
      status: ['', Validators.required],
      locationArray: ['', Validators.required],
      zoneId: [''],
      active: [''],
    });

    if (!this.isAddMode) {

      this.pathEntityService.entities$
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

        //Load sites
        this.siteEntityService.loaded$.subscribe(loaded => {
          if (loaded === false) {
            this.siteEntityService.getAll()
          }
          this.sites$ = this.siteEntityService.entities$;
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

    const newDevice: Path = {
      ...this.form.value,
      created: new Date().toISOString(),
      lastUpdate: new Date().toISOString(),
      active: active
    }


    this.pathEntityService.add(newDevice)
      .pipe(first())
      .subscribe({
        next: () => {
          this.openSnackBar(`Path created successed!!`, 'right', 'top');
          this.router.navigate(['/resources/paths']);
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

    const updateData : Path = {
      ...this.form.value,
      lastUpdate: new Date().toISOString(),
      id:this.id

    }

    this.pathEntityService.update(updateData)
      .pipe(first())
      .subscribe({
        next: () => {
          this.openSnackBar(`Path ${updateData.name} updated successed!!`, 'right', 'top');
          this.router.navigate(['/resources/paths']);
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