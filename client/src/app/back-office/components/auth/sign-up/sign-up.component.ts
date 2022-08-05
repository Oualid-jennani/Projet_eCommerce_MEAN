import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user:User;
  userForm:any;

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
    this.authService.signUpAdmin(this.userForm.value).subscribe(
      (response) => {
        	this.router.navigate(["/admin/sign-in"]);
      },
      (err) =>  {
        console.log(err);
    },
    );
  }

}
