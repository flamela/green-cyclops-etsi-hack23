
import { Injectable } from "@angular/core";
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from "@ngrx/data";
import { Path } from "../model/Path";



@Injectable()
export class PathEntityService
    extends EntityCollectionServiceBase<Path> {


    constructor(
        serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Path', serviceElementsFactory);
    }



}