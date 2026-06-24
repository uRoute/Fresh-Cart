import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../../core/interface/iproduct.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arr:IProduct[] , searchKey:string):IProduct[] {
    return arr.filter( (current)=> current.title.toLowerCase().includes(searchKey.toLowerCase()));
  }

}
