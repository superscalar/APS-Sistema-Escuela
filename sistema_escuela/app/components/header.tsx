import { cookies } from 'next/headers';
import { logOut } from '@/app/utils/serverActions'

export function Header() {
	const userCookies = cookies();
	// console.log(userCookies);
	const userType = (userCookies.get("clase-usuario") == undefined)
			? ""
			: userCookies.get("clase-usuario").value;
	let userClass = "Usted no ha iniciado sesión";

	const displayUserType = (userType == '') ? '' : '(' + userType + ')';

	 switch(userType) {
		case 'directivo':
			userClass = "Directivo";
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
			<section className="mt-2 ml-2 flex row justify-between content-center">
				<div>
					<h1>Escuela X</h1>
					<h3>{userClass}</h3>
				</div>

				<form action={logOut} className="flex justify-center items-center mr-4">
					<button className="border border-black max-h-8"> Cerrar sesión </button>
				</form>
			</section>
		</header>
	);
}
