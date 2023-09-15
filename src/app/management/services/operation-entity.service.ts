
import { Injectable } from "@angular/core";
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from "@ngrx/data";
import { Operation } from "../model/Operation";




@Injectable()
export class OperationEntityService
    extends EntityCollectionServiceBase<Operation> {


    constructor(
        serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Operation', serviceElementsFactory);
    }



}