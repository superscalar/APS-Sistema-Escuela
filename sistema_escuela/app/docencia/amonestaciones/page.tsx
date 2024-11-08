'use server';
import Link from 'next/link';
import { fetchSanctions } from '@/app/utils/queries';
import { SanctionsTable } from '@/app/components/sanctionsTable';
import { Suspense } from 'react';
import { cookies } from 'next/headers';

export default async function Page() {
	const allSanctions = await fetchSanctions();
	const userCookies  = await cookies();
	const user_type = userCookies.get('clase-usuario')?.value ?? "NO_CLASS";
	
	return (<section className="mt-4 flex flex-col items-center justify-center">
		<h1>Amonestaciones y sanciones</h1>

        <Link href='/docencia/amonestaciones/crear' className="mb-4 ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Crear nueva amonestación/sanción
        </Link>
		
		<Suspense fallback={<SuspenseTable />}>
			<SanctionsTable sanction={allSanctions} user_type={user_type} />
		</Suspense>
		
		<Link href='/docencia'> Volver </Link>
	</section>);
}

function SuspenseTable() {
	return <table></table>;
}