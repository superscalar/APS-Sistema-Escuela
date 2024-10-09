'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function authenticate(formData: FormData) {
	const cookieStore = cookies();
	// console.log(formData);
	// console.log(formData.get("username") + " -> " + formData.get("password"));

	let username = (formData.get("username") == '') ? "default_user" : formData.get("username");
	let password = (formData.get("password") == '') ? "default_password" : formData.get("password");
	
	cookieStore.delete('clase-usuario');
	cookieStore.set('clase-usuario', username);

	redirect('/');
}