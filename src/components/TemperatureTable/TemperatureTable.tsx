'use client';

import { useEffect, useState } from 'react';
import { CITIES } from '@/constants/constants';
import { fetchTemperatures } from '@/api/forecast';

type TempRecord = {
	city: string;
	time: string;
	value: number;
};

export default function TemperatureTable() {
	const [data, setData] = useState<TempRecord[]>([]);
	const [selectedCity, setSelectedCity] = useState<string>('All');
	const [onlyAlarms, setOnlyAlarms] = useState<boolean>(false);

	useEffect(() => {
		const loadData = async () => {
			const allData = await Promise.all(
				CITIES.map(async (city) => {
					const res = await fetchTemperatures({ city });
					const times = res.minutely_15.time;
					const temps = res.minutely_15.temperature_2m;

					return times.map((time: string, index: number) => ({
						city: city.name,
						time,
						value: temps[index],
					}));
				}),
			);

			const flattened = allData.flat();
			setData(flattened);
		};

		loadData();
	}, []);

	const filtered = data
		.filter((d) => selectedCity === 'All' || d.city === selectedCity)
		.filter((d) => !onlyAlarms || d.value > 25);

	return (
		<div>
			<div className='mb-4 flex gap-4'>
				<select
					value={selectedCity}
					onChange={(e) => setSelectedCity(e.target.value)}>
					<option value='All'>Todas las ciudades</option>
					{CITIES.map((c) => (
						<option key={c.name} value={c.name}>
							{c.name}
						</option>
					))}
				</select>

				<label>
					<input
						type='checkbox'
						checked={onlyAlarms}
						onChange={(e) => setOnlyAlarms(e.target.checked)}
					/>
					Mostrar solo alarmas
				</label>
			</div>

			<table className='w-full border-collapse'>
				<thead>
					<tr>
						<th className='border-b-2 border-solid border-black'>Ciudad</th>
						<th className='border-b-2 border-solid border-black'>Fecha</th>
						<th className='border-b-2 border-solid border-black'>Temperatura</th>
					</tr>
				</thead>
				<tbody>
					{filtered.map((row, idx) => (
						<tr key={idx}>
							<td>{row.city}</td>
							<td>{row.time}</td>
							<td style={{ color: row.value > 25 ? 'red' : 'black' }}>
								{row.value.toFixed(1)} °C
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
