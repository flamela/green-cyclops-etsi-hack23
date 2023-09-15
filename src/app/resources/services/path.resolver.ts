import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { debounceTime, filter, first, Observable, tap } from "rxjs";
import { PathEntityService } from "./path-entity.service";



@Injectable()
export class PathResolver implements Resolve<boolean> {

    constructor(
        private pathService: PathEntityService) { }


    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        return this.pathService.loaded$
            .pipe(
                debounceTime(50),
                tap(loaded => {
                    if (!loaded) {
                        this.pathService.getAll() 
                    }
                }),
                filter(loaded => !!loaded),
                first()
            );
    }

}