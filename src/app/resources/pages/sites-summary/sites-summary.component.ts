import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, filter, map } from 'rxjs';
import { Zone } from '../../model/Zone';
import { SiteEntityService } from '../../services/site-entity.service';
import { ActivatedRoute } from '@angular/router';
import { PathEntityService } from '../../services/path-entity.service';
import { Path } from '../../model/Path';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-sites-summary',
  templateUrl: './sites-summary.component.html',
  styleUrls: ['./sites-summary.component.css']
})
export class SitesSummaryComponent implements OnInit {

  components = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { compName: 'sites-summary-info', cols: 3, rows: 1, color: 'wite' },
          { compName: 'sites-summary-map', cols: 3, rows: 5, color: 'wite' },
          { compName: 'sites-summary-paths', cols: 3, rows: 3, color: 'wite' },
        ];
      }

      return [
        { compName: 'sites-summary-info', cols: 3, rows: 1, color: 'wite' },
        { compName: 'sites-summary-map', cols: 2, rows: 5, color: 'wite' },
        { compName: 'sites-summary-paths', cols: 1, rows: 4, color: 'wite' },
      ];
    })
  );

  id!: string;
  sites$!: Observable<Zone[]>;
  paths$!: Observable<Path[]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private siteEntityService: SiteEntityService,
    private pathEntityService: PathEntityService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];


    this.sites$ = this.siteEntityService.entities$
      .pipe(
        map(x => {
          let result = x.filter(x => x.id === this.id)
          return result;
        })
      );

    this.sites$.subscribe(x => {
      const site = x[0];
      //Load paths filterd by side name 
      this.pathEntityService.loaded$.subscribe(loaded => {
        if (loaded === false) {
          this.pathEntityService.getAll()
        }
        this.paths$ = this.pathEntityService.entities$.pipe(
          map(x => {
            let result = x.filter(x => x.zoneId === site.name)
            return result;
          })
        );
      })
    })


  }
}
