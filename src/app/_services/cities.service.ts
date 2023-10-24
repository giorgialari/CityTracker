import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { City } from '../_models/city';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private citySubject = new BehaviorSubject<City | null>(null);
  city$ = this.citySubject.asObservable();

  // URL e chiave API di Teleport
  baseUrl = 'https://api.teleport.org/api/urban_areas/slug:';

  // URL e chiave API di Pixabay
  private readonly PIXABAY_API_URL = 'https://pixabay.com/api/';
  private readonly PIXABAY_API_KEY = '9914932-e49f2db0de5c9dbd141226a57';

  constructor(private http: HttpClient) { }

  getCityScores(city: string): Observable<City> {
    return this.http.get<City>(`${this.baseUrl}${city}/scores/`);
  }


  getPixabayImages(query: string): Observable<any> {
    return this.http.get<any>(`${this.PIXABAY_API_URL}?key=${this.PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&category=travel`);
  }

  setCityData(city: City) {
    this.citySubject.next(city);
  }

  getCurrentCity(): City | null {
    return this.citySubject.getValue();
  }
}
