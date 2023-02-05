import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { City } from '../_models/city';
import { CitiesService } from '../_services/cities.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  cities: City = {} as City;
  searchControl = new FormControl();

  constructor(private citiesService: CitiesService) { }

  search() {
    const city = this.searchControl.value.toLowerCase().replace(/ /g, "-");
    document.getElementById('alert')!.style.display = 'none';
    this.citiesService.getCityScores(city).subscribe(
      response => {
        if (response) {
          this.cities = response;
        }
      },
      error => {
        if (error.status === 404) {
          document.getElementById('alert')!.style.display = 'block';
          this.cities = {} as City;
        }
      }
    );
  }
}
