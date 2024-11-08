'use server';

import CreateForm from '@/app/components/createSanctionForm';
import { fetchStudents } from '@/app/utils/queries';

export default async function Page() {	
	const allStudents = await fetchStudents();
	return (<section className="mt-4 flex flex-col items-center justify-center">
		<section className="flex flex-col justify-center max-w-md border border-black p-4 rounded">
			<h1> Crear nueva amonestación/sanción </h1>
			<CreateForm studentsList={allStudents} />
		</section>
	</section>);	
}