import {
	BarChartEntry,
	CityFormattedInterface,
	TemperatureRecord,
	WeatherInterface,
} from '@/types/temperatures-interface';

export function formatOpenMeteoData(
	data: WeatherInterface[],
): CityFormattedInterface[] {
	const cityCoordsMap: Record<string, string> = {
		'-3.6875,40.4375': 'Madrid',
		'2.125,41.3125': 'Barcelona',
		'-0.375,39.5': 'Valencia',
		'-2.9300003,43.26': 'Bilbao',
		'-0.875,41.625': 'Zaragoza',
	};

	return data.map((entry) => {
		const key = `${entry.longitude},${entry.latitude}`;
		const city = cityCoordsMap[key] || 'Unknown';

		return {
			city,
			time: entry.minutely_15.time,
			temperature: entry.minutely_15.temperature_2m,
			coordinates: [entry.longitude, entry.latitude],
		};
	});
}

export function buildBarChartDataset(
	data: CityFormattedInterface[],
): BarChartEntry[] {
	const numPoints = data[0]?.time.length || 0;
	const result: BarChartEntry[] = [];

	for (let i = 0; i < numPoints; i += 60) {
		const entry: BarChartEntry = {
			time: new Date(data[0].time[i]).toLocaleString('es-ES', {
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
			}),
		};

		for (const cityData of data) {
			entry[cityData.city] = cityData.temperature[i];
		}

		result.push(entry);
	}

	return result;
}

export function flattenTemperatureData(
	data: CityFormattedInterface[],
): TemperatureRecord[] {
	const flattened: TemperatureRecord[] = [];

	data.forEach((cityData) => {
		const { city, time, temperature } = cityData;

		for (let i = 0; i < time.length; i++) {
			flattened.push({
				city,
				time: time[i],
				temperature: temperature[i],
			});
		}
	});

	return flattened;
}
