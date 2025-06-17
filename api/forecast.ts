import { OPEN_METEO_ENDPOINT } from '@/constants/constants';

export const fetchTemperatures = async () => {
	const config: RequestInit = {
		method: 'GET',
		next: {
			revalidate: 900,
		},
	};

	const response = await fetch(OPEN_METEO_ENDPOINT, config);

	if (!response.ok) {
		console.log(response);
		throw new Error('Failed to fetch OPEN METEO data');
	}

	const data = await response.json();
	return data;
};
