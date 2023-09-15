import { Component, OnInit } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Zone } from '../../model/Zone';
import { EntityAction } from '@ngrx/data';
import { Router } from '@angular/router';
import { SiteEntityService } from '../../services/site-entity.service';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {

  sites$!: Observable<Zone[]>;
  loading$!: Observable<boolean>;
  loaded$!: Observable<boolean>;
  error$!: Observable<EntityAction<any>>;

  routerNavigate: string = ''
  SITES_EDIT: string = '/resources/sites-edit';


  constructor(
    private router: Router,
    private siteEntityService: SiteEntityService) { }

  ngOnInit(): void {

    this.loading$ = this.siteEntityService.loading$.pipe(delay(0));
    this.loaded$ = this.siteEntityService.loaded$.pipe(delay(0));
    this.error$ = this.siteEntityService.errors$;
    this.sites$ = this.siteEntityService.entities$;
  }

  create() {
    this.router.navigate([this.SITES_EDIT]);
  }

}
