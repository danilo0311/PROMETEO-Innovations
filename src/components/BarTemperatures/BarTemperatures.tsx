'use client';

import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { buildBarChartDataset, formatOpenMeteoData } from '@/lib/utils';
import { useWeatherStateContext } from '@/contexts/WeatherStateContext';

function valueFormatter(value: number | null) {
	return `${value} Cº`;
}

const chartSetting = {
	yAxis: [
		{
			label: 'Temperaturas (Cº)',
			width: 60,
		},
	],
	height: 300,
};

export default function BarTemperatures() {
	const { weatherData } = useWeatherStateContext();

	if (!weatherData) return null;

	const formatted = formatOpenMeteoData(weatherData);
	const dataset = buildBarChartDataset(formatted);
	const cities = formatted.map((c) => c.city);

	return (
		<BarChart
			dataset={dataset}
			xAxis={[{ dataKey: 'time' }]}
			series={cities.map((city) => ({
				dataKey: city,
				label: city,
				valueFormatter,
			}))}
			{...chartSetting}
		/>
	);
}
