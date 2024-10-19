'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { compare }  from 'bcryptjs';
import { fetchUserByName } from '@/app/utils/queries'
import { redirectByUserType } from '@/app/utils/types';

import { hash }  from 'bcryptjs';
import { sql } from '@vercel/postgres';
import type { UserType, User } from '@/app/utils/types';

// Create User (Alta)
export async function createUser(userType: UserType, username: string, password: string) {
    console.log("Creating a new user...");
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    const insertReturnValue = await sql`INSERT INTO escuela.usuarios (user_type, username, password)
										VALUES (${userType}, ${username}, ${hashedPassword})
										ON CONFLICT (username) DO NOTHING
										RETURNING id;`;
    console.log("User created");
	
	return insertReturnValue.rows[0].id;
}

// Delete User (Baja)
export async function deleteUser(userId: string) {
    console.log("Deleting user...");
    await sql`DELETE FROM escuela.usuarios WHERE id = ${userId};`;
    console.log("User deleted");
}

// Update User (Modificación)
export async function updateUserType(userId: string, newType: UserType){
	console.log("Updating user type...");
	await sql`UPDATE escuela.usuarios SET user_type = ${newType} WHERE id = ${userId};`;
	console.log("User type updated");
}

export async function updateUsername(userId: string, newUsername: string){
	console.log("Updating username...");
	await sql`UPDATE escuela.usuarios SET username = ${newUsername} WHERE id = ${userId} ON CONFLICT (username) DO NOTHING;`;
	console.log("Username updated");
}

export async function updatePassword(userId: string, newPassword: string){
	console.log("Updating password...");
	const saltRounds = 10;
	const hashedPassword = await hash(newPassword, saltRounds);
	await sql`UPDATE escuela.usuarios SET password = ${hashedPassword} WHERE id = ${userId};`;
	console.log("Password updated");
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export async function createUserFormAction(formData: FormData) {
	let username = formData.get("username") as string;
	let password = formData.get("password") as string;
	let user_type = formData.get("user_type") as UserType;
	console.log("Creating " + user_type + " of name " + username + " and password " + password);
	// const createdUserID = await createUser(user_type, username, password);
	// console.log("Successfully created user with ID " + createdUserID);
	
	await new Promise((resolve) => setTimeout(resolve, 3000)); // [DEBUG]
	redirect('/administracion/cuentas');	
}

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