'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { compare }  from 'bcryptjs';
import { fetchUserByName } from '@/app/utils/queries'
import { redirectByUserType } from '@/app/utils/types';
import { revalidatePath } from 'next/cache';

import { hash }  from 'bcryptjs';
import { sql } from '@vercel/postgres';
import type { UserType, User } from '@/app/utils/types';

// Create User (Alta)
export async function createUser(userType: UserType, name: string, username: string, password: string) {
    console.log("Creating a new user...");
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    const insertReturnValue = await sql`INSERT INTO escuela.usuarios (user_type, name, username, password)
										VALUES (${userType}, ${name}, ${username}, ${hashedPassword})
										ON CONFLICT (username) DO NOTHING
										RETURNING id;`;
    console.log("User created");
	
	return insertReturnValue.rows[0].id;
}

// bind to these parameters to use as a form action
export async function deleteUserAndRevalidate(userId: string, path: string) {
	await deleteUser(userId);
	revalidatePath(path);
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Delete User (Baja)
export async function deleteUser(userId: string) {
    console.log("Deleting user...");
    await sql`DELETE FROM escuela.usuarios WHERE id = ${userId};`;
    console.log("User deleted");
}

// Update User (Modificación)
export async function updateUserAttributes(userId: string, newName: string, newUsername: string, newType: UserType) {
	console.log("Updating user...");
	console.log(`UPDATE escuela.usuarios SET user_type = ${newType}, name = ${newName}, username = ${newUsername} WHERE id = ${userId}`);
	await sql`UPDATE escuela.usuarios SET user_type = ${newType}, name = ${newName}, username = ${newUsername} WHERE id = ${userId}`;
	console.log("User updated");
}

export async function updateUserAttributesWithPassword(userId: string, newName: string, newUsername: string, newType: UserType, newPassword: string) {
	console.log("Updating user...");
	const saltRounds = 10;
	const hashedPassword = await hash(newPassword, saltRounds);
	await sql`UPDATE escuela.usuarios SET user_type = ${newType}, name = ${newName}, username = ${newName}, password = ${hashedPassword} WHERE id = ${userId}`;
	console.log("User updated");
}


export async function updateUserType(userId: string, newType: UserType){
	console.log("Updating user type...");
	await sql`UPDATE escuela.usuarios SET user_type = ${newType} WHERE id = ${userId}`;
	console.log("User type updated");
}

export async function updateName(userId: string, newName: string){
	console.log("Updating full name...");
	await sql`UPDATE escuela.usuarios SET name = ${newName} WHERE id = ${userId} ON CONFLICT (name) DO NOTHING`;
	console.log("Username updated");
}

export async function updateUsername(userId: string, newUsername: string){
	console.log("Updating username...");
	await sql`UPDATE escuela.usuarios SET username = ${newUsername} WHERE id = ${userId} ON CONFLICT (username) DO NOTHING`;
	console.log("Username updated");
}

export async function updatePassword(userId: string, newPassword: string){
	console.log("Updating password...");
	const saltRounds = 10;
	const hashedPassword = await hash(newPassword, saltRounds);
	await sql`UPDATE escuela.usuarios SET password = ${hashedPassword} WHERE id = ${userId}`;
	console.log("Password updated");
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export async function signGrade(gradeId: string) {
	console.log("Signing grade...");
	await sql`UPDATE escuela.calificaciones SET signed = true WHERE id = ${gradeId}`;
	
	// for now, this will only be called from that path, so it's fine to do this
	// later, add a new arg and bind the current path to it
	revalidate('/padres/calificaciones');
}

export async function deleteGrade(gradeId: string) {
    console.log("Deleting grade...");
    await sql`DELETE FROM escuela.calificaciones WHERE id = ${gradeId};`;
    console.log("Grade deleted");
	
	revalidatePath('/docencia/calificaciones');
}

export async function uploadGrade(studentID: string, subject: string, grade: number, signed: boolean) {
	console.log("Uploading grade...");
	await sql`
		INSERT INTO escuela.calificaciones (student_id, subject, grade, signed)
	VALUES (${studentID}, ${subject}, ${grade}, ${signed});
	  `;
	console.log("Grade uploaded");
}

async function getStudentIDByName(name: string) {
	const student = await sql`SELECT id from escuela.usuarios where name = ${name}`;
	return student.rows[0];
}

async function uploadGradesInBulk(grades) {
	// console.log("uploadGradesInBulk: ", grades);
	const SQL_values = grades.map(g => "('" + g.id + "', '" + g.subject.trim() + "', " + parseFloat(g.grade.trim()) + ", " + g.signed.trim() + ")").join(",");
	// console.log("uploadGradesInBulk: ", SQL_values);
	console.log(`INSERT INTO escuela.calificaciones (student_id, subject, grade, signed) VALUES ${SQL_values}`);
	const query = "INSERT INTO escuela.calificaciones (student_id, subject, grade, signed) VALUES " + SQL_values;
	try {
		// https://stackoverflow.com/questions/77093626/vercel-postgres-bulk-insert-building-sql-query-dynamically-from-array
		await sql.query(query, null);
	} catch (err) {
		console.log("Error when uploading bulk grades" + err);
		throw new Error("Error when uploading bulk grades" + err);
	}
}

import Papa from 'papaparse';

export async function uploadGradesAsCSV(formData: FormData) {
	// console.log(formData);
	// console.log(formData.get("grades_csv"));
	const csv_file = formData.get("grades_csv");
	if (csv_file.name == "undefined" && csv_file.size == 0) { return }
	
	const csv_text = await csv_file.text();
	const parsed = Papa.parse(csv_text, {
		header: true,
		complete: async (results) => {
			// console.log(results);
			const gradesByID = await Promise.all(results.data.map(async (grade) => {
				const id = await getStudentIDByName(grade.name);
				// console.log("Got id: ", id);
				grade.id = id.id;
				return grade
			}));
			
			await uploadGradesInBulk(gradesByID);
		}
	});
	
	revalidatePath('/docencia/calificaciones');
}

export async function editGradeFormAction(formData: FormData) {	
	let grade_id = formData.get("grade_id") as string;
	let student_id = formData.get("student_id") as string;
	let subject = formData.get("subject") as string;
	let grade = formData.get("grade") as string;
	let signed = formData.get("signed") as string;
	
	// console.log(`UPDATE escuela.calificaciones SET subject = ${subject}, grade = ${grade}, signed = ${signed} WHERE calificaciones.id = ${grade_id}`)
	await sql`UPDATE escuela.calificaciones SET subject = ${subject}, grade = ${grade}, signed = ${signed} WHERE calificaciones.id = ${grade_id}`;
	revalidatePath('/docencia/calificaciones');
	redirect('/docencia/calificaciones');
}

export async function deleteSanction(sanctionId: string, user_type: string) {
	console.log(sanctionId);
    console.log("Deleting sanction...");
    await sql`DELETE FROM escuela.amonestaciones WHERE id = ${sanctionId};`;
    console.log("Sanction deleted");
	
	console.log("deleteSanction]", redirectByUserType[user_type] + '/calificaciones');
	revalidatePath(redirectByUserType[user_type] + '/calificaciones');
}

export async function uploadSanction(formData: FormData) {
	console.log("Uploading sanction...");
	let studentID = formData.get("studentID") as string;
	let sanctionerType = formData.get("sanctionerType") as string;
	let sanctionerID = formData.get("sanctionerID") as string;
	let sanctionType = formData.get("sanctionType") as string;
	let reason = formData.get("reason") as string;
	
	console.log(`[DEBUG] INSERT INTO escuela.amonestaciones (student_id, sanctioner_id, type, reason)
	VALUES (${studentID}, ${sanctionerID}, ${sanctionType}, ${reason});`);
	
	await sql`
		INSERT INTO escuela.amonestaciones (student_id, sanctioner_id, type, reason)
	VALUES (${studentID}, ${sanctionerID}, ${sanctionType}, ${reason});
	  `;
	console.log("Sanction uploaded");

	const target = sanctionerType ? (redirectByUserType[sanctionerType] + '/amonestaciones') : '/';
	console.log("[DEBUG] Redirect to: " + target);
	redirect(target);
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export async function createUserFormAction(formData: FormData) {
	let name = formData.get("name") as string;
	let username = formData.get("username") as string;
	let password = formData.get("password") as string;
	let user_type = formData.get("user_type") as UserType;
	console.log("Creating " + user_type + " " + name + " of username " + username + " and password " + password);
	
	const createdUserID = await createUser(user_type, name, username, password);
	console.log("Successfully created user " + name + " with ID " + createdUserID);
	
	// await new Promise((resolve) => setTimeout(resolve, 3000)); // [DEBUG]
	redirect('/administracion/cuentas');	
}

export async function editUserFormAction(formData: FormData) {
	// console.log(formData);
	// console.log(formData.get("newPassword"));
	
	let userWantsToChangePassword = !!(formData.get("newPassword") ?? false);
	// console.log("userWantsToChangePassword:", userWantsToChangePassword);
	
	let userID = formData.get("id") as string;
	let name = formData.get("name") as string;
	let username = formData.get("username") as string;
	let user_type = formData.get("user_type") as UserType;
	let password = formData.get("password");
	
	if (userWantsToChangePassword) {
		await updateUserAttributesWithPassword(userID, name, username, user_type, password);
	} else {
		await updateUserAttributes(userID, name, username, user_type);
	}
	
	// await new Promise((resolve) => setTimeout(resolve, 3000)); // [DEBUG]
	redirect('/administracion/cuentas');	
}

export async function logOut(formData: FormData) {
	const cookieStore = await cookies();
	cookieStore.delete('id-usuario');
	cookieStore.delete('clase-usuario');
	cookieStore.delete('nombre-usuario');
	cookieStore.delete('nombre-completo');
	redirect('/login');
}

export async function authenticate(prevState: any, formData: FormData) {
	const cookieStore = await cookies();
	// console.log(formData);
	console.log(`Username[${formData.get("username")}] -> Password[${formData.get("password")}]`);
	
	// await new Promise((resolve) => setTimeout(resolve, 2000));

	let username = formData.get("username") as string;
	let password = formData.get("password") as string;
	
	let user = await fetchUserByName(username);
	console.log(user);

	if (user == undefined) {
		return { error: "La cuenta que ha indicado no existe" };
	} else {
		const validPassword = await compare(password, user.password);
		if (validPassword) {
			cookieStore.delete('id-usuario');
			cookieStore.delete('clase-usuario');
			cookieStore.delete('nombre-usuario');
			cookieStore.delete('nombre-completo');

			cookieStore.set('id-usuario', user.id);
			cookieStore.set('nombre-completo', user.name);
			cookieStore.set('clase-usuario', user.user_type);
			cookieStore.set('nombre-usuario', user.username);
			
			redirect( redirectByUserType[user.user_type] );
		} else {
			return { error: 'Credenciales incorrectas. Intentelo de nuevo' };
		}
	}
}