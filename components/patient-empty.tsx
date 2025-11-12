import { Users } from "lucide-react";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./ui/empty";

export default function PatientEmpty() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant='icon'>
					<Users size={48} className='text-muted-foreground' />
				</EmptyMedia>
				<EmptyTitle>No hay pacientes</EmptyTitle>
				<EmptyDescription>
					Aún no se han agregado pacientes a este consultorio, haz
					clic en &quot;Agregar Paciente&quot; para comenzar.
				</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}
