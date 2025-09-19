import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class WeatherService {
    private readonly apiKey: string;
    private readonly baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

    constructor(private configService: ConfigService) {
        this.apiKey = this.configService.get<string>('OPENWEATHERMAP_API_KEY');
    }

    async getCurrentWeather(lat: number, lon: number) {
        if (!this.apiKey) {
            console.warn('Weather API key is not configured. Returning mock data.');
            return { temp: 28, condition: 'Sunny', humidity: 60 };
        }

        try {
            const response = await axios.get(this.baseUrl, {
                params: {
                    lat,
                    lon,
                    appid: this.apiKey,
                    units: 'metric',
                },
            });

            const data = response.data;
            return {
                temp: Math.round(data.main.temp),
                condition: data.weather[0]?.main || 'Clear',
                humidity: data.main.humidity,
                icon: data.weather[0]?.icon,
            };
        } catch (error) {
            console.error('Failed to fetch weather data:', error.message);
            // Return mock data on failure to prevent frontend from crashing
            return { temp: 28, condition: 'Sunny', humidity: 60 };
        }
    }
}

// import { Injectable } from '@nestjs/common'
// import { ConfigService } from '@nestjs/config'
// import axios from 'axios'

// @Injectable()
// export class WeatherService {
//     private readonly apiKey: string
//     private readonly apiUrl: string

//     constructor(private configService: ConfigService) {
//         this.apiKey = this.configService.get<string>('WEATHER_API_KEY')
//         this.apiUrl = this.configService.get<string>('WEATHER_API_URL')
//     }

//     async getCurrentWeather(lat: number, lon: number) {
//         try {
//             const response = await axios.get(`${this.apiUrl}/weather`, {
//                 params: {
//                     lat,
//                     lon,
//                     appid: this.apiKey,
//                     units: 'metric',
//                 },
//             })

//             return {
//                 temperature: response.data.main.temp,
//                 humidity: response.data.main.humidity,
//                 pressure: response.data.main.pressure,
//                 description: response.data.weather[0].description,
//                 windSpeed: response.data.wind.speed,
//                 windDirection: response.data.wind.deg,
//             }
//         } catch (error) {
//             throw new Error(`Failed to fetch weather data: ${error.message}`)
//         }
//     }

//     async getWeatherForecast(lat: number, lon: number, days: number = 5) {
//         try {
//             const response = await axios.get(`${this.apiUrl}/forecast`, {
//                 params: {
//                     lat,
//                     lon,
//                     appid: this.apiKey,
//                     units: 'metric',
//                     cnt: days * 8, // 8 forecasts per day (every 3 hours)
//                 },
//             })

//             return response.data.list.map((item: any) => ({
//                 datetime: new Date(item.dt * 1000),
//                 temperature: item.main.temp,
//                 humidity: item.main.humidity,
//                 description: item.weather[0].description,
//                 windSpeed: item.wind.speed,
//                 precipitation: item.rain?.['3h'] || 0,
//             }))
//         } catch (error) {
//             throw new Error(`Failed to fetch weather forecast: ${error.message}`)
//         }
//     }
// }