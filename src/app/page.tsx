import { fetchTemperatures } from '@/api/forecast';
import BarTemperatures from '@/components/BarTemperatures/BarTemperatures';
import { WeatherInterface } from '@/types/temperatures-interface';

export default async function ModuleOne() {
	const data: WeatherInterface[] = await fetchTemperatures();

	return (
		<div className='h-screen w-full flex justify-center items-center'>
			<div className='max-w-screen w-full'><BarTemperatures data={data}></BarTemperatures></div>
		</div>
	);
}
