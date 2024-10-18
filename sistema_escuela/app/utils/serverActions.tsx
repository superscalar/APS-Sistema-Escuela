'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { compare }  from 'bcryptjs';
import { fetchUserByName } from '@/app/utils/queries'
import { redirectByUserType } from '@/app/utils/types';

export async function logOut(formData: FormData) {
	const cookieStore = cookies();
	cookieStore.delete('id-usuario');
	cookieStore.delete('clase-usuario');
	cookieStore.delete('nombre-usuario');
	redirect('/login');
}

export async function authenticate(formData: FormData) {
	const cookieStore = cookies();
	// console.log(formData);
	console.log(`Username[${formData.get("username")}] -> Password[${formData.get("password")}]`);

	let username = formData.get("username") as string;
	let password = formData.get("password") as string;

	// query DB
	// bcrypt.compare
	// if successful, continue
	//    else: keep the old cookies, redirect to /login or show an error message
	// research useFormState for this
	
	let user = await fetchUserByName(username);
	console.log(user);
	
	if (user == undefined) {
		// for now, let's use this
		throw new Error("Wrong credentials used");
	}
	
	const validPassword = await compare(password, user.password);
	if (validPassword) {
		cookieStore.delete('id-usuario');
		cookieStore.delete('clase-usuario');
		cookieStore.delete('nombre-usuario');

		cookieStore.set('id-usuario', user.id);
		cookieStore.set('clase-usuario', user.user_type);
		cookieStore.set('nombre-usuario', user.username);
		redirect( redirectByUserType[user.user_type] );
	} else {
		redirect('/mistake');
	}

}