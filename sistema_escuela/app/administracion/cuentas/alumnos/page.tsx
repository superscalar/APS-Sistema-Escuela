import Link from 'next/link';

// TODO: paginate
import { fetchStudents } from '@/app/utils/queries';
import { UsersTable } from '@/app/components/usersTable';

export default async function Page() {
	let allStudents = await fetchStudents();
	allStudents.forEach(student => delete student.password);
	
	return (<section>
		<h1>Administración de cuentas de alumnos</h1>
		<Link href={{
			pathname: '/administracion/cuentas/crear',
			query: {'tipo': 'alumno'}
		}}> Crear nuevo alumno </Link>

		<UsersTable users={allStudents} />
	</section>);
}
