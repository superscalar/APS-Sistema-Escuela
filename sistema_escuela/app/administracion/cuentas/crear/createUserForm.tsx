'use client';
import { useSearchParams } from 'next/navigation'

import Link from 'next/link';
import type { UserType } from '@/app/utils/types';

import { createUserFormAction } from '@/app/utils/serverActions';
import { disableAfterOneClick } from '@/app/utils/clientUtils';
import { useFormState, useFormStatus } from 'react-dom';

import { useState } from 'react';
import { clsx } from 'clsx';
 
export default function CreateForm({students}: {students: UserType[]}) {
	const params = useSearchParams();
	const defaultSelectedType = params.get('tipo') ?? 'alumno';
	
	const [ displayChildSelector, setDisplayChildSelector] = useState(false);
	
	console.log(students);
	
	const handleTypeSelectorChange = (event) => {
		const selectedType = event.target.value;
		// console.log("Selected: " + selectedType);
		setDisplayChildSelector(selectedType == 'padre');
	}
	
	return (<section className="mt-4 flex flex-col items-center justify-center">
		<section className="flex flex-col justify-center max-w-md border border-black p-4 rounded">
			<h1>Crear una cuenta nueva:</h1>
			<form action={createUserFormAction} className="flex flex-col">
				<label htmlFor="user_type">Tipo de usuario</label>
				<select required className="input input-bordered w-full max-w-xs"
					name="user_type" id="typeSelector" onChange={handleTypeSelectorChange}>
					<option value='alumno' selected={defaultSelectedType == 'alumno'}>Alumno</option>
					<option value='docente' selected={defaultSelectedType == 'docente'}>Docente</option>
					<option value='padre' selected={defaultSelectedType == 'padre'}>Padre/Madre</option>
				</select>

				<div className="mt-4"></div>
				
				<label htmlFor="name">Nombre y apellido</label>
				<input required className="input input-bordered w-full max-w-xs"
					   type="text" name="name" placeholder="" id="nameInput" />

				<div className="mt-4"></div>
				
				{/* hide these if type != padre */}
				{/* unless type == padre, ignore this form value in the backend */}
				{/* send back user ID -> insert parent_id + user_id on the other table -> for this, the createUser SQL INSERT needs to return the newly created ID */}
				<label className={clsx({'hidden': !displayChildSelector})} htmlFor="has_child"> Hijo/a </label>
				<select required className={clsx("input input-bordered w-full max-w-xs", {'hidden': !displayChildSelector})}
						name="has_child" id="inChargeOfStudentSelector">
					{/* is setting id on <option> important? */}
					{students.map(s => <option id={s.id} value={s.id}>{s.name} ({s.username})</option>)}
				</select>
				<div className="mt-4"></div>
				
				<label htmlFor="username">Nombre de usuario</label>
				<input required className="input input-bordered w-full max-w-xs"
					   type="text" name="username" placeholder="" id="usernameInput" />

				<div className="mt-4"></div>
				
				<label htmlFor="password">Contraseña</label>
				<input required className="input input-bordered w-full max-w-xs"
					   type="text" name="password" placeholder="***********" id="passwordInput" />

				<div className="mt-4"></div>

				<SubmitButton />
			</form>
		</section>
	</section>);
}

function SubmitButton() {
	const { pending } = useFormStatus();
	return <input disabled={pending} aria-disabled={pending} type="submit" value="Crear usuario"
			className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50" />;
}