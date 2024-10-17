import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { Header } from '@/app/components/header.tsx';

export default function RootLayout({children}: {children: React.ReactNode; }) {
	return (
		<html lang="en" className="min-h-screen">
			<body className={"min-h-screen flex flex-col justify-between bg-base-100 " + inter.className}>
				<Header />

				<main className="grow">
					{children}
				</main>

				<footer className="footer-center">
					<h6>Escuela X - Sistema interno</h6>
				</footer>
			</body>
		</html>
	);
}
