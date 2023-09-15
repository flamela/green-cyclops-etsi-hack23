import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { debounceTime, filter, first, forkJoin, map, Observable, tap } from "rxjs";
import { FlightEntityService } from "./flight-entity.service";




@Injectable()
export class FlightResolver implements Resolve<boolean> {

    constructor(
        private flightService: FlightEntityService) { }


    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        return this.flightService.loaded$
            .pipe(
                debounceTime(50),
                tap(loaded => {
                    if (!loaded) {
                        this.flightService.getAll() 
                    }
                }),
                filter(loaded => !!loaded),
                first()
            );
    }

}