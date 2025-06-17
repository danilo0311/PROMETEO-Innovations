import { defineRouting, Pathnames } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'es'] as const;

export const pathnames: Pathnames<typeof locales> = {
	'/': {
		en: '/',
		es: '/',
	},
} satisfies Pathnames<typeof locales>;

export const routing = defineRouting({
	locales,
	defaultLocale: 'es',
	localePrefix: {
		mode: 'always',
		prefixes: {
			en: '/en',
			es: '/es',
		},
	},
	pathnames,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
	createNavigation(routing);
