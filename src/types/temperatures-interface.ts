export type Minutely15Units = {
	time: 'iso8601';
	temperature_2m: '°C';
};

export type Minutely15Data = {
	time: string[];
	temperature_2m: number[];
};

export interface WeatherInterface {
	latitude: number;
	longitude: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;
	elevation: number;
	location_id?: number;
	minutely_15_units: Minutely15Units;
	minutely_15: Minutely15Data;
}

export interface CityFormattedInterface {
	city: string;
	time: string[];
	temperature: number[];
	coordinates: [number, number];
}

export type BarChartEntry = {
	time: string;
	[city: string]: string | number;
};

export interface TemperatureRecord {
  city: string;
  time: string;
  temperature: number;
}
