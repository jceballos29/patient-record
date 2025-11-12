import z from "zod";

export const createOfficeFormSchema = z.object({
	name: z
		.string()
		.min(2, 'El nombre debe tener por lo menos dos caracteres'),
	doctor: z
		.string()
		.min(
			2,
			'El nombre del doctor debe tener por lo menos dos caracteres',
		),
});

export type CreateOfficeFormData = z.infer<typeof createOfficeFormSchema>;

export interface Office {
  id: string;
  name: string;
  doctor: string;
  patients: number
  sessions: number;
  authorizations: number;
  payments: number;
}
