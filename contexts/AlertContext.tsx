// context/AlertContext.tsx

import React, { createContext, useState } from 'react';
import {fetchAlerts} from "@/hooks/UseWeatherService";
import {Alert} from "@/constants/types";

interface AlertContextType {
    alert: Alert | null;
    fetchAlert: (lat: string, lon: string) => Promise<void>;
}

// Create context with default value
export const AlertContext = createContext<AlertContextType>({
    alert: null,
    fetchAlert: async () => {}, // empty default
});

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
    const [alert, setAlert] = useState<Alert | null>(null);

    const fetchAlert = async (lat: string, lon: string) => {
        try {
            const res = await fetchAlerts(lat, lon);
            if (res.alerts.length > 0) {
                setAlert(res.alerts[0]); // Take first alert
            } else {
                setAlert(null);
            }
        } catch (e) {
            console.error('Alert fetch failed', e);
        }
    };

    return (
        <AlertContext.Provider value={{ alert, fetchAlert }}>
            {children}
        </AlertContext.Provider>
    );
};
