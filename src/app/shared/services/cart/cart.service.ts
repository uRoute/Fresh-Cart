import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _HttpClient = inject(HttpClient)
  cartCount:WritableSignal<number> = signal(0)
  
  GetLoggedUserCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/cart`)
  }
  AddProductToCart(p_id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/cart` , {"productId" : p_id} )
  }
  RemoveSpecificCartItem(p_id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart/${p_id}`)
  }
  UpdateCartProductQuantity(p_id:string , count:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}/api/v1/cart/${p_id}` , {"count" : count} )
  }
  ClearUserCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart`)
  }
}
