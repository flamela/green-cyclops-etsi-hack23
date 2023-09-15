import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Issue } from '../model/Issue';
import { Observable, map } from 'rxjs';
import { Issues } from '../model/Issues';
import { QueryParams } from '@ngrx/data';
import { HttpOptions } from '@ngrx/data/src/dataservices/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssueHttpService {


  constructor(private http: HttpClient) { }

  ALARM_MANAGER_URL = environment.ALARM_MANAGER_URL

  getAll(): Observable<Issue[]> {
    let issues: Issue[] = [];
    
    return this.http.get(`${this.ALARM_MANAGER_URL}/issues`).pipe(
      map((data: any) => {
        const dataNew: Issue[] = data._embedded.Issue
        issues = []
        dataNew.forEach(issue => {
            let newIssue = {
                ...issue,
                id: issue._links.issue.href.split("/").reverse()[0]
            }
            issues.push(newIssue)
        })
        return issues;
      })
    );
  }

  getIssues(params: QueryParams): Observable<Issues> {
    let page = params['page'];
    let size = params['size'];
    return this.http.get<Issues>(`${this.ALARM_MANAGER_URL}/issues`, {
      params: new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
    });
  }


  getIssueById(id:string): Observable<Issue>{
    return this.http.get<Issue>(`${this.ALARM_MANAGER_URL}/issues/${id}`).pipe(
      map(data=>{
        
        let newData = {
          ...data,
          id: data._links.issue.href.split("/").reverse()[0]
        }
        return newData;
      })
    );
  }

  findIssueByRelated(relatedTo:string):Observable<Issue[]>{

    let issues: Issue[] = [];
    
    return this.http.get(`${this.ALARM_MANAGER_URL}/issues/search/findIssueByRelated`,{
      params: new HttpParams()
        .set('related', relatedTo.toString())
    }).pipe(
      map((data: any) => {
        const dataNew: Issue[] = data._embedded.Issue
        issues = []
        dataNew.forEach(issue => {
            let newIssue = {
                ...issue,
                id: issue._links.issue.href.split("/").reverse()[0]
            }
            issues.push(newIssue)
        })
        return issues;
      })

    );
  }

  findIssueByParent(relatedTo:string):Observable<Issue[]>{

    let issues: Issue[] = [];
    
    return this.http.get(`${this.ALARM_MANAGER_URL}/issues/search/findIssueByParent`,{
      params: new HttpParams()
        .set('parent', relatedTo.toString())
    }).pipe(
      map((data: any) => {
        const dataNew: Issue[] = data._embedded.Issue
        issues = []
        dataNew.forEach(issue => {
            let newIssue = {
                ...issue,
                id: issue._links.issue.href.split("/").reverse()[0]
            }
            issues.push(newIssue)
        })
        return issues;
      })

    );
  }

  add(entity: Issue, options?: HttpOptions | undefined): Observable<Issue> {
    return this.http.post(`${this.ALARM_MANAGER_URL}/issues`, entity).pipe(
      map((data: any) => {
        const newData: Issue = {
          ...data,
          id: data._links.issue.href.split("/").reverse()[0]
        }
        return newData;
      }));
  }

  update(update: Issue, options?: HttpOptions | undefined): Observable<Issue> {
    return this.http.put(`${this.ALARM_MANAGER_URL}/issues/${update.id}`, update).pipe(
        map((data: any) => {
            return data;
        }));
}


  delete(id:string): Observable<string | number>{
    return this.http.delete(`${this.ALARM_MANAGER_URL}/issues/${id}`).pipe(
      map((data: any) => {
          return id;
      }));
  }
}
