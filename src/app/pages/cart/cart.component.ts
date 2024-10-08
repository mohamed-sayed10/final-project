import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  notyf: Notyf;


  total = 0;
  products:any;

  constructor(private cart:CartService) {    this.notyf = new Notyf();  }

  ngOnInit(){
    this.getCart()
  }

  getCart(){
    this.cart.cart().subscribe(res=>{
      this.total = res.total_cart;
      this.products = res.products
    })
  }

  deleteCart(id: number) {
    this.cart.deleteCart(id).subscribe((res) => {
      this.getCart();  

      this.notyf.success(res.message);
    });
  }

}
