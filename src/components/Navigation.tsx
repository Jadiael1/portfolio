'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const navItems = [
		{ href: '#sobre', label: 'Sobre' },
		{ href: '#habilidades', label: 'Habilidades' },
		{ href: '#projetos', label: 'Projetos' },
		{ href: '#blog', label: 'Blog' },
		{ href: '#contato', label: 'Contato' },
	];

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
					<ul className='hidden md:flex gap-8 text-lg font-medium'>
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
						</ul>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navigation;
