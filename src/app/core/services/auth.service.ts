import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequestModel } from '../../shared/models/login-request.model'; 
import { LoginResponseModel } from '../../shared/models/login-response.model';
import { UserModel } from '../../shared/models/user.model';
import { RegisterRequestModel } from '../../shared/models/register-request.model';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  private userSubject = new BehaviorSubject<UserModel | null>(null);
  user$ = this.userSubject.asObservable();

  private readonly TOKEN_KEY = 'jwt_token';
  private readonly USER_KEY = 'user_info';

  login(data: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>('http://localhost:8081/api/auth/login', data).pipe(
      tap(response => {
        this.saveToken(response.token);
        this.decodeAndStoreUser(response.token);
      })
    );
  }

  register(data: RegisterRequestModel): Observable<string> {
    return this.http.post('http://localhost:8081/api/auth/register', data, { responseType: 'text' });
  }
  
  resetPassword(email: string): Observable<string> {
    return this.http.post('http://localhost:8081/api/auth/forgot-password', { email }, { responseType: 'text' });
  }  
  


  logout(): void {
    // Supprimer les données de l'utilisateur, les tokens, etc.
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Ne pas effectuer de redirection ici
  }


  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }  

  decodeAndStoreUser(token: string): void {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const user: UserModel = {
      username: payload.sub,
      role: payload.role
    };
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.userSubject.next(user);
    console.log("Decoded user: ", user);
  }

  getCurrentUser(): UserModel | null {
    if (typeof window !== 'undefined' && localStorage.getItem(this.USER_KEY)) {
      const userJson = localStorage.getItem(this.USER_KEY);
      return userJson ? JSON.parse(userJson) : null;
    }
    return null;
  }  

  isLoggedIn(): boolean {
    return typeof window !== 'undefined' && !!this.getToken();
  }
}