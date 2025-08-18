'use client';
import { useEffect, useRef } from 'react';
import { MapPin, Heart, Code2 } from 'lucide-react';

const AboutSection = () => {
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-fade-in-up');
					}
				});
			},
			{ threshold: 0.1 },
		);

		const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
		elements?.forEach(el => observer.observe(el));

		return () => observer.disconnect();
	}, []);

	return (
		<section
			id='sobre'
			ref={sectionRef}
			className='py-20 px-6'
		>
			<div className='max-w-5xl mx-auto'>
				{/* Section Header */}
				<div className='text-center mb-16 animate-on-scroll'>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-6'>
						Sobre <span className='gradient-text'>Mim</span>
					</h2>
					<div className='w-24 h-1 bg-primary mx-auto rounded-full mb-8'></div>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
					{/* Text Content */}
					<div className='space-y-6'>
						<div className='animate-on-scroll'>
							<h3 className='text-2xl font-bold text-foreground mb-4 flex items-center gap-3'>
								<Code2 className='h-8 w-8 text-primary' />
								Minha Jornada
							</h3>
							<p className='text-lg text-muted-foreground leading-relaxed'>
								Sou um engenheiro de software apaixonado por criar soluções que fazem a diferença. Minha jornada na
								tecnologia começou em 2015 e evoluiu para uma carreira dedicada à excelência técnica, resultado e
								inovação constante.
							</p>
						</div>

						<div
							className='animate-on-scroll'
							style={{ animationDelay: '0.2s' }}
						>
							<p className='text-lg text-muted-foreground leading-relaxed'>
								Sempre busco aprimorar meus conhecimentos, seja desenvolvendo soluções em{' '}
								<span className='text-primary font-semibold'>C#</span>, criando aplicações{' '}
								<span className='text-primary font-semibold'>Node.js/NestJS</span>, desenvolvendo em{' '}
								<span className='text-primary font-semibold'>PHP/Laravel</span>, ou administrando bancos de dados como{' '}
								<span className='text-primary font-semibold'>MariaDB</span> e{' '}
								<span className='text-primary font-semibold'>Oracle</span>, ou administrando Servidores.
							</p>
						</div>

						<div
							className='animate-on-scroll'
							style={{ animationDelay: '0.4s' }}
						>
							<p className='text-lg text-muted-foreground leading-relaxed'>
								Meu foco está na eficiência, escalabilidade, manutenibilidade e performance dos
								projetos, sempre com preocupação constante com a experiência do usuário e resultados.
							</p>
						</div>
					</div>

					{/* Stats & Info Cards */}
					<div className='space-y-6'>
						<div className='animate-on-scroll'>
							<div className='skill-card'>
								<div className='flex items-center gap-4 mb-4'>
									<MapPin className='h-8 w-8 text-primary' />
									<div>
										<h4 className='text-xl font-bold text-foreground'>Localização</h4>
										<p className='text-muted-foreground'>Palmares, Pernambuco, Brasil 🇧🇷</p>
									</div>
								</div>
							</div>
						</div>

						<div
							className='animate-on-scroll'
							style={{ animationDelay: '0.2s' }}
						>
							<div className='skill-card'>
								<div className='flex items-center gap-4 mb-4'>
									<Heart className='h-8 w-8 text-primary' />
									<div>
										<h4 className='text-xl font-bold text-foreground'>Paixões</h4>
										<p className='text-muted-foreground'>Tecnologia, Aprendizado Contínuo, Inovação</p>
									</div>
								</div>
							</div>
						</div>

						<div
							className='animate-on-scroll'
							style={{ animationDelay: '0.4s' }}
						>
							<div className='skill-card bg-primary/5 border-primary/20'>
								<h4 className='text-xl font-bold text-foreground mb-3'>Motivação Diária</h4>
								<p className='text-muted-foreground italic'>
									&quot;Evolução contínua, tanto profissional quanto pessoal. Cada linha de código é uma oportunidade de
									criar algo extraordinário.&quot;
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Personal Touch */}
				<div
					className='mt-16 text-center animate-on-scroll'
					style={{ animationDelay: '0.6s' }}
				>
					<div className='bg-accent/30 rounded-2xl p-8 border border-accent'>
						<p className='text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto'>
							Fora do trabalho, dedico tempo aos meus hobbies e estudo novas tendências de tecnologia. Acredito que a
							tecnologia tem o poder de transformar vidas e estou sempre buscando maneiras de contribuir para essa
							transformação.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutSection;
