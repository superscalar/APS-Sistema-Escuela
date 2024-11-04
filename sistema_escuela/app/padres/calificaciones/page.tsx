'use server';
import { cookies } from 'next/headers';

import { Suspense } from 'react';
import Link from 'next/link';
import { fetchGradesByStudentOfParent } from '@/app/utils/queries';
import { GradesTable } from '@/app/components/gradesTable';

export default async function Page() {
	const userCookies = await cookies();
	const parentID = userCookies.get("id-usuario").value;
	const calificaciones = await fetchGradesByStudentOfParent(parentID);
	
	return (
		<section className="mt-4 flex flex-col items-center justify-center">
			<h1 className="text-3xl font-bold mb-6">Calificaciones</h1>
			{/* <p className="text-2xl text-red-500">Falta filtrar por alumnos de los que se encarga este padre</p> */ }
			<Suspense fallback={<SuspendTable />}>
				<GradesTable calificaciones={calificaciones} />
			</Suspense>
		</section>
	);
}

function SuspendTable() {
	return <table></table>;
}