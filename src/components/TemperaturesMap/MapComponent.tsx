'use client';

import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./TemperaturesMap'), {
  ssr: false,
});

export const TemperatureMap = () => {
  return <DynamicMap />;
};
