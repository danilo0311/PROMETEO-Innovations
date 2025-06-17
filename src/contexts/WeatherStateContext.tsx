'use client';

import { WeatherContextInterface } from '@/types/weather-context/interface';
import { WeatherInterface } from '@/types/weather/interface';
import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react';

const WeatherContext = createContext<WeatherContextInterface | undefined>(
	undefined,
);

export const useWeatherStateContext = (): WeatherContextInterface => {
	const context = useContext(WeatherContext);
	if (!context) {
		throw new Error(
			'useWeatherStateContext must be used within WeatherContextProvider',
		);
	}
	return context;
};

export const WeatherContextProvider = ({
	children,
	initialData,
}: {
	children: ReactNode;
	initialData: WeatherInterface[] | null;
}) => {
	const [selectedCity, setSelectedCity] = useState<string>('all');
	const [selectedCityMap, setSelectedCityMap] = useState<string>('all');
	const [onlyAlarms, setOnlyAlarms] = useState<boolean>(false);
	const [weatherData, setWeatherData] = useState<WeatherInterface[] | null>(
		initialData,
	);
	const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

	useEffect(() => {
		setWeatherData(initialData);
	}, [initialData]);

	const contextValue: WeatherContextInterface = {
		selectedCity,
		setSelectedCity,
		onlyAlarms,
		setOnlyAlarms,
		weatherData,
		setWeatherData,
		selectedCityMap,
		setSelectedCityMap,
		hoveredRegion,
		setHoveredRegion,
	};

	return (
		<WeatherContext.Provider value={contextValue}>
			{children}
		</WeatherContext.Provider>
	);
};
