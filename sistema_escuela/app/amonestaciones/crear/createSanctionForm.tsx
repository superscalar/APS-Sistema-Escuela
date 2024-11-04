'use client';

import { useSearchParams } from 'next/navigation';
import { uploadSanction } from '@/app/utils/serverActions';
import { useFormStatus } from 'react-dom';

export default function CreateForm() {
	const params = useSearchParams();
	const defaultSelectedType = params.get('tipo') ?? 'amonestacion';
	
	return (<section className="mt-4 flex flex-col items-center justify-center">
		<section className="flex flex-col justify-center max-w-md border border-black p-4 rounded">
			<h1> Cargar un nuevo apercibimiento </h1>
			<form action={uploadSanction} className="flex flex-col">
				
				<label htmlFor="studentID">ID del alumno</label>
				<input required className="input input-bordered w-full max-w-xs"
					   type="text" name="studentID" placeholder="" id="nameInput" />
				
				<div className="mt-4"></div>
				
				<label htmlFor="sanctionerID">ID del labrador </label>
				<input required className="input input-bordered w-full max-w-xs"
					   type="text" name="sanctionerID" placeholder="" id="usernameInput" />

				<div className="mt-4"></div>
				
				<label htmlFor="sanctionType">Tipo de apercibimiento</label>
				<input required className="input input-bordered w-full max-w-xs"
					   type="text" name="sanctionType" placeholder="" id="passwordInput" />

				<div className="mt-4"></div>

                <label htmlFor="reason">Motivo</label>
				<input required className="input input-bordered w-full max-w-xs"
					   type="text" name="reason" placeholder="" id="passwordInput" />

				<div className="mt-4"></div>

				<SubmitButton />
			</form>
		</section>
	</section>);
}

function SubmitButton() {
	const { pending } = useFormStatus();
	return <input disabled={pending} aria-disabled={pending} type="submit" value="Cargar apercibimiento"
			className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50" />;
}