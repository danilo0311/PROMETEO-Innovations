import { Dispatch, SetStateAction } from 'react';
import { WeatherInterface } from '../weather/interface';

export interface WeatherContextInterface {
	selectedCityMap: string;
	setSelectedCityMap: Dispatch<SetStateAction<string>>;
	selectedCity: string;
	setSelectedCity: Dispatch<SetStateAction<string>>;
	onlyAlarms: boolean;
	setOnlyAlarms: Dispatch<SetStateAction<boolean>>;
	weatherData: WeatherInterface[] | null;
	setWeatherData: Dispatch<SetStateAction<WeatherInterface[] | null>>;
	hoveredRegion: string | null;
	setHoveredRegion: Dispatch<SetStateAction<string | null>>;
}
