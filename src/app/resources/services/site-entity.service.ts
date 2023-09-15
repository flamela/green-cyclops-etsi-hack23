
import { Injectable } from "@angular/core";
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from "@ngrx/data";
import { Zone } from "../model/Zone";



@Injectable()
export class SiteEntityService
    extends EntityCollectionServiceBase<Zone> {


    constructor(
        serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Zone', serviceElementsFactory);
    }



}