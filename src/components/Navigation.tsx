'use client';
import { useState, useEffect, useRef } from 'react';
import { Menu, Monitor, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

type TNewThemeProps = 'light' | 'dark' | 'system';
const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
	const themeMenuRef = useRef<HTMLDivElement>(null);

	const { handleThemeChange, theme } = useTheme();

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
				setIsThemeMenuOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const navItems = [
		{ href: '#sobre', label: 'Sobre' },
		{ href: '#habilidades', label: 'Habilidades' },
		{ href: '#projetos', label: 'Projetos' },
		{ href: '#blog', label: 'Blog' },
		{ href: '#contato', label: 'Contato' },
	];

	const themeOptions = [
		{ value: 'light', label: 'Claro', icon: Sun },
		{ value: 'dark', label: 'Escuro', icon: Moon },
		{ value: 'system', label: 'Sistema', icon: Monitor },
	];

	const ActiveThemeIcon = ({ size = 24 }: { size?: number }) => {
		switch (theme) {
			case 'light':
				return <Sun size={size} />;
			case 'dark':
				return <Moon size={size} />;
			case 'system':
				return <Monitor size={size} />;
			default:
				return <Moon size={size} />;
		}
	};

	const myHandleThemeChange = (newTheme: TNewThemeProps) => {
		setIsThemeMenuOpen(false);
		handleThemeChange(newTheme);
	};

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled ? 'bg-card/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
			}`}
		>
			<div className='max-w-6xl mx-auto px-6 py-4'>
				<div className='flex justify-between items-center'>
					{/* Logo */}
					<div className='text-2xl md:text-3xl font-bold tracking-tight'>
						<span className='gradient-text cursor-pointer select-none'>JADIAEL</span>
						<span className='text-foreground'> JUVINO</span>
					</div>

					{/* Desktop Navigation */}
					<div className='hidden md:flex items-center gap-8'>
						<ul className='flex gap-8 text-lg font-medium'>
							{navItems.map(item => (
								<li key={item.href}>
									<a
										href={item.href}
										className='text-foreground hover:text-primary transition-colors relative group'
									>
										{item.label}
										<span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full'></span>
									</a>
								</li>
							))}
						</ul>

						{/* Seletor de Tema Desktop */}
						<div
							className='relative'
							ref={themeMenuRef}
						>
							<button
								onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
								className='text-foreground hover:text-primary transition-colors cursor-pointer'
								aria-label='Alterar tema'
							>
								<ActiveThemeIcon size={22} />
							</button>
							{isThemeMenuOpen && (
								<div className='absolute top-full right-0 mt-3 w-40 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-10'>
									<ul>
										{themeOptions.map(option => (
											<li key={option.value}>
												<button
													onClick={() => myHandleThemeChange(option.value as TNewThemeProps)}
													className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
														theme === option.value ? 'text-primary bg-accent' : 'text-foreground hover:bg-accent/50'
													}`}
												>
													<option.icon className='w-4 h-4' />
													{option.label}
												</button>
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</div>

					{/* Mobile Menu Button */}
					<button
						className='md:hidden text-2xl text-foreground hover:text-primary transition-colors cursor-pointer'
						onClick={() => setIsOpen(!isOpen)}
						aria-label='Toggle menu'
					>
						{isOpen ? <X /> : <Menu />}
					</button>
				</div>

				{/* Mobile Navigation */}
				{isOpen && (
					<div className='md:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-lg shadow-lg'>
						<ul className='py-4 space-y-2'>
							{navItems.map(item => (
								<li key={item.href}>
									<a
										href={item.href}
										className='block px-6 py-3 text-lg font-medium text-foreground hover:text-primary hover:bg-accent/50 transition-colors'
										onClick={() => setIsOpen(false)}
									>
										{item.label}
									</a>
								</li>
							))}

							{/* Divisor e Seletor de Tema Mobile */}
							<li className='px-6 pt-4 pb-2'>
								<div className='border-t border-border/50'></div>
							</li>
							<li className='px-6 text-sm text-muted-foreground mb-2'>Tema</li>
							{themeOptions.map(option => (
								<li key={`mobile-${option.value}`}>
									<button
										onClick={() => handleThemeChange(option.value as TNewThemeProps)}
										className={`w-full flex items-center gap-3 px-6 py-3 text-lg font-medium transition-colors cursor-pointer ${
											theme === option.value
												? 'text-primary bg-accent/50'
												: 'text-foreground hover:text-primary hover:bg-accent/50'
										}`}
									>
										<option.icon className='w-5 h-5' />
										{option.label}
									</button>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navigation;
