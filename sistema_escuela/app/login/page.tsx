'use client';
import { authenticate } from '@/app/utils/serverActions';
import { disableAfterOneClick } from '@/app/utils/clientUtils';

export default function Page() {
	return ( <section className="mt-2 flex content-center justify-center">
			<section className="flex flex-col justify-center max-w-md border border-black p-4 rounded">
				<h2 className="font-bold text-xl mb-4" >Inicio de sesión</h2>
				<form action={authenticate}>
					<fieldset>
						<legend>Nombre de usuario</legend>
						<label style={{display: "none"}} htmlFor="username">Nombre de usuario</label>
						<input required className="input input-bordered w-full max-w-xs"
							   type="text" name="username" placeholder="" id="usernameInput" />
						
					</fieldset>

					<div className="mt-4"></div>

					<fieldset>
						<legend>Contraseña</legend>
						<label style={{display: "none"}} htmlFor="password">Contraseña</label>
						<input required className="input input-bordered w-full max-w-xs"
							type="password" name="password" placeholder="********" id="passwordInput" />
					</fieldset>

					<div className="mt-4"></div>

					<input className="btn btn-primary"
						onClick={disableAfterOneClick} type="submit" value="Iniciar sesión" />
				</form>
			</section>
		</section> );
}
