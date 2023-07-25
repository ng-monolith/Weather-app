export interface Weather {
  temperature: number;
  description: string;
  icon?: string;
  cityId: number;
  windSpeed: number
  humidity: number;
  pressure: number;
  country: string;
  cityName: string;
}

export interface City {
  name: string;
  id: number;
}
