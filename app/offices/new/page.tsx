import Link from 'next/link';

export default function NewOfficePage() {
	return (
		<main className='h-full container bg-white p-6 border border-sky/8 dark:border-white/[.145] rounded-md shadow-md'>
			<div className='mb-6 flex items-center justify-between'>
				<h1 className='text-3xl font-bold'>Create New Office</h1>
				<Link href='/' className='text-sm text-muted-foreground'>
					Back
				</Link>
			</div>

			<section>
				<p className='text-sm text-muted-foreground'>
					Aquí puedes añadir un formulario para crear un nuevo
					consultorio. Por ahora es un placeholder.
				</p>
			</section>
		</main>
	);
}
