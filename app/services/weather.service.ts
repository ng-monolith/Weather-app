import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Weather, City } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'c71c065da6fa3bc922f101fe0f80e5e9';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private weatherDataSubject: BehaviorSubject<Weather[]> = new BehaviorSubject<Weather[]>([]);

  constructor(private http: HttpClient) {}

  get weatherData$(): Observable<Weather[]> {
    return this.weatherDataSubject.asObservable();
  }

  getWeatherForCities(cities: City[]): Observable<void> {
    const observables: Observable<Weather>[] = cities.map(city => this.getWeatherForCity(city.id));
    return forkJoin(observables).pipe(
      map((data: Weather[]) => {
        this.weatherDataSubject.next(data);
      })
    );
  }

  getCurrentWeatherData(): Weather[] {
    return this.weatherDataSubject.getValue();
  }

  getWeatherForCity(cityId: number): Observable<Weather> {
    const url = `${this.baseUrl}?id=${cityId}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url).pipe(
      map((data) => ({
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        cityId: cityId,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        country: data.sys.country,
        cityName: ''
      } as Weather))
    );
  }
}
