import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
  private apiUrl = '/api/Weatherforecast';

  constructor(private http: HttpClient) {
    console.log('WeatherService initialized');
  }

  getWeatherForecasts(): Observable<WeatherForecast[]> {
    console.log('Calling API:', this.apiUrl);
    
    // Get response as text first, then parse to JSON
    return this.http.get(this.apiUrl, { responseType: 'text' }).pipe(
      map((response: string) => {
        console.log('Raw response:', response);
        // Clean the response - remove any BOM or special characters
        const cleanResponse = response.trim();
        // Parse the cleaned response
        return JSON.parse(cleanResponse) as WeatherForecast[];
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    
    let errorMessage = 'An error occurred while fetching weather data.';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}