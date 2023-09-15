import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, EntityActionOptions, HttpUrlGenerator, QueryParams } from "@ngrx/data";
import { Device } from "../model/Device";
import { Observable, map, of, tap } from "rxjs";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";
import { Update } from "@ngrx/entity";
import { environment } from "src/environments/environment";



@Injectable()
export class DeviceDataService extends DefaultDataService<Device> {

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Device', http, httpUrlGenerator);

    }

    devices: Device[] = [];
    OPERATION_MANAGER_URL = environment.OPERATION_MANAGER_URL;


    //API does not provide id, for this reason it is obtained by means of href parameter
    //id parameter makes more easy work with API
    override getAll(): Observable<Device[]> {
        return this.http.get(`${this.OPERATION_MANAGER_URL}/devices`).pipe(
            map((data: any) => {

                const dataNew: Device[] = data._embedded.Device
                dataNew.forEach(device => {
                    let newDevice = {
                        ...device,
                        id: device._links.device.href.split("/").reverse()[0]
                    }
                    this.devices.push(newDevice)
                })
                return this.devices;
            }));
    }

    override update(update: Update<Device>, options?: HttpOptions | undefined): Observable<Device> {
        return this.http.put(`${this.OPERATION_MANAGER_URL}/devices/${update.id}`, update.changes).pipe(
            map((data: any) => {
                return data;
            }));
    }

    override add(entity: Device, options?: HttpOptions | undefined): Observable<Device> {
        return this.http.post(`${this.OPERATION_MANAGER_URL}/devices`, entity).pipe(
            map((data: any) => {
                const newData: Device = {
                    ...data,
                    id: data._links.device.href.split("/").reverse()[0]
                }
                return newData;
            }));
    }

    override delete(id: string | number, options?: HttpOptions | undefined): Observable<string | number> {
        return this.http.delete(`${this.OPERATION_MANAGER_URL}/devices/${id}`).pipe(
            map((data: any) => {
                return id;
            }));
    }
}
