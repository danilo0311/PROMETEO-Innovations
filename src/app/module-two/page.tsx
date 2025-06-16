import { TemperatureMap } from "@/components/TemperaturesMap/MapComponent";

export default async function ModuleTwo() {
	return (
		<div className='h-screen w-full flex justify-center items-center'>
			<TemperatureMap />
		</div>
	);
}
