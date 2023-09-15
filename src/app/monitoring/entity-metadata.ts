import { EntityMetadataMap } from "@ngrx/data";
import { Alarm } from "./model/Alarm";
import { Issue } from "./model/Issue";
import { Problem } from "./model/Problem";


export const entityMetadata: EntityMetadataMap = {
    Alarm: {
        selectId:(alarm:Alarm)=> alarm.id,
        //entityDispatcherOptions: {
        //    optimisticSaveEntities: true
        //}
    },
    Issue: {
        selectId:(issue:Issue)=> issue.id,
    },
    Problem: {
        selectId:(problem:Problem)=> problem.id,
    }
};

