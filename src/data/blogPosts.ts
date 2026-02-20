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
		image: '',
		featured: true,
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
	},
	{
		id: '2',
		title: 'Manipulação de memória.',
		excerpt: 'Praticando ponteiros e offsets revisitando GTA San Andreas v1.0.1.32 (Rockstar Games Launcher).',
		author: 'Jadiael Juvino',
		date: '2025-11-15T00:00:00-03:00',
		readTime: 8,
		tags: [
			'GTA San Andreas',
			'Cheat Engine',
			'Automação',
			'Memória',
			'Games',
			'Teleporte',
			'Rockstar Games Launcher',
			'Portfólio',
		],
		image: '',
		featured: false,
		content: `
# Revisitação ao GTA San Andreas (RGL 1.0.1.32) e exploração de memória com Cheat Engine

Depois de muitos anos sem encostar em GTA San Andreas, decidi revisitar o jogo — agora em um ambiente bem mais moderno, rodando no **Windows 11** com a versão distribuída pelo **Rockstar Games Launcher (RGL)**, **1.0.1.32**.

Como jogador, a motivação inicial foi pura nostalgia.  
Como desenvolvedor, a motivação real foi outra: entender **como essa build se comporta hoje**, quais são suas **limitações técnicas** e o que dá pra fazer **em termos de automação e manipulação de memória**.

Logo de início, levantei alguns pontos importantes:

- A versão **1.0.1.32 (RGL)** roda de forma estável em sistemas atuais, sem crash aleatório ou necessidade de patch da comunidade.
- É possível jogar o **jogo base puro**, sem qualquer mod de terceiros.
- Por outro lado, **essa build praticamente não é suportada pela comunidade modder**.

A partir disso, o caminho ficou bem claro: em vez de fazer downgrade e usar mods clássicos, resolvi **abraçar essa versão específica** e usá-la como laboratório de estudo de memória.

---

## Por que não fiz downgrade (e por que isso importa)

Se você pesquisa hoje sobre mods de GTA San Andreas, a recomendação padrão é:

- fazer **downgrade** para versões antigas, e só depois  
- aplicar mods, plugins, CLEO, etc.

O problema é que essa recomendação ignora completamente a versão do **Rockstar Games Launcher**.

No meu caso, eu queria:

- manter o jogo **original**, sem mexer no executável;
- não entrar em zona cinzenta de EULA com *exe* modificado;
- e, ao mesmo tempo, **explorar o jogo com um olhar técnico**.

Por isso, optei por **não fazer downgrade** e jogar exatamente a versão **1.0.1.32 RGL**, como ela vem.

Isso cria um cenário interessante:

- a engine original está estável;
- o conteúdo de jogo e o progresso são os mesmos que já estão **totalmente documentados há anos**;
- mas **não existem tabelas públicas confiáveis de Cheat Engine** para essa build específica (fiz uma pesquisa caprichada em toda internet e não achei nada que funcione!).

Ou seja: **campo aberto para exploração técnica**.

---

## Jogando como jogador… e como engenheiro de software

Jogando “normalmente”, uma coisa salta aos olhos: GTA San Andreas te obriga a **andar muito** pelo mapa.

Do ponto de vista de design de game, isso faz sentido:

- o mapa é enorme;
- sistemas importantes (missões, colecionáveis, escolas, namoradas, propriedades) estão espalhados;
- o jogo quer que o jogador **descubra o mundo na marra**.

Do ponto de vista de desenvolvedor, fica bem claro que:

- muito tempo é gasto em deslocamento repetitivo;
- várias ações são **altamente mecânicas e previsíveis**;
- a lógica de progresso do jogo já está **detalhadamente documentada** hoje.

Como é um jogo **single-player offline**, minha ideia foi simples:

> Respeitar a história e o conteúdo do jogo, mas dar *bypass* em atritos repetitivos usando técnicas que eu já uso no dia a dia, como manipulação de memória e automação.

É aqui que entra o velho amigo: **Cheat Engine**.

---

## Usando Cheat Engine como ferramenta de estudo

Como não encontrei tabelas confiáveis para a versão **1.0.1.32 RGL**, decidi montar a minha própria.

O processo foi basicamente:

- abrir o processo \`gta_sa.exe\`;
- analisar o **módulo base**;
- seguir **cadeias de ponteiros**;
- procurar **endereços estáveis relativos ao módulo**.

O objetivo era encontrar **endereços fixos** para itens que me interessam em termos de automação de progresso, como:

- coordenadas do jogador (a pé e dentro de veículo);
- atributos do CJ (Muscle, Stamina, Fat, Sex Appeal, etc.);
- progresso com as namoradas;
- proficiência em armas e veículos;
- vida, colete, dinheiro;
- níveis de sorte;
- flags de física e estado do veículo/jogador;
- hora e minuto internos do jogo;
- slots de arma + quantidade de munição.

Alguns exemplos (relativos ao módulo \`gta_sa.exe\` da versão 1.0.1.32 RGL):

- **Health / Armor** (via cadeia de ponteiro principal):
  - Health: \`[gta_sa.exe+80F18C-0xBC] + 0x540\`
  - Armor: \`[gta_sa.exe+80F18C-0xBC] + 0x548\`
- **Atributos (Max 1000)** em torno de \`gta_sa.exe+80B600\` / \`gta_sa.exe+80B604\`:
  - Stamina, Fat, Muscle, Sex Appeal.
- **Dinheiro**:
  - \`gta_sa.exe+80F188\`
- **Proficiência em armas** (offsets sequenciais a partir de um mesmo bloco):
  - Pistol, Silenced Pistol, Desert Eagle, Shotgun, Rifle, etc.

A ideia não é só “trapacear”, mas **entender como o jogo se organiza em memória** e transformar isso em algo reutilizável, seguro e documentado.

---

## Coordenadas, teleporte e presets

Um dos focos principais foi encontrar cadeias de ponteiro confiáveis para a **posição**:

- **Posição do jogador a pé**  
  - X: \`[[gta_sa.exe+80F18C-0xBC] + 0x14] + 0x30\`  
  - Y: \`[[gta_sa.exe+80F18C-0xBC] + 0x14] + 0x34\`  
  - Z: \`[[gta_sa.exe+80F18C-0xBC] + 0x14] + 0x38\`

- **Posição do veículo (quando o jogador está dentro)**  
  - X: \`[[[gta_sa.exe+80F18C-0xBC] + 0x58C] + 0x14] + 0x30\`  
  - Y: \`[[[gta_sa.exe+80F18C-0xBC] + 0x58C] + 0x14] + 0x34\`  
  - Z: \`[[[gta_sa.exe+80F18C-0xBC] + 0x58C] + 0x14] + 0x38\`

Além disso, uso um **byte de estado do jogador** que indica o contexto:

- \`[[0x00C0F0D0] + 0x46C]\`  
  - 0 = ar/água  
  - 1 = dentro de carro  
  - 2 = entrando em interior  
  - 3 = a pé  
  - 4 = nadando  

Com isso em mãos, construí uma camada em **Lua** dentro do Cheat Engine que:

- detecta se o CJ está a pé ou dentro de um veículo;
- escolhe a cadeia de ponteiro correta (player ou vehicle);
- ajusta a física temporariamente para evitar comportamentos estranhos;
- aplica presets de coordenadas de forma segura.

Na prática, isso me permite:

- teleportar o CJ para qualquer lugar do mapa;  
- tanto a pé quanto dentro de carro/avião/barco;
- usar grupos de presets como:
  - locais de import/export de veículos;
  - todas as casas que podem ser compradas;
  - pontos de colecionáveis;
  - escolas (moto, carro, barco, avião);
  - áreas específicas de missões com muito deslocamento.

---

## Estruturando a tabela do Cheat Engine como “mini toolkit”

Organizei a tabela em uma estrutura clara, como uma ferramenta interna:

- Grupos principais:
  - \`Player\`
  - \`Vehicle\`
  - \`Modify Position\`
  - \`Houses\`
  - \`Snapshots\`
  - grupos de escolas/missões

- Entradas bem nomeadas:
  - Health, Armor, Money  
  - Car/Moto/Boat/Air Proficiency  
  - Luck  
  - Flags de física  
  - Estado do motor:  
    - \`[[gta_sa.exe+80F18C-0xBC] + 0x58C] + 0x428\`
    - \`[[gta_sa.exe+80F18C-0xBC] + 0x58C] + 0x40\`

- Scripts em **Lua + Auto Assembler** para:
  - polling seguro;
  - timers;
  - teleporte seguro;
  - prevenção de escrita prematura (\`canRead()\`).

Também incluí:

- endereço que indica se o jogador está **no jogo** ou **em menu**;  
- endereço que indica o **ID do menu** (útil para automação contextual).

---

## Lista de missões trabalhadas

- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1POkz2zTOSX7nkzYA1K3g0itIfp53N6xV&export=download'>GTASAsf1.b.fim_da_linha</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1I_hCnObKsOomFfcNZiNNzz05hJiY8VfF&export=download'>GTASAsf1.b.loas_desperados</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1R7iAcT63iQcclitBXYZqUGbpONzSPttS&export=download'>GTASAsf1.b.revolta</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1wxfbaXLgfU3fXNfbDfFn0ViSld8R2DiW&export=download'>GTASAsf1.b.grove_eternamente</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1peJ2XjNEOM0yajjPwX8YP2_DXPpQisaQ&export=download'>GTASAsf1.b.porrada_no_b-dup</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1THzd9elZl-DhUANnJrJfaw2BM2k3QXok&export=download'>GTASAsf1.b.negocios_de_cortar_garganta</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1gOzAH0I7iovJf1Ve0WAlJrO8jSomh7cU&export=download'>GTASAsf1.b.voltando_para_casa</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1aJS3qL8zvkE3hfe-_Ibhe9HKIIxoGmMY&export=download'>GTASAsf1.b.passaro_vertical</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1Gl6ynXktSy3zWmCd-CR0RCFz94y9x_RC&export=download'>GTASAsf1.b.limpando_o_cofre</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1Mpmj4slYptDEUwAgYqLOPuIlmSV3TEYp&export=download'>GTASAsf1.b.para_o_alto_e_avante</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1l9iFxuphbOJ22ukKzNtvZ4U5pTufbZZY&export=download'>GTASAsf1.b.motos_da_policia</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1WJulrsVh6tKZOsb24IQriVoZgzcUu7KE&export=download'>GTASAsf1.b.grande_explosao</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1g7BYjkswpD-Fu0uz08JcpBqVOoLLu-Nl&export=download'>GTASAsf1.b.chave_para_o_coracao_dela</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1ICZS2k6-11nB4A5wiUmyu4tG0Lm-byvO&export=download'>GTASAsf1.b.espionagem_arquitetonica</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1GUpUz1yxH-vxEIMDJ9zbxPkhf1Yu-Unv&export=download'>GTASAsf1.b.uma_casa_nas_colinas</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1KMi-bFWKyl4kHUSiBoNLXP0eQ2nSsWPH&export=download'>GTASAsf1.b.saint_mark_bistro</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1pjMhYL_KreAD2fcotLGXYvaV5-Itunbg&export=download'>GTASAsf1.b.ultimas_palavras</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1GNAJWXcTzYfGXSAONyhu3lvhG9uHaRtg&export=download'>GTASAsf1.b.apropriacao_indebita</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1qw-ZoN-j0CqlekS72AXI0qR-WSfwVPwc&export=download'>GTASAsf1.b.madd_dogg</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1v6hRe0MTC6Ge9mxnto3LHLFXI5jqFDgL&export=download'>GTASAsf1.b.queda_livre</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1oxvPltg_2ioT2TdVr8oZcGpxH2V9RcQr&export=download'>GTASAsf1.b.peixe_no_barril</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1ETFOQGdJQY5Ae2PRbPb_VhiFboxFLUmu&export=download'>GTASAsf1.b.o_negocio_da_carne</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1dhNhdZrl2lm4FfWj6LbH8zga7zBKsJYZ&export=download'>GTASAsf1.b.tratamento_intensivo</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1eI5OeeCjrW1sW-a6V8gcCSEVINY0q-Pr&export=download'>GTASAsf1.b.santo_peyote</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=15d8v3sMLzd-vyMrMLbXvil6qydG9peV1&export=download'>GTASAsf1.b.aqui_estao_seus_chips</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=14Q0haL5Lgi_h2eurAORfokBx5Yt8pfwZ&export=download'>GTASAsf1.b.situacao_explosiva</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1phEqzQ0Yw0B0mWDiBqFCa_VMurNfx4n5&export=download'>GTASAsf1.b.ketchup_no_parabrisa</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1JaRQNtac82yr_oCa569P_gKcFbhE8Nuu&export=download'>GTASAsf1.b.perfuracoes</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1wELkD-o1Nv6xhUl88Qc1CXmhjH6a3CCI&export=download'>GTASAsf1.b.rastreio_de_carro</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1fnTW2ORiCZOF9oJncKYVrSM_hNiNd202&export=download'>GTASAsf1.b.teste_de_direcao</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1xlpvxD0hxgk3lSug96bVctEDaQa_aFhS&export=download'>GTASAsf1.b.zerando</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1ZbcATbXKSYU1w10x5Bwam0O3hCxgf0Hq&export=download'>GTASAsf1.b.gosma_verde</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=10KEVNULm_nW0fYFMZW4jHp_WxlBcpuL7&export=download'>GTASAsf1.b.projeto_negro</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1IRhqz8Evh8F505iBHs71WomMEq1v1ltv&export=download'>GTASAsf1.b.clandestino</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1izMd0JHOXW-jYsHA8sztiAEIiLnlA7bH&export=download'>GTASAsf1.b.voo_em_baixa_altitude</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1g8O03rNyo1TVU5x74JpvjieoQQ6Q1lZT&export=download'>GTASAsf1.b.aprendendo_a_voar</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1tCuNAJQTOHg65d8oTLGMd1qjlSVPaYhq&export=download'>GTASAsf1.b-prado_verdejante</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1ecGHRzcRBysS24FemKhSJrU9c2op03GH&export=download'>GTASAsf1.b.interdicao</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1CXhRWdMpte9NnaeCpi2FEC28cYVL9Y7X&export=download'>GTASAsf1.b.robo_de_carga</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1iv403Q4U14gWY_8TNNtpmNfqIishdSR0&export=download'>GTASAsf1.b.monstro</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1TSqsstHz5h31bGAmUwLTSZyIRN67mihl&export=download'>GTASAsf1.b.drogas_explosivas</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1RTrWF2uBRPmdn-e6qdy26NoEDNXTZQCW&export=download'>GTASAsf1.b.o_ultimo_voo_de_toreno</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1T6gc0klSl8MftoyY73tP4nm-EpeZzDAI&export=download'>GTASAsf1.b.pier_69</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1tQrSj9fdrBKRHmM6fi4RFsqgU_p6opW4&export=download'>GTASAsf1.b.assassino_frio</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=11LsPBQrZf0Y_XdBJZu3FlKttulTmCWWG&export=download'>GTASAsf1.b.rastro_da_lesma</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1EGg3SqCtmrNDsMssiXtvKINAHZyzTJT3&export=download'>GTASAsf1.b.batedor</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1CvsB5ynTH7k2dmLt0DDqvHbepCTlzyxB&export=download'>GTASAsf1.b.os_da_nang_thang</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1ccB0JERW7TIm7XRhe_fN8G5vrAZ1P4cn&export=download'>GTASAsf1.b.assalto_anfibio(2)</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1Pj-0ul81GSOG1mgCMigkSsy0rgC2vJ41&export=download'>GTASAsf1.b.assalto_anfibio</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1jvhhrVoB-RhlDrAdgH-RAtScS1GKQGUn&export=download'>GTASAsf1.b.isca</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=11gHHJFGtN2FHVeuZSxJZCI3QzsniZd3O&export=download'>GTASAsf1.b.ran_fa_li</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1Kh72gpHtYFKDsdk4MelArHW5gaVVAytR&export=download'>GTASAsf1.b.mountain_cloud_boys</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href=https://drive.usercontent.google.com/u/0/uc?id=1C15IGD4ZcS7PJLLoeM2JE0CgtDw5whVa&export=download'>GTASAsf1.b.novo_modelo_de_exercito</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1DOS4WlOC1LEhloUV1Bp3aDbpL5Tc4wpx&export=download'>GTASAsf1.b.linha_de_suprimento</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1J0O8sHSL5CUTX2HllIDdZFEXy21ZzbE8&export=download'>GTASAsf1.b.ataque_aereo</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1QGNk0SeczKEUsIqo5TqrsHJfIaSDtl-f&export=download'>GTASAsf1.b.mike_toreno</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1Wp320WxB30eRXby4syaGvZBsRtbdeytx&export=download'>GTASAsf1.b.t-bone_mendez</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1q0KPaD24zqhRSvig5KDCsczyY170A8ty&export=download'>GTASAsf1.b.jizzy</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1WC1qndYyuNEvN4lLM-Zv57j2hGvkv1iK&export=download'>GTASAsf1.b.oportunidade_de_fotografar</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1CskrQG5RtOKQEKwr1_92RItMK-o_7UCv&export=download'>GTASAsf1.b.voltando_para_a_escola</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1o5GulRUlZLtkdL_24rTeSsMC8cXskHVk&export=download'>GTASAsf1.b.desconstrucao</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1e-Y_v0KRb9JY2-cQqUUQLZYqgiL4-JBc&export=download'>GTASAsf1.b.555-disque-denuncia</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1z2PxZhayREVryOgecOWpSFutBQ7wHPYM&export=download'>GTASAsf1.b.use_flores_no_seu</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1Y_2ReGUFOV86EeNi1GZYdpAM0YMVo2lZ&export=download'>GTASAsf1.b.voce_esta_indo_para_san_fierro</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1tMge1y3D2ddUD_OWopQxlVSb54oB29W2&export=download'>GTASAsf1.b.adeus_meu_amor</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1fNvdrbtI0SRpMN9eUdCdMSAG9yUz0XBZ&export=download'>GTASAsf1.b.wu_zi_mu</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1v7oui-jg6xlHtpD6hPbOSTTo_jhRx-Kb&export=download'>GTASAsf1.b.banco_de_cidade_pequena</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1XpNMq9pXgeMigL7hYSdsuW5wYuZpl_68&export=download'>GTASAsf1.b.contra_todas_as_chances</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1z6NSqI4jjzTunmZBjNqIX3E4VHqzv00G&export=download'>GTASAsf1.b.loja_de_bebidas_local</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1HF6phv-O0C8hF7NFRoMMAWJVg56aAJZ8&export=download'>GTASAsf1.b.colheita_de_corpos1</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1TyKR7bLnGC7ilZNG68Bq8WbKM55kraP1&export=download'>GTASAsf1.b.colheita_de_corpos</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1acP5Qm9q6APpwtYgfnYEoopDnbqOnc65&export=download'>GTASAsf1.b.comandando_o_caminhao</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1o7usWQhT_fN9iN-KCrRr2H9nfvXWKyjk&export=download'>GTASAsf1.b.terra_ruim</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=12e30oUlCvYWU8XenyQzPq2OXTnu2ir_F&export=download'>GTASAsf1.b.o_sabre_verde</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1nflGygbcxEFVHt5VkETQhElWSLhziq9f&export=download'>GTASAsf1.b.reunindo_as_familias</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1PtogsQPe92lTHNoJhUAaT7um5Zmg6Oc6&export=download'>GTASAsf1.b.as_sepulturas</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1iP9BqJ7wd0WWfPdWOx3KhWTrkSnX2P0u&export=download'>GTASAsf1.b.importacoes_cinzentas</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1h2aJ4NbBkFVKl9OS1DM2995E3FehSd6v&export=download'>GTASAsf1.b.doberman</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1U1Ws0aku98k-_SVWY1Pz5e5ijQG9GuCr&export=download'>GTASAsf1.b.desejo_incendiario</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1he2SNM6_V2S0E1OFqXg70nKz42cswv75&export=download'>GTASAsf1.b.festa_em_casa</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1IxhMzGXJjEIpbop56B7Iu6OT3tswNXvP&export=download'>GTASAsf1.b.problemas_de_gerenciamento</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1JpXNLTu0CjbxzJLhlvLpgjKk6qRweAJO&export=download'>GTASAsf1.b.as_rimas_do_madd_dogg</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1tJSvdZAIEirvHpCtMQ4q6rYBMDItq8U5&export=download'>GTASAsf1.b.apenas_negocios</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1_p3FRF7I9bF8U2hv0AI-rPcyNJ2Yx0Mr&export=download'>GTASAsf1.b.lado_errado_dos_trilhos</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1xyCWaesT4JaDTJAZUWscyHpAxg6PhctS&export=download'>GTASAsf1.b.covarde_fugitivo</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1XtFADoWll5sgH7dEsNQnUtBhLApr2ZXI&export=download'>GTASAsf1.b.a_vida_e_uma_praia</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1OkYC8Ub0rma8kg0RXUeIZLC59NAE0qiV&export=download'>GTASAsf1.b.og_loc</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1TzM6nqmw76dwFNz93rC3Jw3zaxkPa4_C&export=download'>GTASAsf1.b.roubando_o_tio_sam</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1FqLJCuat8FTeHKKuVwE5UbfHFx5ix1jo&export=download'>GTASAsf1.b.catalisador</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1d9cl4Pf79K3EOn4HN0kQjZV4gsBYBoMj&export=download'>GTASAsf1.b.invasao_domiciliar</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1xAV_T82eVsTyqCBnotYOgvMtFHEzmnbS&export=download'>GTASAsf1.b.apostas_altas_lowrrider</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1icCrmILO_RPCCU2-cmTUEWYs2D60CpHj&export=download'>GTASAsf1.b.cesar_vialpando</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=19g4SxWF5cxp1Xo8bASuWbL-x2poPXm3d&export=download'>GTASAsf1.b.a_mina_do_sweet</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1YPRNrSKmxuVuo5O59crege79LaQGgMvi&export=download'>GTASAsf1.b.execucao</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1DeJrr57tyluN107jGRUad9bkBZOUn1hD&export=download'>GTASAsf1.b.9mm_e_aks</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1qiYUVzWHVcXUaQg9FWto9RV10bMAUDh1&export=download'>GTASAsf1.b.drive_thru</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1XlX1ceIjadtFKQLIRYVhSCyV7DHX46TL&export=download'>GTASAsf1.b.limpando_o_bairro</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1oYMAMNjpx9DRG6CsPMSwcTHlI_mj3Le8&export=download'>GTASAsf1.b.marcando_a_area</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.usercontent.google.com/u/0/uc?id=1Bw1ukSSJEApeL-kOBPv3Ku57dApz3n71&export=download'>GTASAsf1.b.ryder</a>

---

## Destaques dos saves

- \`desconstrucao\`: todas as namoradas no nível 100 naquele ponto.  
- \`voltando_para_a_escola\`: escola de motorista 100% ouro.  
- \`oportunidade_de_fotografar\`: 50 snapshots concluídos.  
- \`rastreio_de_carro\`: lista de import/export finalizada.  
- \`perfuracoes\`: escolas de moto e barco 100% ouro.  

---

## Downloads e referência cruzada

- Save zerado:  
  <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href="https://gtasnp.com/IuqLon">https://gtasnp.com/IuqLon</a>

- Tabela Cheat Engine (.CT):  
  <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href="https://drive.usercontent.google.com/u/0/uc?id=1d7MkYHpLoz1tR0qZb4TecrT9q3UBVWLc&export=download">gta_sa_v1_0_1_32_RGL.CT</a>

---

## O que isso diz sobre meu trabalho como engenheiro de software

Documentar esse processo faz parte do meu portfólio técnico.

Esse estudo mostra que:

- investigo **sistemas legados e fechados**;  
- extraio informação direto da **memória**;  
- crio ferramentas internas organizadas;  
- reduzo atrito e **automatizo tarefas repetitivas**;  
- trabalho com **consciência de contexto e impacto**.

A mesma disciplina que aplico em integrações reais e soluções corporativas é a que aplico aqui para criar **experiências personalizadas, eficientes e bem documentadas**.


		`,
	},
	{
		id: '3',
		title: 'Criando o PerPlayerFarm: Engenharia de um Multiplayer para Stardew Valley',
		excerpt:
			'Um mergulho técnico na criação de um mod em C# para Stardew Valley que transforma o multiplayer, dando a cada jogador sua própria fazenda, evitando conflitos por recursos, explorando soluções avançadas sem depender de Harmony.',
		author: 'Jadiael Juvino',
		date: '2026-02-15T00:00:00-03:00',
		readTime: 12,
		tags: [
			'Stardew Valley',
			'Game Modding',
			'SMAPI',
			'CSharp',
			'DotNet 6',
			'Pathoschild ModBuildConfig',
			'Multiplayer',
			'Game Development',
			'Open Source',
		],
		image: '',
		featured: false,
		content: `
			# PerPlayerFarm: minha experiência criando um MOD em C# para Stardew Valley

			Se você quer baixar o MOD e ver detalhes de uso, ele já está publicado aqui:
			<a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://www.nexusmods.com/stardewvalley/mods/38441'>https://www.nexusmods.com/stardewvalley/mods/38441</a>
			
			Se você quer ver o codigo fonte do MOD, ele já está publicado aqui:
			<a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://github.com/Jadiael1/PerPlayerFarm'>https://github.com/Jadiael1/PerPlayerFarm</a>
			---

			## 1) Começo: documentação e as duas formas de criar mods

			Eu gostaria de compartilhar a experiência que tive na criação deste MOD para um jogo chamado Stardew Valley.

			A primeira coisa que eu fiz foi procurar uma documentação. Eu encontrei a principal aqui:
			<a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://stardewvalleywiki.com/Modding:Index'>https://stardewvalleywiki.com/Modding:Index</a>

			Essa documentação mostra que é possível criar mods de duas formas:

			- **Content Mods (Content Packs)**: nessa opção, seu mod depende de um framework (por exemplo, Content Patcher) e normalmente consiste em arquivos de texto formatado (como JSON). Na prática, você cria um pacote de conteúdo e ele é aplicado por outro mod que faz o carregamento e a interpretação.
			- **Mods em C# (SMAPI mods)**: na minha opinião, essa opção entrega mais liberdade, porque você consegue trabalhar com código, lógica e integrações mais profundas.

			Eu preferi **não** aderir à primeira opção, porque tenho em mente que, dependendo do que eu queira desenvolver, manter tudo apenas via JSON pode virar algo que eu não queira dar manutenção no futuro.

			Então, a partir daqui eu falo da segunda opção: **desenvolver com C#**.

			---

			## 2) Base técnica: ModBuildConfig, eventos, Harmony e ferramentas de análise

			Na segunda opção existe um pacote recomendado pela própria documentação para facilitar o setup do projeto:

			<a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://www.nuget.org/packages/Pathoschild.Stardew.ModBuildConfig'>https://www.nuget.org/packages/Pathoschild.Stardew.ModBuildConfig</a>

			A versão que usei foi a mais nova na data em que eu preparei o projeto: **4.4.0**.

			O papel desse pacote, na prática, é automatizar configurações do build e deixar o projeto pronto para você consumir as referências do jogo/SMAPI com o mínimo de dor de cabeça. Com isso, o fluxo fica bem natural para trabalhar com o estilo de mod em C#, que é baseado em:

			- **escutar eventos do SMAPI** para reagir ao que acontece no jogo;
			- usar as **classes, propriedades e métodos** do próprio jogo;
			- descobrir coisas via documentação, IntelliSense, debug, fóruns e lendo outros mods de código aberto.

			Esse ecossistema também permite usar **Harmony** caso seja necessário sobrescrever ou interceptar comportamento do jogo quando você não encontra suporte direto em APIs/eventos.

			E, quando o objetivo é entender o que o código do jogo faz por baixo dos panos, uma ferramenta como **ILSpy** ajuda bastante para decompilar e analisar o comportamento interno.

			---

			## 3) Requisito de .NET: por que .NET 6.x?

			Hoje, a versão de .NET que é requisito/suportada para criação de mods em C# (no ecossistema atual do Stardew/SMAPI) é a **6.x**.

			A própria documentação explica o motivo (e deixa claro o problema do EOL):

			"That's the version installed and used by the game. Newer versions may not be installed for players, and SMAPI may not be able to load them. Yes we know it's EOL."

			Ou seja: mesmo que existam versões mais novas do .NET, elas podem não estar instaladas para os jogadores, e o SMAPI pode não conseguir carregar.

			Por isso, as configurações do projeto (principalmente o csproj) precisam ser revisadas e alinhadas com esse alvo. Para isso, existe documentação na página do pacote no NuGet, incluindo as opções recomendadas.

			Com esses pontos levantados, o próximo passo é criar uma solution com um projeto do tipo **Class Library**, e ter como entrada o arquivo **ModEntry.cs**, que é onde você registra e centraliza a escuta dos eventos do mod.

			---

			## 4) Inspiração: por que eu quis criar este MOD?

			Eu não jogo com tanta frequência (na verdade é bem raro), mas um dia fui convidado por um grupo de amigos a jogar. E, para mim, é inevitável não analisar como as coisas funcionam por trás e não imaginar a linha de raciocínio do desenvolvedor.

			Jogando multiplayer, eu não pude deixar de reparar que, apesar do jogo suportar multiplayer nativamente, ele é bem mais focado no modo solo.

			No modo solo:

			- o jogador tem uma fazenda só para ele;
			- o jogo já foi pensado para entregar dificuldade e progressão com base nessa fazenda individual;
			- recursos como madeira, pedra, grama, fibra etc. podem ficar escassos com o tempo;
			- chega uma hora que você precisa replantar árvores para madeira, espalhar/recuperar grama, e até depender de itens como sementes de fibra (que você só consegue bem depois no jogo) para manter a produção.

			Então, se o jogo espera que no solo o jogador já lide com escassez, imagine no multiplayer com 4 jogadores (ou mais) disputando exatamente os mesmos recursos. O resultado natural é:

			- ninguém consegue progredir da mesma forma que no solo;
			- leva bem mais tempo;
			- exige bem mais conhecimento para buscar outras formas de obter os mesmos recursos.

			E ainda tem o problema de espaço: como 4 jogadores (ou mais) vão organizar tudo em uma única fazenda, se cada um pode ter construções e plantações próprias? O espaço fica escasso também.

			O próprio jogo acaba promovendo disputa em alguns cenários:
			- existe a opção de separar o dinheiro por jogador;
			- as casas, nativamente, já são separadas (cada um tem a sua).

			A conclusão fica bem direta: se cada jogador tivesse a sua fazenda, seria possível seguir o mesmo fluxo de progressão que o desenvolvedor pensou para o modo solo, sem transformar o multiplayer em uma briga constante por recurso e por espaço.

			E a história de lançamento reforça essa sensação:
			- Stardew Valley foi lançado para PC em fevereiro de 2016 como um jogo exclusivamente single-player.
			- A atualização 1.3 (que trouxe cooperativo) saiu oficialmente para PC em 1º de agosto de 2018, mais de dois anos depois do lançamento inicial.
			- E, mesmo hoje, em plataformas como mobile, o multiplayer fica escondido e é tratado como experimental.

			Essa foi minha inspiração para criar o MOD.

			---

			## 5) O que o MOD faz (detalhado)

			A ideia central é: **cada jogador convidado (farmhand) ganha a própria fazenda**.

			### 5.1) Fazendas individuais para convidados
			- O MOD adiciona uma fazenda para cada jogador convidado que entrar.

			#### 5.1.1) Tipo de fazenda configurável
			- Por padrão, a fazenda do convidado é do mesmo tipo da fazenda que o host escolheu ao criar o save.
			- Mas existe no config.json do MOD uma opção para dizer que os convidados podem receber qualquer outro tipo de fazenda nativa do jogo.

			### 5.2) Entradas da fazenda principal redirecionadas
			- Eu modifiquei as entradas da fazenda principal (a fazenda vanilla que o jogo cria nativamente).
			- Essa modificação permite direcionar cada jogador de forma condicional:
			- o host continua indo para a fazenda principal;
			- cada convidado cai na sua própria fazenda.

			### 5.3) Menu de viagem entre fazendas (teleporte)
			- Eu adicionei um menu de teleporte.
			- Ao apertar a tecla K (configurada por padrão no config.json) e estando em uma das fazendas (seja do host ou de um convidado), o menu abre.
			- Esse menu permite viajar entre as fazendas:
			- tanto para a fazenda do host quanto para as dos convidados;
			- tanto o host quanto os convidados conseguem usar.

			### 5.4) Comando de limpeza das fazendas dos convidados
			- Eu adicionei um comando para limpeza apenas das fazendas dos convidados.
			- Eu não considero esse comando algo "legal" de usar em gameplay normal, porque a ideia é que o jogador limpe da forma tradicional que o jogo espera, não por comando.
			- Mesmo assim, ele existe e um jogador convidado não consegue usar ele na fazenda de outro jogador convidado, apenas na sua.
			- Apenas o jogador Host consegue limpar a de qualquer convidado, e tambem consegue passar uma flag \`all\` para o comando que limpa a de todos os jogadores convidados. 
			- O comando remove:
			- árvores,
			- fibras,
			- pedras,
			- pedras grandes,
			- troncos,
			- troncos grandes,
			- gramas.

			### 5.5) Saída das casas dos convidados redirecionada
			- Eu modifiquei a saída das casas vanilla apenas dos jogadores convidados.
			- Quando o convidado sai da própria casa, ele ou qualquer outro jogador que sair pela casa dele, é levado para frente da FarmHouse que existe na fazenda individual dele.

			Isso acontece porque:
			- a fazenda do convidado herda da classe Farm;
			- a FarmHouse dessa fazenda recebe uma ação na porta pelo Mod:
			- quem interage com a porta entra na casa do dono daquela fazenda de convidado.

			---

			## 6) Configurações (como ligar/desligar o comportamento)

			Eu adicionei configurações para controlar como o modo deve funcionar.

			- Se você não quiser que os convidados sejam redirecionados para a própria fazenda ao sair da casa, dá para desativar mudando apenas uma propriedade booleana no config.json.
			- Se você não quiser que, nas entradas para a fazenda principal, cada convidado seja levado para sua fazenda (e quiser que o teleporte nativo funcione levando todos para a fazenda principal), dá para fazer mudando apenas uma propriedade booleana no config.json.
			- Se quiser mudar a tecla padrão que abre o menu de viagem entre fazendas, é só mudar uma propriedade do tipo string no config.json.
			- Se quiser que os convidados parem de receber o mesmo tipo de fazenda do host, dá para configurar mudando uma propriedade do tipo string no config.json e informando qual tipo de fazenda os convidados devem receber.

			---

			## 7) Desafios técnicos que eu encontrei

			### 7.1) O maior desafio: interceptar teleporte antes do warp (sem Harmony)
			A biblioteca e o ecossistema que eu estava usando não me davam um evento para eu ouvir quando um jogador:
			- vai ser teleportado, ou
			- está em processo de teleporte.

			O que existe é evento apenas para quando ele **já foi teleportado**.

			Isso até ajudaria a redirecionar o convidado ao chegar na fazenda, mas abriu problemas que eu não quis aceitar como solução principal.

			O motivo:

			- A borda do mapa que faz o teleporte sempre manda os jogadores para a fazenda vanilla do host (aquela escolhida na criação do save).
			- Mas e se os convidados tiverem tipo de fazenda diferente do host?
			- Se eu só recebo um evento depois do teleporte, e esse evento me diz apenas:
			- quem foi teleportado,
			- e de onde veio,
			isso não me entrega o destino original, nem detalhes suficientes para eu redirecionar com precisão sem gerar efeitos colaterais.

			E ainda teria o problema do "duplo teleporte":
			- o jogador seria teleportado primeiro para a fazenda vanilla do host,
			- e só depois eu forçaria um segundo teleporte para a fazenda correta do convidado.

			Eu não aceitei isso como a única forma.

			### 7.2) A solução indireta que eu implementei
			Investigando e adquirindo conhecimento, eu encontrei uma forma indireta que entregou o que eu queria.

			Em vez de depender do teleporte nativo da borda do mapa, eu fiz o seguinte:

			1) Eu edito via código os mapas que dão acesso direto à fazenda principal.
			2) Eu removo das propriedades de teleporte desses mapas os warps vanilla para a fazenda.
			3) Nos tiles que antes tinham teleporte, eu adiciono ações minhas (actions).
			4) Quando a action dispara, eu redireciono cada jogador condicionalmente para a fazenda dele.

			Porém, existia um detalhe importante:
			- havia teletransportes em tiles que ficam fora da borda do mapa;
			- actions registradas em tiles não disparam se o tile não estiver dentro da borda do mapa.

			Então eu precisei tratar isso:
			- identificar o tile mais próximo da borda que fosse válido para receber a action.

			E também precisei editar os mapas das fazendas que dão acesso aos mapas de entrada que eu editei:
			- para evitar que o jogador caísse exatamente no tile onde eu registrei a action, causando comportamentos estranhos.

			Na prática, a solução foi:
			- remover o teleporte nativo do jogo,
			- e substituir por um meu.

			Para isso, eu usei eventos disparados ao abrir o save (onde eu consigo acessar os mapas do jogo) e criei uma função para escutar as actions registradas nos tiles.

			#### Ponto negativo dessa abordagem
			Se outros mods usarem os valores de teleporte que ficam nas propriedades desses mapas (que eu editei), eles com certeza não vão achar o que esperam.

			---

			## 8) Outro desafio: fazendas de convidados herdando da classe Farm e DefaultBuildings

			Como eu já mencionei, as fazendas dos convidados herdam da classe Farm.

			Com isso, elas acabam, em algum momento, recebendo DefaultBuildings. Em alguns testes eu até forcei para a fazenda já ser criada com DefaultBuildings desde cedo.

			DefaultBuildings inclui:
			- Farmhouse
			- Greenhouse
			- PetBowl
			- Shipping

			O problema é que alguns eventos nativos do jogo acabam sendo redirecionados para as fazendas dos convidados, o que gera bugs. E eu precisei tratar tudo o que encontrei, porque nem tudo na classe Farm me permite desativar apenas pela instância do objeto.

			Eu poderia ter resolvido muita coisa com menos "arrodeio" usando Harmony, mas eu levei em consideração a compatibilidade com outros mods:
			- ou meu mod poderia acabar quebrando outros mods que mexem nas mesmas coisas,
			- ou meu mod poderia ser impactado por modificações de outros mods.

			Então a ideia foi realmente ficar o máximo possível no fluxo baseado no pacote Pathoschild.Stardew.ModBuildConfig e nos eventos/APIs, evitando patching direto como caminho principal.

			---

			## 9) Links onde eu documentei problemas e acompanhamento

			Alguns desafios que eu encontrei e documentei para melhorias futuras:

			- Discussão técnica (redirecionar farmhands antes do warp sem Harmony e evitando duplo warp):
			<a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://forums.nexusmods.com/topic/13530978-redirect-farmhands-before-warp-without-harmony-avoiding-double-warp/'>https://forums.nexusmods.com/topic/13530978-redirect-farmhands-before-warp-without-harmony-avoiding-double-warp/</a>

			- Página de bugs do MOD:
			<a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://www.nexusmods.com/stardewvalley/mods/38441?tab=bugs'>https://www.nexusmods.com/stardewvalley/mods/38441?tab=bugs</a>
			
		`,
	},
];

// Helper functions for blog data
export const getFeaturedPosts = () => blogPosts.filter(post => post.featured);
export const getPostById = (id: string) => blogPosts.find(post => post.id === id);
export const getPostsByTag = (tag: string) => blogPosts.filter(post => post.tags.includes(tag));
export const getRecentPosts = (limit: number = 6) =>
	blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);
