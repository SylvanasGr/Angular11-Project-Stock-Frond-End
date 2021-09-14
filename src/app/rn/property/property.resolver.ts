import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {PropertyService} from './property.service';

@Injectable({providedIn: 'root'})
export class PropertyResolver implements Resolve<any> {
  
  constructor(private propertyService: PropertyService) {}
  
  resolve(route: ActivatedRouteSnapshot) {
    return this.propertyService.getProperty(route.paramMap.get('id'));
  }
}
