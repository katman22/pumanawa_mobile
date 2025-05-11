

export type ForecastItem = {
  name: string;
  icon: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  shortForecast: string;
  detailedForecast: string;
};

export interface LocationData {
  name: string;
  lat: string;
  lng: string
}

export type LocationForecast = {
  forecast_locale: string;
  forecasts: ForecastItem[];
};
