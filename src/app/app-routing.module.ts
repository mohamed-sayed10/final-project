import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from "./pages/index/index.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './User Administration/Account/profile.component';
import { AddressComponent } from './User Administration/address/address.component';
import { CreateAddressComponent } from './User Administration/create-address/create-address.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'address', children: [
      { path: '', component: AddressComponent },
      { path: 'create', component: CreateAddressComponent },
      { path: 'update/:id', component: CreateAddressComponent },
    ]
  },
  {
    path: 'product', children: [
      { path: ':id', component: ProductsComponent },
      { path: 'single/:id', component: SingleProductComponent },
    ]
  },
  {
    path: 'cart', children: [
      { path: '', component: CartComponent },
      { path: 'single/:id', component: SingleProductComponent },
    ]
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
  
];



@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
