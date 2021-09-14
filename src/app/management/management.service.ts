import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { management_data } from './management';
import {catchError, tap} from 'rxjs/operators';
import { product_data } from '../product/product';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  private _refreshData = new Subject<void>();
  test_item : management_data;
  product_id : number;
  test_call_1: any;
  _url = 'http://localhost:8080/management'
  _url_product = 'http://localhost:8080/product/'
  _url_product_date = 'http://localhost:8080/management/test/'


  constructor(private _http: HttpClient) { }

  managementUpdate(management){

    return this._http.put<management_data>(this._url +'/update',management)
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
  getmanagementData(){
    return this._http.get<management_data[]>(this._url + '/all').pipe(catchError(this.handleError)) ;
  }

  //get method by id

  getmanagementDataById(id){
    return this._http.get(this._url+'/'+id);
  }

    //get method for date and barcode

  getWarehouseDataByBarcodeAndDate(barcode,date){
    return this._http.get(this._url_product_date+barcode+'/'+date);
  }

  //delete method
  deletemanagementData(id){
    return this._http.delete<management_data>(this._url+'/delete/' + id );
    
  }

  //update method in progress **
  editmanagementData(id){
    return this._http.get<management_data>(this._url+'/'+id);
  }


  // error handler method
  handleError(error){
    return throwError(error.message || "Server Error")
  }

}
