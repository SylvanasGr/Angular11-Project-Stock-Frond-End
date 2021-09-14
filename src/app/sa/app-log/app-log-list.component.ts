import {Component, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SelectItem} from 'primeng/api';
import {appLogConsts} from './app-log.consts';

@Component({
  selector: 'app-sa-app-log-list',
  templateUrl: 'app-log-list.component.html'
})

export class AppLogListComponent {
  
  url = appLogConsts.indexUrl;
  
  cols = [
    {field: 'rowNum', header: '', sortField: '', width: '5px'},
    {field: 'level', header: this.translate.instant('appLog.level'), sortField: 'level', width: '5px'},
    {field: 'loggerName', header: this.translate.instant('appLog.loggerName'), sortField: 'loggerName', width: '20px'},
    {field: 'message', header: this.translate.instant('appLog.message'), sortField: 'message', width: '30px'},
    {field: 'date', header: this.translate.instant('appLog.date'), sortField: 'date', width: '10px', align: 'center'},
    {field: 'thrown', header: this.translate.instant('appLog.thrown'), width: '15px', align: 'center'},
    {field: 'contextMap', header: this.translate.instant('appLog.contextMap'), width: '15px', align: 'center'}
  ];
  
  sortField = 'date';
  sortOrder = -1;
  
  args = this.initializeArgs();
  
  @ViewChild('table') table;
  
  levels: Array<SelectItem>;
  
  constructor(
    private translate: TranslateService
  ) {
    this.levels = [
      {label: 'ERROR', value: 'ERROR'},
      {label: 'WARN', value: 'WARN'},
      {label: 'INFO', value: 'INFO'},
      {label: 'DEBUG', value: 'DEBUG'},
      {label: 'TRACE', value: 'TRACE'}
    ];
  }
  
  initializeArgs() {
    return {
      level: null,
      dateFrom: null,
      dateTo: null,
      loggerName: null,
      message: null,
      thrownClassName: null,
      thrownMethodName: null,
      contextMapUser: null,
      contextMapUrl: null
    };
  }
  
  loadTableData() {
    this.table.loadTableData();
  }
  
  clearArgs() {
    this.args = this.initializeArgs();
  }
}
