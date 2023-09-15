import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alarm, Alarms } from '../model/Alarms';
import { Observable, map } from 'rxjs';
import { QueryParams } from '@ngrx/data';
import { ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlarmHttpService {


  constructor(private http: HttpClient) { }

  ALARM_MANAGER_URL = environment.ALARM_MANAGER_URL


  getAlarms(params: QueryParams): Observable<Alarms> {
    let page = params['page'];
    let size = params['size'];
    return this.http.get<Alarms>(`${this.ALARM_MANAGER_URL}/alarms`, {
      params: new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
    });
  }

  getAlarmById(id:string): Observable<Alarm>{
    return this.http.get<Alarm>(`${this.ALARM_MANAGER_URL}/alarms/${id}`).pipe(
      map(data=>{
        
        let newData = {
          ...data,
          id: data._links.alarm.href.split("/").reverse()[0]
        }
        return newData;
      })
    );
  }

  findAlarmByFlightId(id:string):Observable<Alarm[]>{

    let alarms: Alarm[] = [];
    
    return this.http.get(`${this.ALARM_MANAGER_URL}/alarms/search/findAlarmByFlightId`,{
      params: new HttpParams()
        .set('flight_id', id.toString())
    }).pipe(
      map((data: any) => {
        const dataNew: Alarm[] = data._embedded.Alarm
        alarms = []
        dataNew.forEach(alarm => {
            let newAlarm = {
                ...alarm,
                id: alarm._links.alarm.href.split("/").reverse()[0]
            }
            alarms.push(newAlarm)
        })
        return alarms;
      })

    );
  }

  findAlarmByParent(id:string):Observable<Alarm[]>{

    let alarms: Alarm[] = [];
    
    return this.http.get(`${this.ALARM_MANAGER_URL}/alarms/search/findAlarmByParent`,{
      params: new HttpParams()
        .set('parent', id.toString())
    }).pipe(
      map((data: any) => {
        const dataNew: Alarm[] = data._embedded.Alarm
        alarms = []
        dataNew.forEach(alarm => {
            let newAlarm = {
                ...alarm,
                id: alarm._links.alarm.href.split("/").reverse()[0]
            }
            alarms.push(newAlarm)
        })
        return alarms;
      })

    );
  }

  delete(id:string): Observable<string | number>{
    return this.http.delete(`${this.ALARM_MANAGER_URL}/alarms/${id}`).pipe(
      map((data: any) => {
          return id;
      }));
  }

}
