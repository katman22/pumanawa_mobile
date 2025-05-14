// LatLongContext.tsx
import React, { useState, createContext, ReactNode } from 'react';

export type LatLong = {
  lat: number;
  long: number;
  forecast_locale: string,
};

type LatLongContextType = {
  lat: number;
  long: number;
  forecast_locale: string,
  setLatLong: (coords: LatLong) => void;
};

export const LatLongContext = createContext<LatLongContextType>({
  lat: 0,
  long: 0,
  forecast_locale: "",
  setLatLong: () => {}, // This is just a placeholder; real value comes from Provider
});

type LatLongProviderProps = {
  children: ReactNode;
};

export const LatLongProvider = ({ children }: LatLongProviderProps) => {
  const [latLong, setLatLongState] = useState<LatLong>({ lat: 0, long: 0, forecast_locale: "" });

  const setLatLong = (coords: LatLong) => setLatLongState(coords);

  return (
      <LatLongContext.Provider value={{ ...latLong, setLatLong }}>
        {children}
      </LatLongContext.Provider>
  );
};

