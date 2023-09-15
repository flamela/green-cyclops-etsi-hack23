
import { Injectable } from "@angular/core";
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from "@ngrx/data";
import { Profile } from "../model/Profile";

@Injectable()
export class ProfileEntityService
    extends EntityCollectionServiceBase<Profile> {
    constructor(
        serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Profile', serviceElementsFactory);
    }
}