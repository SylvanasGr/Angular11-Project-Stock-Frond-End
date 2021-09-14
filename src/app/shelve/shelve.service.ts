import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { shelve_data } from './shelve';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShelveService {

  private _refreshData = new Subject<void>();

  _url = 'http://localhost:8080/shelve'

  constructor(private _http: HttpClient) { }

  shelveUpdate(shelve){
    return this._http.put<shelve_data>(this._url +'/update',shelve)
    .pipe(
      tap(()=>{
        this._refreshData.next();
      })
    );
  }

  get refreshData(){
    return this._refreshData;
  }


  // get method
  getshelveData(){
    return this._http.get<shelve_data[]>(this._url + '/all').pipe(catchError(this.handleError)) ;
  }

  
    //get method by id
  getShelveDataById(id){
    return this._http.get(this._url+'/'+id);
  }


  //delete method
  deleteshelveData(id){
    return this._http.delete<shelve_data>(this._url+'/delete/' + id );
    
  }

  //update method in progress **
  editshelveData(id){
    return this._http.get<shelve_data>(this._url+'/'+id);
  }


  // error handler method
  handleError(error){
    return throwError(error.message || "Server Error")
  }

}
