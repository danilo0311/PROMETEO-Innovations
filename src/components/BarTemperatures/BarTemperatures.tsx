'use client';

import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { WeatherInterface } from '@/types/temperatures-interface';
import { buildBarChartDataset, formatOpenMeteoData } from '@/lib/utils';

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

export default function BarTemperatures({
	data,
}: {
	data: WeatherInterface[];
}) {
	const formatted = formatOpenMeteoData(data);
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
