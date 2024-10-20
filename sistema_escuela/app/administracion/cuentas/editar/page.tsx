'use client';
import { useSearchParams } from 'next/navigation'
import { useState } from 'react';

import Link from 'next/link';
import { editUserFormAction } from '@/app/utils/serverActions';
import { disableAfterOneClick } from '@/app/utils/clientUtils';
import type { UserType } from '@/app/utils/types';
import clsx from 'clsx';


export default function Page() {
	const [ checked, setChecked ] = useState(false);

	function handleClick(e) {
		setChecked(!checked);
		document.querySelector("#passwordInput").value = ""; // clear the password input in case the user unchecks and then submits
	}
	
	const params = useSearchParams();
	const userID = params.get('id') ?? "NO-ID?";
	const user_type = params.get('type') ?? "alumno";
	const username = params.get('username') ?? "";

	return (<section className="flex flex-col justify-center max-w-md border border-black p-4 rounded">
		<h1>Editar datos de cuenta:</h1>
		<p> ID: { userID } </p>
		<form action={editUserFormAction} className="flex flex-col">
			<input type="hidden" name="id" value={userID} />
		
			<label htmlFor="user_type">Tipo de usuario</label>
			<select required className="input input-bordered w-full max-w-xs"
				name="user_type" id="typeSelector">
				<option value='alumno' selected={user_type == 'alumno'}>Alumno</option>
				<option value='docente' selected={user_type == 'docente'}>Docente</option>
				<option value='padre' selected={user_type == 'padre'}>Padre/Madre</option>
			</select>

			<div className="mt-4"></div>
			
			<label htmlFor="username">Nombre de usuario</label>
			<input required className="input input-bordered w-full max-w-xs"
				   type="text" name="username" defaultValue={username} id="usernameInput" />

			<div className="mt-4"></div>
			
			<div>
				<label className="mr-4" htmlFor="newPassword">Nueva contraseña?</label>
				<input type="checkbox" name="newPassword" onClick={handleClick} />
			</div>
			
			<div className={clsx({['hidden']: !checked})}>
				<label htmlFor="password">Contraseña</label>
				<input required={checked} className="input input-bordered w-full max-w-xs"
				   type="text" name="password" placeholder="***********" id="passwordInput" />
			</div>
			
			<div className="mt-4"></div>

			<input className="btn btn-primary" onClick={disableAfterOneClick} type="submit" value="Editar" />
		</form>
	</section>);
}