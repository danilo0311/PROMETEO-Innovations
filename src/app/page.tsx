import { fetchTemperatures } from '@/api/forecast';
import BarTemperatures from '@/components/BarTemperatures/BarTemperatures';
import SpanishMap from '@/components/SpanishMap/SpanishMap';
import TemperatureTable from '@/components/TemperatureTable/TemperatureTable';
import { WeatherInterface } from '@/types/temperatures-interface';

export default async function ModuleOne() {
	const data: WeatherInterface[] = await fetchTemperatures();

	return (
		<div className='min-h-screen w-full flex justify-center gap-4 py-16'>
			<div className='flex w-full max-w-[68.5rem] items-center flex-col gap-y-4'>
				<div className='w-full bg-gray-100 border-solid border-1 rounded-2xl'>
					<BarTemperatures data={data}></BarTemperatures>
				</div>
				<div className='h-full max-h-[32rem] w-full bg-gray-100 border-solid border-1 rounded-2xl overflow-hidden relative'>
					<SpanishMap data={data}></SpanishMap>
				</div>
			</div>
			<div className='overflow-y-scroll h-full w-2/4 max-w-[40rem] bg-gray-100 rounded-2xl border-solid border-1 max-h-[40rem]'>
				<TemperatureTable data={data}></TemperatureTable>
			</div>
		</div>
	);
}
