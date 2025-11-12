'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

const createPatientFormSchema = z.object({
	name: z
		.string()
		.min(2, 'El nombre debe tener por lo menos dos caracteres'),
	type: z.enum(['SESSIONS', 'AUTHORIZATIONS']),
	defaultSessionPrice: z
		.number()
		.min(0, 'El precio debe ser un número positivo')
		.optional(),
});

type CreatePatientFormData = z.infer<typeof createPatientFormSchema>;

export default function CreatePatient({
	officeId,
}: {
	officeId: string;
}) {
	const router = useRouter();

	const [open, setOpen] = useState(false);

	const form = useForm<CreatePatientFormData>({
		resolver: zodResolver(createPatientFormSchema),
		defaultValues: {
			name: '',
			type: 'SESSIONS',
			defaultSessionPrice: undefined,
		},
	});

	const { handleSubmit, formState, control } = form;

	const selectedType = useWatch({ control, name: 'type' });

	const onSubmit = async (data: CreatePatientFormData) => {
		// try {
		// 	const payload = {
		// 		...data,
		// 		officeId,
		// 	};

		// 	const res = await fetch('/api/patients', {
		// 		method: 'POST',
		// 		headers: { 'Content-Type': 'application/json' },
		// 		body: JSON.stringify(payload),
		// 	});

		// 	if (!res.ok) {
		// 		const err = await res.json().catch(() => null);
		// 		console.error('Error creando paciente', err);
		// 		return;
		// 	}

		// 	// success
		// 	setOpen(false);
		// 	form.reset();
		// 	router.refresh();
		// } catch (err) {
		// 	console.error(err);
		// }
		console.info('Submitted data:', { ...data, officeId });
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Form {...form}>
				<DialogTrigger asChild>
					<Button className='w-full'>Agregar Paciente</Button>
				</DialogTrigger>

				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Agregar Paciente</DialogTitle>
						<DialogDescription className='text-xs'>
							Aquí puedes agregar un nuevo paciente a este consultorio
							y definir su tipo de pago de terapia.
						</DialogDescription>
					</DialogHeader>

					{/* form body */}
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='space-y-8'
					>
						{/* <div className='grid gap-1'>
							<label className='text-sm font-medium'>Nombre</label>
							<input
								{...register('name')}
								className='input'
								placeholder='Nombre completo'
							/>
							{errors.name && (
								<p className='text-destructive text-sm'>
									{errors.name.message as string}
								</p>
							)}
						</div> */}
						<FormField
							control={control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre</FormLabel>
									<FormControl>
										<Input placeholder='Nombre completo' {...field} />
									</FormControl>
									<FormDescription className='text-xs'>
										Ingresa el nombre completo del paciente.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* <div className='grid gap-1'>
							<label className='text-sm font-medium'>Tipo</label>
							<div className='flex gap-4 items-center'>
								<label className='flex items-center gap-2'>
									<input
										type='radio'
										value='SESSIONS'
										{...register('type')}
										defaultChecked
									/>
									<span>Sesiones individuales</span>
								</label>
								<label className='flex items-center gap-2'>
									<input
										type='radio'
										value='AUTHORIZATIONS'
										{...register('type')}
									/>
									<span>Autorizaciones</span>
								</label>
							</div>
						</div> */}

						<FormField
							control={control}
							name='type'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tipo</FormLabel>
									<FormControl>
										<RadioGroup
											value={field.value}
											onValueChange={field.onChange}
											className='flex items-center gap-4'
										>
											<div className='flex items-center gap-3'>
												<RadioGroupItem
													value='SESSIONS'
													id='session'
												/>
												<Label
													className='text-muted-foreground'
													htmlFor='session'
												>
													Sesiones individuales
												</Label>
											</div>
											<div className='flex items-center gap-3'>
												<RadioGroupItem
													value='AUTHORIZATIONS'
													id='authorizations'
												/>
												<Label
													className='text-muted-foreground'
													htmlFor='authorizations'
												>
													Autorizaciones
												</Label>
											</div>
										</RadioGroup>
									</FormControl>
									<FormDescription className='text-xs'>
										Selecciona el tipo de pago para este paciente.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						{selectedType === 'SESSIONS' && (
							<FormField
								control={control}
								name='defaultSessionPrice'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Precio por sesión</FormLabel>
										<FormControl>
											<Input
												type='number'
												step='0.01'
												value={field.value ?? ''}
												onChange={(e) => {
													const v = e.target.value;
													field.onChange(
														v === '' ? undefined : Number(v),
													);
												}}
												placeholder='0.00'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}

						<DialogFooter>
							<DialogClose asChild>
								<Button variant='outline'>Cancel</Button>
							</DialogClose>
							<Button type='submit' disabled={formState.isSubmitting}>
								{formState.isSubmitting ? 'Guardando...' : 'Guardar'}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Form>
		</Dialog>
	);
}
