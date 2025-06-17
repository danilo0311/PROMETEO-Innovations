import { fetchTemperatures } from '@/api/forecast';
import BarTemperatures from '@/components/BarTemperatures/BarTemperatures';
import SpanishMap from '@/components/SpanishMap/SpanishMap';
import TemperatureTable from '@/components/TemperatureTable/TemperatureTable';
import { WeatherInterface } from '@/types/temperatures-interface';

export default async function Main() {
	const data: WeatherInterface[] = await fetchTemperatures();

	return (
		<div className='min-h-screen w-full flex max-[1320px]:items-center justify-center gap-4 py-16 px-8 max-[1320px]:flex-col'>
			<div className='flex w-full max-w-[68.5rem] items-center flex-col gap-y-4'>
				<div className='w-full overflow-x-scroll bg-gray-100 border-solid border-1 rounded-2xl'>
					<div className='w-full min-w-2xl'>
						<BarTemperatures data={data}></BarTemperatures>
					</div>
				</div>
				<div className='h-full max-h-[32rem] w-full bg-gray-100 border-solid border-1 rounded-2xl overflow-hidden relative'>
					<SpanishMap data={data}></SpanishMap>
				</div>
			</div>
			<div className='overflow-y-scroll h-full max-[1320px]:max-w-[68.5rem] max-[1320px]:w-full [1320px]:w-2/4 [1320px]:max-w-[40rem] bg-gray-100 rounded-2xl border-solid border-1 max-h-[40rem]'>
				<TemperatureTable data={data}></TemperatureTable>
			</div>
		</div>
	);
}
