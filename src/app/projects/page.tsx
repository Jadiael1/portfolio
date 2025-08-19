import { ExternalLink, Star, GitFork } from 'lucide-react';
import Github from '@/components/assets/svgs/Github';
import { getLanguageColor, formatDate, fetchRepos } from '@/components/ProjectsSection';

export default async function Projects() {
	const repos = await fetchRepos();
	console.log('repos');
	return (
		<>
			{repos ? (
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
			) : null}
		</>
	);
}
