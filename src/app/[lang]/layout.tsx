import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/assets/globals.css';
import { NextIntlClientProvider } from 'next-intl';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Prometeo Innova',
	description: 'Technical test for Prometeo Innova',
};

export default async function RootLayout(props: {
	children: React.ReactNode;
	params: Promise<{ lang: string }>;
}) {
	const { params, children } = props;
	const { lang } = await params;

	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<NextIntlClientProvider locale={lang} timeZone='Europe/Madrid'>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
