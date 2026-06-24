import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../../../shared/services/categories/categories.service';
import { ICategory } from '../../../../core/interface/icategory.interface';

@Component({
  selector: 'app-categories-slider',
  imports: [CarouselModule],
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.css',
})
export class CategoriesSliderComponent implements OnInit {
  private readonly _CategoriesService = inject(CategoriesService);
  categories!:ICategory[]
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
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
      1024: {
        items: 6,
      },
    },
    nav: false,
  };
  ngOnInit(): void {
    this._CategoriesService.GetAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
    });
  }
}
