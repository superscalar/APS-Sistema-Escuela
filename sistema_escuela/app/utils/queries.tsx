// TODO: check errors on return

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { hash }  from 'bcryptjs';
import type { UserType, DatabaseUser, User } from '@/app/utils/types';
import { sql } from '@vercel/postgres';

export async function fetchUserByID(userID: string): Promise<DatabaseUser> {
	// if it's not there, the result seems to be undefined - check this and handle appropriately
	let user = await sql`SELECT * FROM escuela.usuarios WHERE id = ${userID}`;
	return user.rows[0] as DatabaseUser;
}

export async function fetchUserByName(userName: string): Promise<DatabaseUser> {
	// if it's not there, the result seems to be undefined - check this and handle appropriately
	let user = await sql`SELECT * FROM escuela.usuarios WHERE username = ${userName}`
	return user.rows[0] as DatabaseUser;
}

// Create User (Alta)
export async function createUser(userType: UserType, username: string, password: string) {
    console.log("Creating a new user...");
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    await sql`INSERT INTO escuela.usuarios (user_type, username, password) VALUES (${userType}, ${username}, ${hashedPassword}) ON CONFLICT (username) DO NOTHING;`;
    console.log("User created");
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