'use client';

import { useWeatherStateContext } from '@/contexts/WeatherStateContext';
import { formatOpenMeteoData } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';
import {
	ComposableMap,
	Geographies,
	Geography,
	Marker,
} from 'react-simple-maps';

export default function SpanishMap() {
	const {
		weatherData,
		selectedCityMap,
		setSelectedCityMap,
		hoveredRegion,
		setHoveredRegion,
	} = useWeatherStateContext();
	const t = useTranslations('');

	if (!weatherData || !t) return null;

	const formatted = formatOpenMeteoData(weatherData);

	return (
		<>
			<ComposableMap
				projection='geoMercator'
				projectionConfig={{ scale: 1500, center: [-3.7, 36.5] }}
				width={800}
				height={600}>
				<Geographies geography='/geomaps/spain-communities.geojson'>
					{({ geographies }) =>
						geographies.map((geo) => (
							<Geography
								key={geo.rsmKey}
								geography={geo}
								fill={
									geo.properties.name === hoveredRegion ? '#FFA726' : '#DDD'
								}
								stroke='#FFF'
								onMouseLeave={() => setHoveredRegion(null)}
								style={{
									default: { outline: 'none' },
									hover: { fill: '#F53', outline: 'none' },
									pressed: { fill: '#E42', outline: 'none' },
								}}
							/>
						))
					}
				</Geographies>
				{formatted.map(({ city, coordinates, temperature }) => {
					const latestTemp = temperature[temperature.length - 1];
					const isAlarm = latestTemp > 25;

					return (
						<Marker key={city} coordinates={coordinates}>
							<circle
								r={6}
								fill={isAlarm ? 'red' : 'green'}
								stroke='#fff'
								strokeWidth={1}
								onClick={() => setSelectedCityMap(`${city}: ${latestTemp}°C`)}
								onMouseEnter={() => setHoveredRegion(city)}
								onMouseLeave={() => setHoveredRegion(null)}
								style={{ cursor: 'pointer' }}
							/>
						</Marker>
					);
				})}
			</ComposableMap>
			{selectedCityMap && (
				<div className='absolute top-2.5 right-2.5 text-black'>
					🔍 {selectedCityMap}
				</div>
			)}
			{hoveredRegion && (
				<div className='absolute bottom-2.5 left-2.5 text-black'>
					<span>{`${t('region')}/${t('city')}`}</span>: {hoveredRegion}
				</div>
			)}
		</>
	);
}
