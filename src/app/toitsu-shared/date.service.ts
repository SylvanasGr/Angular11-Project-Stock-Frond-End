import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable({providedIn: 'root'})
export class DateService {
  
  private dateFormat = 'DD/MM/YYYY';
  private dateTimeFormat = 'DD/MM/YYYY HH:mm';
  
  constructor() {}
  
  getCurrentDateString() {
    return moment(new Date()).format('DD_MM_YYYY_HH_mm_ss');
  }
  
  addMonths(dateString, months) {
    return this.addTimeUnit(dateString, 'M', months);
  }
  
  addDays(dateString, days) {
    return this.addTimeUnit(dateString, 'days', days);
  }
  
  private addTimeUnit(dateString, timeUnit, timeUnitQuantity) {
    if (!dateString || !timeUnit || !timeUnitQuantity) {
      return dateString;
    }
    if (dateString.indexOf(':') !== -1) {
      let momentObj = moment(dateString, this.dateTimeFormat).add(timeUnitQuantity, timeUnit);
      return momentObj.format(this.dateTimeFormat);
    }
    else {
      let momentObj = moment(dateString, this.dateFormat).add(timeUnitQuantity, timeUnit);
      return momentObj.format(this.dateFormat);
    }
  }
}
