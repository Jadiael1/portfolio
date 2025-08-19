import MyProjectsSectionWrapper from '@/components/ProjectsSectionWrapper';
import { Button } from '@/components/ui/button';
import Github from '@/components/assets/svgs/Github';
import Link from 'next/link';
// import dynamic from 'next/dynamic';
// const MyProjectsSectionWrapper = dynamic(() => import('@/components/ProjectsSectionWrapper'), { ssr: true });

export interface IRepository {
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

export const getLanguageColor = (language: string) => {
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

export const fetchRepos = async (): Promise<IRepository[] | null> => {
	try {
		// const url = `https://cors-anywhere.herokuapp.com/https://api.github.com/users/Jadiael1/repos?sort=updated&per_page=6`;
		const url = `https://api.github.com/users/Jadiael1/repos?sort=updated&per_page=6`;
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json',
				'X-Requested-With': 'XMLHttpRequest',
			},
			next: { tags: ['github-repos'], revalidate: 18000 },
		});
		if (!response.ok) return null;
		const data = await response.json();

		const filteredRepos = data
			.filter((repo: IRepository) => !repo.name.includes('fork') && repo.description)
			.slice(0, 6);

		return filteredRepos;
	} catch {
		return null;
	}
};

const ProjectsSection = async () => {
	return (
		<section
			id='projetos'
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
				<MyProjectsSectionWrapper />

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
							<Link
								href='https://github.com/Jadiael1?tab=repositories'
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center gap-2'
							>
								<Github className='h-5 w-5' />
								Ver Todos os Projetos
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProjectsSection;
