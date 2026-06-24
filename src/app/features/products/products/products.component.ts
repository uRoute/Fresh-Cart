import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/products/products.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../../core/interface/iproduct.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms'
import { SearchPipe } from '../../../shared/pipes/search/search-pipe';
@Component({
  selector: 'app-products',
  imports: [RouterLink, CurrencyPipe, NgxPaginationModule , FormsModule ,SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  searchKey:string = ''
  productsSub!: Subscription;
  productsByBrandSub!: Subscription;
  products!: IProduct[];
  brandId?: string;
  p: number = 1;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.brandId = params.get('b_id')!;
      },
    });

    if (this.brandId) {
      this._ProductsService.GetAllProductByBrand(56, this.brandId).subscribe({
        next: (res) => {
          this.products = res.data;
        },
      });
    } else {
      this.productsByBrandSub = this.productsSub = this._ProductsService.GetAllProduct(56).subscribe({
        next: (res) => {
          this.products = res.data;
        },
      });
    }
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
        this._CartService.cartCount.update(old => old = res.numOfCartItems)
        // console.log(this._CartService.cartCount());
        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.productsSub?.unsubscribe();
    this.productsByBrandSub?.unsubscribe();
  }
}
