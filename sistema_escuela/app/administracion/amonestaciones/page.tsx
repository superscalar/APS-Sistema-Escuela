'use server';
import Link from 'next/link';
import { fetchSanctions } from '@/app/utils/queries';
import { SanctionsTable } from '@/app/components/sanctionsTable';
import { Suspense } from 'react';

export default async function Page() {
	const allSanctions = await fetchSanctions();
	
	return (<section className="mt-4 flex flex-col items-center justify-center">
		<h1>Amonestaciones y sanciones</h1>

        <Link href='/administracion/amonestaciones/crear' className="mb-4 ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Cargar nuevo apercibimiento
        </Link>
		
		<Suspense fallback={<SuspenseTable />}>
			<SanctionsTable sanction={allSanctions} />
		</Suspense>
		
		<Link href='/administracion'> Volver </Link>
	</section>);
}

function SuspenseTable() {
	return <table></table>;
}