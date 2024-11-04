'use server';

import CreateForm from '@/app/amonestaciones/crear/createSanctionForm';
import { fetchSanctions } from '@/app/utils/queries';

export default async function Page() {
	
	const allSanctions = await fetchSanctions(); // for the parents to select this in the form
	return <CreateForm />
	
}