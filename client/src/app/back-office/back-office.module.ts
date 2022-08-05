import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackOfficeRoutingModule } from './back-office-routing.module';
import { BackOfficeComponent } from './back-office.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ManagersComponent } from './components/managers/managers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { ListProductComponent } from './components/products/list-product/list-product.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
 
@NgModule({
  declarations: [
    BackOfficeComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    CategoriesComponent,
    OrdersComponent,
    ManagersComponent,
    SignUpComponent,
    EditProductComponent,
    AddProductComponent,
    ListProductComponent,
    SignInComponent,
  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    
  ]
})
export class BackOfficeModule { }
