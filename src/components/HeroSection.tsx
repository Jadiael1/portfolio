'use client';
import { ArrowDown, Download, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import jadiaelProfile from '@/components/assets/jadiael-profile.png';
import Image from 'next/image';

const HeroSection = () => {
	const handleDownloadCV = () => {
		const link = document.createElement('a');
		link.href = '/assets/pdf/jadiael_cv.pdf';
		link.download = 'jadiael_cv.pdf';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handleViewProjects = () => {
		document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<section className='relative min-h-screen flex items-center justify-center overflow-hidden bg-dots'>
			{/* Animated Background Elements */}
			<div className='absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary/10'></div>

			{/* Floating geometric shapes */}
			<div className='absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full animate-scale-pulse'></div>
			<div
				className='absolute top-40 right-20 w-16 h-16 bg-primary-glow/30 rounded-lg rotate-45 animate-scale-pulse'
				style={{ animationDelay: '1s' }}
			></div>
			<div
				className='absolute bottom-40 left-20 w-12 h-12 bg-primary/30 rounded-full animate-scale-pulse'
				style={{ animationDelay: '2s' }}
			></div>

			<div className='relative z-10 max-w-5xl mx-auto px-6 text-center'>
				{/* Profile Image */}
				<div className='relative mb-8 inline-block'>
					<div className='relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary shadow-2xl animate-glow mx-auto'>
						<Image
							src={jadiaelProfile}
							alt='Jadiael Juvino - Engenheiro de Software'
							fill
							className='object-cover'
							priority
							placeholder='blur'
							sizes='(min-width: 768px) 16rem, 12rem'
						/>
					</div>

					{/* Badge flutuante */}
					<div className='absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg transition-all duration-300 animate-pulse'>
						🚀 Disponível
					</div>
				</div>

				{/* Main heading */}
				<h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in-up'>
					Engenheiro de
					<span className='gradient-text block md:inline md:ml-4'>Software</span>
				</h1>

				{/* Subtitle */}
				<p
					className='text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up'
					style={{ animationDelay: '0.2s' }}
				>
					Criando soluções inovadoras com <span className='text-primary font-semibold'>C#</span>,{' '}
					<span className='text-primary font-semibold'>JavaScript</span>,{' '}
					<span className='text-primary font-semibold'>NestJS</span> e muito mais em Pernambuco, Brasil 🇧🇷
				</p>

				{/* Description */}
				<p
					className='text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in-up'
					style={{ animationDelay: '0.4s' }}
				>
					Transformo ideias em código, focando em escalabilidade, performance e experiência do usuário. Sempre em busca
					de novos desafios e tecnologias emergentes.
				</p>

				{/* Action buttons */}
				<div
					className='flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up'
					style={{ animationDelay: '0.6s' }}
				>
					<Button
						onClick={handleDownloadCV}
						className='btn-hero-secondary group cursor-pointer'
						size='lg'
					>
						<Download className='mr-2 h-5 w-5 group-hover:animate-bounce' />
						Download CV
					</Button>
					<Button
						onClick={handleViewProjects}
						className='btn-hero-primary group cursor-pointer'
						size='lg'
					>
						<Code className='mr-2 h-5 w-5 group-hover:rotate-12 transition-transform' />
						Ver Projetos
					</Button>
				</div>

				{/* Scroll indicator */}
				<div className='animate-bounce transition-all duration-300'>
					<ArrowDown className='mx-auto h-8 w-8 text-primary/60' />
					<p className='text-sm text-muted-foreground mt-2'>Role para conhecer mais</p>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
