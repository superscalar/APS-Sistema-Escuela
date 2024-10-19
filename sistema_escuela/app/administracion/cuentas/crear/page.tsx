'use client'; // later narrow this down to the component
import { useSearchParams } from 'next/navigation'

import Link from 'next/link';
import { createUser, deleteUser, createUserFormAction } from '@/app/utils/serverActions';
import { disableAfterOneClick } from '@/app/utils/clientUtils';
import type { UserType } from '@/app/utils/types';

function randomString(n: number) {
	let alphabet = "abcdefghijklmnopqrstuvwxyz";
	let s = "";
	for (let i = 0; i < n; i++) {
		s += alphabet[Math.floor(Math.random()*(alphabet.length))];
	}
	return s;
}

export default async function Page() {
	// if this page is visited as-is, then it doesn't matter
	// but, for example, from /administracion/cuentas/docentes, a link to create a new teacher can
	// redirect to /crear?tipo=docente, which sets the <select> to the correct type by default
	const params = useSearchParams();
	const defaultSelectedType = params.get('tipo') ?? 'alumno';

	return (<section>
		<h1>Crear una cuenta nueva:</h1>
		<form action={createUserFormAction}>
			<label htmlFor="user_type">Tipo de usuario</label>
			<select required className="input input-bordered w-full max-w-xs"
				name="user_type" id="typeSelector">
				<option value='alumno' selected={defaultSelectedType == 'alumno'}>Alumno</option>
				<option value='docente' selected={defaultSelectedType == 'docente'}>Docente</option>
				<option value='padre' selected={defaultSelectedType == 'padre'}>Padre/Madre</option>
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

			<input className="btn btn-primary" onClick={disableAfterOneClick} type="submit" value="Crear usuario" />
		</form>		
	</section>);
}