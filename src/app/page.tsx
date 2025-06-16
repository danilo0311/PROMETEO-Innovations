import { LineChartsViewer } from '@/components/LineChartsViewer/LineChartsViewer';

export default async function ModuleOne() {
	return (
		<div className='h-screen w-full flex justify-center items-center'>
			<LineChartsViewer />
		</div>
	);
}
