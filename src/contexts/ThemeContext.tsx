'use client';
import { createContext } from 'react';

type TNewThemeProps = 'light' | 'dark' | 'system';

type TThemeContextProps = {
	handleThemeChange: (newTheme: TNewThemeProps) => void;
	theme: TNewThemeProps;
};

export const ThemeContext = createContext<TThemeContextProps>({
	handleThemeChange: () => {},
	theme: 'system',
});
