import { Component, OnInit } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Path } from '../../model/Path';
import { EntityAction } from '@ngrx/data';
import { Router } from '@angular/router';
import { PathEntityService } from '../../services/path-entity.service';

@Component({
  selector: 'app-paths',
  templateUrl: './paths.component.html',
  styleUrls: ['./paths.component.css']
})
export class PathsComponent implements OnInit {

  paths$!: Observable<Path[]>;
  loading$!: Observable<boolean>;
  loaded$!: Observable<boolean>;
  error$!: Observable<EntityAction<any>>;

  routerNavigate: string = ''
  PATHS_EDIT: string = '/resources/paths-edit';


  constructor(
    private router: Router,
    private pathEntityService: PathEntityService) { }

  ngOnInit(): void {

    this.loading$ = this.pathEntityService.loading$.pipe(delay(0));
    this.loaded$ = this.pathEntityService.loaded$.pipe(delay(0));
    this.error$ = this.pathEntityService.errors$;
    this.paths$ = this.pathEntityService.entities$;
  }

  create() {
    this.router.navigate([this.PATHS_EDIT]);
  }

}
