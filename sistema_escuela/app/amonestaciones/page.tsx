import Link from 'next/link';
import { fetchSanctions } from '@/app/utils/queries';
import { SanctionsTable } from '@/app/components/sanctionsTable';

export default async function Page() {
	const allSanctions = await fetchSanctions();
	
	return (<section className="mt-4 flex flex-col items-center justify-center">
		<h1>Amonestaciones y sanciones</h1>

        <Link href='/amonestaciones/crear' className="mb-4 ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Cargar nuevo apercibimiento
        </Link>
		
		<SanctionsTable sanction={allSanctions} />
		
		<Link href='/docencia'> Volver </Link>
	</section>);
}