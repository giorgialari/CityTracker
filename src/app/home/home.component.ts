import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { City } from '../_models/city';
import { CitiesService } from '../_services/cities.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  cities: City = {} as City;
  searchControl = new FormControl();

  constructor(private citiesService: CitiesService, private router: Router) { }


  search() {
    const city = this.searchControl.value.toLowerCase().replace(/ /g, "-");
    document.getElementById('alert')!.style.display = 'none';

    const getScores$ = this.citiesService.getCityScores(city);
    const getImages$ = this.citiesService.getPixabayImages(city);

    forkJoin([getScores$, getImages$]).subscribe(
      ([scoresResponse, imagesResponse]) => {
        if (scoresResponse && imagesResponse) {
          this.cities = scoresResponse;
          this.cities.images = imagesResponse.hits[0].largeImageURL;
          console.log(imagesResponse);
          this.citiesService.setCityData(this.cities);
          this.router.navigate(['/city', city]);
        }
      },
      error => {
        if (error.status === 404) {
          document.getElementById('alert')!.style.display = 'block';
          this.cities = {} as City;
          this.citiesService.setCityData(this.cities);
        }
      }
    );
  }


}
