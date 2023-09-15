
import { Injectable } from "@angular/core";
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from "@ngrx/data";
import { Device } from "../model/Device";



@Injectable()
export class DeviceEntityService
    extends EntityCollectionServiceBase<Device> {


    constructor(
        serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Device', serviceElementsFactory);
    }



}