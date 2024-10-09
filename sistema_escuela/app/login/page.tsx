import { Header } from '@/components/header'

export default function Page() {
	return ( <section style={{maxWidth: "400px"}}>
			<h2>Inicio de sesión</h2>
			<form action="">
				<fieldset>
					<legend>Nombre de usuario</legend>
					<label style={{display: "none"}} htmlFor="username">Nombre de usuario</label>
					<input type="text" name="username" placeholder="..." id="usernameInput" />
					
				</fieldset>

				<fieldset>
					<legend>Contraseña</legend>
					<label style={{display: "none"}} htmlFor="password">Contraseña</label>
					<input type="password" name="password" placeholder="********" id="passwordInput" />
				</fieldset>

				<input style={{ marginTop: "1rem" }} type="submit" value="Iniciar sesión" />
			</form>
		</section> );
}
