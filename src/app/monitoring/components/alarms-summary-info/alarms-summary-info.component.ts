import { Component, Input, OnInit } from '@angular/core';
import { Alarm } from '../../model/Alarms';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alarms-summary-info',
  templateUrl: './alarms-summary-info.component.html',
  styleUrls: ['./alarms-summary-info.component.css']
})
export class AlarmsSummaryInfoComponent implements OnInit {

  @Input()
  dataInput!: Observable<Alarm>;
  form: any;

  alarm!: Alarm

  constructor(
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.dataInput.subscribe(alarm => {
      this.alarm = alarm;
    })
  }
}
