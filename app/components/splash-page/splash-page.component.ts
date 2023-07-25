import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, delay } from 'rxjs/operators';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'splash-page',
  templateUrl: './splash-page.component.html',
  styleUrls: ['./splash-page.component.scss'],
})
export class SplashPageComponent implements OnInit {
  constructor(private weatherService: WeatherService, private router: Router) {}

  ngOnInit(): void {
    this.weatherService.weatherData$
      .pipe(
        filter((data) => data.length > 0),
        delay(3000)
      )
      .subscribe(() => {
        this.router.navigate(['/weather']);
      });

    const cities = [
      { name: 'Łódź', id: 3093133 },
      { name: 'Warszawa', id: 756135 },
      { name: 'Berlin', id: 2950159 },
      { name: 'New York', id: 5128581 },
      { name: 'Londyn', id: 2643743 },
    ];

    this.weatherService.getWeatherForCities(cities).subscribe();
  }
}
