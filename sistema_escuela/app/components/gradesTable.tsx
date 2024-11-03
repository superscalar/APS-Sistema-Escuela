// import { useCookies } from 'next-client-cookies';
import { cookies } from 'next/headers';

import Link from 'next/link';
import { EditIcon } from '@/app/components/icons';
import type { ExamGrade } from '@/app/utils/types';
import clsx from 'clsx';

function EditButton({grade_id}) {
	return (<Link href={{
		pathname: '/docencia/calificaciones/editar',
		query: { gradeID: grade_id }
	}}>
	<EditIcon />
</Link>);
}

// add a delete confirmation check later
function DeleteButton() {
	return (
		<button className="text-xl font-extrabold text-red-500 border-b-2 border-black">X</button>
	);
}

export async function GradesTable({calificaciones}: { calificaciones: ExamGrade[]; }) {
	const userCookies = await cookies();
	const user_type = userCookies.get("clase-usuario");
	console.log(">> " + user_type + " <<");
	const isTeacher = user_type == 'docente';

	return (
		<table className="table table-zebra table-auto w-full">
			<thead>
			  <tr>
				<th className="px-4 py-2">Alumno</th>
				<th className="px-4 py-2">Materia</th>
				<th className="px-4 py-2">Calificación</th>
				<th className="px-4 py-2">Firmado</th>
				<th className={clsx({'hidden': !isTeacher})}>Editar</th>
				<th className={clsx({'hidden': !isTeacher})}>Eliminar</th>
			  </tr>
			</thead>
			<tbody>
				
			  {calificaciones.map((alumno, index) => (
				<tr key={index}>
					<td className="border px-4 py-2">{alumno.name}</td>
					<td className="border px-4 py-2">{alumno.subject}</td>
					<td className="border px-4 py-2">{alumno.grade}</td>
					<td className="border px-4 py-2">{alumno.signed ? "Firmado!" : "Sin firmar"}</td>
					<td className={clsx({'hidden': !isTeacher})}> <EditButton grade_id={alumno.grade_id} /> </td>
					<td className={clsx({'hidden': !isTeacher})}> <DeleteButton grade_id={alumno.grade_id} /> </td>
				</tr>
			  ))}
			</tbody>
		</table>
	);
}