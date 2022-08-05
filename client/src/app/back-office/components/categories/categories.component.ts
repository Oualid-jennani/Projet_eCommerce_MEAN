import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoryService: CategoryService,private activatedRoute : ActivatedRoute,private router:Router,private formBuilder: FormBuilder) { }

  isLoading = false;
  alert = {
    type: 'success',
    message: "",
    active: false,
  };


  public categories:Category[] = [];
  category:Category;
  categoryData:any;
  categoryForm:any;
  categoryUp:Category = new Category();


  ngOnInit(): void {
    this.categoryForm= this.formBuilder.group(
      {
        name: ['', Validators.required],
      }
    );

    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(
      (response:any) => {
        this.categories = response.categories;
        console.log(this.categories)
      },
    )
  }

  onSubmit() {
    this.categoryService.createCategory(this.categoryForm.value).subscribe(
      (response) => {
        this.categories.push(this.categoryForm.value);
        this.categoryForm.reset();
      }
    );
  }

  editCategory(category:Category){
    this.categoryUp._id= category._id;
    this.categoryUp.name= category.name;
  }

  saveChangeCategory(){
    this.categoryService.updateCategory(this.categoryUp).subscribe((data)=>{
      const index = this.categories.findIndex(
        (cat) => {
          return cat._id === this.categoryUp._id;
        }
      );
      this.categories[index].name = this.categoryUp.name;
    });
  }

  deleteCategory(id:string){
    this.categoryService.deleteCategory(id).subscribe((data)=>{
      const index = this.categories.findIndex(
        (cat) => {
          return cat._id === id;
        }
      );
      this.categories.splice(index, 1);
    });
  }
}
