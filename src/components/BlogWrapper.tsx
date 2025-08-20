'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Tag, Share2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getRecentPosts, type BlogPost as BlogPostType } from '@/data/blogPosts';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

type TBlogWrapperProps = {
	blogPost: BlogPostType;
};

const BlogWrapper = ({ blogPost }: TBlogWrapperProps) => {
	const router = useRouter();
	const { toast } = useToast();
	const [post, setPost] = useState<BlogPostType>(blogPost);
	const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [readingProgress, setReadingProgress] = useState(0);

	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			setPost(post);
			const related = getRecentPosts(10)
				.filter(p => p.id !== post.id)
				.filter(p => p.tags.some(tag => post.tags.includes(tag)))
				.slice(0, 3);
			setRelatedPosts(related);
			setIsLoading(false);
		}, 100);
	}, [post]);

	useEffect(() => {
		const handleScroll = () => {
			const element = document.getElementById('post-content');
			if (element) {
				const totalHeight = element.scrollHeight - window.innerHeight;
				const progress = (window.scrollY / totalHeight) * 100;
				setReadingProgress(Math.min(100, Math.max(0, progress)));
			}
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [post]);

	const handleShare = async () => {
		const url = window.location.href;
		const title = post?.title || 'Confira este artigo';

		if (navigator.share) {
			try {
				await navigator.share({ title, url });
			} catch {
				copyToClipboard(url);
			}
		} else {
			copyToClipboard(url);
		}
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			toast({
				title: 'Link copiado!',
				description: 'O link foi copiado para sua área de transferência.',
			});
		});
	};

	const handleRelatedPostClick = (postId: string) => {
		router.push(`/blog/${postId}`);
		window.scrollTo(0, 0);
	};

	if (isLoading) {
		return (
			<div className='min-h-screen bg-background'>
				{/* Reading Progress */}
				<div className='fixed top-0 left-0 w-full h-1 bg-secondary z-50'>
					<div
						className='h-full bg-primary transition-all duration-300'
						style={{ width: `${readingProgress}%` }}
					/>
				</div>

				<div className='max-w-4xl mx-auto px-6 py-24'>
					<div className='animate-pulse'>
						<div className='h-8 bg-secondary rounded-lg w-32 mb-8'></div>
						<div className='h-12 bg-secondary rounded-lg w-3/4 mb-4'></div>
						<div className='h-6 bg-secondary rounded-lg w-1/2 mb-8'></div>
						<div className='space-y-4'>
							{[...Array(8)].map((_, i) => (
								<div
									key={i}
									className='h-4 bg-secondary rounded-lg w-full'
								></div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-background'>
			{/* Reading Progress */}
			<div className='fixed top-0 left-0 w-full h-1 bg-secondary z-50'>
				<div
					className='h-full bg-primary transition-all duration-300'
					style={{ width: `${readingProgress}%` }}
				/>
			</div>

			{/* Back Button */}
			<div className='fixed top-6 left-6 z-40'>
				<Link href='/#blog'>
					<Button
						className='bg-card/80 backdrop-blur-sm cursor-pointer'
						variant='outline'
						size='sm'
						onClick={() => router.push('/#blog')}
					>
						<ArrowLeft className='w-4 h-4 mr-2' />
						Voltar
					</Button>
				</Link>
			</div>

			{/* Share Button */}
			<div className='fixed top-6 right-6 z-40'>
				<Button
					variant='outline'
					size='sm'
					onClick={handleShare}
					className='bg-card/80 backdrop-blur-sm cursor-pointer'
				>
					<Share2 className='w-4 h-4' />
				</Button>
			</div>

			<article
				className='max-w-4xl mx-auto px-6 py-24'
				id='post-content'
			>
				{/* Header */}
				<header className='mb-12'>
					{/* Featured Badge */}
					{post.featured && (
						<div className='mb-6'>
							<Badge
								variant='default'
								className='bg-primary text-primary-foreground'
							>
								🌟 Artigo em Destaque
							</Badge>
						</div>
					)}

					{/* Title */}
					<h1 className='text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight'>{post.title}</h1>

					{/* Meta Information */}
					<div className='flex flex-wrap items-center gap-6 text-muted-foreground mb-8'>
						<div className='flex items-center gap-2'>
							<User className='w-4 h-4' />
							<span className='font-medium'>{post.author}</span>
						</div>

						<div className='flex items-center gap-2'>
							<Calendar className='w-4 h-4' />
							<span>{formatDate(post.date)}</span>
						</div>

						<div className='flex items-center gap-2'>
							<Clock className='w-4 h-4' />
							<span>{post.readTime} min de leitura</span>
						</div>
					</div>

					{/* Tags */}
					<div className='flex flex-wrap gap-2 mb-8'>
						{post.tags.map(tag => (
							<Badge
								key={tag}
								variant='secondary'
								className='text-sm'
							>
								<Tag className='w-3 h-3 mr-1' />
								{tag}
							</Badge>
						))}
					</div>

					{/* Excerpt */}
					<div className='bg-accent/50 border-l-4 border-primary px-6 py-4 rounded-r-lg'>
						<p className='text-lg text-foreground/90 italic'>{post.excerpt}</p>
					</div>
				</header>

				<Separator className='mb-12' />

				{/* Content */}
				<div className='prose prose-lg max-w-none'>
					<div
						className='text-foreground/90 leading-relaxed space-y-6'
						dangerouslySetInnerHTML={{
							__html: post.content
								.replace(/\r\n/g, '\n')
								.replace(
									/```([\s\S]*?)```/g,
									'<pre class="bg-secondary p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>',
								)
								.replace(/`(.*?)`/g, '<code class="bg-secondary px-2 py-1 rounded">$1</code>')
								.replace(/^\s{0,3}###\s+(.*)$/gm, '<h3 class="text-xl font-bold text-foreground mt-8 mb-3">$1</h3>')
								.replace(/^\s{0,3}##\s+(.*)$/gm, '<h2 class="text-2xl font-bold text-foreground mt-10 mb-4">$1</h2>')
								.replace(/^\s{0,3}#\s+(.*)$/gm, '<h1 class="text-3xl font-bold text-foreground mt-12 mb-6">$1</h1>')
								.replace(/^\s*-\s+(.*)$/gm, '<li class="ml-6">$1</li>')
								.replace(/(<li.*?>.*?<\/li>\s*)+/gs, '<ul class="list-disc space-y-2 mb-6">$&</ul>')
								.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
								.replace(/\*(.*?)\*/g, '<em>$1</em>')
								.replace(/(?<!<\/li>)(?<!<\/h1>)(?<!<\/h2>)(?<!<\/h3>)\n/g, '<br />'),
						}}
					/>
				</div>

				<Separator className='my-12' />

				{/* Author Info */}
				<Card className='mb-12 overflow-hidden'>
					<CardContent className='p-6 sm:p-8'>
						<div className='flex items-start gap-4 sm:gap-6 max-w-full'>
							{/* Avatar menor no mobile + sem encolher */}
							<div
								className='size-16 sm:size-20 rounded-full bg-gradient-to-br from-primary to-primary-glow
                      flex items-center justify-center text-white text-2xl font-bold flex-shrink-0'
							>
								J
							</div>

							{/* Conteúdo pode encolher / quebrar corretamente */}
							<div className='flex-1 min-w-0'>
								<h3 className='text-lg sm:text-xl font-bold text-foreground mb-2'>Jadiael Juvino</h3>

								<p className='text-muted-foreground mb-4 text-pretty'>
									Engenheiro de Software especializado em desenvolvimento backend e frontend, com experiência em C#,
									JavaScript, NestJS, PHP e bancos de dados. Apaixonado por compartilhar conhecimento e criar soluções
									inovadoras.
								</p>

								{/* Botões: empilha no mobile, lado a lado no sm+; permite wrap */}
								<div className='flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4'>
									<Button
										asChild
										variant='outline'
										size='sm'
										className='cursor-pointer w-full sm:w-auto'
									>
										<Link
											href='/#contato'
											aria-label='Entre em contato'
										>
											Entre em contato
										</Link>
									</Button>

									<Button
										asChild
										variant='ghost'
										size='sm'
										className='cursor-pointer w-full sm:w-auto'
									>
										<Link
											href='/#blog'
											aria-label='Ver outras postagens'
										>
											Ver mais postagens
										</Link>
									</Button>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Related Posts */}
				{relatedPosts.length > 0 && (
					<section>
						<h2 className='text-2xl font-bold text-foreground mb-8'>Artigos Relacionados</h2>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
							{relatedPosts.map(relatedPost => (
								<Card
									key={relatedPost.id}
									className='group cursor-pointer project-card'
									onClick={() => handleRelatedPostClick(relatedPost.id)}
								>
									<CardContent className='p-6'>
										<h3 className='font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2'>
											{relatedPost.title}
										</h3>
										<p className='text-muted-foreground text-sm mb-4 line-clamp-3'>{relatedPost.excerpt}</p>
										<div className='flex items-center justify-between text-xs text-muted-foreground'>
											<span>{formatDate(relatedPost.date)}</span>
											<span>{relatedPost.readTime} min</span>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</section>
				)}
			</article>
		</div>
	);
};

export default BlogWrapper;
