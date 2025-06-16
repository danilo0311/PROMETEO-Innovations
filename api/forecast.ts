import { OPEN_METEO_URL } from '@/constants/constants';

export const fetchTemperatures = async ({
	city,
}: {
	city: { lat: number; lon: number };
}) => {
	const FORECAST_BASE_URL = `forecast?latitude=${city.lat}&longitude=${city.lon}&minutely_15=temperature_2m&forecast_days=1`;
	const URL = `${OPEN_METEO_URL}/${FORECAST_BASE_URL}`;

	const response = await fetch(URL);
	if (!response.ok) {
		throw new Error('Failed to fetch OPEN METEO data');
	}

	const data = await response.json();
	return data;
};

