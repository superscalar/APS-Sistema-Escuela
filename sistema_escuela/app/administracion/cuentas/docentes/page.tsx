import Link from 'next/link';

export default function Page() {
	return (<section>
		<h1>Administración de cuentas de docentes</h1>
		<Link href={{
			pathname: '/administracion/cuentas/crear',
			query: {'tipo': 'docente'}
		}}> Crear nuevo docente </Link>
		
	</section>);
}
