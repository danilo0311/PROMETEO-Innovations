'use client';

import { useEffect, useState } from 'react';
import { TileLayer, Marker, Popup } from 'react-leaflet';
import { CITIES } from '@/constants/constants';
import { fetchTemperatures } from '@/api/forecast';
import L from 'leaflet';
import { MapContainer } from 'react-leaflet/MapContainer';

const greenIcon = new L.Icon({
	iconUrl:
		'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowUrl:
		'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
	shadowSize: [41, 41],
});

const redIcon = new L.Icon({
	iconUrl:
		'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowUrl:
		'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
	shadowSize: [41, 41],
});

export const TemperatureMap = () => {
	if (typeof window === 'undefined') return null;

	const [temps, setTemps] = useState({});

	const loadTemps = async () => {
		const results = await Promise.all(
			CITIES.map(async (city) => {
				const res = await fetchTemperatures({ city });
				const lastTemp = res.minutely_15.temperature_2m.slice(-1)[0];
				return { name: city.name, temp: lastTemp };
			}),
		);

		const tempMap = {};
		results.forEach(({ name, temp }) => {
			tempMap[name] = temp;
		});
		setTemps(tempMap);
	};

	useEffect(() => {
		loadTemps();
		const interval = setInterval(loadTemps, 15 * 60 * 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<MapContainer
			center={[40.4168, -3.7038]}
			zoom={6}
			style={{ height: '100vh', width: '100%' }}>
			<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
			{CITIES.map(({ name, lat, lon }) => {
				const temp = temps[name];
				const icon = temp > 25 ? redIcon : greenIcon;
				return (
					<Marker key={name} position={[lat, lon]} icon={icon}>
						<Popup>
							<div>
								<strong>{name}</strong>
								<br />
								Última temperatura: {temp ? temp.toFixed(1) : 'Cargando...'} °C
							</div>
						</Popup>
					</Marker>
				);
			})}
		</MapContainer>
	);
};
