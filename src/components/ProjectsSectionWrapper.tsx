'use client';
import { useEffect, useState, useRef } from 'react';
import { ExternalLink, Star, GitFork } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Github from '@/components/assets/svgs/Github';
import { IRepository, getLanguageColor, formatDate, fetchRepos } from '@/components/ProjectsSection';

const ProjectsSectionWrapper = () => {
	const [repositories, setRepositories] = useState<IRepository[] | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const sectionRef = useRef<HTMLDivElement>(null);
	const [jsEnabled, setJsEnabled] = useState(false);

	useEffect(() => {
		setJsEnabled(true);
	}, []);

	useEffect(() => {
		setLoading(true);
		fetchRepos()
			.then(repos => {
				setRepositories(repos);
			})
			.catch(err => {
				setError('Erro ao carregar projetos do GitHub');
				console.error('Error fetching repos:', err);
				setRepositories(null);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

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

	const projectCard = (repo: IRepository, index: number) => {
		return (
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
		);
	};

	return (
		<>
			<noscript>
				<iframe
					src='/projects'
					className='border-0 w-full min-h-150'
					title='Conteúdo sem JavaScript'
				/>
			</noscript>

			{jsEnabled ? (
				<div
					ref={sectionRef}
					className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
				>
					{repositories ? repositories.map((repo, index) => projectCard(repo, index)) : null}
				</div>
			) : null}
		</>
	);
};

export default ProjectsSectionWrapper;
