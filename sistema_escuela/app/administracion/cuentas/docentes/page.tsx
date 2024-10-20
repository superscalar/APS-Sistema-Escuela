import Link from 'next/link';

// TODO: paginate
import { fetchTeachers } from '@/app/utils/queries';
import { UsersTable } from '@/app/components/usersTable';

export default async function Page() {
	let allTeachers = await fetchTeachers();
	allTeachers.forEach(teacher => delete teacher.password);
	
	return (<section>
		<h1>Administración de cuentas de docentes</h1>
		<Link href={{
			pathname: '/administracion/cuentas/crear',
			query: {'tipo': 'docente'}
		}}> Crear nuevo docente </Link>
		
		<UsersTable users={allTeachers} />
	</section>);
}
