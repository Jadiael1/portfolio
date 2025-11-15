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
	{
		id: '2',
		title: 'Manipulação de memória.',
		excerpt: 'Praticando ponteiros e offsets revisitando GTA San Andreas v1.0.1.32 (Rockstar Games Launcher).',
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

- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1POkz2zTOSX7nkzYA1K3g0itIfp53N6xV/view?usp=sharing'>GTASAsf1.b.fim_da_linha</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1I_hCnObKsOomFfcNZiNNzz05hJiY8VfF/view?usp=sharing'>GTASAsf1.b.loas_desperados</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1R7iAcT63iQcclitBXYZqUGbpONzSPttS/view?usp=sharing'>GTASAsf1.b.revolta</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1wxfbaXLgfU3fXNfbDfFn0ViSld8R2DiW/view?usp=sharing'>GTASAsf1.b.grove_eternamente</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1peJ2XjNEOM0yajjPwX8YP2_DXPpQisaQ/view?usp=sharing'>GTASAsf1.b.porrada_no_b-dup</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1THzd9elZl-DhUANnJrJfaw2BM2k3QXok/view?usp=sharing'>GTASAsf1.b.negocios_de_cortar_garganta</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1gOzAH0I7iovJf1Ve0WAlJrO8jSomh7cU/view?usp=sharing'>GTASAsf1.b.voltando_para_casa</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1aJS3qL8zvkE3hfe-_Ibhe9HKIIxoGmMY/view?usp=sharing'>GTASAsf1.b.passaro_vertical</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1Gl6ynXktSy3zWmCd-CR0RCFz94y9x_RC/view?usp=sharing'>GTASAsf1.b.limpando_o_cofre</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1Mpmj4slYptDEUwAgYqLOPuIlmSV3TEYp/view?usp=sharing'>GTASAsf1.b.para_o_alto_e_avante</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1l9iFxuphbOJ22ukKzNtvZ4U5pTufbZZY/view?usp=sharing'>GTASAsf1.b.motos_da_policia</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1WJulrsVh6tKZOsb24IQriVoZgzcUu7KE/view?usp=sharing'>GTASAsf1.b.grande_explosao</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1g7BYjkswpD-Fu0uz08JcpBqVOoLLu-Nl/view?usp=sharing'>GTASAsf1.b.chave_para_o_coracao_dela</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1ICZS2k6-11nB4A5wiUmyu4tG0Lm-byvO/view?usp=sharing'>GTASAsf1.b.espionagem_arquitetonica</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1GUpUz1yxH-vxEIMDJ9zbxPkhf1Yu-Unv/view?usp=sharing'>GTASAsf1.b.uma_casa_nas_colinas</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1KMi-bFWKyl4kHUSiBoNLXP0eQ2nSsWPH/view?usp=sharing'>GTASAsf1.b.saint_mark_bistro</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1pjMhYL_KreAD2fcotLGXYvaV5-Itunbg/view?usp=sharing'>GTASAsf1.b.ultimas_palavras</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1GNAJWXcTzYfGXSAONyhu3lvhG9uHaRtg/view?usp=sharing'>GTASAsf1.b.apropriacao_indebita</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1qw-ZoN-j0CqlekS72AXI0qR-WSfwVPwc/view?usp=sharing'>GTASAsf1.b.madd_dogg</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1v6hRe0MTC6Ge9mxnto3LHLFXI5jqFDgL/view?usp=sharing'>GTASAsf1.b.queda_livre</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1oxvPltg_2ioT2TdVr8oZcGpxH2V9RcQr/view?usp=sharing'>GTASAsf1.b.peixe_no_barril</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1ETFOQGdJQY5Ae2PRbPb_VhiFboxFLUmu/view?usp=sharing'>GTASAsf1.b.o_negocio_da_carne</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1dhNhdZrl2lm4FfWj6LbH8zga7zBKsJYZ/view?usp=sharing'>GTASAsf1.b.tratamento_intensivo</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1eI5OeeCjrW1sW-a6V8gcCSEVINY0q-Pr/view?usp=sharing'>GTASAsf1.b.santo_peyote</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/15d8v3sMLzd-vyMrMLbXvil6qydG9peV1/view?usp=sharing'>GTASAsf1.b.aqui_estao_seus_chips</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/14Q0haL5Lgi_h2eurAORfokBx5Yt8pfwZ/view?usp=sharing'>GTASAsf1.b.situacao_explosiva</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1phEqzQ0Yw0B0mWDiBqFCa_VMurNfx4n5/view?usp=sharing'>GTASAsf1.b.ketchup_no_parabrisa</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1JaRQNtac82yr_oCa569P_gKcFbhE8Nuu/view?usp=sharing'>GTASAsf1.b.perfuracoes</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1wELkD-o1Nv6xhUl88Qc1CXmhjH6a3CCI/view?usp=sharing'>GTASAsf1.b.rastreio_de_carro</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1fnTW2ORiCZOF9oJncKYVrSM_hNiNd202/view?usp=sharing'>GTASAsf1.b.teste_de_direcao</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1xlpvxD0hxgk3lSug96bVctEDaQa_aFhS/view?usp=sharing'>GTASAsf1.b.zerando</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1ZbcATbXKSYU1w10x5Bwam0O3hCxgf0Hq/view?usp=sharing'>GTASAsf1.b.gosma_verde</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/10KEVNULm_nW0fYFMZW4jHp_WxlBcpuL7/view?usp=sharing'>GTASAsf1.b.projeto_negro</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1IRhqz8Evh8F505iBHs71WomMEq1v1ltv/view?usp=sharing'>GTASAsf1.b.clandestino</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1izMd0JHOXW-jYsHA8sztiAEIiLnlA7bH/view?usp=sharing'>GTASAsf1.b.voo_em_baixa_altitude</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1g8O03rNyo1TVU5x74JpvjieoQQ6Q1lZT/view?usp=sharing'>GTASAsf1.b.aprendendo_a_voar</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1tCuNAJQTOHg65d8oTLGMd1qjlSVPaYhq/view?usp=sharing'>GTASAsf1.b-prado_verdejante</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1ecGHRzcRBysS24FemKhSJrU9c2op03GH/view?usp=sharing'>GTASAsf1.b.interdicao</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1CXhRWdMpte9NnaeCpi2FEC28cYVL9Y7X/view?usp=sharing'>GTASAsf1.b.robo_de_carga</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1iv403Q4U14gWY_8TNNtpmNfqIishdSR0/view?usp=sharing'>GTASAsf1.b.monstro</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1TSqsstHz5h31bGAmUwLTSZyIRN67mihl/view?usp=sharing'>GTASAsf1.b.drogas_explosivas</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1RTrWF2uBRPmdn-e6qdy26NoEDNXTZQCW/view?usp=sharing'>GTASAsf1.b.o_ultimo_voo_de_toreno</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1T6gc0klSl8MftoyY73tP4nm-EpeZzDAI/view?usp=sharing'>GTASAsf1.b.pier_69</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1tQrSj9fdrBKRHmM6fi4RFsqgU_p6opW4/view?usp=sharing'>GTASAsf1.b.assassino_frio</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/11LsPBQrZf0Y_XdBJZu3FlKttulTmCWWG/view?usp=sharing'>GTASAsf1.b.rastro_da_lesma</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1EGg3SqCtmrNDsMssiXtvKINAHZyzTJT3/view?usp=sharing'>GTASAsf1.b.batedor</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1CvsB5ynTH7k2dmLt0DDqvHbepCTlzyxB/view?usp=sharing'>GTASAsf1.b.os_da_nang_thang</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1ccB0JERW7TIm7XRhe_fN8G5vrAZ1P4cn/view?usp=sharing'>GTASAsf1.b.assalto_anfibio(2)</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1Pj-0ul81GSOG1mgCMigkSsy0rgC2vJ41/view?usp=sharing'>GTASAsf1.b.assalto_anfibio</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1jvhhrVoB-RhlDrAdgH-RAtScS1GKQGUn/view?usp=sharing'>GTASAsf1.b.isca</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/11gHHJFGtN2FHVeuZSxJZCI3QzsniZd3O/view?usp=sharing'>GTASAsf1.b.ran_fa_li</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1Kh72gpHtYFKDsdk4MelArHW5gaVVAytR/view?usp=sharing'>GTASAsf1.b.mountain_cloud_boys</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href=https://drive.google.com/file/d/1C15IGD4ZcS7PJLLoeM2JE0CgtDw5whVa/view?usp=sharing'>GTASAsf1.b.novo_modelo_de_exercito</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1DOS4WlOC1LEhloUV1Bp3aDbpL5Tc4wpx/view?usp=sharing'>GTASAsf1.b.linha_de_suprimento</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1J0O8sHSL5CUTX2HllIDdZFEXy21ZzbE8/view?usp=sharing'>GTASAsf1.b.ataque_aereo</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1QGNk0SeczKEUsIqo5TqrsHJfIaSDtl-f/view?usp=sharing'>GTASAsf1.b.mike_toreno</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1Wp320WxB30eRXby4syaGvZBsRtbdeytx/view?usp=sharing'>GTASAsf1.b.t-bone_mendez</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1q0KPaD24zqhRSvig5KDCsczyY170A8ty/view?usp=sharing'>GTASAsf1.b.jizzy</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1WC1qndYyuNEvN4lLM-Zv57j2hGvkv1iK/view?usp=sharing'>GTASAsf1.b.oportunidade_de_fotografar</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1CskrQG5RtOKQEKwr1_92RItMK-o_7UCv/view?usp=sharing'>GTASAsf1.b.voltando_para_a_escola</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1o5GulRUlZLtkdL_24rTeSsMC8cXskHVk/view?usp=sharing'>GTASAsf1.b.desconstrucao</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1e-Y_v0KRb9JY2-cQqUUQLZYqgiL4-JBc/view?usp=sharing'>GTASAsf1.b.555-disque-denuncia</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1z2PxZhayREVryOgecOWpSFutBQ7wHPYM/view?usp=sharing'>GTASAsf1.b.use_flores_no_seu</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1Y_2ReGUFOV86EeNi1GZYdpAM0YMVo2lZ/view?usp=sharing'>GTASAsf1.b.voce_esta_indo_para_san_fierro</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1tMge1y3D2ddUD_OWopQxlVSb54oB29W2/view?usp=sharing'>GTASAsf1.b.adeus_meu_amor</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1fNvdrbtI0SRpMN9eUdCdMSAG9yUz0XBZ/view?usp=sharing'>GTASAsf1.b.wu_zi_mu</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1v7oui-jg6xlHtpD6hPbOSTTo_jhRx-Kb/view?usp=sharing'>GTASAsf1.b.banco_de_cidade_pequena</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1XpNMq9pXgeMigL7hYSdsuW5wYuZpl_68/view?usp=sharing'>GTASAsf1.b.contra_todas_as_chances</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1z6NSqI4jjzTunmZBjNqIX3E4VHqzv00G/view?usp=sharing'>GTASAsf1.b.loja_de_bebidas_local</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1HF6phv-O0C8hF7NFRoMMAWJVg56aAJZ8/view?usp=sharing'>GTASAsf1.b.colheita_de_corpos1</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1TyKR7bLnGC7ilZNG68Bq8WbKM55kraP1/view?usp=sharing'>GTASAsf1.b.colheita_de_corpos</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1acP5Qm9q6APpwtYgfnYEoopDnbqOnc65/view?usp=sharing'>GTASAsf1.b.comandando_o_caminhao</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1o7usWQhT_fN9iN-KCrRr2H9nfvXWKyjk/view?usp=sharing'>GTASAsf1.b.terra_ruim</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/12e30oUlCvYWU8XenyQzPq2OXTnu2ir_F/view?usp=sharing'>GTASAsf1.b.o_sabre_verde</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1nflGygbcxEFVHt5VkETQhElWSLhziq9f/view?usp=sharing'>GTASAsf1.b.reunindo_as_familias</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1PtogsQPe92lTHNoJhUAaT7um5Zmg6Oc6/view?usp=sharing'>GTASAsf1.b.as_sepulturas</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1iP9BqJ7wd0WWfPdWOx3KhWTrkSnX2P0u/view?usp=sharing'>GTASAsf1.b.importacoes_cinzentas</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1h2aJ4NbBkFVKl9OS1DM2995E3FehSd6v/view?usp=sharing'>GTASAsf1.b.doberman</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1U1Ws0aku98k-_SVWY1Pz5e5ijQG9GuCr/view?usp=sharing'>GTASAsf1.b.desejo_incendiario</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1he2SNM6_V2S0E1OFqXg70nKz42cswv75/view?usp=sharing'>GTASAsf1.b.festa_em_casa</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1IxhMzGXJjEIpbop56B7Iu6OT3tswNXvP/view?usp=sharing'>GTASAsf1.b.problemas_de_gerenciamento</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1JpXNLTu0CjbxzJLhlvLpgjKk6qRweAJO/view?usp=sharing'>GTASAsf1.b.as_rimas_do_madd_dogg</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1tJSvdZAIEirvHpCtMQ4q6rYBMDItq8U5/view?usp=sharing'>GTASAsf1.b.apenas_negocios</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1_p3FRF7I9bF8U2hv0AI-rPcyNJ2Yx0Mr/view?usp=sharing'>GTASAsf1.b.lado_errado_dos_trilhos</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1xyCWaesT4JaDTJAZUWscyHpAxg6PhctS/view?usp=sharing'>GTASAsf1.b.covarde_fugitivo</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1XtFADoWll5sgH7dEsNQnUtBhLApr2ZXI/view?usp=sharing'>GTASAsf1.b.a_vida_e_uma_praia</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1OkYC8Ub0rma8kg0RXUeIZLC59NAE0qiV/view?usp=sharing'>GTASAsf1.b.og_loc</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1TzM6nqmw76dwFNz93rC3Jw3zaxkPa4_C/view?usp=sharing'>GTASAsf1.b.roubando_o_tio_sam</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1FqLJCuat8FTeHKKuVwE5UbfHFx5ix1jo/view?usp=sharing'>GTASAsf1.b.catalisador</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1d9cl4Pf79K3EOn4HN0kQjZV4gsBYBoMj/view?usp=sharing'>GTASAsf1.b.invasao_domiciliar</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1xAV_T82eVsTyqCBnotYOgvMtFHEzmnbS/view?usp=sharing'>GTASAsf1.b.apostas_altas_lowrrider</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1icCrmILO_RPCCU2-cmTUEWYs2D60CpHj/view?usp=sharing'>GTASAsf1.b.cesar_vialpando</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/19g4SxWF5cxp1Xo8bASuWbL-x2poPXm3d/view?usp=sharing'>GTASAsf1.b.a_mina_do_sweet</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1YPRNrSKmxuVuo5O59crege79LaQGgMvi/view?usp=sharing'>GTASAsf1.b.execucao</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1DeJrr57tyluN107jGRUad9bkBZOUn1hD/view?usp=sharing'>GTASAsf1.b.9mm_e_aks</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1qiYUVzWHVcXUaQg9FWto9RV10bMAUDh1/view?usp=sharing'>GTASAsf1.b.drive_thru</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1XlX1ceIjadtFKQLIRYVhSCyV7DHX46TL/view?usp=sharing'>GTASAsf1.b.limpando_o_bairro</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1oYMAMNjpx9DRG6CsPMSwcTHlI_mj3Le8/view?usp=sharing'>GTASAsf1.b.marcando_a_area</a>
- <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href='https://drive.google.com/file/d/1Bw1ukSSJEApeL-kOBPv3Ku57dApz3n71/view?usp=sharing'>GTASAsf1.b.ryder</a>

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
  <a target="_blank" rel="noopener noreferrer" class="text-blue-500" href="https://gist.github.com/Jadiael1/3b8e5694440a432ae28baf4d5a4d715d">https://gist.github.com/Jadiael1/3b8e5694440a432ae28baf4d5a4d715d</a>

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
		author: 'Jadiael Juvino',
		date: '2025-01-05T00:00:00-03:00',
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
		image: '/api/placeholder/800/400',
		featured: false,
	},
];

// Helper functions for blog data
export const getFeaturedPosts = () => blogPosts.filter(post => post.featured);
export const getPostById = (id: string) => blogPosts.find(post => post.id === id);
export const getPostsByTag = (tag: string) => blogPosts.filter(post => post.tags.includes(tag));
export const getRecentPosts = (limit: number = 6) =>
	blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);
