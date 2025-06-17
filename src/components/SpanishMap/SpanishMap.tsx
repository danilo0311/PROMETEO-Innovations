'use client';

import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

export default function SpanishMap() {
	const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

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
								onClick={() =>
									console.log(`Has hecho click en: ${geo.properties.name}`)
								}
								onMouseEnter={() => {
									setHoveredRegion(geo.properties.name);
									console.log(geo.properties.name);
								}}
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
			</ComposableMap>

			{hoveredRegion && (
				<div style={{ position: 'absolute', top: 10, left: 10 }}>
					Región: {hoveredRegion}
				</div>
			)}
		</>
	);
}
