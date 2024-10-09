import { cookies } from 'next/headers';

export function Header() {
	const userCookies = cookies();
	// console.log(userCookies);
	const userType = userCookies.get("clase-usuario").value;
	let userClass = "Usted no ha iniciado sesión";

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
			userClass = "Usted no ha iniciado sesión (" + userType + ")";
	}

	return (
		<header className="pb-2 border-b border-black">
			<section className="mt-4 ml-4">
				<h1>Escuela X</h1>
				<h3>{userClass}</h3>
			</section>
		</header>
	);
}
