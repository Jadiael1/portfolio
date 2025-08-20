'use client';
import { ReactNode, useEffect, useState } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

type TNewThemeProps = 'light' | 'dark' | 'system';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<TNewThemeProps>('system');
	useEffect(() => {
		const themeStorage = localStorage.getItem('theme-intent');
		const newThemeStorage = themeStorage || 'system';
		setTheme(newThemeStorage as TNewThemeProps);
	}, []);
	const handleThemeChange = (newTheme: TNewThemeProps) => {
		setTheme(newTheme);
		const html = document.documentElement;
		const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const resolvedThemeSystem = newTheme === 'system' ? (isDarkMode ? 'dark' : 'light') : newTheme;
		const resolvedTheme = newTheme === 'system' ? resolvedThemeSystem : newTheme;
		html.setAttribute('data-theme', resolvedTheme);
		html.setAttribute('data-theme-intent', newTheme);
		localStorage.setItem('theme-intent', newTheme);
	};
	return <ThemeContext.Provider value={{ handleThemeChange, theme }}>{children}</ThemeContext.Provider>;
};
