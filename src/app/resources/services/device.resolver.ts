import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { debounceTime, filter, first, forkJoin, map, Observable, tap } from "rxjs";
import { DeviceEntityService } from "./device-entity.service";



@Injectable()
export class DeviceResolver implements Resolve<boolean> {

    constructor(
        private deviceService: DeviceEntityService) { }


    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        return this.deviceService.loaded$
            .pipe(
                debounceTime(50),
                tap(loaded => {
                    if (!loaded) {
                        this.deviceService.getAll() 
                    }
                }),
                filter(loaded => !!loaded),
                first()
            );
    }

}