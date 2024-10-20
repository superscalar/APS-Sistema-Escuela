import Link from 'next/link';

// TODO: paginate
import { fetchParents } from '@/app/utils/queries';
import { UsersTable } from '@/app/components/usersTable';

export default async function Page() {
	let allParents = await fetchParents();
	allParents.forEach(parent => delete parent.password);
	
	return (<section className="mt-4 flex flex-col items-center justify-center">
		<h1>Administración de cuentas de padres y madres</h1>
		<Link href={{
			pathname: '/administracion/cuentas/crear',
			query: {'tipo': 'padre'}
		}}> Crear nuevo padre/madre </Link>
		
		<UsersTable users={allParents} />
		
		<Link href='/administracion/cuentas'> Volver </Link>
	</section>);
}
