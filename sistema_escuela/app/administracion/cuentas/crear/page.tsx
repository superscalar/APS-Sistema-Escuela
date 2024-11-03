'use server';
import CreateForm from '@/app/administracion/cuentas/crear/createUserForm'
import { DBUsersToUsers } from '@/app/utils/types';

import Link from 'next/link';
import type { UserType } from '@/app/utils/types';

import { createUserFormAction } from '@/app/utils/serverActions';
import { disableAfterOneClick } from '@/app/utils/clientUtils';
import { useFormState, useFormStatus } from 'react-dom';

import { fetchStudents } from '@/app/utils/queries';

export default async function Page() {
	// if this page is visited as-is, then it doesn't matter
	// but, for example, from /administracion/cuentas/docentes, a link to create a new teacher can
	// redirect to /crear?tipo=docente, which sets the <select> to the correct type by default
	
	const allStudents = await fetchStudents(); // for the parents to select this in the form
	DBUsersToUsers(allStudents); // mutates the array
	return <CreateForm students={allStudents} />
	
}