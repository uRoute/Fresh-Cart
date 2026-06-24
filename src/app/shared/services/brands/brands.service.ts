import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  private readonly _HttpClient = inject(HttpClient)
  

  GetAllBrands(limit?:number):Observable<any>{
    if(limit != null){
      let params = new HttpParams().set('limit' , limit)
      return this._HttpClient.get(`${environment.baseURL}/api/v1/brands`, { params } )
    }else{
      return this._HttpClient.get(`${environment.baseURL}/api/v1/brands` )
    }
  }

  GetSpecificBrand(b_id:string | null):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/brands/${b_id}`)
  }
  
}
