'use client';

import { useWeatherStateContext } from '@/contexts/WeatherStateContext';
import { formatOpenMeteoData } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function TemperatureTable() {
	const {
		weatherData,
		onlyAlarms,
		setOnlyAlarms,
		selectedCity,
		setSelectedCity,
	} = useWeatherStateContext();
	const t = useTranslations();

	if (!weatherData || !t) return null;

	const formatted = formatOpenMeteoData(weatherData);
	const cities = Array.from(new Set(formatted.map((d) => d.city)));

	const filteredData = formatted
		.flatMap((cityData) =>
			cityData.time.map((time, idx) => ({
				city: cityData.city,
				time,
				temperature: cityData.temperature[idx],
			})),
		)
		.filter((record) => {
			const cityMatch = selectedCity === 'all' || record.city === selectedCity;
			const alarmMatch = !onlyAlarms || record.temperature > 25;
			return cityMatch && alarmMatch;
		});

	return (
		<div className='text-black px-4'>
			<div>
				<label>
					<span>{t('city')}</span>:
					<select
						value={selectedCity}
						onChange={(e) => setSelectedCity(e.target.value)}>
						<option value='all'>{t('all')}</option>
						{cities.map((city) => (
							<option key={city} value={city}>
								{city}
							</option>
						))}
					</select>
				</label>
				<label style={{ marginLeft: '1rem' }}>
					{t('only_warnings')} (25º):
					<input
						type='checkbox'
						checked={onlyAlarms}
						onChange={(e) => setOnlyAlarms(e.target.checked)}
					/>
				</label>
			</div>
			<table
				style={{
					width: '100%',
					marginTop: '1rem',
					borderCollapse: 'collapse',
				}}>
				<thead>
					<tr>
						<th>{t('city')}</th>
						<th>{t('hour')}</th>
						<th>{t('temperature')} (ºC)</th>
					</tr>
				</thead>
				<tbody className='w-full'>
					{filteredData.map((record, idx) => (
						<tr
							key={idx}
							style={{
								color: record.temperature > 25 ? '#f88' : '#000000',
							}}>
							<td>{record.city}</td>
							<td>{record.time}</td>
							<td>{record.temperature.toFixed(1)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
