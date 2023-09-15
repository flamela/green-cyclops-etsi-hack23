import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { debounceTime, filter, first, forkJoin, map, Observable, tap } from "rxjs";
import { OperationEntityService } from "./operation-entity.service";
import { FlightEntityService } from "./flight-entity.service";




@Injectable()
export class OperationResolver implements Resolve<boolean> {

    constructor(
        private operationService: OperationEntityService,
        private flightEntityService: FlightEntityService) { }


    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        return this.operationService.loaded$
            .pipe(
                debounceTime(50),
                tap(loaded => {
                    if (!loaded) {
                        this.operationService.getAll() 
                        this.flightEntityService.getAll()
                    }
                }),
                filter(loaded => !!loaded),
                first()
            );
    }

}