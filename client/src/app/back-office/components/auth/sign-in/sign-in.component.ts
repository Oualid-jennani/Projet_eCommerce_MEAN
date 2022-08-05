import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user:User;
  userForm:any;
  isLoading = false;
  isUndefined = false;
  isWrongPassword = false;
  constructor(private authService: AuthService,private activatedRoute : ActivatedRoute,private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm= this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
      }
    );
  }

  onSubmit() {
    this.authService.signInAdmin(this.userForm.value).subscribe(
      async (result) => {
        await this.authService.setSession(result);
        this.router.navigate(["/admin/products"])
      },
      (err) =>  {
        err.error.message === "User undefined" ? this.isUndefined = true :this.isUndefined = false ;
        err.error.message === "Wrong Password" ? this.isWrongPassword = true : this.isWrongPassword = false ;
    },
    );
  }
}
