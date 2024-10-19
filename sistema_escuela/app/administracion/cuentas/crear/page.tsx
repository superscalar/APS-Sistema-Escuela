import Link from 'next/link';
import { createUser, deleteUser, createUserFormAction } from '@/app/utils/serverActions';
import { disableAfterOneClick } from '@/app/utils/clientUtils';

function randomString(n: number) {
	let alphabet = "abcdefghijklmnopqrstuvwxyz";
	let s = "";
	for (let i = 0; i < n; i++) {
		s += alphabet[Math.floor(Math.random()*(alphabet.length))];
	}
	return s;
}

export default async function Page() {
	// small test
	/* const randomName = randomString(20);
	const randomPassword = randomString(20);
	const id = await createUser('alumno', randomName, randomPassword);
	console.log(id);
	await deleteUser(id);*/

	return (<section>
		<h1>Crear una cuenta nueva:</h1>
		<form action={createUserFormAction}>
			<label htmlFor="user_type">Tipo de usuario</label>
			<select required className="input input-bordered w-full max-w-xs"
				name="user_type" id="typeSelector">
				<option>Alumno</option>
				<option>Docente</option>
				<option>Padre/Madre</option>
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