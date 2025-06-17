import { Dashboard } from '@/components/Dashboard/Dashboard';

export default async function Main() {
	return (
		<div className='min-h-screen w-full flex max-[1320px]:items-center justify-center gap-4 py-16 px-8 max-[1320px]:flex-col'>
			<Dashboard />
		</div>
	);
}
