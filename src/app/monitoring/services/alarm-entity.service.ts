
import { Injectable } from "@angular/core";
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from "@ngrx/data";
import { Alarm } from "../model/Alarm";




@Injectable()
export class AlarmEntityService
    extends EntityCollectionServiceBase<Alarm> {


    constructor(
        serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Alarm', serviceElementsFactory);
    }



}