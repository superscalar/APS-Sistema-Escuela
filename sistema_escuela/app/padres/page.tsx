import Link from 'next/link';

export default function Page() {
  return (
    <section className="mt-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Sección de padres y madres</h1>
      <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
	  <Link href="#" className="bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          <div className="flex items-center justify-center">
            Trabajos practicos
          </div>
        </Link>
		
		<Link href="/padres/calificaciones" className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          <div className="flex items-center justify-center">
            Calificaciones
          </div>
        </Link>

        <Link href="#" className="bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          <div className="flex items-center justify-center">
            Control de asistencia
          </div>
        </Link>

		<Link href="#" className="bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          <div className="flex items-center justify-center">
            Boletines
          </div>
        </Link>

		<Link href="/padres/amonestaciones" className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          <div className="flex items-center justify-center">
            Amonestaciones y sanciones
          </div>
        </Link>

		<Link href="#" className="bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          <div className="flex items-center justify-center">
            Mensajes
          </div>
        </Link>
      </nav>
    </section>
  );
}