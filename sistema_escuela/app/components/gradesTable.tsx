import Link from 'next/link';
import { EditIcon } from '@/app/components/icons';
import type { ExamGrade } from '@/app/utils/types';

function EditButton() {
	return (<Link href={{
		pathname: '/docencia/calificaciones/editar',
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

export function GradesTable({calificaciones}: { calificaciones: ExamGrade[]; }) {
	return (
		<table className="table table-zebra table-auto w-full">
			<thead>
			  <tr>
				<th className="px-4 py-2">Alumno</th>
				<th className="px-4 py-2">Materia</th>
				<th className="px-4 py-2">Calificación</th>
				<th className="px-4 py-2">Firmado</th>
			  </tr>
			</thead>
			<tbody>
				
			  {calificaciones.map((alumno, index) => (
				<tr key={index}>
					<td className="border px-4 py-2">{alumno.name}</td>
					<td className="border px-4 py-2">{alumno.subject}</td>
					<td className="border px-4 py-2">{alumno.grade}</td>
					<td className="border px-4 py-2">{alumno.signed ? "Firmado!" : "Sin firmar"}</td>
					<td> <EditButton /> </td>
					<td> <DeleteButton /> </td>
				</tr>
			  ))}
			</tbody>
		</table>
	);
}