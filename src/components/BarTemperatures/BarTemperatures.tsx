'use client';

import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { buildBarChartDataset, formatOpenMeteoData } from '@/lib/utils';
import { useWeatherStateContext } from '@/contexts/WeatherStateContext';
import { useTranslations } from 'next-intl';

function valueFormatter(value: number | null) {
	return `${value} Cº`;
}

export default function BarTemperatures() {
	const { weatherData } = useWeatherStateContext();
	const t = useTranslations('');

	if (!weatherData || !t) return null;

	const chartSetting = {
		yAxis: [
			{
				label: `${t('temperature')}s (Cº)`,
				width: 60,
			},
		],
		height: 300,
	};
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
