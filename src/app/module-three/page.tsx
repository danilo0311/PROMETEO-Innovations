import TemperatureTable from '@/components/TemperatureTable/TemperatureTable';

export default function ModuleThree() {
	return (
		<div className='text-black flex justify-center min-h-screen w-full p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<TemperatureTable></TemperatureTable>
		</div>
	);
}
