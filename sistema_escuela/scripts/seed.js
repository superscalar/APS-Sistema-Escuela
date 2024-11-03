const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');
const seed_data = require('./seed_data.js');

async function createDB(client) {
	console.log("--------------------------------");
	console.log("Creating schema...");
	await client.sql`CREATE SCHEMA IF NOT EXISTS escuela;`;

	console.log("Creating users enum...");
	// await client.sql`CREATE TYPE IF NOT EXISTS usertype AS ENUM ('administrador', 'padre', 'alumno', 'docente') `;
	await client.sql`
		DO $$
		BEGIN
			IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'usertype') THEN
				CREATE TYPE usertype AS ENUM ('administrador', 'padre', 'alumno', 'docente');
			END IF;
		END
		$$;
	`;
	
	console.log("Creating sanction type enum...");
	await client.sql`
		DO $$
		BEGIN
			IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'sanctiontype') THEN
				CREATE TYPE sanctiontype AS ENUM ('sancion', 'amonestacion');
			END IF;
		END
		$$;
	`;
	
	console.log("Creating UUID extension...");
	await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
	
	console.log("--------------------------------");
	console.log("\n");
}

async function createUsersTable(client) {
	console.log("--------------------------------");
	console.log("Creating users table");
	await client.sql`CREATE TABLE IF NOT EXISTS escuela.usuarios (
		id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
		user_type USERTYPE,
		name TEXT NOT NULL,
		username TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL
	);`;
	console.log("Users table created");
	console.log("--------------------------------");
}

async function insertUsers(client) {
	console.log("--------------------------------");
	console.log("Inserting users");
  
	for (const user of seed_data.users) {
	  const hashedPassword = await bcrypt.hash(user.password, 10);
	  await client.sql`
		INSERT INTO escuela.usuarios (id, user_type, name, username, password)
		VALUES (${user.UUID}, ${user.type}, ${user.name}, ${user.username}, ${hashedPassword});
	  `;
	}
  
	console.log("Users inserted");
  }

async function createGradesTable(client) {
	console.log("--------------------------------");
	console.log("Creating grades table");
	await client.sql`CREATE TABLE IF NOT EXISTS escuela.calificaciones (
		id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
		student_id UUID NOT NULL,
		subject TEXT NOT NULL,
		grade NUMERIC(4,1) NOT NULL,
		signed BOOLEAN,
		FOREIGN KEY (student_id) REFERENCES escuela.usuarios(id)
	);`;
	console.log("Grades table created");
	console.log("--------------------------------");
}

async function insertGrades(client) {
	console.log("--------------------------------");
	console.log("Inserting grades");
  
	for (const grade of seed_data.grades) {
	  await client.sql`
		INSERT INTO escuela.calificaciones (student_id, subject, grade, signed)
	VALUES (${grade.student_id}, ${grade.subject}, ${grade.grade}, ${grade.signed});
	  `;
	}
  
	console.log("Grades inserted");
}

async function createAmonestacionesTable(client) {
	console.log("--------------------------------");
	console.log("Creating amonestaciones table");
	await client.sql`CREATE TABLE IF NOT EXISTS escuela.amonestaciones (
		id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
		type SANCTIONTYPE,
		student_id UUID NOT NULL,
		sanctioner_id UUID NOT NULL,
		reason TEXT NOT NULL,
		date_issued TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
		signed BOOLEAN DEFAULT FALSE,
		FOREIGN KEY (student_id) REFERENCES escuela.usuarios(id),
		FOREIGN KEY (sanctioner_id) REFERENCES escuela.usuarios(id)
	);`;
	console.log("Amonestaciones table created");
	console.log("--------------------------------");
}

async function createParentChildtable(client) {
	/*
	// PARENTCHILDRELATIONSHIP = 'biologico' | 'apoderado' (?)
	
	await client.sql`CREATE TABLE IF NOT EXISTS escuela.parentchild (
		parent_id UUID NOT NULL,
		student_id UUID NOT NULL,
		type PARENTCHILDRELATIONSHIP DEFAULT 'biologico',
		FOREIGN KEY (student_id ) REFERENCES escuela.usuarios(id),
		FOREIGN KEY (student_id) REFERENCES escuela.usuarios(id)
	);`; */
	
	await client.sql`CREATE TABLE IF NOT EXISTS escuela.parentchild (
		parent_id UUID NOT NULL,
		student_id UUID NOT NULL,
		FOREIGN KEY (student_id ) REFERENCES escuela.usuarios(id),
		FOREIGN KEY (student_id) REFERENCES escuela.usuarios(id)
	);`;
}

const main = async () => {
	const client = await db.connect();
	// console.log(client);
	
	// later, set "on conflict do nothing" on the inserts
	// await client.sql`drop schema escuela cascade`;

	await createDB(client);

	await createUsersTable(client);
	await insertUsers(client);

	await createGradesTable(client);
	await insertGrades(client);
	
	await createAmonestacionesTable(client);
	await createParentChildtable(client);
	
	await client.end(() => {console.log("Closing connection...");});
}

main().catch( (err) => {
	console.error(err);
});