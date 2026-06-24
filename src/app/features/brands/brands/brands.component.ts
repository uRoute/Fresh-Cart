import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../../shared/services/brands/brands.service';
// import { ProductsService } from '../../../shared/services/products/products.service';
import { IBrand } from '../../../core/interface/ibrand.interface';
import { Subscription } from 'rxjs';
import {NgxPaginationModule} from 'ngx-pagination'; 
// import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [ RouterLink ,NgxPaginationModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit , OnDestroy{

  private readonly _BrandsService = inject(BrandsService);
  // private readonly _ProductsService = inject(ProductsService);
  brandsSubs!:Subscription
  brands!:IBrand[]
  p:number = 1


  ngOnInit(): void {
    this.brandsSubs = this._BrandsService.GetAllBrands(54).subscribe({
      next:(res)=>{
        this.brands = res.data
        // console.log(this.brands);
      }
    })
  }


  ngOnDestroy(): void {
    this.brandsSubs?.unsubscribe()
  }



}
