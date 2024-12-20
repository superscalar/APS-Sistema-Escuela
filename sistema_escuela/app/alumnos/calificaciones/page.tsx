'use server';
import { cookies } from 'next/headers';

import { Suspense } from 'react';
import Link from 'next/link';
import { fetchGradesByStudent } from '@/app/utils/queries';
import { GradesTable } from '@/app/components/gradesTable';

export default async function Page() {
	const userCookies = await cookies();
	const studentID = userCookies.get("id-usuario")?.value ?? "NO_ID";
	const calificaciones = studentID == "NO_ID" ? [] : await fetchGradesByStudent(studentID);
	
	return (
		<section className="mt-4 flex flex-col items-center justify-center">
			<h1 className="text-3xl font-bold mb-6">Sección de alumnos</h1>
			<Suspense fallback={<SuspendTable />}>
				<GradesTable calificaciones={calificaciones} />
			</Suspense>
		</section>
	);
}

function SuspendTable() {
	return <table></table>;
}