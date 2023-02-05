import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../_models/city';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  city: City = {} as City;
  baseUrl = 'https://api.teleport.org/api/urban_areas/slug:';
  
  constructor(private http: HttpClient) {}
  
  getCityScores(city: string): Observable<City> {
    return this.http.get<City>(`${this.baseUrl}${city}/scores/`);
  }
  
}
