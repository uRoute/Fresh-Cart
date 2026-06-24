import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { OrderService } from '../../../shared/services/order/order.service';
import { IOrder } from '../../../core/interface/iorder.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit{

  private readonly _AuthenticationService = inject(AuthenticationService)
  private readonly _OrderService = inject(OrderService)
  private readonly _CookieService = inject(CookieService)
  userId!:any
  userOrders!:IOrder[]
  ngOnInit(): void {
    this._AuthenticationService.decodeToken(this._CookieService.get('token'))
    this.userId = this._AuthenticationService.userInfo()
    // console.log(this.userId.id);
    this._OrderService.GetUserOrders(this.userId.id).subscribe({
      next:(res)=>{
        // console.log(res);
        this.userOrders = res
      }
    })
    
  }

}
