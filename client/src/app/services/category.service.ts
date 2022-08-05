import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { Category } from '../models/category';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  readonly BASE_URL = "http://localhost:3000/categories";

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.BASE_URL);
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.BASE_URL}/${id}`);
  }

  createCategory(category: any): Observable<Category> {
    return this.http.post<Category>(this.BASE_URL + "/add", category);
  }

  updateCategory(updateCategory): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/${updateCategory._id}`, updateCategory);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/${id}`);
  }

  getCategoryProducts(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.BASE_URL}/products`);
  }
}
