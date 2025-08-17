'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MessageCircle, MapPin, Send, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Github from '@/components/assets/svgs/Github';
import Linkedin from '@/components/assets/svgs/Linkedin';

const ContactSection = () => {
	const [formData, setFormData] = useState({
		nome: '',
		email: '',
		mensagem: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { toast } = useToast();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			// Construct WhatsApp message
			const message = `Olá! Estou entrando em contato através do seu portfólio.\n\n*Nome:* ${formData.nome}\n*Email:* ${formData.email}\n*Mensagem:* ${formData.mensagem}`;
			const whatsappUrl = `https://api.whatsapp.com/send/?phone=%2B5581995207789&text=${encodeURIComponent(message)}`;

			// Open WhatsApp
			window.open(whatsappUrl, '_blank');

			// Reset form
			setFormData({ nome: '', email: '', mensagem: '' });

			toast({
				title: 'Mensagem enviada!',
				description: 'Você será redirecionado para o WhatsApp para finalizar o envio.',
			});
		} catch {
			toast({
				title: 'Erro ao enviar mensagem',
				description: 'Tente novamente ou entre em contato diretamente pelo WhatsApp.',
				variant: 'destructive',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const contactInfo = [
		{
			icon: MapPin,
			title: 'Localização',
			value: 'Palmares, Pernambuco, Brasil',
			color: 'text-blue-500',
		},
		{
			icon: Mail,
			title: 'Email',
			value: 'jadiael1@gmail.com',
			link: 'mailto:jadiael1@gmail.com',
			color: 'text-green-500',
		},
		{
			icon: Phone,
			title: 'WhatsApp',
			value: '+55 (81) 99520-7789',
			link: 'https://api.whatsapp.com/send/?phone=%2B5581995207789&text=Olá!%20Estou%20entrando%20em%20contato%20através%20do%20seu%20portfólio',
			color: 'text-emerald-500',
		},
	];

	const socialLinks = [
		{
			icon: Github,
			name: 'GitHub',
			url: 'https://github.com/Jadiael1',
			color: 'hover:text-gray-900',
		},
		{
			icon: Linkedin,
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/in/jadiael/',
			color: 'hover:text-blue-600',
		},
		{
			icon: Mail,
			name: 'Email',
			url: 'mailto:jadiael1@gmail.com',
			color: 'hover:text-red-500',
		},
	];

	return (
		<section
			id='contato'
			className='py-20 bg-accent/20'
		>
			<div className='max-w-6xl mx-auto px-6'>
				{/* Section Header */}
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-6'>
						Entre em <span className='gradient-text'>Contato</span>
					</h2>
					<div className='w-24 h-1 bg-primary mx-auto rounded-full mb-8'></div>
					<p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
						Vamos trabalhar juntos? Fique à vontade para enviar uma mensagem. Estou sempre aberto a novos projetos e
						oportunidades interessantes.
					</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
					{/* Contact Information */}
					<div className='space-y-8'>
						<div>
							<h3 className='text-2xl font-bold text-foreground mb-6'>Informações de Contato</h3>
							<div className='space-y-4'>
								{contactInfo.map(info => (
									<Card
										key={info.title}
										className='border-border/50 hover:border-primary/30 transition-colors'
									>
										<CardContent className='p-6'>
											<div className='flex items-center gap-4'>
												<div className={`p-3 bg-primary/10 rounded-lg ${info.color}`}>
													<info.icon className='h-6 w-6' />
												</div>
												<div>
													<h4 className='font-semibold text-foreground'>{info.title}</h4>
													{info.link ? (
														<a
															href={info.link}
															target='_blank'
															rel='noopener noreferrer'
															className='text-muted-foreground hover:text-primary transition-colors'
														>
															{info.value}
														</a>
													) : (
														<p className='text-muted-foreground'>{info.value}</p>
													)}
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						</div>

						{/* Social Links */}
						<div>
							<h3 className='text-2xl font-bold text-foreground mb-6'>Redes Sociais</h3>
							<div className='flex gap-4'>
								{socialLinks.map(social => (
									<a
										key={social.name}
										href={social.url}
										target='_blank'
										rel='noopener noreferrer'
										className={`p-4 bg-card border border-border rounded-lg ${social.color} transition-all hover:scale-105 hover:shadow-lg`}
										aria-label={social.name}
									>
										<social.icon className={`h-6 w-6`} />
									</a>
								))}
							</div>
						</div>

						{/* Quote */}
						<Card className='bg-primary/5 border-primary/20'>
							<CardContent className='p-6'>
								<blockquote className='text-lg italic text-muted-foreground'>
									&quot;A melhor maneira de prever o futuro é criá-lo com código.&quot;
								</blockquote>
								<cite className='block mt-2 text-sm font-semibold text-primary'>- Filosofia de desenvolvimento</cite>
							</CardContent>
						</Card>
					</div>

					{/* Contact Form */}
					<div>
						<Card className='shadow-lg border-border/50'>
							<CardContent className='p-8'>
								<h3 className='text-2xl font-bold text-foreground mb-6 flex items-center gap-3'>
									<MessageCircle className='h-8 w-8 text-primary' />
									Enviar Mensagem
								</h3>

								<form
									onSubmit={handleSubmit}
									className='space-y-6'
								>
									<div>
										<Label
											htmlFor='nome'
											className='text-base font-medium'
										>
											Nome Completo
										</Label>
										<Input
											id='nome'
											name='nome'
											type='text'
											value={formData.nome}
											onChange={handleInputChange}
											className='mt-2 focus:ring-primary focus:border-primary'
											placeholder='Seu nome completo'
											autoComplete='name'
											required
										/>
									</div>

									<div>
										<Label
											htmlFor='email'
											className='text-base font-medium'
										>
											Email
										</Label>
										<Input
											id='email'
											name='email'
											type='email'
											value={formData.email}
											onChange={handleInputChange}
											className='mt-2 focus:ring-primary focus:border-primary'
											placeholder='seu.email@exemplo.com'
											autoComplete='email'
											required
										/>
									</div>

									<div>
										<Label
											htmlFor='mensagem'
											className='text-base font-medium'
										>
											Mensagem
										</Label>
										<Textarea
											id='mensagem'
											name='mensagem'
											value={formData.mensagem}
											onChange={handleInputChange}
											className='mt-2 min-h-[120px] focus:ring-primary focus:border-primary'
											placeholder='Descreva seu projeto, ideia ou como posso te ajudar...'
											autoComplete='off'
											required
										/>
									</div>

									<Button
										type='submit'
										disabled={isSubmitting}
										className='w-full btn-hero-primary text-lg py-6 group cursor-pointer'
									>
										{isSubmitting ? (
											<>
												<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2'></div>
												Enviando...
											</>
										) : (
											<>
												<Send className='mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
												Enviar via WhatsApp
											</>
										)}
									</Button>
								</form>

								<div className='mt-6 pt-6 border-t border-border text-center'>
									<p className='text-sm text-muted-foreground'>
										Ao enviar, você será redirecionado para o WhatsApp para finalizar a mensagem
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
