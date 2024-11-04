import Link from 'next/link';
import { EditIcon } from '@/app/components/icons';
import type { ExamGrade } from '@/app/utils/types';
import { deleteGrade } from '@/app/utils/serverActions';

function EditButton({grade_id}) {
	return (<Link href={{
		pathname: '/docencia/calificaciones/editar',
		query: { gradeID: grade_id }
	}}>
	<EditIcon />
</Link>);
}

// add a delete confirmation check later
function DeleteButton({grade_id}) {
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
      try {
        await deleteGrade(grade_id); 
      } 
      catch (error) {
        console.error("Error al eliminar la sanción:", error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}> 
        <button type="submit" className="text-xl font-extrabold text-red-500 border-b-2 border-black">
          X
        </button>
      </form>
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
			  {calificaciones.map(cal => (<tr key={cal.grade_id}>
					<td className="border px-4 py-2">{cal.name}</td>
					<td className="border px-4 py-2">{cal.subject}</td>
					<td className="border px-4 py-2">{cal.grade}</td>
					<td className="border px-4 py-2">{cal.signed ? "Firmado!" : "Sin firmar"}</td>
					<td> <EditButton grade_id={cal.grade_id}/> </td>
					<td> <DeleteButton grade_id={cal.grade_id}/> </td>
				</tr>
			  ))}
			</tbody>
		</table>
	);
}