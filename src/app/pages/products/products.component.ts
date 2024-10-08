import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { GlobalService } from '../../Services/global.service';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  notyf: Notyf;

  id: any;
  products: any;

  addCart = {
    product_id: 0,
    qty: 1,
    is_collage: 0,
    is_offer: 0
  }

  constructor(private product: ProductService, private activated: ActivatedRoute, private router: Router, private cart: CartService, private global: GlobalService) {
    this.notyf = new Notyf(); 
  }

  ngOnInit() {
    this.activated.paramMap.subscribe(param => {
      this.id = param.get('id');
      this.product.products(this.id).subscribe(res => {
        this.products = res.data
      })
    });
  }

  addToCart(id: number) {
    if (this.global.is_login) {
      this.addCart.product_id = id;
      this.cart.addToCart(this.addCart).subscribe((res) => {
        
        this.notyf.success(res.message);
      });
    } else {
      
      this.notyf.error('Please Login First');
      
      
      this.router.navigateByUrl('/login');
    }
  }

}
