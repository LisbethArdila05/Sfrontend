import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shared-alerts',
  templateUrl: './shared-alerts.component.html',
  styleUrls: ['./shared-alerts.component.scss'],
})
export class SharedAlertsComponent  implements OnInit {

  @Output() aceptarClick = new EventEmitter<void>();
  @Output() errorClick = new EventEmitter<void>();
  @Output() questionSi = new EventEmitter<void>();
  @Output() questionNo = new EventEmitter<void>();

  @Input() tipoalerta: string = '';

  constructor() { }

  ngOnInit() {}

  onAceptarclick(){
    if(this.tipoalerta === 'Aceptar'){
      this.aceptarClick.emit()
    }
  }
  onErrorclick(){
    if(this.tipoalerta === 'Error'){
      this.errorClick.emit()
    }
  }
  onQuestionclick(accion: string){
    if(this.tipoalerta === 'Question'){
      if(accion === 'si'){
        this.questionSi.emit();
      }else if(accion === 'no'){
        this.questionNo.emit();
      }
    }
  }
}
