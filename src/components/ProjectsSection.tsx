'use client';
import { useEffect, useState, useRef } from 'react';
import { ExternalLink, Star, GitFork } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Github from '@/components/assets/svgs/Github';

interface Repository {
	id: number;
	name: string;
	description: string;
	html_url: string;
	homepage: string;
	language: string;
	stargazers_count: number;
	forks_count: number;
	watchers_count: number;
	topics: string[];
	updated_at: string;
}

const ProjectsSection = () => {
	const [repos, setRepos] = useState<Repository[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const fetchRepos = async () => {
			try {
				const response = await fetch('https://api.github.com/users/Jadiael1/repos?sort=updated&per_page=6', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						accept: 'application/json',
					},
					next: { tags: ['github-repos'], revalidate: 18000 },
				});
				if (!response.ok) throw new Error('Failed to fetch repositories');
				const data = await response.json();

				// Filter out forks and empty repos, prioritize repos with descriptions
				const filteredRepos = data
					.filter((repo: Repository) => !repo.name.includes('fork') && repo.description)
					.slice(0, 6);

				setRepos(filteredRepos);
			} catch (err) {
				setError('Erro ao carregar projetos do GitHub');
				console.error('Error fetching repos:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchRepos();

		// Intersection Observer for animations
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

	const getLanguageColor = (language: string) => {
		const colors: { [key: string]: string } = {
			JavaScript: '#f1e05a',
			TypeScript: '#2b7489',
			Python: '#3572A5',
			Java: '#b07219',
			'C#': '#239120',
			PHP: '#4F5D95',
			HTML: '#e34c26',
			CSS: '#1572B6',
			Vue: '#4FC08D',
			React: '#61dafb',
		};
		return colors[language] || '#6b7280';
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('pt-BR', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	if (loading) {
		return (
			<section
				id='projetos'
				className='py-20 px-6'
			>
				<div className='max-w-6xl mx-auto'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-6'>
							Projetos em <span className='gradient-text'>Destaque</span>
						</h2>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{[...Array(6)].map((_, index) => (
							<div
								key={index}
								className='project-card animate-pulse'
							>
								<div className='h-32 bg-muted rounded-t-xl'></div>
								<div className='p-6 space-y-3'>
									<div className='h-6 bg-muted rounded'></div>
									<div className='h-4 bg-muted rounded w-3/4'></div>
									<div className='h-4 bg-muted rounded w-1/2'></div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section
				id='projetos'
				className='py-20 px-6'
			>
				<div className='max-w-6xl mx-auto text-center'>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-6'>
						Projetos em <span className='gradient-text'>Destaque</span>
					</h2>
					<div className='bg-destructive/10 border border-destructive/20 rounded-lg p-8'>
						<p className='text-destructive text-lg'>{error}</p>
						<Button
							onClick={() => window.location.reload()}
							className='mt-4'
							variant='outline'
						>
							Tentar Novamente
						</Button>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section
			id='projetos'
			ref={sectionRef}
			className='py-20 px-6'
		>
			<div className='max-w-6xl mx-auto'>
				{/* Section Header */}
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-6'>
						Projetos em <span className='gradient-text'>Destaque</span>
					</h2>
					<div className='w-24 h-1 bg-primary mx-auto rounded-full mb-8'></div>
					<p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
						Uma seleção dos meus projetos mais recentes no GitHub, demonstrando diferentes tecnologias e abordagens de
						desenvolvimento
					</p>
				</div>

				{/* Projects Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{repos.map((repo, index) => (
						<div
							key={repo.id}
							className={`project-card group animate-on-scroll`}
							style={{ animationDelay: `${index * 0.1}s` }}
						>
							{/* Project Header */}
							<div className='p-6 pb-4'>
								<div className='flex items-start justify-between mb-4'>
									<h3 className='text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1'>
										{repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
									</h3>
									<div className='flex gap-2'>
										<a
											href={repo.html_url}
											target='_blank'
											rel='noopener noreferrer'
											className='p-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors'
											aria-label='Ver no GitHub'
										>
											<Github className='h-5 w-5' />
										</a>
										{repo.homepage && (
											<a
												href={repo.homepage}
												target='_blank'
												rel='noopener noreferrer'
												className='p-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors'
												aria-label='Ver site'
											>
												<ExternalLink className='h-5 w-5' />
											</a>
										)}
									</div>
								</div>

								<p className='text-muted-foreground mb-4 line-clamp-3 leading-relaxed'>
									{repo.description || 'Projeto desenvolvido com foco em boas práticas e performance.'}
								</p>

								{/* Languages and Topics */}
								{repo.topics && repo.topics.length > 0 && (
									<div className='flex flex-wrap gap-2 mb-4'>
										{repo.topics.slice(0, 3).map(topic => (
											<span
												key={topic}
												className='px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20'
											>
												{topic}
											</span>
										))}
									</div>
								)}
							</div>

							{/* Project Stats */}
							<div className='px-6 pb-6'>
								<div className='flex items-center justify-between pt-4 border-t border-border'>
									<div className='flex items-center gap-4 text-sm text-muted-foreground'>
										{repo.language && (
											<div className='flex items-center gap-2'>
												<div
													className='w-3 h-3 rounded-full'
													style={{
														backgroundColor: getLanguageColor(repo.language),
													}}
												></div>
												<span>{repo.language}</span>
											</div>
										)}
									</div>

									<div className='flex items-center gap-3 text-sm text-muted-foreground'>
										<div className='flex items-center gap-1'>
											<Star className='h-4 w-4' />
											<span>{repo.stargazers_count}</span>
										</div>
										<div className='flex items-center gap-1'>
											<GitFork className='h-4 w-4' />
											<span>{repo.forks_count}</span>
										</div>
									</div>
								</div>

								<div className='mt-2 text-xs text-muted-foreground'>Atualizado em {formatDate(repo.updated_at)}</div>
							</div>
						</div>
					))}
				</div>

				{/* Call to Action */}
				<div className='mt-16 text-center'>
					<div className='bg-card p-8 rounded-2xl shadow-lg border border-border max-w-2xl mx-auto'>
						<h3 className='text-2xl font-bold text-foreground mb-4'>Explore Mais Projetos</h3>
						<p className='text-muted-foreground mb-6'>
							Confira meu perfil completo no GitHub para ver todos os projetos e contribuições
						</p>
						<Button
							asChild
							className='btn-hero-primary'
						>
							<a
								href='https://github.com/Jadiael1?tab=repositories'
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center gap-2'
							>
								<Github className='h-5 w-5' />
								Ver Todos os Projetos
							</a>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProjectsSection;
