'use client';

import React, { useEffect, useState } from 'react';
import type { Amonestacion } from '@/app/utils/types';
import { deleteSanction } from '@/app/utils/serverActions';
import { fetchUserByID } from '@/app/utils/queries';

// add a delete confirmation check later
function DeleteButton({ a }: { a: Amonestacion }) {
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
      try {
        await deleteSanction(a.id); 
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

  function Username({ id }: { id: string }) {
	const [name, setName] = useState<string | null>(null);
  
	useEffect(() => {
	  const getUsername = async () => {
		try {
		  const user = await fetchUserByID(id);
		  setName(user.name);
		} catch (error) {
		  console.error("Error fetching user by ID:", error);
		  setName("Unknown");
		}
	  };
	  getUsername();
	}, [id]);
  
	return <>{name || "Loading..."}</>;
  }

export async function SanctionsTable({sanction}: { sanction: Amonestacion[]; }) {
	return (<div className="border border-black w-fit h-fit">
		<table className="table table-zebra w-fit">
			<thead>
			<tr>
				<td> Estudiante </td>
				<td> Tipo </td>
				<td> Motivo </td>
			</tr>
			</thead>
			
			<tbody>
				{ sanction.map(s => <tr key={s.id}>
					<td> <Username id={s.alumno_id} /> </td>
					<td> {s.sanction_type} </td>
                    <td> {s.reason} </td>
					<td> <DeleteButton a = {s} /> </td>
				</tr>) }
			</tbody>
		</table>
	</div>);
}