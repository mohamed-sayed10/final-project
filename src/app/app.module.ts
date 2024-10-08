import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { IndexComponent } from './pages/index/index.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AuthInterceptor  } from './interceptor/auth.interceptor';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FooterComponent } from './shared/footer/footer.component';
import { AdAndCategoriesComponent } from './HomePageContent/ad-and-categories/ad-and-categories.component';
import { HomeComponent } from './pages/home/home.component';
import { FeaturedComponent } from './HomePageContent/featured/featured.component';
import { CategoriesComponent } from './HomePageContent/categories/categories.component';
import { ProfileComponent } from './User Administration/Account/profile.component';
import { SidebarComponent } from './User Administration/sidebar/sidebar.component';
import { AddressComponent } from './User Administration/address/address.component';
import { CreateAddressComponent } from './User Administration/create-address/create-address.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
   FooterComponent ,
    IndexComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    SidebarComponent,
    NotFoundComponent,
    SingleProductComponent,
    ProductsComponent,
    CartComponent,
    AddressComponent,
    CreateAddressComponent,
    HomeComponent,
    AdAndCategoriesComponent,
    FeaturedComponent, 
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor , multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
