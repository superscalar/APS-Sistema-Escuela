import Link from 'next/link';

export default function Page() {
  return (
    <section className="mt-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Sección de docentes</h1>
      <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
	  	<Link href="/administracion/cuentas" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <div className="flex items-center justify-center"> 
            Administrar cuentas
          </div>
        </Link>

		<Link href="/administracion/amonestaciones" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <div className="flex items-center justify-center">
            Amonestaciones y sanciones
          </div>
        </Link>

		<Link href="#" className="bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          <div className="flex items-center justify-center">
            Boletines
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