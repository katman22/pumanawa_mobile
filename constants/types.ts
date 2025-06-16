

export type ForecastItem = {
  name: string;
  icon: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  shortForecast: string;
  detailedForecast: string;
  number: string;
};

export type ForecastPeriod = {
  number: string;
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
  dewpoint:{
    unitCode: string,
    value: number | null;
  };
  relativeHumidity: {
    "unitCode": string,
    "value": number | null;
  },
  probabilityOfPrecipitation: {
    unitCode: string;
    value: number | null; // sometimes it might be null
  };
};

export interface LocationData {
  name: string;
  lat: string;
  lng: string;
  favorite?: boolean;
}

export type LocationHourlyForecast = {
  periods: ForecastPeriod[];
};

export type LocationPeriodForecast = {
  period: ForecastPeriod;
};

export type LocationForecast = {
  forecast_locale: string;
  forecasts: ForecastItem[];
  lat: string;
  long: string;
  favorite?: boolean;
  name: string;
};

export type RadarLocation = {
  radar: {
    radar: string;
  };
};
