import Link from 'next/link';

export default function Page() {
  return (
    <section className="mt-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Administración de cuentas</h1>
      <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
	  	<Link href="/administracion/cuentas/docentes" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <div className="flex items-center justify-center"> 
            Administrar cuentas de docentes
          </div>
        </Link>

		<Link href="/administracion/cuentas/alumnos" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
			<div className="flex items-center justify-center"> 
            Administrar cuentas de alumnos
          </div>
        </Link>

		<Link href="/administracion/cuentas/padres" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
			<div className="flex items-center justify-center"> 
            Administrar cuentas de padres y madres
          </div>
        </Link>
      </nav>
    </section>
  );
}
