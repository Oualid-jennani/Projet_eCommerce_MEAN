import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(private categoryService: CategoryService,private productService:ProductService,private activatedRoute : ActivatedRoute,private router:Router,private formBuilder: FormBuilder) { }

  isLoading = false;
  alert = {
    type: 'success',
    message: "",
    active: false,
  };

  public product:Product;
  public categories:Category[] = [];

  productForm:FormGroup;
  fileToUpload: File | null = null;
  private formData: FormData = new FormData();

  ngOnInit(): void {

    this.productService.getProductById(this.activatedRoute.snapshot.params['id']).subscribe(
      (res) =>{
        this.product = res;
        this.productForm = this.formBuilder.group(this.product);
      }
    );

    this.productForm= this.formBuilder.group(
      {
        _id: ['', Validators.required],
        name: ['', Validators.required],
        price: ['', Validators.required],
        compareAtPrice: ['', Validators.required],
        description: ['', Validators.required],
        category: ['', Validators.required],
      }
    );

    this.getCategories();
   
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(
      (response:any) => {
        this.categories = response.categories;
      },
    )
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit() {

    for (const property in this.productForm.value) {
      this.formData.append(property,this.productForm.value[property])
    }
    this.formData.append("image",this.fileToUpload);

    this.productService.updateProduct(this.product._id,this.formData).subscribe(
      (response) => {
        this.productForm.reset();
        this.router.navigate(["/admin/products"])
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
