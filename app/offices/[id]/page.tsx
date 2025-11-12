import CreatePatient from '@/components/create-patient';
import PatientButton from '@/components/patient-button';
import PatientEmpty from '@/components/patient-empty';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Building } from 'lucide-react';
import Link from 'next/link';

type Props = {
	params: { id: string };
};

export interface Patient {
	id: string;
	firstName: string;
	lastName: string;
	type: 'SESSIONS' | 'AUTHORIZATIONS';
	session: number;
	authorizations: number;
}

interface OfficeDetail {
	id: string;
	name: string;
	address: string;
	phone: string;
	email: string;
	patients: Patient[];
}

export default async function OfficeDetail({ params }: Props) {
	const { id } = params;

	// Aquí podrías fetch desde tu API o prisma para obtener datos reales
	// Por ahora mostramos datos estáticos de ejemplo
	const office: OfficeDetail = {
		id,
		name: 'Terapia Ocupacional',
		address: '456 Elm St, Cityville',
		phone: '(987) 654-3210',
		email: 'info@uptownmedical.com',
		patients: [
			{
				id: '1',
				firstName: 'Juan',
				lastName: 'Perez',
				type: 'SESSIONS',
				session: 10,
				authorizations: 0,
			},
			{
				id: '2',
				firstName: 'Maria',
				lastName: 'Gomez',
				type: 'AUTHORIZATIONS',
				session: 25,
				authorizations: 5,
			},
			{
				id: '3',
				firstName: 'Carlos',
				lastName: 'Sanchez',
				type: 'SESSIONS',
				session: 15,
				authorizations: 0,
			},
			{
				id: '4',
				firstName: 'Lucia',
				lastName: 'Martinez',
				type: 'SESSIONS',
				session: 8,
				authorizations: 0,
			},
			{
				id: '5',
				firstName: 'Diego',
				lastName: 'Torres',
				type: 'AUTHORIZATIONS',
				session: 12,
				authorizations: 2,
			},
			{
				id: '6',
				firstName: 'Ana',
				lastName: 'Ruiz',
				type: 'SESSIONS',
				session: 5,
				authorizations: 0,
			},
			{
				id: '7',
				firstName: 'Pablo',
				lastName: 'Lopez',
				type: 'AUTHORIZATIONS',
				session: 20,
				authorizations: 3,
			},
			{
				id: '8',
				firstName: 'Sofia',
				lastName: 'Ramirez',
				type: 'SESSIONS',
				session: 18,
				authorizations: 0,
			},
			{
				id: '9',
				firstName: 'Andres',
				lastName: 'Morales',
				type: 'AUTHORIZATIONS',
				session: 30,
				authorizations: 6,
			},
			{
				id: '10',
				firstName: 'Elena',
				lastName: 'Diaz',
				type: 'SESSIONS',
				session: 7,
				authorizations: 0,
			},
			{
				id: '11',
				firstName: 'Miguel',
				lastName: 'Alvarez',
				type: 'AUTHORIZATIONS',
				session: 14,
				authorizations: 1,
			},
			{
				id: '12',
				firstName: 'Laura',
				lastName: 'Fernandez',
				type: 'SESSIONS',
				session: 11,
				authorizations: 0,
			},
			{
				id: '13',
				firstName: 'Roberto',
				lastName: 'Castro',
				type: 'AUTHORIZATIONS',
				session: 9,
				authorizations: 2,
			},
			{
				id: '14',
				firstName: 'Veronica',
				lastName: 'Mendez',
				type: 'SESSIONS',
				session: 6,
				authorizations: 0,
			},
			{
				id: '15',
				firstName: 'Fernando',
				lastName: 'Ibarra',
				type: 'SESSIONS',
				session: 4,
				authorizations: 0,
			},
			{
				id: '16',
				firstName: 'Natalia',
				lastName: 'Vargas',
				type: 'AUTHORIZATIONS',
				session: 22,
				authorizations: 4,
			},
			{
				id: '17',
				firstName: 'Ricardo',
				lastName: 'Paredes',
				type: 'SESSIONS',
				session: 2,
				authorizations: 0,
			},
			{
				id: '18',
				firstName: 'Gabriela',
				lastName: 'Ortega',
				type: 'SESSIONS',
				session: 13,
				authorizations: 0,
			},
			{
				id: '19',
				firstName: 'Javier',
				lastName: 'Vega',
				type: 'AUTHORIZATIONS',
				session: 16,
				authorizations: 2,
			},
			{
				id: '20',
				firstName: 'Mariana',
				lastName: 'Cruz',
				type: 'SESSIONS',
				session: 3,
				authorizations: 0,
			},
			{
				id: '21',
				firstName: 'Sergio',
				lastName: 'Rios',
				type: 'SESSIONS',
				session: 19,
				authorizations: 0,
			},
			{
				id: '22',
				firstName: 'Patricia',
				lastName: 'Medina',
				type: 'AUTHORIZATIONS',
				session: 21,
				authorizations: 5,
			},
			{
				id: '23',
				firstName: 'Esteban',
				lastName: 'Núñez',
				type: 'SESSIONS',
				session: 17,
				authorizations: 0,
			},
		],
		// patients: [],
	};

	return (
		<main className='flex flex-col h-full container bg-white border dark:border-white/[.145] rounded-md shadow-md'>
			<header className='flex items-center gap-2 border-b'>
				<div className='flex w-full items-center px-4 py-2'>
					<Building size={20} />
					<Separator
						orientation='vertical'
						className='mx-2 data-[orientation=vertical]:h-4'
					/>
					<h1 className='text-lg font-medium'>{office.name}</h1>
					<div className='ml-auto flex items-center gap-2'>
						<Button
							variant='ghost'
							asChild
							size='sm'
							className='hidden sm:flex'
						>
							<Link
								href='/'
								className='text-sm text-muted-foreground'
							>
								Back
							</Link>
						</Button>
					</div>
				</div>
			</header>
			<div
				id='content'
				className='flex grow p-4 gap-4 overflow-hidden'
			>
				<div id='summary' className='flex-3 border'></div>
				<Separator orientation='vertical' />
				<div
					id='patients'
					className='flex-1 flex flex-col gap-4 min-h-0'
				>
					<div className='flex items-center justify-between'>
						<h3 className='font-semibold'>Pacientes</h3>
						<Badge
							variant='outline'
							className='text-xs text-muted-foreground'
						>
							{office.patients.length}
						</Badge>
					</div>
					<div
						className={cn(
							'h-full overflow-auto p-1.5 space-y-1 rounded-md',
							office.patients.length === 0 &&
								'flex flex-col items-center justify-center',
						)}
					>
						{office.patients.length === 0 && <PatientEmpty />}
						{office.patients &&
							office.patients.length > 0 &&
							office.patients.map((patient) => (
								<PatientButton key={patient.id} patient={patient} />
							))}
					</div>
					<CreatePatient officeId={id} />
				</div>
			</div>
		</main>
	);
}
