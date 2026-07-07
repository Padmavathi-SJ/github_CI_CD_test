import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  // Use direct URL - works in both dev and production
  private apiUrl = 'https://sampleapi20260706g3-bvdacte9b0dvhudv.canadacentral-01.azurewebsites.net/Weatherforecast';

  constructor(private http: HttpClient) {
    console.log('API URL:', this.apiUrl);
  }

  getWeatherForecasts(): Observable<WeatherForecast[]> {
    return this.http.get<WeatherForecast[]>(this.apiUrl);
  }
}