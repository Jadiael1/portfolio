'use client';
import { useEffect, useRef, useState } from 'react';
import { Server, Database, Code, Globe, Wrench, Layers, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Skill {
	icon: LucideIcon;
	title: string;
	description: string;
	technologies: string[];
	level: number;
}

const skills: Skill[] = [
	{
		icon: Server,
		title: 'Backend Development',
		description:
			'Desenvolvimento de aplicações robustas, manutenível, escaláveis com foco em performance e resultados.',
		technologies: ['C#', '.NET', 'PHP', 'NestJS', 'Node.js'],
		level: 98,
	},
	{
		icon: Database,
		title: 'Banco de Dados',
		description: 'Modelagem e administração de bancos, garantindo integridade e alto desempenho.',
		technologies: ['OracleDB', 'MariaDB', 'MySQL'],
		level: 85,
	},
	{
		icon: Code,
		title: 'PHP & Laravel',
		description: 'Desenvolvimento de aplicações web modernas e APIs RESTful com Laravel.',
		technologies: ['PHP', 'Laravel', 'Composer', 'Artisan'],
		level: 97,
	},
	{
		icon: Globe,
		title: 'WordPress & CMS',
		description: 'Criação e manutenção de sites dinâmicos com alto desempenho e SEO.',
		technologies: ['WordPress', 'Custom Themes', 'Custom Plugins', 'Plugins', 'WooCommerce'],
		level: 82,
	},
	{
		icon: Layers,
		title: 'Frontend Development',
		description: 'Interfaces responsivas e modernas com foco na experiência do usuário.',
		technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'React Native', 'Next'],
		level: 78,
	},
	{
		icon: Wrench,
		title: 'Ferramentas & DevOps',
		description: 'Gestão de projetos e ferramentas para otimização do fluxo de desenvolvimento.',
		technologies: ['Jira', 'Git', 'Docker', 'Linux'],
		level: 80,
	},
];

const SkillsSection = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const [visibleSkills, setVisibleSkills] = useState<boolean[]>(new Array(skills.length).fill(false));
	const [jsEnabled, setJsEnabled] = useState(false);

	useEffect(() => {
		setJsEnabled(true);
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const index = parseInt(entry.target.getAttribute('data-index') || '0');
						setVisibleSkills(prev => {
							const newState = [...prev];
							newState[index] = true;
							return newState;
						});
					}
				});
			},
			{ threshold: 0.2 },
		);

		const skillCards = sectionRef.current?.querySelectorAll('.skill-card-item');
		skillCards?.forEach(card => observer.observe(card));

		return () => observer.disconnect();
	}, []);

	return (
		<section
			id='habilidades'
			ref={sectionRef}
			className='py-20 bg-accent/20'
		>
			<div className='max-w-6xl mx-auto px-6'>
				{/* Section Header */}
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-6'>
						Habilidades & <span className='gradient-text'>Ferramentas</span>
					</h2>
					<div className='w-24 h-1 bg-primary mx-auto rounded-full mb-8'></div>
					<p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
						Tecnologias e ferramentas que utilizo para criar soluções inovadoras e eficientes
					</p>
				</div>

				{/* Skills Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{skills.map((skill, index) => (
						<div
							key={skill.title}
							data-index={index}
							className={`skill-card skill-card-item group cursor-pointer ${
								visibleSkills[index] || jsEnabled === false ? 'animate-fade-in-up' : 'opacity-0'
							}`}
							style={{ animationDelay: `${index * 0.1}s` }}
						>
							{/* Icon and Title */}
							<div className='flex items-center gap-4 mb-4'>
								<div className='p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors'>
									<skill.icon className='h-8 w-8 text-primary' />
								</div>
								<h3 className='text-xl font-bold text-foreground group-hover:text-primary transition-colors'>
									{skill.title}
								</h3>
							</div>

							{/* Description */}
							<p className='text-muted-foreground mb-4 leading-relaxed'>{skill.description}</p>

							{/* Progress Bar */}
							<div className='mb-4'>
								<div className='flex justify-between items-center mb-2'>
									<span className='text-sm font-medium text-foreground'>Proficiência</span>
									<span className='text-sm font-bold text-primary'>{skill.level}%</span>
								</div>
								<div className='w-full bg-muted rounded-full h-2'>
									<div
										className='bg-primary h-2 rounded-full transition-all duration-1000 ease-out'
										style={{
											width: visibleSkills[index] ? `${skill.level}%` : '0%',
											transitionDelay: `${index * 0.1 + 0.5}s`,
										}}
									></div>
								</div>
							</div>

							{/* Technologies */}
							<div className='space-y-2'>
								<div className='flex items-center gap-2 text-sm font-medium text-foreground'>
									<ChevronRight className='h-4 w-4 text-primary' />
									Tecnologias
								</div>
								<div className='flex flex-wrap gap-2'>
									{skill.technologies.map(tech => (
										<span
											key={tech}
											className='px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium border border-primary/20'
										>
											{tech}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Call to Action */}
				<div className='mt-16 text-center'>
					<div className='bg-card p-8 rounded-2xl shadow-lg border border-border max-w-3xl mx-auto'>
						<h3 className='text-2xl font-bold text-foreground mb-4'>Sempre Aprendendo</h3>
						<p className='text-lg text-muted-foreground mb-6'>
							A tecnologia evolui constantemente, e eu evoluo junto. Sempre explorando novas ferramentas, frameworks e
							metodologias para entregar as melhores soluções.
						</p>
						<div className='flex justify-center'>
							<div className='inline-flex items-center gap-2 text-primary font-medium'>
								<span>Em constante evolução</span>
								<div className='w-2 h-2 bg-primary rounded-full animate-pulse'></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SkillsSection;
