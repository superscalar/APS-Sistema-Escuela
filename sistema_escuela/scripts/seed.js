const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');
const seed_data = require('./seed_data.js');

async function createDB(client) {
	console.log("--------------------------------");
	console.log("Creating schema...");
	await client.sql`CREATE SCHEMA IF NOT EXISTS escuela;`;

	console.log("Creating users enum...");
	await client.sql`CREATE TYPE usertype AS ENUM ('administrador', 'padre', 'alumno', 'docente')`;
	
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
		type USERTYPE
		username TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL
	);`;
	console.log("Admin users created");
	console.log("--------------------------------");
	
	// const adminID = "e34dbb81-8aac-41b5-805a-d6441de49a86";
	const adminName = "administrador";
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash('administrador', saltRounds);
	
	console.log("Creating an admin account");
	await client.sql`INSERT INTO escuela.usuarios (type, username, password) VALUES ('administrador', ${adminEmail}, ${hashedPassword}) ON CONFLICT (id) DO NOTHING;`;
	console.log("Admin account created");
	console.log("--------------------------------");
	console.log("\n");
}

// Create User (Alta)
async function createUser(client, type, username, password) {
    console.log("Creating a new user...");
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await client.sql`INSERT INTO escuela.usuarios (type, username, password) VALUES (${type}, ${username}, ${hashedPassword}) ON CONFLICT (username) DO NOTHING;`;
    console.log("User created");
}

// Delete User (Baja)
async function deleteUser(client, userId) {
    console.log("Deleting user...");
    await client.sql`DELETE FROM escuela.usuarios WHERE id = ${userId};`;
    console.log("User deleted");
}

// Update User (Modificación)
async function updateUserType(client, userId, newType){
	console.log("Updating user type...");
	await client.sql`UPDATE escuela.usuarios SET type = ${newType} WHERE id = ${userId};`;
	console.log("User type updated");
}

async function updateUsername(client, userId, newUsername){
	console.log("Updating username...");
	await client.sql`UPDATE escuela.usuarios SET username = ${newUsername} WHERE id = ${userId} ON CONFLICT (username) DO NOTHING;`;
	console.log("Username updated");
}

async function updatePassword(client, userId, newPassword){
	console.log("Updating password...");
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
	await client.sql`UPDATE escuela.usuarios SET password = ${hashedPassword} WHERE id = ${userId};`;
	console.log("Password updated");
}

async function insertUsers(client) {
	console.log("--------------------------------");
	console.log("Inserting users");
  
	for (const user of seed_data.users) {
	  const hashedPassword = await bcrypt.hash(user.password, 10);
	  await client.sql`
		INSERT INTO escuela.usuarios (type, username, password)
		VALUES (${user.type}, ${user.username}, ${hashedPassword});
	  `;
	}
  
	console.log("Users inserted");
	client.release();
  }

/*
async function createProducts(client) {	
	console.log("--------------------------------");
	console.log("Creating products table...");
	await client.sql`CREATE TABLE IF NOT EXISTS tienda.catalogo (
		id integer NOT NULL DEFAULT nextval('tienda.serial_id'),
		name text DEFAULT 'Producto'::text,
		description text DEFAULT 'Una descripcion elocuente y util para el usuario'::text,
		category text DEFAULT 'Misc.'::text,
		price integer DEFAULT 0,
		discount real default 0.0,
		rating real DEFAULT 0.0,
		image text DEFAULT '/products/placeholder.png'::text,
		created_at timestamp with time zone DEFAULT NOW(),
		modified_at timestamp with time zone DEFAULT NOW(),
		CONSTRAINT catalogo_pk PRIMARY KEY (id)
	);`;
	console.log("Created products table");
	console.log("--------------------------------");
	console.log("Inserting placeholder products...");
	await Promise.all(
		productos.map(p => 
			client.sql`INSERT INTO tienda.catalogo
				(name, description, category, price, discount, rating, image) VALUES
				(${p.name}, ${p.description},
					${p.category}, ${p.price}, ${p.discount}, ${p.rating},
					${p.image}) ON CONFLICT (id) DO NOTHING;`	)
	);	
	console.log("Placeholder products inserted");
	console.log("--------------------------------");
	console.log("\n");
}

async function createDeletedProductsTable(client) {
	console.log("--------------------------------");
	console.log("Creating deleted products table...");
	await client.sql`CREATE TABLE IF NOT EXISTS tienda.deleted_products (LIKE tienda.catalogo)`;
	console.log("Created deleted products table");
	
	console.log("--------------------------------");
	
	console.log("Creating stored procedures...");
	await client.sql`CREATE OR REPLACE PROCEDURE tienda.DeleteProduct(_id integer)
		LANGUAGE plpgsql as $$
		BEGIN
			WITH moved_rows AS (
				DELETE FROM tienda.catalogo WHERE tienda.catalogo.id = _id RETURNING *
			) INSERT INTO tienda.deleted_products SELECT * FROM moved_rows;
		END; $$`;

	await client.sql`CREATE OR REPLACE PROCEDURE tienda.RestoreProduct(_id integer)
		LANGUAGE plpgsql as $$
		BEGIN
			WITH moved_rows AS (
				DELETE FROM tienda.deleted_products WHERE tienda.deleted_products.id = _id RETURNING *
			) INSERT INTO tienda.catalogo SELECT * FROM moved_rows;
		END; $$`;
	console.log("Created stored procedures");
	console.log("--------------------------------");
	console.log("\n");
}

async function createPaymentRecordsTable(client) {
	console.log("--------------------------------");
	console.log("Creating payment records table...");
	await client.sql`CREATE TABLE IF NOT EXISTS tienda.mercadopago_records (
		id serial,
		paymentId text,
		amount integer,
		status text,
		timestamp timestamp
	)`;
	console.log("Created payment records table");
	console.log("--------------------------------");	
}

async function createComments(client) {
	console.log("--------------------------------");
	console.log("Creating comments table");
	await client.sql`CREATE TABLE IF NOT EXISTS tienda.comments (
		id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
		related_product_id integer NOT NULL,
		name text DEFAULT 'Anonymous'::text,
		rating real DEFAULT 0,
		content text DEFAULT ''::text
	);`;
	console.log("Comments table created");
	console.log("--------------------------------");
}
*/

const main = async () => {
	const client = await db.connect();

	await createDB(client);
	await createAdministrators(client);
	await insertUsers(client);
	/*
	await createProducts(client);
	await createDeletedProductsTable(client);
	await createPaymentRecordsTable(client);
	await createComments(client);
	*/
	
	await client.end(() => {console.log("Closing connection...");});
}

main().catch( (err) => {
	console.error(err);
});