import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, EntityActionOptions, HttpUrlGenerator, QueryParams } from "@ngrx/data";
import { Observable, map, of, tap } from "rxjs";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";
import { Update } from "@ngrx/entity";
import { Flight } from "../model/Flight";
import { environment } from "src/environments/environment";



@Injectable()
export class FlightDataService extends DefaultDataService<Flight> {

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Flight', http, httpUrlGenerator);

    }

    flights: Flight[] = [];
    OPERATION_MANAGER_URL = environment.OPERATION_MANAGER_URL;


    //API does not provide and id field, for this reason it is obtained by means of href parameter
    //id parameter makes more easy work with API
    override getAll(): Observable<Flight[]> {
        return this.http.get(`${this.OPERATION_MANAGER_URL}/flights`).pipe(
            map((data: any) => {
                const newData: Flight[] = data._embedded.Flight
                newData.forEach(device => {
                    let newFlight = {
                        ...device,
                        id: device._links.flight.href.split("/").reverse()[0]
                    }
                    this.flights.push(newFlight)
                })
                return this.flights;
            }));
    }

    override add(entity: Flight, options?: HttpOptions | undefined): Observable<Flight> {
        return this.http.post(`${this.OPERATION_MANAGER_URL}/flights`, entity).pipe(
            map((data: any) => {
                const newData: Flight = {
                    ...data,
                    id: data._links.flight.href.split("/").reverse()[0]
                }
                return newData;
            }));
    }

    
    override update(update: Update<Flight>, options?: HttpOptions | undefined): Observable<Flight> {
        return this.http.put(`${this.OPERATION_MANAGER_URL}/flights/${update.id}`, update.changes).pipe(
            map((data: any) => {
                return data;
            }));
    }



    override delete(id: string | number, options?: HttpOptions | undefined): Observable<string | number> {
        return this.http.delete(`${this.OPERATION_MANAGER_URL}/flights/${id}`).pipe(
            map((data: any) => {
                return id;
            }));
    }
    
}
