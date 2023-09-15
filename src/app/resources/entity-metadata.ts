import { EntityMetadataMap } from "@ngrx/data";
import { Device } from "./model/Device";
import { Zone } from "./model/Zone";
import { Path } from "./model/Path";




export const entityMetadata: EntityMetadataMap = {
    Device: {
        selectId:(device:Device)=> device.id,
        //entityDispatcherOptions: {
        //    optimisticSaveEntities: true
        //}
    },
    Zone: {
        selectId:(zone:Zone)=> zone.id,
    },
    Path: {
        selectId:(path:Path)=> path.id,
    }
};

