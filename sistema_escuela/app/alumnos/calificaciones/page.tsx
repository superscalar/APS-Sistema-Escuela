import Link from 'next/link';
import { cookies } from 'next/headers';
import { fetchGradesByStudent } from '@/app/utils/queries';
import GradesTable from '@/app/components/gradesTable';

export default async function Page() {
	const userCookies = cookies();
	const studentID = userCookies.get("id-usuario").value;
	const calificaciones = await fetchGradesByStudent(studentID);
	
	return (
		<section className="mt-4 flex flex-col items-center justify-center">
			<h1 className="text-3xl font-bold mb-6">Sección de alumnos</h1>
			<GradesTable calificaciones={calificaciones} />
		</section>
	);
}