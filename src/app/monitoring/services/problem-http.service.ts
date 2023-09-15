import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryParams } from '@ngrx/data';
import { Problems } from '../model/Problems';
import { Observable, map } from 'rxjs';
import { Problem } from '../model/Problem';
import { HttpOptions } from '@ngrx/data/src/dataservices/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProblemHttpService {


  constructor(private http: HttpClient) { }

  ALARM_MANAGER_URL = environment.ALARM_MANAGER_URL
  

  getAll(): Observable<Problem[]> {
    let problems: Problem[] = [];
    
    return this.http.get(`${this.ALARM_MANAGER_URL}/problems`).pipe(
      map((data: any) => {
        const dataNew: Problem[] = data._embedded.Problem
        problems = []
        dataNew.forEach(problem => {
            let newProblem = {
                ...problem,
                id: problem._links.problem.href.split("/").reverse()[0]
            }
            problems.push(newProblem)
        })
        return problems;
      })
    );
  }


  getProblems(params: QueryParams): Observable<Problems> {
    let page = params['page'];
    let size = params['size'];
    return this.http.get<Problems>(`${this.ALARM_MANAGER_URL}/problems`, {
      params: new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
    });
  }

  getProblemById(id: string): Observable<Problem> {
    return this.http.get<Problem>(`${this.ALARM_MANAGER_URL}/problems/${id}`);
  }

  findProblemByRelated(relatedTo: string): Observable<Problem[]> {

    let problems: Problem[] = [];

    return this.http.get(`${this.ALARM_MANAGER_URL}/problems/search/findProblemByRelated`, {
      params: new HttpParams()
        .set('related', relatedTo.toString())
    }).pipe(
      map((data: any) => {
        const dataNew: Problem[] = data._embedded.Problem
        problems = []
        dataNew.forEach(problem => {
          let newProblem = {
            ...problem,
            id: problem._links.problem.href.split("/").reverse()[0]
          }
          problems.push(newProblem)
        })
        return problems;
      })

    );
  }

  add(entity: Problem, options?: HttpOptions | undefined): Observable<Problem> {
    return this.http.post(`${this.ALARM_MANAGER_URL}/problems`, entity).pipe(
      map((data: any) => {
        const newData: Problem = {
          ...data,
          id: data._links.problem.href.split("/").reverse()[0]
        }
        return newData;
      }));
  }

  update(update: Problem, options?: HttpOptions | undefined): Observable<Problem> {
    return this.http.put(`${this.ALARM_MANAGER_URL}/problems/${update.id}`, update).pipe(
        map((data: any) => {
            return data;
        }));
}

  delete(id: string): Observable<string | number> {
    return this.http.delete(`${this.ALARM_MANAGER_URL}/problems/${id}`).pipe(
      map((data: any) => {
        return id;
      }));
  }

}
