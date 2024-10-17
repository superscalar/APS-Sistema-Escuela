'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function logOut(formData: FormData) {
	const cookieStore = cookies();
	cookieStore.delete('id-usuario');
	cookieStore.delete('clase-usuario');
	cookieStore.delete('nombre-usuario');
}

export async function authenticate(formData: FormData) {
	const cookieStore = cookies();
	// console.log(formData);
	console.log(`Username[${formData.get("username")}] -> Password[${formData.get("password")}]`);

	// later: change this so it doesn't pick a default value if it's empty
	let username = (formData.get("username") == '') ? "default_user" : formData.get("username");
	let password = (formData.get("password") == '') ? "default_password" : formData.get("password");

	// query DB
	// bcrypt.compare
	// if successful, continue
	//    else: keep the old cookies, redirect to /login or show an error message
	// research useFormState for this
	
	cookieStore.delete('id-usuario');
	cookieStore.delete('clase-usuario');
	cookieStore.delete('nombre-usuario');

	cookieStore.set('id-usuario', 'USERID');
	cookieStore.set('clase-usuario', 'alumno');
	cookieStore.set('nombre-usuario', username);

	redirect('/');
}