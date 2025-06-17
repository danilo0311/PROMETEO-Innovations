import { fetchTemperatures } from '@/api/forecast';
import BarTemperatures from '@/components/BarTemperatures/BarTemperatures';
import SpanishMap from '@/components/SpanishMap/SpanishMap';
import { WeatherInterface } from '@/types/temperatures-interface';

export default async function ModuleOne() {
	const data: WeatherInterface[] = await fetchTemperatures();

	return (
		<div className='h-screen w-full flex justify-center items-center flex-col gap-y-4'>
			<div className='h-2/4 w-2/4 bg-gray-100 border-solid border-1 rounded-2xl'>
				<SpanishMap></SpanishMap>
			</div>
			<div className='max-w-[68.5rem] w-full bg-gray-100 border-solid border-1 rounded-2xl'>
				<BarTemperatures data={data}></BarTemperatures>
			</div>
		</div>
	);
}
