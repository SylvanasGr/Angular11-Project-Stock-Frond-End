import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToitsuSharedService} from '../../toitsu-shared/toitsu-shared.service';
import {propertyTypeConsts} from './property-type.consts';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class PropertyTypeService {
  
  constructor(
    private http: HttpClient,
    private toitsuSharedService: ToitsuSharedService
  ) {}
  
  // ---------------------------------------------------------------------------------------------------------------------------------------
  
  getAllPropertyTypes() {
    return this.http
      .get<{}[]>(
        environment.apiBaseUrl + propertyTypeConsts.getAllUrl,
        {
          params: this.toitsuSharedService.initHttpParams({})
        }
      );
  }
}
