import { Routes } from '@angular/router';
import { AutLayoutComponent } from './core/layouts/aut-layout/aut-layout.component';
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { WildComponent } from './shared/components/wild/wild.component';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { authGuard } from './core/guard/auth-guard';

export const routes: Routes = [
    {path:'' , redirectTo: ()=>{ 
        let _CookieService = inject(CookieService)
        return _CookieService.check('token') ? 'home' : 'login'
    }, pathMatch:'full' },
    
    {path:'' , component:AutLayoutComponent  , children:[
        {path:'login' , component:LoginComponent , title:'Fresh-Cart'},
        {path:'register' , component:RegisterComponent , title:'Fresh-Cart'}
    ] },
    {path:'' , component:MainLayoutComponent , canActivate:[authGuard] , children:[
        {path:'home' , loadComponent : ()=> import('./features/home/home/home.component').then( (c)=> c.HomeComponent ) , title:'Fresh-Cart'},
        {path:'products' , loadComponent : ()=> import('./features/products/products/products.component').then( (c)=> c.ProductsComponent ) , title:'Fresh-Cart'},
        {path:'products/:b_id' , loadComponent : ()=> import('./features/products/products/products.component').then( (c)=> c.ProductsComponent ) , title:'Fresh-Cart'},
        {path:'products/:c_id' , loadComponent : ()=> import('./features/products/products/products.component').then( (c)=> c.ProductsComponent ) , title:'Fresh-Cart'},
        {path:'categories' , loadComponent : ()=> import('./features/categories/categories/categories.component').then( (c)=> c.CategoriesComponent ) , title:'Fresh-Cart'},
        {path:'cart' , loadComponent : ()=> import('./features/cart/cart/cart.component').then( (c)=> c.CartComponent ) , title:'Fresh-Cart'},
        {path:'brands' , loadComponent : ()=> import('./features/brands/brands/brands.component').then( (c)=> c.BrandsComponent ) , title:'Fresh-Cart'},
        {path:'p-details/:p_id/:p_slug' , loadComponent : ()=> import('./features/p-details/p-details/p-details.component').then( (c)=> c.PDetailsComponent ) , title:'Fresh-Cart'},
        {path:'c-details/:c_id/:c_slug' , loadComponent : ()=> import('./features/c-details/c-details/c-details.component').then( (c)=> c.CDetailsComponent ) , title:'Fresh-Cart'},
        {path:'checkout/:cart_id' , loadComponent : ()=> import('./features/checkout/checkout/checkout.component').then( (c)=> c.CheckoutComponent ) , title:'Checkout'},
        {path:'allorders' , loadComponent : ()=> import('./features/allorders/allorders/allorders.component').then( (c)=> c.AllordersComponent ) , title:'Fresh-Cart'}
    ] },
    {path:'**' , component:WildComponent , title:'Not Found'}
];
