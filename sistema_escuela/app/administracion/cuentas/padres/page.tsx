import Link from 'next/link';

// TODO: paginate
import { fetchParents } from '@/app/utils/queries';
import { UsersTable } from '@/app/components/usersTable';

export default async function Page() {
	let allParents = await fetchParents();
	allParents.forEach(parent => delete parent.password);
	
	return (<section>
		<h1>Administración de cuentas de padres y madres</h1>
		<Link href={{
			pathname: '/administracion/cuentas/crear',
			query: {'tipo': 'padre'}
		}}> Crear nuevo padre/madre </Link>
		
		<UsersTable users={allParents} />		
	</section>);
}
