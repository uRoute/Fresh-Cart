import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/products/products.service';
import { IProduct } from '../../../core/interface/iproduct.interface';
import { CurrencyPipe } from '@angular/common';
import { CategoriesSliderComponent } from '../components/categories-slider/categories-slider.component';
import { MainSliderComponent } from '../components/main-slider/main-slider.component';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  imports: [CurrencyPipe, CategoriesSliderComponent, MainSliderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  products!: IProduct[];

  ngOnInit(): void {
    this._ProductsService.GetAllProduct().subscribe({
      next: (res) => {
        this.products = res.data;
      },
    });
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
}
