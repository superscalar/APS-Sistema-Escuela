import { cookies } from 'next/headers';
import { logOut } from '@/app/utils/serverActions'

import Link from 'next/link';
import clsx from 'clsx';

export function Header() {
	const userCookies = cookies();
	// console.log(userCookies);
	const hasLoggedIn: bool = (userCookies.get("clase-usuario") == undefined);
	
	const userType = (userCookies.get("clase-usuario") == undefined)
			? ""
			: userCookies.get("clase-usuario").value;
	let userClass = "Usted no ha iniciado sesión";

	const displayUserType = (userType == '') ? '' : '(' + userType + ')';

	 switch(userType) {
		case 'administrador':
			userClass = "Administrador";
			break;
		case 'docente':
			userClass = "Docente";
			break;
		case 'padre':
			userClass = "Padre/Madre";
			break;
		case 'alumno':
			userClass = "Alumno";
			break;
		default:
			userClass = "Usted no ha iniciado sesión";
	}

	return (
		<header className="pb-2 border-b border-black">
			<section className="mt-2 ml-2 flex row justify-between items-center">
				<div>
					<h1>Escuela X</h1>
					<h3>{userClass}</h3>
				</div>

				<Link href="/login" className={ clsx("color-blue-400 underline mr-4", { ['hidden']: !hasLoggedIn }) }> Iniciar Sesión </Link>
				
				<form action={logOut} className={ clsx("flex justify-center items-center mr-4", { ['hidden']: hasLoggedIn }) }>
					<button> <a> Cerrar sesión </a> </button>
				</form>
			</section>
		</header>
	);
}
