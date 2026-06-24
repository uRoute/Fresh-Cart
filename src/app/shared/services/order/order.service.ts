import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly _HttpClient = inject(HttpClient)


  CheckoutSession(cart_id:string , shippingDetails:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/orders/checkout-session/${cart_id}?url=${environment.domain}`,
      {'shippingAddress' : shippingDetails}
    )
  }


  GetUserOrders(u_id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/orders/user/${u_id}`)
  }

  CreateCashOrder(cart_id:string , shippingDetails:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/orders/${cart_id}`,
      {'shippingAddress' : shippingDetails}
    )
  }


  
}
