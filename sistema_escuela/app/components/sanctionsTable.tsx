import React, { useEffect, useState } from 'react';
import type { Amonestacion } from '@/app/utils/types';
import { deleteSanction } from '@/app/utils/serverActions';
import { fetchUserByID } from '@/app/utils/queries';

// add a delete confirmation check later
function DeleteButton({ a, user_type }: { a: Amonestacion; user_type: string }) {
	const deleteSanctionWithBoundArgs = deleteSanction.bind(null, a.id).bind(null, user_type);
    return (
		<form action={deleteSanctionWithBoundArgs}> 
			<button type="submit" className="text-xl font-extrabold text-red-500 border-b-2 border-black">
				X
			</button>
		</form>
	);
}

export function SanctionsTable({sanction, user_type}: { sanction: Amonestacion[]; user_type: string }) {
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
				{ sanction.map(s =>
					<tr key={s.id}>
						<td> {s.student_name} </td>
						<td> {s.username} </td>
						<td> {s.sanction_type} </td>
						<td> {s.reason} </td>
						<td> <DeleteButton a={s} user_type={user_type} /> </td>
					</tr>)
				}
			</tbody>
		</table>
	</div>);
}