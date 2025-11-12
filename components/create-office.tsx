'use client';

import {
	CreateOfficeFormData,
	createOfficeFormSchema,
} from '@/types/office';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { createOffice } from '@/lib/actions/offices';



export default function CreateOffice() {
	const [open, setOpen] = useState(false);

	const form = useForm<CreateOfficeFormData>({
		resolver: zodResolver(createOfficeFormSchema),
		defaultValues: {
			name: '',
			doctor: '',
		},
	});

	const onSubmit = async (data: CreateOfficeFormData) => {
		try {
      const response = await createOffice(data);
      if (response.success) {
        setOpen(false);
        form.reset();
      }
    } catch (error) {
      console.error('Error creating office:', error);
    }
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size="sm">Agregar nuevo consultorio</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Agregar Consultorio</DialogTitle>
					<DialogDescription className='text-xs'>
						Aquí puedes agregar un nuevo consultorio y definir su tipo
						de pago de terapia.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-8'
					>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Consultorio</FormLabel>
									<FormControl>
										<Input placeholder='Consultorio' {...field} />
									</FormControl>
									<FormDescription className='text-xs'>
										Aquí puedes ingresar el nombre del consultorio.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='doctor'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Profesional</FormLabel>
									<FormControl>
										<Input
											placeholder='Nombre del profesional'
											{...field}
										/>
									</FormControl>
									<FormDescription className='text-xs'>
										Aquí puedes ingresar el nombre del profesional a
										cargo del consultorio.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant='outline'>Cancel</Button>
							</DialogClose>
							<Button
								type='submit'
								disabled={form.formState.isSubmitting}
							>
								{form.formState.isSubmitting
									? 'Guardando...'
									: 'Guardar'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
