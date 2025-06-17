'use client';

import { WeatherContextProvider } from '@/contexts/WeatherStateContext';
import { ContextWrapper } from './components/ContextWrapper';
import { useEffect, useState } from 'react';
import { fetchTemperatures } from '@/actions/actions';
import { WeatherInterface } from '@/types/weather/interface';

export const Dashboard = () => {
	const [data, setData] = useState<WeatherInterface[] | null>(null);

	useEffect(() => {
		const getData = async () => {
			try {
				const result = await fetchTemperatures();
				setData(result);
			} catch (error) {
				console.error('Error fetching temperatures:', error);
			}
		};

		getData();

		const interval = setInterval(getData, 15 * 60 * 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<WeatherContextProvider initialData={data}>
			<ContextWrapper />
		</WeatherContextProvider>
	);
};
