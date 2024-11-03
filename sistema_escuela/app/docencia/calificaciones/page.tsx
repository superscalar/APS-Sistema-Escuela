"use client";

import { useState, useEffect } from 'react';
import { fetchGrades, fetchGradesByStudent } from '@/app/utils/queries';
import { GradesTable } from '@/app/components/gradesTable';
import type { ExamGrade } from '@/app/utils/types';
import Papa from 'papaparse';
import { uploadGrade } from '@/app/utils/serverActions';

export default function Page() {
  const [calificaciones, setCalificaciones] = useState<ExamGrade[]>([]);
  const [filteredCalificaciones, setFilteredCalificaciones] = useState<ExamGrade[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to load all grades initially or when reloading
  const loadGrades = async () => {
    try {
      const grades = await fetchGrades();
      setCalificaciones(grades);
      setFilteredCalificaciones(grades); // Default to showing all grades
    } catch (error) {
      console.error("Error loading grades:", error);
    }
  };

  // Load grades on component mount
  useEffect(() => {
    loadGrades();
  }, []);

  // Function to handle search input
  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const studentName = event.target.value;
    setSearchTerm(studentName);

    if (studentName.trim() === '') {
      setFilteredCalificaciones(calificaciones); // Reset to all if search is empty
    } else {
      const filteredGrades = await fetchGradesByStudent(studentName);
      setFilteredCalificaciones(filteredGrades);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const newGrades: ExamGrade[] = results.data.map((row: any) => ({
            name: row.name,
            subject: row.subject,
            grade: parseFloat(row.grade),
            signed: row.signed,
          }));
          for(const exam of newGrades){
            console.log(exam);
          }
          for(const exam of newGrades){
            uploadGrade(exam.student_id, exam.subject, exam.grade, exam.signed);
          }
        },
        error: (error) => {
          console.error("Error al procesar el archivo:", error);
        },
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Calificaciones de Alumnos</h1>

      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por ID del alumno"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded"
      />

      {/* Botón para cargar notas desde un archivo */}
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4 p-2 border border-gray-300 rounded"
      />

      {/* Botón para recargar las calificaciones */}
      <button
        onClick={loadGrades}
        className="mb-4 ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Cargar Notas
      </button>

      {/* Tabla de calificaciones filtradas */}
      <GradesTable calificaciones={filteredCalificaciones} />
    </div>
  );
}