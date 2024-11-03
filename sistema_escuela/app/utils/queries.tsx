import { unstable_noStore as noStore } from 'next/cache';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import type { UserType, DatabaseUser, User, ExamGrade } from '@/app/utils/types';
import { sql } from '@vercel/postgres';

export async function fetchUserByID(userID: string): Promise<DatabaseUser> {
	noStore();
	try {
		let user = await sql`SELECT * FROM escuela.usuarios WHERE id = ${userID}`;
		return user.rows[0] as DatabaseUser;
	} catch (err) {
		console.log("Error when fetching user with ID " + userID + ": " + err);
		throw new Error("Error when fetching user with ID " + userID + ": " + err);
	}
}

export async function fetchUserByName(userName: string): Promise<DatabaseUser> {
	noStore();
	try {
		let user = await sql`SELECT * FROM escuela.usuarios WHERE username = ${userName}`;
		return user.rows[0] as DatabaseUser;
	} catch (err) {
		console.log("Error when fetching user with name " + userName + ": " + err);
		throw new Error("Error when fetching user with name " + userName + ": " + err);
	}
}

export async function fetchStudents(): Promise<DatabaseUser[]> {
	noStore();
	try {
		let students = await sql`SELECT * FROM escuela.usuarios WHERE user_type = 'alumno'`;
		return students.rows as DatabaseUser[];
	} catch (err) {
		console.log("Error when fetching students: " + err);
		throw new Error("Error when fetching students: " + err);
	}
}

export async function fetchParents(): Promise<DatabaseUser[]> {
	noStore();
	try {
		let parents = await sql`SELECT * FROM escuela.usuarios WHERE user_type = 'padre'`;
		return parents.rows as DatabaseUser[];
	} catch (err) {
		console.log("Error when fetching parents: " + err);
		throw new Error("Error when fetching parents: " + err);
	}
}

export async function fetchTeachers(): Promise<DatabaseUser[]> {
	noStore();
	try {
		let teachers = await sql`SELECT * FROM escuela.usuarios WHERE user_type = 'docente'`;
		return teachers.rows as DatabaseUser[];
	} catch (err) {
		console.log("Error when fetching teachers: " + err);
		throw new Error("Error when fetching teachers: " + err);
	}
}

export async function fetchGrades(): Promise<ExamGrade[]> {
	noStore();
	try {
		let califications = await sql`
			SELECT usuarios.id, name, subject, grade, signed
			FROM escuela.calificaciones JOIN escuela.usuarios
				 ON calificaciones.student_id = usuarios.id`;
		return califications.rows as ExamGrade[];
	} catch (err) {
		console.log("Error when fetching califications: " + err);
		throw new Error("Error when fetching califications: " + err);
	}
}

export async function fetchGradesByStudent(student_id) {
	noStore();
	try {
		let grades = await sql`SELECT usuarios.id, name, subject, grade, signed
			FROM escuela.calificaciones JOIN escuela.usuarios
				 ON calificaciones.student_id = usuarios.id
				 WHERE calificaciones.student_id = ${student_id}`;
		return grades.rows as ExamGrade[];
	} catch (err) {
		throw new Error("Error when fetching grades for student " + student_id + " | " + err);
	}
}