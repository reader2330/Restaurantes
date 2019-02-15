import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  urlApi = environment.urlApi;
  token: string;
  constructor(private  http: HttpClient) { }
  postLogin(data): Observable<any> {
    return this.http.post(this.urlApi + 'auth/login', data);
  }
  postUser(data) {
    return this.http.post(this.urlApi + 'users', data);
  }
  getToken() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }
  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }
}
