
import { Injectable } from "@angular/core";
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from "@ngrx/data";
import { Flight } from "../model/Flight";




@Injectable()
export class FlightEntityService
    extends EntityCollectionServiceBase<Flight> {


    constructor(
        serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Flight', serviceElementsFactory);
    }



}