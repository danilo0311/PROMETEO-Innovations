import {
	BarChartEntry,
	CityFormattedInterface,
	WeatherInterface,
} from '@/types/temperatures-interface';

export function formatOpenMeteoData(
	data: WeatherInterface[],
): CityFormattedInterface[] {
	const cityCoordsMap: Record<string, string> = {
		'40.4375,-3.6875': 'Madrid',
		'41.3125,2.125': 'Barcelona',
		'39.5,-0.375': 'Valencia',
		'43.26,-2.9300003': 'Bilbao',
		'41.625,-0.875': 'Zaragoza',
	};

	return data.map((entry) => {
		const key = `${entry.latitude},${entry.longitude}`;
		const city = cityCoordsMap[key] || 'Unknown';

		return {
			city,
			time: entry.minutely_15.time,
			temperature: entry.minutely_15.temperature_2m,
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
