import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { CookiesProvider } from 'next-client-cookies/server';
import { Header } from '@/app/components/header';

export default function RootLayout({children}: {children: React.ReactNode; }) {
	return (
		<html lang="en" className="min-h-screen">
			<body className={"min-h-screen flex flex-col justify-between bg-base-100 " + inter.className}>
				<Header />

				<main className="grow">
					{/*<CookiesProvider>{children}</CookiesProvider>*/}
					{children}
				</main>

				<footer className="footer-center">
					<h6>Escuela X - Sistema interno</h6>
				</footer>
			</body>
		</html>
	);
}
