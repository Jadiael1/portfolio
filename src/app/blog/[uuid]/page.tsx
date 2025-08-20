import BlogWrapper from '@/components/BlogWrapper';
import { Metadata } from 'next';
import { getPostById } from '@/data/blogPosts';
import { notFound } from 'next/navigation';

export async function generateMetadata(context: { params: Promise<{ uuid: string }> }): Promise<Metadata> {
	const { uuid } = await context.params;
	const blogPost = getPostById(uuid);
	if (!blogPost) return notFound();

	return {
		title: `Jadiael Juvino - ${blogPost.title}`,
		description: `${blogPost.excerpt}`,
		alternates: { canonical: `/blog/${uuid}` },
	};
}

const BlogPost = async (context: { params: Promise<{ uuid: string }> }) => {
	const { uuid } = await context.params;
	const blogPost = getPostById(uuid);
	if (!blogPost) notFound();
	return <BlogWrapper blogPost={blogPost} />;
};

export default BlogPost;
