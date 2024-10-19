import Link from 'next/link';

export default function Page() {
	
	return (<section>
		<h1>Administración de cuentas de padres y madres</h1>
		<Link href={{
			pathname: '/administracion/cuentas/crear',
			query: {'tipo': 'padre'}
		}}> Crear nuevo padre/madre </Link>
		
	</section>);
}
