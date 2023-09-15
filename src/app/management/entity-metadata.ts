import { EntityMetadataMap } from "@ngrx/data";
import { Operation } from "./model/Operation";
import { Profile } from "./model/Profile";
import { Flight } from "./model/Flight";




export const entityMetadata: EntityMetadataMap = {
    Operation: {
        selectId:(operation:Operation)=> operation.id,
        //entityDispatcherOptions: {
        //    optimisticSaveEntities: true
        //}
    },
    Profile: {
        selectId:(profile:Profile)=> profile.id,
    },
    Flight: {
        selectId:(flight:Flight)=> flight.id,
    }
};

