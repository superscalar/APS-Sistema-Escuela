import { CookiesProvider } from 'next-client-cookies/server';
export default function Layout({ children }: { children: React.ReactNode }) {
	return (<CookiesProvider> {children} </CookiesProvider>);
}