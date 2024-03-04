import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthintcationService } from './authintcation.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  headerData:any = {"token" : localStorage.getItem("userToken")} ;
  baseUrl:string = "https://ecommerce.routemisr.com" ;
  cartItemNumber:BehaviorSubject<any> = new BehaviorSubject("0") ;
  constructor(private _httpclient:HttpClient , private auth:AuthintcationService) {
      this.getAllCart().subscribe(
        res => {
         this.cartItemNumber.next(res.numOfCartItems)}
       )
  }

addToCart(productId:string):Observable<any>{
  return this._httpclient.post(`${this.baseUrl}/api/v1/cart` , {"productId" : productId} , {
    headers : this.headerData
  })
}

  getAllCart():Observable<any>{
    return this._httpclient.get(`${this.baseUrl}/api/v1/cart` , {
      headers : this.headerData
    })
  }

  removeFromCart(productId:string):Observable<any>{
    return this._httpclient.delete(`${this.baseUrl}/api/v1/cart/${productId}`,{
      headers : this.headerData
    })
   }

  updateCount(Id:string , count:string):Observable<any>{
    return this._httpclient.put(`${this.baseUrl}/api/v1/cart/${Id}` , {"count":count} ,{
      headers : this.headerData
     } )
  }

  payment(id:string):Observable<any>{

    return this._httpclient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200` , {"shippingAddress":{
      "details": "details",
      "phone": "01010700999",
      "city": "Cairo"
      }} ,{
        headers : this.headerData
       } )
  }
}
