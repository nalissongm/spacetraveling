# Tasks

- [x] Clone template.
- [x] Instalar dependências.
- [x] Configurar Prismic.

### pages/\_document.tsx

- [x] Configurar a importação da fonte `Inter` do Google Fonts.Tamanhos: `Regular`, `Semi Bold` e `Bold`.

### pages/\_index.tsx

- [x] Deve renderizar todos os posts da paginação.
- [x] Exibir o botão `Carregar mais posts`, caso existam mais posts a ser carregados.

  > **Observação**:
  > o valor `next_page` retornado pela Prismic não pode ser `null`. Caso contrário, o botão não deve ser renderizado.

- [x] A logo `spacetraveling` deve ser exportada do Figma e salva na pasta `public`.
- [x] A logo deve ter o `alt` com o valor `logo` para que o teste possa encontrá-la corretamente.

- [x] Ao clicar no post, é preciso navegar para a pagina do post com a url `/post/slugDoPost`.
- [x] Url do post deve ser referente ao valor `slug` retornado pelo Prismic.

- [x] A página deve ser gerada estaticamente utilizando `getStaticProps` para buscar os dados do Prismic e popular a sua prop `postsPagination`.

  > **Atenção**: Nesse método é obrigatório utilizar o [query](https://prismic.io/docs/technologies/query-a-single-type-document-javascript) do Prismic.

### pages/home.module.scss

- [x] Estilizar pagina principal.

### pages/post/[slug].tsx

- [x] O arquivo deve renderizar toda a informação do post e o component `Header`.

- [x] O tempo estimado de leitura deve ser calculado manualmente por você:

  1. Calcular todas as palavras dentro do texto do seu post.
  2. Dividir pela média de palavras que um ser humano lê por minuto.
  3. Arredondar para cima.

> Para esse desafio, utilize que o ser humano leia, em média, 200 palavras por minuto.
> Então se o seu texto possuir 805 palavras, você irá dividir por 200 e arredondar o resultado para cima, chegando assim no valor de 5 minutos estimados para leitura do post.

- [x] Você deve iterar no array da propriedade `content` para buscar a quantidade de palavras de cada seção (`heading` e `body`).

> Para calcular o tempo estimado de leitura, sugerimos utilizar o método `reduce` para iterar o array `content`, o método `PrismicDOM.RichText.asText` para obter todo o texto do `body` e utilizar o método `split` com uma `regex` para gerar um array de palavras.

- [x] A logo `spacetraveling` deve ser exportada do Figma e salva na pasta `public`.
- [x] A logo deve ter o `alt` com o valor `logo` para que o teste possa encontrá-la corretamente.

- [x] A página deve ser gerada estaticamente utilizando o `getStaticProps` para buscar os dados do Prismic e popular a sua prop `post`.

  > Nesse método é obrigatório utilizar o [getByUID](https://prismic.io/docs/technologies/query-helper-functions-javascript#getbyuid) do Prismic.

- [x] Você deve utilizar o `getStaticPaths` para gerar as páginas estáticas de alguns posts.
- [x] Você deve setar o `fallback` como `true` para que o restante seja gerado no momento da requisição.

  > Nesse método é obrigatório utilizar o [query](https://prismic.io/docs/technologies/query-a-single-type-document-javascript) do Prismic.

- [x] Nos casos que cairem no `fallback`, é **obrigatório** que você renderize pelo menos um texto na tela dizendo `Carregando...` para que o teste consiga verificar esses casos corretamente.

### posts/post.module.scss

- [x] Estilizar a página de post.

### components/Header/index.tsx

- [x] O arquivo deve renderizar a logo `spacetraveling`.
- [x] A logo `spacetraveling` deve ser exportada do Figma e salva na pasta `public`.
- [x] A logo deve ter o `alt` com o valor `logo` para que o teste possa encontrá-la corretamente.
- [x] Ao clicar na logo, deve ser possível navegar para a página principal `/`.

### components/Header/header.module.scss

- [x] Estilização do Header da aplicação.

### styles/global.scss

- [x] Estilização global da sua aplicação (ex.: variáveis das cores do seu projeto).

### styles/common.module.scss

- [x] Estilização comum entre os arquivos das suas páginas (ex.: largura máxima).

## Testes

### components/Header/index.tsx

- [x] **should be able to render logo**

  > Para que esse teste passe você deve renderizar a logo do site com o valor do `alt` sendo `logo`

- [x] **should be able to navigate to home page after a click**

  > Para que esse teste passe você deve navegar para a página principal após o click na logo.

### pages/Home/index.tsx

- [x] **should be able to return prismic posts documents using getStaticProps**

  > Para que esse teste passe você deve retornar do `getStaticProps` os dados do Prismic de acordo com as `interfaces` já disponibilizada no template. Obrigatório utilizar o método
  > `query` do Prismic.

- [x] **should be able to render posts documents info**

  > Para que esse teste passe você deve renderizar em tela a listagem de posts com as informações de título, subtítulo, data de criação (já formatada) e autor do post.

- [x] **should be able to navigate to post page after a click**

  > Para que esse teste passe você deve navegar para a página do post clicado seguindo o padrão `/post/slugDoPost` onde `slugDoPost` é o valor `slug` de cada post retornado pel
  > o Prismic

- [x] **should be able to load more posts if available**

  > Para que esse teste passe você deve renderizar em tela o botão com o valor `Carregar mais posts` caso o `next_page` indique que existam mais posts a serem exibidos (link).
  > Ao clicar no botão, você carregar os posts da nova paginação e concatenar com os existentes em tela. Obrigatório utilizar o `fetch`.

- [x] **should not be able to load more posts if not available**

  > Para que esse teste passe você não deve renderizar em tela o botão `Carregar mais posts` caso o `next_page` indique que não há mais posts a serem carregados (`null`).

### pages/post/[slug].tsx

- [x] **should be able to return prismic posts documents paths using getStaticPaths**

  > Para que esse teste passe você deve retornar do `getStaticPaths` os dados do Prismic de acordo com as `interfaces` já disponibilizada no template. Obrigatório utilizar o método `query` do Prismic.

- [x] **should be able to return prismic post document using getStaticProps**

  > Para que esse teste passe você deve retornar do `getStaticProps` os dados do Prismic de acordo com as `interfaces` já disponibilizada no template. Obrigatório utilizar o método `getByUID` do Prismic.

- [x] **should be able to render post document info**

  > Para que esse teste passe você deve renderizar em tela o título, data de criação (já formatada), autor, tempo estimado de leitura (calculado por você) e conteúdo (`heading` e `body`) do post.

- [x] **should be able to render loading message if fallback**

  > Para que esse teste passe você deve renderizar em tela uma mensagem com o texto `Carregando...` caso o post não tenha sido gerado estaticamente e caia no `fallback`.
