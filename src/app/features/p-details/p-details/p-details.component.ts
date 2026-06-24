import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../core/interface/iproduct.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-p-details',
  imports: [CarouselModule , CurrencyPipe],
  templateUrl: './p-details.component.html',
  styleUrl: './p-details.component.css'
})
export class PDetailsComponent implements OnInit , OnDestroy{

  private readonly _ProductsService = inject(ProductsService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _CartService = inject(CartService);
    private readonly _ToastrService = inject(ToastrService);
  product_id!:string | null
  productDetails:IProduct = { } as IProduct
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 500,
    autoplay: true,
    margin:30,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      }
    },
    nav: false,
  };
  apiSubcripe!:Subscription
  activeRouteSub!:Subscription
  ngOnInit(): void {
    this.activeRouteSub = this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        if(param.get('p_id')){
          this.product_id = param.get('p_id')
        }
      }
    })

    this.apiSubcripe  = this._ProductsService.GetSpecificProduct(this.product_id).subscribe({
      next:(res)=>{
        this.productDetails = res.data
        // console.log(this.productDetails);
        
      }
    })
  }

  AddToCart(p_id: string) {
    this._CartService.AddProductToCart(p_id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, res.status, {
          timeOut: 1500,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
        this._CartService.cartCount.set(res.numOfCartItems);
      },
      error: (err) => {
      },
    });
  }

  ngOnDestroy(): void {
    this.activeRouteSub?.unsubscribe();
    this.apiSubcripe?.unsubscribe()
  }
  
}
