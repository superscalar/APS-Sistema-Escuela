import Link from 'next/link';

export default function Page() {
	return (<section className="mt-4 flex flex-col items-center justify-center">
		<h1>Administración de cuentas</h1>
		<nav>
			<ul className="list-disc list-inside">
			
				<li> <Link href="/administracion/cuentas/crear">Crear una nueva cuenta</Link> </li>
				<br />
			
				<li> <Link href="/administracion/cuentas/docentes">Administrar cuentas de docentes</Link> </li>
				<li> <Link href="/administracion/cuentas/alumnos">Administrar cuentas de alumnos</Link> </li>
				<li> <Link href="/administracion/cuentas/padres">Administrar cuentas de padres y madres</Link> </li>
			</ul>
		</nav>
	</section>);
}
