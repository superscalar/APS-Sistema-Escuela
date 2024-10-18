export type UserType = 'alumno' | 'docente' | 'padre' | 'administrador';

// We receive this type from the database
export type DatabaseUser = {
	id: string,
	user_type: UserType,
	username: string,
	password: string
}

// We don't want the bcrypt password to go around in the client side
export type User = Omit<DatabaseUser, 'password'>;

// After a successful login, check this table to see where to redirect the user to
let redirectByUserType = {
	'alumno': '/alumnos',
	'administrador': '/administracion',
	'docente': '/docencia',
	'padre': '/padres'
}

export { redirectByUserType };