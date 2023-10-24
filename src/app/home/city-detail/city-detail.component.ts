import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CitiesService } from 'src/app/_services/cities.service';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css']
})
export class CityDetailComponent implements OnInit, OnDestroy {
  @Input() cities: any;
  private citySubscription?: Subscription;

  constructor(private citiesService: CitiesService, private router: Router) { }

  ngOnInit(): void {
    this.citySubscription = this.citiesService.city$.subscribe(cityData => {
      this.cities = cityData;
    });
    if (!this.cities) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    if (this.citySubscription) {
      this.citySubscription.unsubscribe();
    }
  }
  goBack(){
    this.router.navigate(['/']);
  }
}
