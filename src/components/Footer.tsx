'use client';
import { Heart, ArrowUp, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Github from '@/components/assets/svgs/Github';
import Linkedin from '@/components/assets/svgs/Linkedin';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import Link from 'next/link';

const Footer = () => {
	const [showBackToTop, setShowBackToTop] = useState(false);
	const [currentYear, setCurrentYear] = useState(2024);

	useEffect(() => {
		const handleScroll = () => {
			setShowBackToTop(window.scrollY > 400);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		setCurrentYear(new Date().getFullYear());
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const quickLinks = [
		{ href: '#sobre', label: 'Sobre' },
		{ href: '#habilidades', label: 'Habilidades' },
		{ href: '#projetos', label: 'Projetos' },
		{ href: '#contato', label: 'Contato' },
	];

	const socialLinks = [
		{
			icon: Github,
			href: 'https://github.com/Jadiael1',
			label: 'GitHub',
			color: 'hover:text-gray-400',
		},
		{
			icon: Linkedin,
			href: 'https://www.linkedin.com/in/jadiael/',
			label: 'LinkedIn',
			color: 'hover:text-blue-400',
		},
		{
			icon: Mail,
			href: 'mailto:jadiael1@gmail.com',
			label: 'Email',
			color: 'hover:text-red-400',
		},
		{
			icon: Phone,
			href: 'https://api.whatsapp.com/send/?phone=%2B5581995207789&text=Olá!%20Estou%20entrando%20em%20contato%20através%20do%20seu%20portfólio',
			label: 'WhatsApp',
			color: 'hover:text-green-400',
		},
	];

	return (
		<>
			<footer className='relative bg-hero-bg text-hero-text overflow-hidden'>
				{/* Background pattern */}
				<div className='absolute inset-0 bg-dots opacity-10'></div>

				<div className='relative z-10 max-w-6xl mx-auto px-6 py-16'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
						{/* About Section */}
						<div className='space-y-6'>
							<div>
								<h3 className='text-2xl font-bold mb-4 gradient-text'>Jadiael Juvino</h3>
								<p className='text-hero-text/80 leading-relaxed'>
									Engenheiro de Software apaixonado por tecnologia, sempre em busca de soluções inovadoras e crescimento
									pessoal.
								</p>
							</div>

							{/* Social Links */}
							<div>
								<h4 className='font-semibold mb-3 text-hero-text'>Conecte-se</h4>
								<div className='flex gap-3'>
									{socialLinks.map(social => (
										<Link
											key={social.label}
											href={social.href}
											target='_blank'
											rel='noopener noreferrer'
											className={`p-3 bg-hero-text/10 rounded-lg ${social.color} transition-all hover:scale-110 hover:bg-hero-text/20`}
											aria-label={social.label}
										>
											<social.icon className='h-5 w-5' />
										</Link>
									))}
								</div>
							</div>
						</div>

						{/* Quick Links */}
						<div>
							<h3 className='text-xl font-bold text-hero-text mb-6'>Links Rápidos</h3>
							<ul className='space-y-3'>
								{quickLinks.map(link => (
									<li key={link.href}>
										<Link
											href={link.href}
											className='text-hero-text/80 hover:text-hero-text hover:translate-x-2 transition-all duration-300 inline-block'
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Contact Info */}
						<div>
							<h3 className='text-xl font-bold text-hero-text mb-6'>Vamos Conversar?</h3>
							<div className='space-y-4'>
								<p className='text-hero-text/80'>Quer conversar sobre um projeto ou oportunidade?</p>

								<div className='space-y-3'>
									<Link
										href='https://api.whatsapp.com/send/?phone=%2B5581995207789&text=Estou%20entrando%20em%20contato%20a%20partir%20do%20seu%20portifolio'
										target='_blank'
										rel='noopener noreferrer'
										className='flex items-center gap-3 text-hero-text/80 hover:text-hero-text transition-colors group'
									>
										<Phone className='h-5 w-5 group-hover:scale-110 transition-transform' />
										<span>WhatsApp</span>
									</Link>

									<Link
										href='mailto:jadiael1@gmail.com'
										className='flex items-center gap-3 text-hero-text/80 hover:text-hero-text transition-colors group'
									>
										<Mail className='h-5 w-5 group-hover:scale-110 transition-transform' />
										<span>jadiael1@gmail.com</span>
									</Link>
								</div>

								<div className='pt-4'>
									<Button
										asChild
										className='bg-primary hover:bg-primary-glow text-secondary border-2 border-primary hover:border-primary-glow transition-all'
									>
										<Link
											href='#contato'
											className='inline-flex items-center gap-2'
										>
											<Mail className='h-4 w-4' />
											Enviar Mensagem
										</Link>
									</Button>
								</div>
							</div>
						</div>
					</div>

					{/* Bottom Section */}
					<div className='mt-16 pt-8 border-t border-hero-text/20'>
						<div className='flex flex-col md:flex-row justify-between items-center gap-4'>
							<p className='text-hero-text/80 text-center md:text-left'>
								© <span suppressHydrationWarning>{currentYear}</span>{' '}
								<span className='font-semibold text-hero-text'>Jadiael Juvino</span>. Feito com{' '}
								<Heart className='inline h-4 w-4 text-red-400 mx-1' /> e muita{' '}
								<span className='text-primary font-semibold'>dedicação</span>.
							</p>

							<div className='text-hero-text/60 text-sm'>Pernambuco, Brasil 🇧🇷</div>
						</div>
					</div>
				</div>
			</footer>

			{/* Back to Top Button */}
			{showBackToTop && (
				<Button
					onClick={scrollToTop}
					className='fixed bottom-25 right-8 z-50 w-12 h-12 rounded-full bg-primary hover:bg-primary-glow text-secondary shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce cursor-pointer'
					aria-label='Voltar ao topo'
				>
					<ArrowUp className='h-6 w-6' />
				</Button>
			)}
			<WhatsAppWidget />
		</>
	);
};

export default Footer;
