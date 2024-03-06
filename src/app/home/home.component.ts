import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Data } from '../products';
import { CartService } from '../cart.service';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { WishListService } from '../wish-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productData!:Data[]
  userName!:string
  wishListData!:string
  isHeart:string[] = [];
  constructor(private _ProductsService:ProductsService, private _cartservices:CartService , private toastEvokeService:ToastEvokeService , private _wishList:WishListService){}

  ngOnInit(): void {
    this._ProductsService.allProductsApi().subscribe({
      next: (res) => {
        this.productData = res.data
      },
      error: (err)=>{
        console.log(err);

      }
    })

  }

  addToCart(productId:string){
    this._cartservices.addToCart(productId).subscribe({
      next: data => {
        this.toastEvokeService.success('success', data.message).subscribe();
        this._cartservices.cartItemNumber.next(data.numOfCartItems)
      },
      error: err =>{
      this.toastEvokeService.danger('error', err.message).subscribe()}

    })
  }

  addToWishList(id:string){
    this._wishList.addToWishList(id).subscribe({
      next: res =>
      {
        this.wishListData =res.data
        for(let i =0 ; i <= this.wishListData.length ; i++){
          if(this.wishListData[i] == id){
            this.isHeart.push(id)
          }
        }
        this.toastEvokeService.success('success', res.message).subscribe();
      }

    })
  }
  rmoveFromWishList(id:string){
    this._wishList.removeFormWishList(id).subscribe({
      next: res =>
      {
        this.wishListData =res.data
        for(let i =0 ; i <= this.wishListData.length ; i++){
          if(this.wishListData[i] == id){
            this.isHeart.shift()
          }
        }
        this.toastEvokeService.success('success', res.message).subscribe();
      }

    })
  }
}
