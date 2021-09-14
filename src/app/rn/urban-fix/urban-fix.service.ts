import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToitsuSharedService} from '../../toitsu-shared/toitsu-shared.service';
import {urbanFixConsts} from './urban-fix.consts';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class UrbanFixService {
  
  constructor(
    private http: HttpClient,
    private toitsuSharedService: ToitsuSharedService
  ) {}
  
  // ---------------------------------------------------------------------------------------------------------------------------------------
  
  deleteUrbanFix(id) {
    return this.http
      .delete(
        environment.apiBaseUrl + urbanFixConsts.deleteUrl,
        {
          params: this.toitsuSharedService.initHttpParams({id})
        }
      );
  }
}
