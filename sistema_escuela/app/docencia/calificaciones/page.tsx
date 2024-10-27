import React from 'react';

function App() {
  const alumnos = [
    { nombre: 'Juan Perez', calificacion: 8 },
    { nombre: 'Maria Gomez', calificacion: 9 },
    { nombre: 'Pedro Sanchez', calificacion: 7 },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Calificaciones de Alumnos</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Alumno</th>
            <th className="px-4 py-2">Calificación</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((alumno, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="border px-4 py-2">{alumno.nombre}</td>
              <td className="border px-4 py-2">{alumno.calificacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;