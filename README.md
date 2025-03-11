# Portfólio | Jadiael Juvino

Bem-vindo(a) ao repositório do meu portfólio! Este projeto foi desenvolvido com o objetivo de apresentar minhas habilidades e experiências como **Engenheiro de Software** e **Entusiasta de Tecnologia**. Sinta-se à vontade para explorar, contribuir (caso queira) ou se inspirar para criar o seu próprio portfólio.

---

## Visão Geral

Este portfólio conta com uma estrutura **HTML** + **CSS (Tailwind)** + **JavaScript** para exibição das minhas principais informações profissionais, como:
- Seção sobre mim.
- Lista de habilidades e ferramentas.
- Seção de projetos (com integração via **API do GitHub**).
- Formulário de contato que abre o WhatsApp com mensagem pré-preenchida.
- E muito mais!

---

## Tecnologias e Bibliotecas Utilizadas

- **Tailwind CSS**: Responsável pela estilização geral e pelos utilitários de layout.  
- **Boxicons**: Biblioteca para ícones leves e modernos, integrados diretamente em tags `<i>`.  
- **confetti.browser.js**: Para a animação de confetes exibida ao interagir várias vezes com o logo.  
- **Local Storage** (nativo do navegador): Para persistência dos dados dos repositórios do GitHub, incluindo **expiração** para evitar requisições repetidas.  
- **Vanilla JavaScript**: Lógica geral do site, incluindo paginação, consumo de API, manipulação de formulário e eventos de rolagem.

---

## Conceitos Implementados

1. **Consumo de API do GitHub**  
   - Foi criada uma chamada à API do GitHub para buscar meus repositórios públicos.  
   - Ordenação e filtragem prévias para selecionar apenas os que desejo exibir (até 100 repositórios por requisição).

2. **Persistência em Local Storage com Expiração**  
   - Após a primeira requisição bem-sucedida, os repositórios são salvos no **Local Storage** por meio da função `setItemWithExpiry`, que recebe um TTL (tempo de expiração) em milissegundos.  
   - A função `getItemWithExpiry` verifica se o item ainda está válido; caso contrário, remove-o e realiza uma nova chamada à API.

3. **Paginação Dinâmica**  
   - A exibição dos repositórios é dividida em páginas, com um número fixo de repositórios (`REPOS_PER_PAGE`) por página.  
   - Há dois botões: **Anterior** e **Próximo**, que alteram o índice da página exibida.  
   - Os repositórios visíveis são cortados (`slice`) de acordo com o índice calculado (`startIndex` e `endIndex`).

4. **Formulário de Contato com WhatsApp**  
   - O formulário coleta nome, email e mensagem.  
   - Ao clicar em `Enviar Mensagem`, é aberta uma nova aba com o *WhatsApp Web*, preenchendo automaticamente o texto para envio.  
   - Esse comportamento é configurado na ação do formulário usando JavaScript (arquivo `main.js`).

5. **Botão de Voltar ao Topo**  
   - Exibe um botão flutuante quando o usuário faz scroll na página.  
   - Ao ser clicado, leva suavemente a rolagem de volta ao topo.

---

## Estrutura de Pastas

Exemplo de organização (resumida) do projeto:

```
.
├─ index.html
├─ README.md
├─ assets
│  ├─ css
│  │  └─ tailwind.min.css
│  ├─ img
│  │  └─ (imagens do portfólio)
│  ├─ js
│  │  ├─ main.js
│  │  └─ githubRepos.js
│  └─ pdf
│     └─ jadiael_cv.pdf
└─ ...
```

---

## Como Usar

1. **Clone o Repositório**  
   (```)
   git clone https://github.com/SEU_USUARIO/SEU_PORTFOLIO.git
   (```)

2. **Abra o `index.html`**  
   Basta abrir o arquivo `index.html` no seu navegador preferido ou hospedar em um servidor local (ex.: Live Server do VSCode).

3. **Aproveite e Explore**  
   - Explore a página inicial, confira as seções e teste o formulário de contato.  
   - Verifique os repositórios sendo carregados dinamicamente e teste a paginação.

4. **Editar e Personalizar**  
   - Você pode alterar as cores, imagens e textos no `index.html`.  
   - Caso queira modificar a lógica de consumo de API, edite `githubRepos.js`.

---

## Como Funciona a Lógica da API e Cache (Local Storage)

1. **githubRepos.js**  
   - Faz a requisição à API de repositórios do GitHub.  
   - Após obter todos os repositórios, salva-os em Local Storage com a função `setItemWithExpiry`, definindo um tempo de vida (TTL).  
   - Caso haja dados salvos e ainda válidos (verificados pela função `getItemWithExpiry`), a aplicação os utiliza sem precisar buscar novamente na API.

2. **Paginação**  
   - A exibição dos repositórios é dividida em páginas (`REPOS_PER_PAGE`).  
   - Há botões de **anterior** e **próximo** para navegar entre as páginas.  
   - Cada vez que o usuário muda de página, são exibidos apenas os repositórios correspondentes ao intervalo daquela página.

3. **Eventos e Elementos do DOM**  
   - As informações de cada repositório são injetadas dinamicamente no DOM.  
   - Há checagens para desabilitar botões de página, caso o usuário esteja na primeira ou última página.

---

## Customizações Possíveis

- **Estilo**: Você pode substituir o Tailwind CSS por outro framework (Bootstrap, Bulma, etc.) ou usar CSS puro.  
- **Ícones**: Boxicons podem ser substituídos por Font Awesome ou outra biblioteca de sua preferência.  
- **Animação de Confetes**: A biblioteca `confetti.browser.js` pode ser ajustada para personalizar o formato, quantidade de partículas, entre outros detalhes.  
- **Outras Seções**: Sinta-se livre para adicionar seções como Blog, Depoimentos, etc.

---

## Contribuindo

Se você deseja contribuir, fique à vontade para abrir uma **issue** ou enviar um **pull request** com sugestões de melhorias, correções ou novas funcionalidades. Toda ajuda é bem-vinda!

---

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT). Sinta-se livre para usar, modificar e distribuir à vontade.

---

## Autor

**Jadiael Juvino**  
Engenheiro de Software, entusiasta de tecnologia e criador deste projeto de portfólio.  
Entre em contato pelos meios listados no próprio site ou via:

- **Email**: [jadiael1@gmail.com](mailto:jadiael1@gmail.com)
- **WhatsApp**: [+55 81 9 9520-7789](https://api.whatsapp.com/send/?phone=%2B5581995207789&text=Estou%20entrando%20em%20contato%20a%20partir%20do%20seu%20portifolio&type=phone_number&app_absent=0)
- **GitHub**: [github.com/jadiael1](https://github.com/jadiael1)
- **LinkedIn**: [linkedin.com/in/jadiael](https://www.linkedin.com/in/jadiael/)

Aproveite e obrigado por visitar meu portfólio!
