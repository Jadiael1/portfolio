import { blogPosts } from '@/data/blogPosts';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const base = 'https://jadiael.dev';

	const staticRoutes = ['/'].map(p => ({
		url: `${base}${p}`,
		lastModified: new Date(),
		changeFrequency: 'monthly' as const,
		priority: p === '/' ? 1 : 0.8,
	}));

	const posts = blogPosts;

	const blogRoutes: MetadataRoute.Sitemap = posts.map(p => ({
		url: `${base}/blog/${p.id}`,
		lastModified: p.date ? new Date(p.date) : new Date(),
		changeFrequency: 'weekly',
		priority: 0.7,
	}));

	return [...staticRoutes, ...blogRoutes];
}
