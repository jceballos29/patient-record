import { Building2 } from "lucide-react";
import CreateOffice from "./create-office";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./ui/empty";

export default function OfficesEmpty() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant='icon'>
					<Building2 size={48} className='text-muted-foreground' />
				</EmptyMedia>
				<EmptyTitle>No hay consultorios creados</EmptyTitle>
				<EmptyDescription>
					Crea un nuevo consultorio para comenzar a gestionar tus
					pacientes.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<CreateOffice />
			</EmptyContent>
		</Empty>
	);
}
