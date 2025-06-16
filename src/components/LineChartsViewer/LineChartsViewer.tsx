'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CITIES } from '@/constants/constants';
import { fetchTemperatures } from '@/api/forecast';

export const LineChartsViewer = () => {
	const [data, setData] = useState([]);

	const loadTemperatures = async () => {
		const results = await Promise.all(
			CITIES.map(async (city) => {
				const res = await fetchTemperatures({ city });
				return {
					name: city.name,
					times: res.minutely_15.time,
					temps: res.minutely_15.temperature_2m,
				};
			})
		);

		const merged = results[0].times.map((t, idx) => {
			const entry: { time: string; [key: string]: number | string } = { time: t };
			results.forEach((city) => {
				entry[city.name] = city.temps[idx];
			});
			return entry;
		});

		setData(merged);
	};

	useEffect(() => {
		loadTemperatures();
		const interval = setInterval(loadTemperatures, 15 * 60 * 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<ResponsiveContainer width='100%' height={400}>
			<LineChart data={data}>
				<XAxis dataKey='time' hide />
				<YAxis />
				<Tooltip />
				<Legend />
				{CITIES.map((city) => (
					<Line
						key={city.name}
						type='monotone'
						dataKey={city.name}
						strokeWidth={2}
						stroke={'#' + Math.floor(Math.random() * 16777215).toString(16)}
						dot={false}
					/>
				))}
			</LineChart>
		</ResponsiveContainer>
	);
};
