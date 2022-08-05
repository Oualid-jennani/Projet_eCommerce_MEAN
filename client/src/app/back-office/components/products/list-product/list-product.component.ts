import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  constructor(private categoryService: CategoryService,private productService: ProductService,private activatedRoute : ActivatedRoute,private router:Router) { }

  public categories:Category[] = [];
  public caregory:string = "all";
  public products:Product[] = [];
  pages = [1];
  currentPage :number = 1;

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  ChangeCategory(cat){
    this.caregory = cat.value;
    this.getProducts();
  }

  getProducts(page:number = 1){
    
    this.currentPage = page;
    this.productService.getProducts(this.caregory,page).subscribe(
      (response:any) => {
        this.products = response.products;
        this.pages = Array(response.totalPages ).map((x,i)=>i);        
      },
      //(err) => { err.statusText === "Unauthorized" ? this.authService.logout():console.log(err)},
    )
  }

  // Pagination
  next() {
    this.currentPage< this.pages.length ? this.currentPage ++ : this.currentPage;
    this.getProducts(this.currentPage);
  }
  // Pagination
  pervious() {
    this.currentPage>1 ? this.currentPage -- : this.currentPage;
    this.getProducts(this.currentPage);
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(
      (response:any) => {
        this.categories = response.categories;
      },
    )
  }

  editProduct(id:string){
    this.router.navigate(["/admin/products/edit/"+id])
  }

  deleteProduct(id:string){
    this.productService.deleteProduct(id).subscribe(
      (data) => {
        const index = this.products.findIndex(
          (pr) => {
            return pr._id === id;
          }
        );
        this.products.splice(index, 1);
      },
    )
  }
}
