export interface BlogPost {
	id: string;
	title: string;
	excerpt: string;
	content: string;
	author: string;
	date: string;
	readTime: number;
	tags: string[];
	image: string;
	featured: boolean;
}

export const blogPosts: BlogPost[] = [
	{
		id: '1',
		title: 'Sincronização Bidirecional entre Oracle e WordPress com API Intermediadora em NestJS',
		excerpt:
			'Implementação de sincronização de dados entre Oracle e WordPress com API intermediadora em NestJS, garantindo filas, triggers, segurança e zero falhas em produção.',
		content: `
# Sincronização Bidirecional entre Oracle e WordPress com API Intermediadora
Um desafio recente foi manter uma **sincronização de dados em dois sentidos** entre um banco de dados **Oracle (SENIOR)** e uma plataforma **LMS baseada em WordPress**.

## Planejamento e Aprovação
O processo envolveu planejar toda a solução, apresentar o planejamento para aprovação e, em seguida, realizar a implementação completa.  
Durante esse trabalho, me especializei em fluxos de **construção de plugins para WordPress**, explorando em profundidade a manipulação de **hooks** de plugins.

## Mapeamento das Informações
O primeiro passo foi mapear quais informações deveriam ser sincronizadas do banco Oracle para o WordPress e vice-versa.  
Em seguida, defini formas de implementar essa integração nos plugins e no próprio WordPress.

## Oracle → WordPress
Para o fluxo **do Oracle para o WordPress**, a solução foi composta pelas seguintes etapas:

- Criação de uma **API Intermediadora** desenvolvida em **NestJS**, com sistema de filas usando \`BullMQ\` e \`BullBoard\` protegido por \`Basic Auth\`.
- Essa API intermediadora ficou responsável por orquestrar a comunicação bidirecional, evitando travamentos e garantindo alta performance.
- No Oracle, criei uma **View** específica com apenas os dados necessários para sincronização, reduzindo custos de processamento.
- Implementei **triggers** que, sempre que ocorria uma inserção, atualização ou exclusão, enviavam uma requisição para a API intermediadora.

A importância da API intermediadora é clara:

ela recebe a requisição da trigger, retorna rapidamente uma resposta e, apenas depois, processa a requisição em segundo plano.  
Isso evitava que a trigger fique presa aguardando a conclusão do processamento, reduzindo riscos e custos de performance no banco Oracle.

## WordPress → Oracle
Para o fluxo **do WordPress para o Oracle**, o caminho foi o inverso:  

- Mapeei eventos dos plugins e do próprio WordPress (como estatísticas, progressos e dados de uso).
- Esses eventos enviavam informações para a API intermediadora.
- No Oracle, foram criados **usuários com permissões limitadas**, **views** dedicadas e **procedures** responsáveis por aceitar dados de atualização e inserção.

Assim, toda atualização iniciada no WordPress é tratada pela API e corretamente persistida no banco Oracle.

## Tratamento de Falhas
Outro ponto importante foi o tratamento de falhas:  

- Falhas são registradas em memória e exibidas no \`BullBoard\`, sem serem sobrescritas por erros mais recentes.
- Além disso, criei uma tabela dedicada no Oracle para salvar os registros de falha, permitindo investigar e corrigir fluxos de sincronização com base em evidências concretas.

## Resultado em Produção
Após todo o fluxo implementado, alcançamos em produção:  

- **0 erros**
- **0 necessidade de intervenção manual**

O sistema mostrou-se robusto, escalável e confiável.

## Boas Práticas Adotadas
Além da parte técnica, gosto de pensar em cada projeto sob outros pontos de vista:
- Como será mantido no futuro
- Como poderá ser escalado
- Como será utilizado por outros times

Sou bastante organizado, costumo **documentar bem meus projetos**, manter **padronização de commits** e seguir práticas de **clean code**.
Isso facilita a evolução futura e reduz a curva de aprendizado para outras equipes que precisem atuar no mesmo código.

    `,
		author: 'Jadiael Juvino',
		date: '2024-12-15T00:00:00-03:00',
		readTime: 8,
		tags: [
			'Oracle',
			'WordPress',
			'NestJS',
			'BullMQ',
			'BullBoard',
			'API',
			'Redis',
			'Basic Auth',
			'Sincronização de Dados',
			'LearnDash',
		],
		image: '/api/placeholder/800/400',
		featured: true,
	},
];

// Helper functions for blog data
export const getFeaturedPosts = () => blogPosts.filter(post => post.featured);
export const getPostById = (id: string) => blogPosts.find(post => post.id === id);
export const getPostsByTag = (tag: string) => blogPosts.filter(post => post.tags.includes(tag));
export const getRecentPosts = (limit: number = 6) =>
	blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);
