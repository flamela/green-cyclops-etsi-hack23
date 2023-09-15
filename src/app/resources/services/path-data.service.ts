import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Observable, map } from "rxjs";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";
import { Update } from "@ngrx/entity";
import { Path } from "../model/Path";
import { environment } from "src/environments/environment";




@Injectable()
export class PathDataService extends DefaultDataService<Path> {

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Path', http, httpUrlGenerator);

    }

    paths: Path[] = [];
    OPERATION_MANAGER_URL = environment.OPERATION_MANAGER_URL;


    //API does not provide id, for this reason it is obtained by means of href parameter
    //id parameter makes more easy work with API
    override getAll(): Observable<Path[]> {
        return this.http.get(`${this.OPERATION_MANAGER_URL}/paths`).pipe(
            map((data: any) => {

                const dataNew: Path[] = data._embedded.Path
                dataNew.forEach(path => {
                    let newPath = {
                        ...path,
                        id: path._links.path.href.split("/").reverse()[0]
                    }
                    this.paths.push(newPath)
                })
                return this.paths;
            }));
    }

    override update(update: Update<Path>, options?: HttpOptions | undefined): Observable<Path> {
        return this.http.put(`${this.OPERATION_MANAGER_URL}/paths/${update.id}`, update.changes).pipe(
            map((data: any) => {
                return data;
            }));
    }

    override add(entity: Path, options?: HttpOptions | undefined): Observable<Path> {
        return this.http.post(`${this.OPERATION_MANAGER_URL}/paths`, entity).pipe(
            map((data: any) => {
                const newData: Path = {
                    ...data,
                    id: data._links.path.href.split("/").reverse()[0]
                }
                return newData;
            }));
    }

    override delete(id: string | number, options?: HttpOptions | undefined): Observable<string | number> {
        return this.http.delete(`${this.OPERATION_MANAGER_URL}/paths/${id}`).pipe(
            map((data: any) => {
                return id;
            }));
    }
}
