import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
	const base = 'https://jadiael.dev';
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: [],
		},
		sitemap: `${base}/sitemap.xml`,
	};
}
