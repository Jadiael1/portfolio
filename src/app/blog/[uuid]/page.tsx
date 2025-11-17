import BlogWrapper from '@/components/BlogWrapper';
import { Metadata } from 'next';
import Script from 'next/script';
import { getPostById } from '@/data/blogPosts';
import { notFound } from 'next/navigation';

const siteUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://jadiael.dev';

export async function generateMetadata(context: { params: Promise<{ uuid: string }> }): Promise<Metadata> {
	const { uuid } = await context.params;
	const blogPost = getPostById(uuid);
	if (!blogPost) return notFound();
	const canonicalUrl = new URL(`/blog/${uuid}`, siteUrl).toString();
	const ogImage = `${siteUrl}/og/site/og1200x630.png`;
	const publishedTime = new Date(blogPost.date).toISOString();
	const readingTime = blogPost.readTime ? `PT${blogPost.readTime}M` : undefined;
	const primaryTag = blogPost.tags[0] ?? 'Blog';
	const metadataOther: Metadata['other'] = {
		readerType: 'blog-post',
	};

	if (readingTime) {
		metadataOther.readingTime = readingTime;
	}

	return {
		title: `${blogPost.title} | Jadiael Juvino`,
		description: blogPost.excerpt,
		alternates: { canonical: canonicalUrl },
		keywords: blogPost.tags,
		category: primaryTag,
		authors: [{ name: blogPost.author, url: siteUrl }],
		creator: blogPost.author,
		publisher: 'Jadiael Juvino',
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
			},
		},
		openGraph: {
			title: `${blogPost.title} | Jadiael Juvino`,
			description: blogPost.excerpt,
			type: 'article',
			url: canonicalUrl,
			siteName: 'Jadiael.Dev',
			locale: 'pt-BR',
			publishedTime,
			authors: [blogPost.author],
			section: primaryTag,
			tags: blogPost.tags,
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: blogPost.title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: `${blogPost.title} | Jadiael Juvino`,
			description: blogPost.excerpt,
			images: [ogImage],
			creator: '@Jadiael1',
		},
		appLinks: {
			web: { url: canonicalUrl },
		},
		other: metadataOther,
	};
}

const BlogPost = async (context: { params: Promise<{ uuid: string }> }) => {
	const { uuid } = await context.params;
	const blogPost = getPostById(uuid);
	if (!blogPost) notFound();
	const canonicalUrl = new URL(`/blog/${uuid}`, siteUrl).toString();
	const ogImage = `${siteUrl}/og/site/og1200x630.png`;
	const publishedTime = new Date(blogPost.date).toISOString();
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: blogPost.title,
		description: blogPost.excerpt,
		datePublished: publishedTime,
		dateModified: publishedTime,
		url: canonicalUrl,
		mainEntityOfPage: canonicalUrl,
		image: ogImage,
		author: {
			'@type': 'Person',
			name: blogPost.author,
			url: siteUrl,
		},
		publisher: {
			'@type': 'Person',
			name: 'Jadiael Juvino',
			url: siteUrl,
		},
		keywords: blogPost.tags,
		timeRequired: blogPost.readTime ? `PT${blogPost.readTime}M` : undefined,
		articleSection: blogPost.tags[0] ?? 'Blog',
	};

	return (
		<>
			<Script
				id={`blog-post-jsonld-${uuid}`}
				type='application/ld+json'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
			<BlogWrapper blogPost={blogPost} />
		</>
	);
};

export default BlogPost;
