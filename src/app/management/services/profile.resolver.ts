import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { debounceTime, filter, first, Observable, tap } from "rxjs";
import { ProfileEntityService } from "./profile-entity.service";

@Injectable()
export class ProfileResolver implements Resolve<boolean> {

    constructor(
        private profileService: ProfileEntityService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        return this.profileService.loaded$
            .pipe(
                debounceTime(50),
                tap(loaded => {
                    if (!loaded) {
                        this.profileService.getAll()
                    }
                }),
                filter(loaded => !!loaded),
                first()
            );
    }
}