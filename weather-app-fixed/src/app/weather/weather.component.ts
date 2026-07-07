import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService, WeatherForecast } from '../weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  forecasts: WeatherForecast[] = [];
  loading: boolean = true; // Start with loading true
  error: string | null = null;
  totalRecords: number = 0;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    console.log('WeatherComponent initialized');
    this.loadWeatherData();
  }

  loadWeatherData(): void {
    this.loading = true;
    this.error = null;
    
    console.log('Fetching weather data...');
    
    this.weatherService.getWeatherForecasts().subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.forecasts = data;
        this.totalRecords = data.length;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching weather data:', err);
        this.error = 'Failed to load weather data. Please try again later.';
        this.loading = false;
        this.forecasts = [];
        this.totalRecords = 0;
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }

  refreshData(): void {
    this.loadWeatherData();
  }

  isHot(temperatureC: number): boolean {
    return temperatureC > 30;
  }
}