

export type ForecastItem = {
  name: string;
  icon: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  shortForecast: string;
  detailedForecast: string;
};

export type ForecastPeriod = {
  name: string;
  icon: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  shortForecast: string;
  detailedForecast: string;
  windSpeed: string,
  windDirection: string,
  startTime: string,
  probabilityOfPrecipitation: {
    unitCode: string;
    value: number | null; // sometimes it might be null
  };
};

export interface LocationData {
  name: string;
  lat: string;
  lng: string
}

export type LocationHourlyForecast = {
  periods: ForecastPeriod[];
};

export type LocationForecast = {
  forecast_locale: string;
  forecasts: ForecastItem[];
  lat: string,
  long: string
};

export type RadarLocation = {
  radar: {
    radar: string;
  };
};
