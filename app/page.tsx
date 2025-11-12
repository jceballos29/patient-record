import CreateOffice from '@/components/create-office';
import OfficesData from '@/components/offices';
import { Separator } from '@/components/ui/separator';
import { getOffices } from '@/lib/actions/offices';
import { Building2 } from 'lucide-react';

export default async function Home() {

	const response = await getOffices();
	const Offices = response.data;

	return (
		<main className='flex flex-col h-full container bg-white border dark:border-white/[.145] rounded-md shadow-md'>
			<header className='flex items-center gap-2 border-b'>
				<div className='flex w-full items-center px-4 py-2'>
					<Building2 size={20} className='text-muted-foreground' />
					<Separator
						orientation='vertical'
						className='mx-2 data-[orientation=vertical]:h-4'
					/>
					<h1 className='text-lg font-medium'>Consultorios</h1>
					{!!Offices?.length  && (
						<div className='ml-auto flex items-center gap-2'>
							<CreateOffice />
						</div>
					)}
				</div>
			</header>
			<div
				id='content'
				className='flex grow p-4 gap-4 overflow-hidden'
			>
				<OfficesData data={Offices ?? []} />
			</div>
		</main>
	);
}
