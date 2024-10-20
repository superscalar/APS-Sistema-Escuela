import Link from 'next/link';

export default function Page() {
	return (<section className="mt-4 flex flex-col items-center justify-center">
		<h1>Seccion de administración</h1>
		<nav>
			<ul className="list-disc list-inside">
				<li> <Link href="/administracion/cuentas">Administrar cuentas</Link> </li>
				<li> <Link href="#">Ver amonestaciones y sanciones</Link> </li>
				<li> <Link href="#">...</Link> </li>
			</ul>
		</nav>
	</section>);
}
