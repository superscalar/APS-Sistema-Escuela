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
		INSERT INTO escuela.usuarios (user_type, username, password)
		VALUES (${user.type}, ${user.username}, ${hashedPassword});
	  `;
	}
  
	console.log("Users inserted");
	client.release();
  }


const main = async () => {
	const client = await db.connect();
	console.log(client);

	await createDB(client);
	await createUsersTable(client);
	await insertUsers(client);
	
	await client.end(() => {console.log("Closing connection...");});
}

main().catch( (err) => {
	console.error(err);
});