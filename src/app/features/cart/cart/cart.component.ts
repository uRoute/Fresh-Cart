import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Router, RouterLink } from '@angular/router';
import { ICart } from '../../../core/interface/icart.interface';

import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cart',
  imports: [CarouselModule, CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnDestroy {
  private readonly _CartService = inject(CartService);
  private readonly _AuthenticationService = inject(AuthenticationService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _CookieService = inject(CookieService);
  private readonly _Router = inject(Router);
  _userCart!: ICart;
  _userInfo: any;
  cartSubs!: Subscription;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 500,
    autoplay: true,
    margin: 30,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };
  ngOnInit(): void {
    this.getCart();
    this._AuthenticationService.decodeToken(this._CookieService.get('token'));
    this._userInfo = this._AuthenticationService.userInfo();
  }

  getCart() {
    this._CartService.GetLoggedUserCart().subscribe({
      next: (res) => {
        this._userCart = res;
      },
    });
  }

  clearCart() {
    this._CartService.ClearUserCart().subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this._CartService.cartCount.set(res.numOfCartItems);
      },
    });

    this.getCart();
  }

  updateQuant(p_id: string, count: number) {
    this._CartService.UpdateCartProductQuantity(p_id, count).subscribe({
      next: (res) => {
        this._userCart = res;
      },
    });
  }

  removeItem(p_id: string) {
    this._CartService.RemoveSpecificCartItem(p_id).subscribe({
      next: (res) => {
        this._userCart = res;
        this._CartService.cartCount.set(res.numOfCartItems);
      },
    });
  }
  ngOnDestroy(): void {
    this.cartSubs?.unsubscribe();
  }
}
