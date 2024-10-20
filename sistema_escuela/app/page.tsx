import Link from 'next/link';

export default function Page() {
	return <section className="mt-4 flex flex-col items-center justify-center">
		<h2>Pagina principal</h2>
		<Link href="/login" className="color-blue-400 underline"> Iniciar Sesión </Link>
	</section>;
}
