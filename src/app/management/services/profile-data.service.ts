import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, EntityActionOptions, HttpUrlGenerator, QueryParams } from "@ngrx/data";
import { Observable, map, of, tap } from "rxjs";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";
import { Update } from "@ngrx/entity";
import { Profile } from "../model/Profile";
import { environment } from "src/environments/environment";


@Injectable()
export class ProfileDataService extends DefaultDataService<Profile> {

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Profile', http, httpUrlGenerator);
    }

    profiles: Profile[] = [];
    OPERATION_MANAGER_URL = environment.OPERATION_MANAGER_URL;
    

    //API does not provide with id, for this reason it is obtained by means of href parameter
    //id parameter makes more easy work with API
    override getAll(): Observable<Profile[]> {
        return this.http.get(`${this.OPERATION_MANAGER_URL}/profiles`).pipe(
            map((data: any) => {
                const dataNew: Profile[] = data._embedded.Profiles
                dataNew.forEach(device => {
                    let newDevice = {
                        ...device,
                        id: device._links.self.href.split("/").reverse()[0]
                    }
                    this.profiles.push(newDevice)
                })
                return this.profiles;
            }));
    }

    override add(entity: Profile, options?: HttpOptions | undefined): Observable<Profile> {
        return this.http.post(`${this.OPERATION_MANAGER_URL}/profiles`, entity).pipe(
            map((data: any) => {
                const newData: Profile = {
                    ...data,
                    id: data._links.self.href.split("/").reverse()[0]
                }
                return newData;
            }));
    }

    
    override update(update: Update<Profile>, options?: HttpOptions | undefined): Observable<Profile> {
        return this.http.put(`${this.OPERATION_MANAGER_URL}/profiles/${update.id}`, update.changes).pipe(
            map((data: any) => {
                return data;
            }));
    }



    override delete(id: string | number, options?: HttpOptions | undefined): Observable<string | number> {
        return this.http.delete(`${this.OPERATION_MANAGER_URL}/profiles/${id}`).pipe(
            map((data: any) => {
                return id;
            }));
    }
    
}
