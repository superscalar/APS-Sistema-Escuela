'use server';
import { fetchGrades, fetchGradesByStudent } from '@/app/utils/queries';
import { GradesTable } from '@/app/components/gradesTable';
import type { ExamGrade } from '@/app/utils/types';
import { uploadGrade, uploadGradesAsCSV } from '@/app/utils/serverActions';

export default async function Page() {
  const filteredCalificaciones = await fetchGrades();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Calificaciones de Alumnos</h1>

      {/* Campo de búsqueda */}
      {/* <input
        type="text"
		disabled
        placeholder="Buscar por ID del alumno"
        className="mb-4 p-2 border border-gray-300 rounded"
      /> */}
	  
	  <form action={uploadGradesAsCSV}>
		  {/* Botón para cargar notas desde un archivo */}
		  <input
			required
			name="grades_csv"
			type="file"
			accept=".csv"
			className="mb-4 p-2 border border-gray-300 rounded"
		  />

		  {/* Botón para recargar las calificaciones */}
		  <button
			className="mb-4 ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
		  >
			Cargar Notas
		  </button>
	  </form>

      {/* Tabla de calificaciones filtradas */}
      <GradesTable calificaciones={filteredCalificaciones} />
    </div>
  );
}