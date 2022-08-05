import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  readonly BASE_URL = "http://localhost:3000/users";

  constructor(private http: HttpClient , private router:Router) { 
    
    if(localStorage.getItem("token")) {
      this.isLoggedIn.next(true);
    }
  }

  signInAdmin(user:any) :Observable<any>{
    return this.http.post<any>(`${this.BASE_URL}/admin-signin`,user);
  }

  signUpAdmin(user:any) :Observable<any>{
    return this.http.post<any>(`${this.BASE_URL}/admin-signup`,user);
  }

  setSession = async (authResult:any) => {
    await localStorage.setItem('token', authResult.token);
    await localStorage.setItem('user', authResult.user);
    
    if (localStorage.getItem('token'))
     this.isLoggedIn.next(true);
  }

  logout() {;
    this.isLoggedIn.next(false);
    localStorage.clear();
    this.router.navigate(['/admin/sign-in']);
  }

  getIsLoggedIn() {
    return this.isLoggedIn.asObservable();
  }

}
