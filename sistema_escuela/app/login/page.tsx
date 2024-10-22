'use client';
import { authenticate } from '@/app/utils/serverActions';
import { useFormState, useFormStatus } from 'react-dom';
// import { useActionState } from 'react';
import clsx from 'clsx';

export default function Page() {
	const initialState = { message: "", error: undefined };
	const [formState, checkAuth] = useFormState(authenticate, initialState);
	
	
	return ( <section className="mt-2 flex content-center justify-center">
			<section className="flex flex-col justify-center max-w-md border border-black p-4 rounded">
				<h2 className="font-bold text-xl mb-4" >Inicio de sesión</h2>
				<form action={checkAuth}>
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

					<LoginButton formState={formState} />
				</form>
			</section>
		</section> );
}

function LoginButton({formState}) {
	const { pending } = useFormStatus();
	
	return (<div>
		<button disabled={pending} aria-disabled={pending} className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
			<p>Ingresar</p>
		</button>
	
		<div className={clsx( { 'hidden': pending } )} id="form-error" aria-live="polite" aria-atomic="true">
			{ formState.error &&
				<div id="errorMessage" className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
					<p className="font-bold text-red-500 text-center">{formState.error}</p>
				</div>
			}
		</div>
	</div>);

}