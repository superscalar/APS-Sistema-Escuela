import Link from 'next/link';

export default function Page() {
	return (<section>
		<h1>Seccion de administración</h1>
		<nav>
			<ul className="list-disc list-inside">
				<li> <Link href="/administracion/cuentas">Administrar cuentas</Link> </li>
				<li> Ver amonestaciones y sanciones</li>
				<li> ******** </li>
			</ul>
		</nav>
	</section>);
}
