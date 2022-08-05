import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { BackOfficeComponent } from './back-office.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ManagersComponent } from './components/managers/managers.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { ListProductComponent } from './components/products/list-product/list-product.component';

const routes: Routes = [
  {
    path: '', component: BackOfficeComponent,children:[
      { path: 'categories',canActivate:[ AuthGuardService ], component: CategoriesComponent },
      { path: 'products',canActivate:[ AuthGuardService ],
        children:[
          { path: '', component: ListProductComponent },
          { path: 'add', component: AddProductComponent },
          { path: 'edit/:id', component: EditProductComponent },
        ] 
      },
      { path: 'orders',canActivate:[ AuthGuardService ], component: OrdersComponent },
      { path: 'managers',canActivate:[ AuthGuardService ], component: ManagersComponent }
    ]
  },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in',component:SignInComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
