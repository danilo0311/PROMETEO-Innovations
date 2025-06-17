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
		'41.3784,2.1925': 'Barcelona',
		'39.4699,-0.3763': 'Valencia',
		'43.263,-2.934': 'Bilbao',
		'41.6488,-0.8891': 'Zaragoza',
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
