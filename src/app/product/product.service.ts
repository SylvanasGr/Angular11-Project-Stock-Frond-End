import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { product_data } from './product';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _refreshData = new Subject<void>();

  _url = 'http://localhost:8080/product'

  constructor(private _http: HttpClient) { }

  productUpdate(product){
    return this._http.put<product_data>(this._url +'/update',product)
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
  getproductData(){
    return this._http.get<product_data[]>(this._url + '/all').pipe(catchError(this.handleError)) ;
  }

  
  //get method by id
  getproductDataById(id){
    return this._http.get(this._url+'/'+id);
  }

  //delete method
  deleteproductData(id){
    return this._http.delete<product_data>(this._url+'/delete/' + id );
    
  }

  //update method in progress **
  editproductData(id){
    return this._http.get<product_data>(this._url+'/'+id);
  }


  // error handler method
  handleError(error){
    return throwError(error.message || "Server Error")
  }

}
