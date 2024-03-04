import { Component } from '@angular/core';
import { BrandsService } from '../brands.service';
import { brands } from '../brands';
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {

  brandsData!:brands[]
    constructor(private _brandsServices:BrandsService){}

  ngOnInit(): void {
    this._brandsServices.getAllBrands().subscribe(
      res => {
        this.brandsData = res.data

      }
    )
  }
}
