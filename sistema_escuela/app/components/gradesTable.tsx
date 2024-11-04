import { cookies } from 'next/headers';

import Link from 'next/link';
import { EditIcon } from '@/app/components/icons';
import type { ExamGrade } from '@/app/utils/types';
import { deleteGrade, signGrade } from '@/app/utils/serverActions';
import clsx from 'clsx';

function EditButton({grade}: {grade: ExamGrade}) {
	return (<Link href={{
		pathname: '/docencia/calificaciones/editar',
		query: { gradeID: grade.grade_id, student_name: grade.name, student_id: grade.student_id, subject: grade.subject, grade: grade.grade, signed: grade.signed }
	}}>
	<EditIcon />
</Link>);
}

// add a delete confirmation check later
function DeleteButton({grade_id}) {	
	const deleteGradeWithBoundParams = deleteGrade.bind(null, grade_id);
    return (
      <form action={deleteGradeWithBoundParams}> 
        <button type="submit" className="text-xl font-extrabold text-red-500 border-b-2 border-black">
          X
        </button>
      </form>
    );
}

function FirmarButton({signed, grade_id}) {
	const signGradeWithBoundArgs = signGrade.bind(null, grade_id);
	return (<form action={signGradeWithBoundArgs}>
		{signed ? <p></p>
			   : <button className="font-extrabold text-red-500 border-b-2 border-black">Firmar</button> }
		</form>);
}

export async function GradesTable({calificaciones}: { calificaciones: ExamGrade[]; }) {
	const userCookies = await cookies();
	const user_type = userCookies.get("clase-usuario")?.value ?? 'alumno';
	const isTeacher = user_type == 'docente'; // only teachers can edit or delete grades
	const isParent  = user_type == 'padre'; // only parents can sign grades
	// console.log(">>>> isParent", isParent);
	// console.log(">>>>", user_type, "isTeacher", isParent);
	
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
				<th className={clsx({'hidden': !isParent})}>{/* Firmar */}</th>
			  </tr>
			</thead>
			<tbody>
			  {calificaciones.map(cal => (<tr key={cal.grade_id}>
					<td className="border px-4 py-2">{cal.name}</td>
					<td className="border px-4 py-2">{cal.subject}</td>
					<td className="border px-4 py-2">{cal.grade}</td>
					<td className="border px-4 py-2">{cal.signed ? "Firmado!" : "Sin firmar"}</td>
					<td className={clsx({'hidden': !isTeacher})}> <EditButton grade={cal}/> </td>
					<td className={clsx({'hidden': !isTeacher})}> <DeleteButton grade_id={cal.grade_id}/> </td>
					<td className={clsx({'hidden': !isParent})}> <FirmarButton signed={cal.signed} grade_id={cal.grade_id} /> </td>
				</tr>
			  ))}
			</tbody>
		</table>
	);
}