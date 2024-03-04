import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../cart';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  allProducts!:Product[];
  totalPrice:string =""
  counter:string = ""
  cartId:string = ""
  // count:number = 0;
  constructor(private _cartServices:CartService , private _router:Router){
  }

  ngOnInit(): void {
    this._cartServices.getAllCart().subscribe({
      next: (res) => {
        if(res.data.totalCartPrice != 0){
          this.allProducts = res.data.products;
          this.totalPrice = res.data.totalCartPrice
          this.cartId = res.data._id
        }else{
          this._router.navigate(["/home"])
        }
      }
    })
  }
  paymentBtn(id:string){
    this._cartServices.payment(id).subscribe({
      next: (data) => window.location.href = data.session.url


    })
  }
  removeItem(pId:string){
    this._cartServices.removeFromCart(pId).subscribe({
      next: (res) => { this.allProducts = res.data.products
        this._cartServices.cartItemNumber.next(res.numOfCartItems)
      },
      error:(err) => {
        console.log(err);

      }
    })
  }

  add(id:string , count:number | string){
    count = (Number(count)+ 1).toString()
    this._cartServices.updateCount(id , count).subscribe({
      next: (res) => { this.allProducts = res.data.products

        this.totalPrice =res.data.totalCartPrice

      }
    })
  }
  mins(id:string , count:number | string){
    count = (Number(count)- 1).toString()
  if( count == "0" ){
    this.removeItem(id)
  }
  this._cartServices.updateCount(id , count).subscribe({
    next: (res) => { this.allProducts = res.data.products
      this.totalPrice =res.data.totalCartPrice
      }
    })
  }
}
