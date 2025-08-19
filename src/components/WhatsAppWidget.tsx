'use client';

import { useEffect, useRef, useState } from 'react';
import { Send, X, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		viewBox='0 0 32 32'
		{...props}
	>
		<path
			fill='currentColor'
			d='M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.044-.53-.044-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.942 3.813a6.5 6.5 0 0 0 3.525-2.02l-1.35-1.35a.63.63 0 0 0-.525-.244h-1.37a.63.63 0 0 0-.525.244l-1.35 1.35a6.5 6.5 0 0 0 3.525 2.02zM15.997 4C9.37 4 4 9.37 4 15.997c0 6.628 5.37 12 11.997 12 6.628 0 12-5.372 12-12 0-6.627-5.372-11.998-12-11.998zm0 21.5c-5.248 0-9.5-4.252-9.5-9.5s4.252-9.5 9.5-9.5 9.5 4.252 9.5 9.5-4.252 9.5-9.5 9.5z'
		/>
	</svg>
);

const WhatsAppWidget = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [jsEnabled, setJsEnabled] = useState(false);

	useEffect(() => {
		setJsEnabled(true);
	}, []);

	const chatWindowRef = useRef<HTMLDivElement>(null);
	const fabRef = useRef<HTMLButtonElement>(null);

	const { toast } = useToast();

	const toggleChat = () => {
		setIsOpen(!isOpen);
		setMessage('');
	};

	const handleSendMessage = () => {
		const phone = '5581995207789';
		const portfolioMessage = `Olá! Vim pelo seu portfólio e gostaria de conversar.\n\nMensagem: "${message}"`;
		const encodedMessage = encodeURIComponent(portfolioMessage);
		const url = `https://api.whatsapp.com/send/?phone=${phone}&text=${encodedMessage}`;

		window.open(url, '_blank', 'noopener,noreferrer');
		setMessage('');
		setIsOpen(false);
		toast({
			title: 'Mensagem enviada!',
			description: 'Você será redirecionado para o WhatsApp para finalizar o envio.',
		});
	};

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				chatWindowRef.current &&
				!chatWindowRef.current.contains(event.target as Node) &&
				fabRef.current &&
				!fabRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen]);

	return (
		<>
			{/* Chat Window */}
			<div
				ref={chatWindowRef}
				className={`
                    fixed bottom-[calc(4.5rem+1.5rem)] right-4 sm:right-8 z-50
                    w-[calc(100vw-2rem)] sm:w-96
                    transition-all duration-300 ease-in-out
                    ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
                `}
			>
				<div className='bg-card rounded-lg shadow-elevated border border-border flex flex-col h-[28rem]'>
					{/* Header */}
					<div className='p-4 bg-secondary/50 rounded-t-lg flex items-center justify-between border-b border-border'>
						<div className='flex items-center gap-3'>
							<div className='w-12 h-12 rounded-full bg-muted flex items-center justify-center'>
								{/* Pode substituir por uma <Image> sua */}
								<User className='w-7 h-7 text-muted-foreground' />
							</div>
							<div>
								<h3 className='font-bold text-card-foreground'>Jadiael Juvino</h3>
								<p className='text-xs text-muted-foreground'>Eng. de Software | Online</p>
							</div>
						</div>
						<button
							onClick={toggleChat}
							className='p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors cursor-pointer'
							aria-label='Fechar chat'
						>
							<X className='h-5 w-5' />
						</button>
					</div>

					{/* Chat Body */}
					<div className='flex-grow p-4 overflow-y-auto custom-scrollbar'>
						<div className='flex'>
							<div className='bg-muted text-muted-foreground rounded-lg rounded-bl-none p-3 max-w-[85%]'>
								<p className='text-sm'>Olá! 👋 Obrigado por visitar meu portfólio. Como posso te ajudar hoje?</p>
							</div>
						</div>
					</div>

					{/* Input Footer */}
					<div className='p-3 border-t border-border bg-background rounded-b-lg'>
						<div className='flex items-center gap-2'>
							<textarea
								value={message}
								onChange={e => setMessage(e.target.value)}
								placeholder='Digite sua mensagem...'
								rows={1}
								className='flex-grow bg-muted/50 border border-border rounded-lg p-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none resize-none custom-scrollbar'
								onKeyDown={e => {
									if (e.key === 'Enter' && !e.shiftKey) {
										e.preventDefault();
										handleSendMessage();
									}
								}}
							/>
							<button
								onClick={handleSendMessage}
								className='bg-whatsapp cursor-pointer hover:bg-whatsapp-glow disabled:bg-muted disabled:cursor-not-allowed text-white rounded-lg p-2.5 transition-all duration-300 hover:scale-105'
								aria-label='Enviar mensagem'
							>
								<Send className='h-5 w-5' />
							</button>
						</div>
						<p className='text-center text-xs text-muted-foreground/80 mt-2'>
							Pressione{' '}
							<kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
								<span className='text-xs'>enter</span>
							</kbd>{' '}
							para enviar
						</p>
					</div>
				</div>
			</div>

			{/* Floating Action Button (FAB) */}
			{jsEnabled ? (
				<button
					ref={fabRef}
					onClick={toggleChat}
					className='fixed bottom-8 right-8 sm:right-8 z-50 w-12 h-12 rounded-full bg-whatsapp text-white shadow-lg hover:bg-whatsapp-glow hover:scale-105 transition-all duration-300 animate-pulse cursor-pointer flex items-center justify-center'
					aria-label='Abrir chat do WhatsApp'
				>
					{isOpen ? <X className='h-7 w-7' /> : <WhatsAppIcon className='h-7 w-7' />}
				</button>
			) : (
				<a
					href='https://api.whatsapp.com/send/?phone=5581995207789&text=Olá! Vim pelo seu portfólio e gostaria de conversar.'
					target='_blank'
					rel='noopener noreferrer'
					className='fixed bottom-8 right-8 sm:right-8 z-50 w-12 h-12 rounded-full bg-whatsapp text-white shadow-lg hover:bg-whatsapp-glow hover:scale-105 transition-all duration-300 animate-pulse cursor-pointer flex items-center justify-center'
					aria-label='Abrir chat do WhatsApp'
				>
					{isOpen ? <X className='h-7 w-7' /> : <WhatsAppIcon className='h-7 w-7' />}
				</a>
			)}
		</>
	);
};

export default WhatsAppWidget;
