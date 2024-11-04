'use client';

import { useCookies } from 'next-client-cookies';

import { useSearchParams } from 'next/navigation';
import { uploadSanction } from '@/app/utils/serverActions';
import { useFormStatus } from 'react-dom';

export default function CreateForm({studentsList}) {
	const students = studentsList ?? [];
	
	const userCookies = useCookies();
	const userID = userCookies.get('id-usuario') ?? "NO_ID";
	const sanctionerType = userCookies.get("clase-usuario") ?? "NO_CLASS";
	
	const params = useSearchParams();
	const defaultSelectedType = params.get('tipo') ?? 'amonestacion';
	
	return (<form action={uploadSanction} className="flex flex-col">
			<label htmlFor="studentID">Alumno a sancionar</label>
			<select required className="input input-bordered w-full max-w-xs"
				   name="studentID" id="studentIDInput">
				{ students.map(s => <option key={s.id} value={s.id}> {s.name} ({s.username}) </option> ) }
			</select>
			<div className="mt-4"></div>
			
			<input type="hidden" name="sanctionerID" defaultValue={userID} />
			<input type="hidden" name="sanctionerType" defaultValue={sanctionerType} />
			
			<label htmlFor="sanctionType">Tipo de apercibimiento</label>
			<select required className="input input-bordered w-full max-w-xs"
				name="sanctionType" id="typeSelector">
				<option value='amonestacion'>Amonestación</option>
				<option value='sancion'>Sanción</option>
			</select>
			<div className="mt-4"></div>
			
			<label htmlFor="reason">Motivo</label>
			<input required className="input input-bordered w-full max-w-xs"
				   type="text" name="reason" placeholder="" id="passwordInput" />
			<div className="mt-4"></div>

			<SubmitButton />
	</form>);
}

function SubmitButton() {
	const { pending } = useFormStatus();
	return <input disabled={pending} aria-disabled={pending} type="submit" value="Cargar apercibimiento"
			className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50" />;
}