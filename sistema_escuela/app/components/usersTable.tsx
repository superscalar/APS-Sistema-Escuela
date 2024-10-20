'use client';

import { EditIcon } from '@/app/components/icons';
import type { User } from '@/app/utils/types';
import Link from 'next/link';
import { deleteUserAndRevalidate } from '@/app/utils/serverActions';
import { usePathname } from 'next/navigation'

function EditButton({user}:{user: User}) {
	// pass in the user data to /editar via query parameter
	return (<Link href={{
			pathname: '/administracion/cuentas/editar',
			query: { 'id': user.id, 'type': user.user_type, 'username': user.username }
		}}>
		<EditIcon />
	</Link>);
}

// add a delete confirmation check later
function DeleteButton({user}: {user: User}) {
	const pathname = usePathname();
	const deleteSpecificUserAction = deleteUserAndRevalidate.bind(null, user.id).bind(null, pathname);
	
	return (<form action={deleteSpecificUserAction}>
		<button className="text-xl text-red-500">X</button>
	</form>);
	
}

export function UsersTable({users}: { users: User[]; }) {
	// console.log(users);
	
	// consider max-width
	return (<div className="border border-black w-fit h-fit">
		<table className="table table-zebra w-fit">
			<thead>
			<tr>
				<td> id </td>
				<td> Nombre </td>
				<td> Tipo </td>
				<td></td>
				<td></td>
			</tr>
			</thead>
			
			<tbody>
				{ users.map(user => <tr key={user.id}>
					<td> {user.id} </td>
					<td> {user.username} </td>
					<td> {user.user_type} </td>
					<td> <EditButton user={user} /> </td>
					<td> <DeleteButton user={user} /> </td>
				</tr>) }
			</tbody>
		</table>
	</div>);
}