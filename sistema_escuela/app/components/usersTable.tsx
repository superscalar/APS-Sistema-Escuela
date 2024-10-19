import type { User } from '@/app/utils/types';

export function UsersTable({users}: { users: User[]; }) {
	console.log(users);
	
	// consider max-width
	return (<table className="table w-fit"> <tbody>
		{ users.map(user => <tr> <td> {user.id} </td> <td> {user.username} </td> </tr>) }
	</tbody> </table>);
}