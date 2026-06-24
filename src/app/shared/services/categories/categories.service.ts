import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly _HttpClient = inject(HttpClient)
  

  GetAllCategories():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/categories`)
  }  

  GetSpecificCategory(c_id:string | null):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/brands/${c_id}`)
  }

  GetAllSubCategories():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/subcategories`)
  }

  
}
