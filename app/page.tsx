import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export interface Office {
	id: string;
	name: string;
  doctor: string;
  patientCount?: number;
	address: string;
	phone: string;
	email: string;
}

export default function Home() {
	const Offices: Office[] = [
		{
			id: 'downtown',
			name: 'Terapia ocupacional',
      doctor: 'Janneth Granados',
      patientCount: 120,
			address: '123 Main St, Cityville',
			phone: '(123) 456-7890',
			email: 'info@downtownclinic.com',
		},
		{
			id: 'uptown',
			name: 'Uptown Medical Center',
			doctor: 'Dr. Johnson',
      patientCount: 85,
			address: '456 Elm St, Cityville',
			phone: '(987) 654-3210',
			email: 'info@uptownmedical.com',
		},
	];

	return (
		// "*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4"
		// <main className="flex h-full container flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start border border-sky/8 dark:border-white/[.145] rounded-md shadow-sm">
		<main className='h-full container bg-white p-6 border border-sky/8 dark:border-white/[.145] rounded-md shadow-md'>
			<div className='w-full flex items-center justify-between mb-4'>
				<h1 className='text-4xl font-bold mb-8'>Offices</h1>
				<Link href='/offices/new'>
					<Button className='mb-8'>Add New Office</Button>
				</Link>
			</div>
			<div className='grid grid-cols-4 gap-4'>
				{Offices.map((office) => (
					<Link key={office.id} href={`/offices/${office.id}`}>
						<Card>
							<CardHeader>
								{/* <CardDescription>Total Revenue</CardDescription> */}
								<CardTitle className='text-xl font-semibold tabular-nums @[250px]/card:text-3xl'>
									{office.name}
								</CardTitle>
								{/* <CardAction>
										<Badge variant='outline'>+12.5%</Badge>
									</CardAction> */}
							</CardHeader>
							<CardFooter className='flex-col items-start gap-1.5 text-sm'>
								<div className='line-clamp-1 flex gap-2 font-medium'>
									{office.doctor}
								</div>
								<div className='text-muted-foreground w-full flex justify-between'>
									<span>Pacientes</span>
                  <Badge variant='outline'>{office.patientCount}</Badge>
								</div>
							</CardFooter>
						</Card>
					</Link>
				))}
			</div>
		</main>
	);
}
