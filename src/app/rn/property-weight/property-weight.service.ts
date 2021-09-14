import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToitsuSharedService} from '../../toitsu-shared/toitsu-shared.service';
import {propertyWeightConsts} from './property-weight.consts';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class PropertyWeightService {
  
  constructor(
    private http: HttpClient,
    private toitsuSharedService: ToitsuSharedService
  ) {}
  
  // ---------------------------------------------------------------------------------------------------------------------------------------
  
  deletePropertyWeight(id) {
    return this.http
      .delete(
        environment.apiBaseUrl + propertyWeightConsts.deleteUrl,
        {
          params: this.toitsuSharedService.initHttpParams({id})
        }
      );
  }
}
