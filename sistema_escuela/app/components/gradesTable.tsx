export default function GradesTable({calificaciones}) {
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
				</tr>
			  ))}
			</tbody>
		</table>
	);
}