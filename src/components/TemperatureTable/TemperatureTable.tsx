'use client'

import { formatOpenMeteoData } from '@/lib/utils';
import { WeatherInterface } from '@/types/temperatures-interface';
import React, { useState } from 'react';

export default function TemperatureTable({
	data,
}: {
	data: WeatherInterface[];
}) {
	const formatted = formatOpenMeteoData(data);
	const [selectedCity, setSelectedCity] = useState<string>('all');
	const [onlyAlarms, setOnlyAlarms] = useState<boolean>(false);
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
					Ciudad:
					<select
						value={selectedCity}
						onChange={(e) => setSelectedCity(e.target.value)}>
						<option value='all'>Todas</option>
						{cities.map((city) => (
							<option key={city} value={city}>
								{city}
							</option>
						))}
					</select>
				</label>
				<label style={{ marginLeft: '1rem' }}>
					Sólo alarmas (25º):
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
						<th>Ciudad</th>
						<th>Hora</th>
						<th>Temperatura (ºC)</th>
					</tr>
				</thead>
				<tbody className='w-full'>
					{filteredData.map((record, idx) => (
						<tr
							key={idx}
							style={{
								color:
									record.temperature > 25 ? '#f88' : '#000000',
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
