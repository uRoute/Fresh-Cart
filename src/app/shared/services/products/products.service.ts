import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly _HttpClient = inject(HttpClient)
  

  GetAllProduct(limit?:number):Observable<any>{
    if(limit != null){
      let params = new HttpParams().set('limit' , limit)
      return this._HttpClient.get(`${environment.baseURL}/api/v1/products`, { params } )
    }else{
      return this._HttpClient.get(`${environment.baseURL}/api/v1/products` )
    }
  }
  GetAllProductByBrand(limit?:number , b_id?:string):Observable<any>{
    if(limit != null && b_id != null){
      let params = new HttpParams().set('limit' , limit )
      params = params.append('brand' , b_id)
      // console.log(params);
      return this._HttpClient.get(`${environment.baseURL}/api/v1/products`, { params } )
    }else{
      return this._HttpClient.get(`${environment.baseURL}/api/v1/products` )
    }
  }
  GetAllProductByCategory(limit?:number , c_id?:string):Observable<any>{
    if(limit != null && c_id != null){
      let params = new HttpParams().set('limit' , limit )
      params = params.append('category' , c_id)
      // console.log(params);
      return this._HttpClient.get(`${environment.baseURL}/api/v1/products`, { params } )
    }else{
      return this._HttpClient.get(`${environment.baseURL}/api/v1/products` )
    }
  }

  GetSpecificProduct(p_id:string | null):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/products/${p_id}`)
  }


}
