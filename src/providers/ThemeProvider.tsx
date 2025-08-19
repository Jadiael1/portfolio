'use client';
import { ReactNode, useEffect, useState } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

type TNewThemeProps = 'light' | 'dark' | 'system';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<TNewThemeProps>('system');

	useEffect(() => {
		const themeStorage = localStorage.getItem('theme-intent');
		const html = document.documentElement;
		const dataThemeValue = html.getAttribute('data-theme');
		const themeValue = html.getAttribute('data-theme-intent');
		if (!themeStorage) {
			localStorage.setItem('theme-intent', 'system');
		}
		if (!html.hasAttribute('data-theme') || !dataThemeValue) {
			html.setAttribute('data-theme', 'system');
		}
		if (!html.hasAttribute('data-theme-intent') || !themeValue) {
			html.setAttribute('data-theme-intent', 'system');
		}

		const newThemeStorage = themeStorage === null || themeStorage === '' ? 'system' : themeStorage;
		if (newThemeStorage) {
			if (newThemeStorage === 'system') {
				const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
				if (isDarkMode) {
					html.setAttribute('data-theme', 'dark');
					html.setAttribute('data-theme-intent', newThemeStorage);
				} else {
					html.setAttribute('data-theme', 'light');
					html.setAttribute('data-theme-intent', newThemeStorage);
				}
				return;
			}
			html.setAttribute('data-theme', newThemeStorage!);
			html.setAttribute('data-theme-intent', newThemeStorage!);
			setTheme(newThemeStorage as TNewThemeProps);
		}
	}, []);

	const handleThemeChange = (newTheme: TNewThemeProps) => {
		setTheme(newTheme);
		const html = document.documentElement;
		if (newTheme === 'system') {
			const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
			if (isDarkMode) {
				html.setAttribute('data-theme', 'dark');
				html.setAttribute('data-theme-intent', newTheme);
			} else {
				html.setAttribute('data-theme', 'light');
				html.setAttribute('data-theme-intent', newTheme);
			}
			localStorage.setItem('theme-intent', newTheme);
			return;
		}
		html.setAttribute('data-theme', newTheme);
		html.setAttribute('data-theme-intent', newTheme);
		localStorage.setItem('theme-intent', newTheme);
	};

	return <ThemeContext.Provider value={{ handleThemeChange, theme }}>{children}</ThemeContext.Provider>;
};
