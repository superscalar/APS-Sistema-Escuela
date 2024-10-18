// TODO: check errors on return

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import type { DatabaseUser, User } from '@/app/utils/types';
import { sql } from '@vercel/postgres';

export async function fetchUserByID(userID: String): DatabaseUser {
	// if it's not there, the result seems to be undefined - check this and handle appropriately
	let user = await sql`SELECT * FROM escuela.usuarios WHERE id = ${userID}`;
	return user.rows[0];
}

export async function fetchUserByName(userName: String): DatabaseUser {
	// if it's not there, the result seems to be undefined - check this and handle appropriately
	let user = await sql`SELECT * FROM escuela.usuarios WHERE username = ${userName}`
	return user.rows[0];
}

// Create User (Alta)
export async function createUser(userType, username, password) {
    console.log("Creating a new user...");
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await sql`INSERT INTO escuela.usuarios (type, username, password) VALUES (${userType}, ${username}, ${hashedPassword}) ON CONFLICT (username) DO NOTHING;`;
    console.log("User created");
}

// Delete User (Baja)
export async function deleteUser(userId) {
    console.log("Deleting user...");
    await sql`DELETE FROM escuela.usuarios WHERE id = ${userId};`;
    console.log("User deleted");
}

// Update User (Modificación)
export async function updateUserType(userId, newType){
	console.log("Updating user type...");
	await sql`UPDATE escuela.usuarios SET type = ${newType} WHERE id = ${userId};`;
	console.log("User type updated");
}

export async function updateUsername(userId, newUsername){
	console.log("Updating username...");
	await sql`UPDATE escuela.usuarios SET username = ${newUsername} WHERE id = ${userId} ON CONFLICT (username) DO NOTHING;`;
	console.log("Username updated");
}

export async function updatePassword(userId, newPassword){
	console.log("Updating password...");
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
	await sql`UPDATE escuela.usuarios SET password = ${hashedPassword} WHERE id = ${userId};`;
	console.log("Password updated");
}