import { fetchGrades } from '@/app/utils/queries';
import { GradesTable } from '@/app/components/gradesTable';

export default async function Page() {
  const calificaciones: ExamGrades = await fetchGrades();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Calificaciones de Alumnos</h1>
      <GradesTable calificaciones={calificaciones} />
    </div>
  );
}