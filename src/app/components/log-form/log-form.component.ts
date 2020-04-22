import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/Log';  
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  id: string;
  text:string;
  date: any;

  isNew:boolean = true;

  constructor(private _logService:LogService) { }

  ngOnInit(): void {

    //Subscribe to observable
    this._logService.selectedLog.subscribe( log =>{
      if(log.id !== null){
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
        this.isNew = false;
      }
    })
  }

  onSubmit(){
    if(this.isNew){
      //Create a new log
      const newLog = {
        id: this.uuidv4(),
        text: this.text,
        date: new Date()
      }
      this._logService.addLog(newLog);
    } else {
        //Create log to be updated
        const updLog = {
          id: this.id,
          text: this.text,
          date: new Date()
        } 
        this._logService.updateLog(updLog);
    }
    this.clearState();
  }

  clearState(){
    this.id = '';
    this.text = '';
    this.date = '';
    this.isNew = true;
    this._logService.clearState();
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
