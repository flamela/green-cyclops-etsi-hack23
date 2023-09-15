import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, EntityActionOptions, HttpUrlGenerator, QueryParams } from "@ngrx/data";
import { Alarm } from "../model/Alarm";
import { Observable, map, of, tap } from "rxjs";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";
import { Update } from "@ngrx/entity";
import { environment } from "src/environments/environment";



@Injectable()
export class AlarmDataService extends DefaultDataService<Alarm> {

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Alarm', http, httpUrlGenerator);

    }

    ALARM_MANAGER_URL = environment.ALARM_MANAGER_URL


    //API does not provide id, for this reason it is obtained by means of href parameter
    //id parameter makes more easy work with API
    override getAll(): Observable<Alarm[]> {

        let alarms: Alarm[] = [];

        return this.http.get(`${this.ALARM_MANAGER_URL}/alarms`).pipe(
            map((data: any) => {

                const dataNew: Alarm[] = data._embedded.Alarm
                dataNew.forEach(alarm => {
                    let newAlarm = {
                        ...alarm,
                        id: alarm._links.alarm.href.split("/").reverse()[0]
                    }
                    alarms.push(newAlarm)
                })
                return alarms;
            }));
    }

    override getWithQuery(queryParams: QueryParams, options?: HttpOptions | undefined): Observable<Alarm[]> {

        let alarms: Alarm[] = [];
        let page = queryParams["page"];
        let size = queryParams["size"];

        return this.http.get<Alarm[]>(`${this.ALARM_MANAGER_URL}/alarms`, {
            params: new HttpParams()
                .set('page', page.toString())
                .set('size', size.toString())
        }).pipe(
            map((data: any) => {

                const dataNew: Alarm[] = data._embedded.Alarm
                dataNew.forEach(alarm => {
                    let newAlarm = {
                        ...alarm,
                        id: alarm._links.alarm.href.split("/").reverse()[0]
                    }
                    alarms.push(newAlarm)
                })
                return alarms;
            }));
    }

    override update(update: Update<Alarm>, options?: HttpOptions | undefined): Observable<Alarm> {
        return this.http.put(`${this.ALARM_MANAGER_URL}/alarms/${update.id}`, update.changes).pipe(
            map((data: any) => {
                return data;
            }));
    }

    override add(entity: Alarm, options?: HttpOptions | undefined): Observable<Alarm> {
        return this.http.post(`${this.ALARM_MANAGER_URL}/alarms`, entity).pipe(
            map((data: any) => {
                const newData: Alarm = {
                    ...data,
                    id: data._links.alarm.href.split("/").reverse()[0]
                }
                return newData;
            }));
    }

    override delete(id: string | number, options?: HttpOptions | undefined): Observable<string | number> {
        return this.http.delete(`${this.ALARM_MANAGER_URL}/alarms/${id}`).pipe(
            map((data: any) => {
                return id;
            }));
    }
}
