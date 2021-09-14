import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { warehouse_data } from './warehouse';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WareHouseService {

  private _refreshData = new Subject<void>();


  _url = 'http://localhost:8080/warehouse'



  constructor(private _http: HttpClient) { }

  warehouseUpdate(warehouse){
    return this._http.put<warehouse_data>(this._url +'/update',warehouse)
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
  getWarehouseData(){
    return this._http.get<warehouse_data[]>(this._url + '/all').pipe(catchError(this.handleError)) ;
  }

    //get method by id

  getWarehouseDataById(id){
    return this._http.get(this._url+'/'+id);
  }



  //delete method
  deleteWarehouseData(id){
    return this._http.delete<warehouse_data>(this._url+'/delete/' + id );
    
  }



  // error handler method
  handleError(error){
    return throwError(error.message || "Server Error")
  }

}
