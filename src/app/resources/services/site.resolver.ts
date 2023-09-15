import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { debounceTime, filter, first, forkJoin, map, Observable, tap } from "rxjs";
import { SiteEntityService } from "./site-entity.service";



@Injectable()
export class SiteResolver implements Resolve<boolean> {

    constructor(
        private siteService: SiteEntityService) { }


    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        return this.siteService.loaded$
            .pipe(
                debounceTime(50),
                tap(loaded => {
                    if (!loaded) {
                        this.siteService.getAll() 
                    }
                }),
                filter(loaded => !!loaded),
                first()
            );
    }

}