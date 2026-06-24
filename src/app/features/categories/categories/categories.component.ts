import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { ICategory } from '../../../core/interface/icategory.interface';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{

  private readonly _CategoriesService = inject(CategoriesService)
  categories!:ICategory[]
  ngOnInit(): void {
    this._CategoriesService.GetAllCategories().subscribe({
      next:(res)=>{
        this.categories = res.data
      }
    })
  }


}
