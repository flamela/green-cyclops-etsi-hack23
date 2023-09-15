import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, EntityActionOptions, HttpUrlGenerator, QueryParams } from "@ngrx/data";
import { Observable, map, of, tap } from "rxjs";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";
import { Update } from "@ngrx/entity";
import { Operation } from "../model/Operation";
import { environment } from "src/environments/environment";



@Injectable()
export class OperationDataService extends DefaultDataService<Operation> {

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Operation', http, httpUrlGenerator);

    }

    operations: Operation[] = [];
    OPERATION_MANAGER_URL = environment.OPERATION_MANAGER_URL;


    //API does not provide and id field, for this reason it is obtained by means of href parameter
    //id parameter makes more easy work with API
    override getAll(): Observable<Operation[]> {
        return this.http.get(`${this.OPERATION_MANAGER_URL}/operations`).pipe(
            map((data: any) => {
                const newData: Operation[] = data._embedded.Operation
                newData.forEach(device => {
                    let newOperation = {
                        ...device,
                        id: device._links.operation.href.split("/").reverse()[0]
                    }
                    this.operations.push(newOperation)
                })
                return this.operations;
            }));
    }

    override add(entity: Operation, options?: HttpOptions | undefined): Observable<Operation> {
        return this.http.post(`${this.OPERATION_MANAGER_URL}/operations`, entity).pipe(
            map((data: any) => {
                const newData: Operation = {
                    ...data,
                    id: data._links.operation.href.split("/").reverse()[0]
                }
                return newData;
            }));
    }

    
    override update(update: Update<Operation>, options?: HttpOptions | undefined): Observable<Operation> {
        return this.http.put(`${this.OPERATION_MANAGER_URL}/operations/${update.id}`, update.changes).pipe(
            map((data: any) => {
                return data;
            }));
    }



    override delete(id: string | number, options?: HttpOptions | undefined): Observable<string | number> {
        return this.http.delete(`${this.OPERATION_MANAGER_URL}/operations/${id}`).pipe(
            map((data: any) => {
                return id;
            }));
    }
    
}
