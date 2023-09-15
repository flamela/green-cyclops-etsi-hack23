import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Observable, map } from "rxjs";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";
import { Update } from "@ngrx/entity";
import { Zone } from "../model/Zone";
import { environment } from "src/environments/environment";



@Injectable()
export class SiteDataService extends DefaultDataService<Zone> {

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Zone', http, httpUrlGenerator);

    }

    zones: Zone[] = [];
    OPERATION_MANAGER_URL = environment.OPERATION_MANAGER_URL;


    //API does not provide id, for this reason it is obtained by means of href parameter
    //id parameter makes more easy work with API
    override getAll(): Observable<Zone[]> {
        return this.http.get(`${this.OPERATION_MANAGER_URL}/zones`).pipe(
            map((data: any) => {

                const dataNew: Zone[] = data._embedded.Zone
                dataNew.forEach(zone => {
                    let newZone = {
                        ...zone,
                        id: zone._links.zone.href.split("/").reverse()[0]
                    }
                    this.zones.push(newZone)
                })
                return this.zones;
            }));
    }

    override update(update: Update<Zone>, options?: HttpOptions | undefined): Observable<Zone> {
        return this.http.put(`${this.OPERATION_MANAGER_URL}/zones/${update.id}`, update.changes).pipe(
            map((data: any) => {
                return data;
            }));
    }

    override add(entity: Zone, options?: HttpOptions | undefined): Observable<Zone> {
        return this.http.post(`${this.OPERATION_MANAGER_URL}/zones`, entity).pipe(
            map((data: any) => {
                const newData: Zone = {
                    ...data,
                    id: data._links.zone.href.split("/").reverse()[0]
                }
                return newData;
            }));
    }

    override delete(id: string | number, options?: HttpOptions | undefined): Observable<string | number> {
        return this.http.delete(`${this.OPERATION_MANAGER_URL}/zones/${id}`).pipe(
            map((data: any) => {
                return id;
            }));
    }
}
