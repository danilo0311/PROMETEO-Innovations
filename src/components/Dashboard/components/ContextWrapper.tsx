'use client';

import BarTemperatures from '@/components/BarTemperatures/BarTemperatures';
import SpanishMap from '@/components/SpanishMap/SpanishMap';
import TemperatureTable from '@/components/TemperatureTable/TemperatureTable';
import { Fragment } from 'react';

export const ContextWrapper = () => {
	return (
		<Fragment>
			<div className='flex w-full max-w-[68.5rem] items-center flex-col gap-y-4'>
				<div className='w-full overflow-x-scroll bg-gray-100 border-solid border-1 rounded-2xl'>
					<div className='w-full min-w-2xl'>
						<BarTemperatures />
					</div>
				</div>
				<div className='h-full max-h-[32rem] w-full bg-gray-100 border-solid border-1 rounded-2xl overflow-hidden relative'>
					<SpanishMap />
				</div>
			</div>
			<div className='overflow-y-scroll h-full max-[1320px]:max-w-[68.5rem] max-[1320px]:w-full [1320px]:w-2/4 [1320px]:max-w-[40rem] bg-gray-100 rounded-2xl border-solid border-1 max-h-[40rem]'>
				<TemperatureTable />
			</div>
		</Fragment>
	);
};
