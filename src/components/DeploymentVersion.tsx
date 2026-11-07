const DEVELOPMENT_DEPLOYMENT_SHA = '178259c680bd4e1ca1e78acc543f6777c29daa53';
const SHA_PATTERN = /^[a-f0-9]{40}$/;

const DeploymentVersion = () => {
	const sha =
		process.env.NEXT_PUBLIC_DEPLOYMENT_SHA ??
		(process.env.NODE_ENV === 'development' ? DEVELOPMENT_DEPLOYMENT_SHA : undefined);

	if (!sha || !SHA_PATTERN.test(sha)) return null;

	return (
		<div className='inline-flex items-center gap-1.5 text-hero-text/60 text-sm'>
			<span>Versão</span>
			<a
				href={`https://github.com/Jadiael1/portfolio/commit/${sha}`}
				target='_blank'
				rel='noopener noreferrer'
				aria-label={`Ver commit ${sha.slice(0, 7)} no GitHub (abre em nova aba)`}
				className='inline-flex min-h-8 items-center rounded-sm px-1.5 font-mono text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-hero-text hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-hero-bg'
			>
				{sha.slice(0, 7)}
			</a>
		</div>
	);
};

export default DeploymentVersion;
