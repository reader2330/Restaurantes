import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RestauranteService {
  urlApi = environment.urlApi;
  constructor(private http: HttpClient) { }
  getRestaurants(): Observable<any> {
    return this.http.get(this.urlApi + 'restaurants');
  }
  createRestaurant(data) {
    return this.http.post(this.urlApi + 'restaurants', data);
  }
  deleteRestaurant(id) {
    return this.http.delete(this.urlApi + 'restaurants/' + id);
  }




}
