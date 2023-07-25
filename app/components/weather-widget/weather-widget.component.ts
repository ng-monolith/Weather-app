import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { City, Weather } from '../../models/weather.model';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit, OnDestroy {
  cities: City[] = [
    { name: 'Łódź', id: 3093133 },
    { name: 'Warszawa', id: 756135 },
    { name: 'Berlin', id: 2950159 },
    { name: 'New York', id: 5128581 },
    { name: 'Londyn', id: 2643743 },
  ];
  currentDate = new Date();

  currentWeatherData: Weather[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.subscription = interval(10000).subscribe(() => {
      // this.updateWeatherData();
    });

    this.subscription.add(interval(60000).subscribe(() => {
      this.updateRandomWeatherData();
    }));

    this.updateWeatherData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updateWeatherData(): void {
    const randomCities = this.shuffleArray(this.cities).slice(0, 3);

    randomCities.forEach((city) => {
      this.weatherService.getWeatherForCity(city.id).subscribe((weatherData) => {
        weatherData.cityName = city.name;

        const existingCityIndex = this.currentWeatherData.findIndex((data) => data.cityId === city.id);

        if (existingCityIndex !== -1) {
          this.currentWeatherData[existingCityIndex] = weatherData;
        } else {
          if(this.currentWeatherData.length < 3) {
            this.currentWeatherData.push(weatherData);
          }
        }
      });
    });
  }

  private updateRandomWeatherData(): void {
    this.currentWeatherData = [];
    this.updateWeatherData();
  }

  private shuffleArray(array: City[]): City[] {
    return array.sort(() => Math.random() - 0.5);
  }

  openCityWeatherPage(cityId: number): void {
    window.open(`https://openweathermap.org/city/${cityId}`, '_blank');
  }
}
