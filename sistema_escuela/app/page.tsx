import Link from 'next/link';

export default function Page() {
	return <section>
		<h2>Pagina principal</h2>
		<Link href="/login" className="color-blue-400 underline"> Iniciar Sesión </Link>
	</section>;
}
