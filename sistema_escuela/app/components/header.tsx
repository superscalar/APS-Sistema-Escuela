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
			userClass = userType;
	}

	return (
		<header style={{paddingBottom: "0.5rem", borderBottom: "2px solid black"}}>
			<h1>Escuela X - {userClass}</h1>
		</header>
	);
}
