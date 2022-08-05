import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly BASE_URL = "http://localhost:3000/products";

  constructor(private http: HttpClient) { }

  getProducts(category:string,page?:number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.BASE_URL}/?category=${category}&page=${page}`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.BASE_URL}/${id}`);
  }

  createProduct(productData: any): Observable<Product> {
    return this.http.post<Product>(this.BASE_URL + "/add",productData);
  }

  updateProduct(id:string,productData:any): Observable<any> {
    return this.http.post<any>(this.BASE_URL + "/edit/" + id, productData);
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<any>(`${this.BASE_URL}/${id}`);
  }
  
}