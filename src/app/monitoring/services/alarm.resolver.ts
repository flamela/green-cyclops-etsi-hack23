import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { debounceTime, filter, first, forkJoin, map, Observable, tap } from "rxjs";
import { AlarmEntityService } from "./alarm-entity.service";



@Injectable()
export class AlarmResolver implements Resolve<boolean> {

    constructor(
        private alarmService: AlarmEntityService) { }


    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        return this.alarmService.loaded$
            .pipe(
                debounceTime(50),
                tap(loaded => {
                    //if (!loaded) {
                        this.alarmService.getWithQuery({page:'0',size:'5'}) 
                    //}
                }),
                filter(loaded => !!loaded),
                first()
            );
    }

}