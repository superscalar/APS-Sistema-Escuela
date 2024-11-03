export type UserType = 'alumno' | 'docente' | 'padre' | 'administrador';

export type Amonestacion = {
	id: string,
	sanction_type: 'amonestacion' | 'sancion',
	alumno_id: string,
	sanctioner_id: string,
	reason: string,
	date: string, 
}

// We receive this type from the database
export type DatabaseUser = {
	id: string,
	user_type: UserType,
	name: string,
	username: string,
	password: string
}

// We don't want the bcrypt password to go around in the client side
export type User = Omit<DatabaseUser, 'password'>;

export function DBUsersToUsers(users: DatabaseUser[]): User[] {
	users.forEach(u => delete u['password']);
}

export type ExamGrade = {
	grade_id: string
	student_id: string,
	name: string,
	subject: string,
	grade: number,
	signed: boolean
}

// After a successful login, check this table to see where to redirect the user to
let redirectByUserType = {
	'alumno': '/alumnos',
	'administrador': '/administracion',
	'docente': '/docencia',
	'padre': '/padres'
}

export { redirectByUserType };