import { Patient } from '@/app/offices/[id]/page';
import { Item, ItemActions, ItemContent, ItemTitle } from './ui/item';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

export interface PatientDetailProps {
	patient: Patient;
}

export default function PatientButton({
	patient,
}: PatientDetailProps) {
	return (
		<Item
			key={patient.id}
			variant='outline'
			size='sm'
			className='px-2 py-2 hover:bg-slate-50'
		>
			<ItemContent>
				<ItemTitle>
					{patient.firstName} {patient.lastName}
				</ItemTitle>
			</ItemContent>
			<ItemActions>
				<Badge className='bg-sky-200 text-xs text-muted-foreground'>
					{patient.session}
				</Badge>
				{patient.type === 'AUTHORIZATIONS' && (
					<>
						<Separator
							orientation='vertical'
							className='data-[orientation=vertical]:h-4'
						/>
						<Badge className='bg-emerald-200 text-xs text-muted-foreground'>
							{patient.authorizations}
						</Badge>
					</>
				)}
			</ItemActions>
		</Item>
	);
}
