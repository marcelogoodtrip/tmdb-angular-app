import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient.post<{ token: string }>(`${environment.NEST_API_PATH}auth/login`, { email, password })
    .pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
  }
}
