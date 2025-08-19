'use client';
import { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, Tag, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getRecentPosts, BlogPost } from '@/data/blogPosts';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const BlogSection = () => {
	const router = useRouter();
	const [visiblePosts, setVisiblePosts] = useState(6);
	const [allPosts, setAllPosts] = useState<BlogPost[]>(getRecentPosts(20));
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		// Simulate API call with animation
		setIsLoading(true);
		setTimeout(() => {
			setAllPosts(getRecentPosts(20));
			setIsLoading(false);
		}, 1);
	}, []);

	const handleLoadMore = () => {
		setIsLoading(true);
		setTimeout(() => {
			setVisiblePosts(prev => prev + 6);
			setIsLoading(false);
		}, 1);
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('pt-BR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const displayedPosts = allPosts.slice(0, visiblePosts);
	const hasMorePosts = visiblePosts < allPosts.length;

	return (
		<section
			id='blog'
			className='py-20 bg-gradient-to-br from-accent/30 to-secondary/50'
		>
			<div className='max-w-7xl mx-auto px-6'>
				{/* Header */}
				<div className='text-center mb-16'>
					<div className='inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6'>
						<Tag className='w-4 h-4' />
						Insights & Experiências
					</div>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-6'>
						Últimas <span className='gradient-text'>Postagens</span>
					</h2>
					<p className='text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
						Compartilho conhecimentos, experiências e insights sobre desenvolvimento de software, tecnologias emergentes
						e melhores práticas da indústria.
					</p>
				</div>

				{/* Posts Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
					{displayedPosts.map((post, index) => (
						<Link
							key={post.id}
							href={`/blog/${post.id}`}
						>
							<Card
								className='group project-card cursor-pointer overflow-hidden'
								style={{
									animationDelay: `${index * 100}ms`,
									animation: 'fadeInUp 0.6s ease-out forwards',
								}}
							>
								{/* Post Image */}
								<div className='relative h-48 overflow-hidden'>
									<div className='w-full h-full bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center'>
										<div className='text-center'>
											<div className='w-16 h-16 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center'>
												<Calendar className='w-8 h-8 text-primary' />
											</div>
											<p className='text-sm text-muted-foreground'>{formatDate(post.date)}</p>
										</div>
									</div>

									{/* Featured Badge */}
									{post.featured && (
										<div className='absolute top-4 left-4'>
											<Badge
												variant='default'
												className='bg-primary text-primary-foreground'
											>
												Em Destaque
											</Badge>
										</div>
									)}

									{/* Read Time */}
									<div className='absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs flex items-center gap-1'>
										<Clock className='w-3 h-3' />
										{post.readTime} min
									</div>
								</div>

								<CardHeader className='pb-4'>
									<CardTitle className='text-xl font-bold group-hover:text-primary transition-colors duration-300 line-clamp-2'>
										{post.title}
									</CardTitle>
									<CardDescription className='text-muted-foreground line-clamp-3'>{post.excerpt}</CardDescription>
								</CardHeader>

								<CardContent className='pt-0'>
									{/* Tags */}
									<div className='flex flex-wrap gap-2 mb-4'>
										{post.tags.slice(0, 3).map(tag => (
											<Badge
												key={tag}
												variant='secondary'
												className='text-xs'
											>
												{tag}
											</Badge>
										))}
										{post.tags.length > 3 && (
											<Badge
												variant='outline'
												className='text-xs'
											>
												+{post.tags.length - 3}
											</Badge>
										)}
									</div>

									{/* Author and Read More */}
									<div className='flex items-center justify-between'>
										<div className='flex items-center gap-2'>
											<div className='w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white text-sm font-bold'>
												J
											</div>
											<span className='text-sm text-muted-foreground'>{post.author}</span>
										</div>

										<div className='flex items-center gap-1 text-primary group-hover:gap-2 transition-all duration-300'>
											<span className='text-sm font-medium'>Ler mais</span>
											<ArrowRight className='w-4 h-4' />
										</div>
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>

				{/* Loading Animation */}
				{isLoading && (
					<div className='flex justify-center mb-8'>
						<div className='flex items-center gap-3'>
							<div className='animate-spin rounded-full h-6 w-6 border-b-2 border-primary'></div>
							<span className='text-muted-foreground'>Carregando postagens...</span>
						</div>
					</div>
				)}

				{/* Load More Button */}
				{hasMorePosts && !isLoading && (
					<div className='text-center'>
						<Button
							onClick={handleLoadMore}
							variant='outline'
							size='lg'
							className='group cursor-pointer'
						>
							<span>Ver mais postagens</span>
							<ChevronDown className='w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform duration-300' />
						</Button>
					</div>
				)}

				{/* No More Posts Message */}
				{!hasMorePosts && allPosts.length > 6 && (
					<div className='text-center'>
						<p className='text-muted-foreground'>Você chegou ao fim! 🎉 Continue acompanhando para mais conteúdo.</p>
					</div>
				)}
			</div>
		</section>
	);
};

export default BlogSection;
