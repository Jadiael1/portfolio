import BlogWrapper from '@/components/BlogWrapper';

const BlogPost = async (context: { params: Promise<{ uuid: string }> }) => {
	const { uuid } = await context.params;
	return <BlogWrapper uuid={uuid} />;
};

export default BlogPost;
