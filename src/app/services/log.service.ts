import { Injectable } from '@angular/core';
import { Log } from '../models/Log';
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs";
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs: Log[];

  private logSource = new BehaviorSubject<Log>({ id: null, text: null, date: null });
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();


  constructor() {

    // this.logs = [
    //   {
    //     id: "1",
    //     text: "Generated Components",
    //     date: "12/15/2019 12:54:00 PM"
    //   },
    //   {
    //     id: "2",
    //     text: "Generated Services",
    //     date: "4/13/2020 8:30:00 AM"
    //   },
    //   {
    //     id: "3",
    //     text: "Created template",
    //     date: "4/20/2020 12:01.05 PM"
    //   }
    // ]
    this.logs = [];
  }

  getLogs(): Observable<Log[]> {
    if(localStorage.getItem("Logs")){
      this.logs = JSON.parse(localStorage.getItem("Logs"));
    }
    return of<Log[]>(this.logs.sort((a,b) => {
      return b.date = a.date;
    }));
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);
    localStorage.setItem("Logs", JSON.stringify(this.logs));
  }

  updateLog(updLog: Log) {

    this.logs.forEach((log, index) => {
      if (log.id === updLog.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(updLog);
    localStorage.setItem("Logs", JSON.stringify(this.logs));
  }

  removeLog(id) {

    this.logs.forEach((log, index) => {
      if (log.id === id) {
        this.logs.splice(index, 1);
      }
    });
    localStorage.setItem("Logs", JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }

}
