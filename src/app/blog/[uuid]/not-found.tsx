import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Jadiael Juvino - Blog not found',
	description: 'not found',
	robots: { index: false, follow: false },
};

export default function BlogNotFound() {
	return (
		<div className='min-h-screen bg-background flex items-center justify-center'>
			<div className='text-center'>
				<div className='w-24 h-24 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center'>
					<BookOpen className='w-12 h-12 text-muted-foreground' />
				</div>
				<h1 className='text-2xl font-bold text-foreground mb-4'>Artigo não encontrado</h1>
				<p className='text-muted-foreground mb-8'>O artigo que você está procurando não existe ou foi removido.</p>
				<Link
					href={'/#blog'}
					rel='noopener noreferrer'
					className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer'
				>
					<ArrowLeft className='w-4 h-4 mr-2' />
					Voltar ao início
				</Link>
			</div>
		</div>
	);
}
