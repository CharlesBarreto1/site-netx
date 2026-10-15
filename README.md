# NetX — site institucional

Site estático em português, sem dependências de build. Os arquivos publicados estão em `dist/`.

## Desenvolvimento

Execute `python3 -m http.server 4321 --directory dist --bind 127.0.0.1` na raiz do projeto.

## Conteúdo e contato

- Portfólio baseado no documento aprovado `../NETX-PORTFOLIO.md`.
- E-mail comercial: contato@netx.dev.br.
- WhatsApp: +55 44 92006-2580.
- O formulário prepara a mensagem no WhatsApp; o visitante confirma o envio no aplicativo. E-mail e cópia da mensagem são alternativas. Não há envio nem armazenamento no servidor.
- A fonte Manrope é servida localmente, com licença OFL em `dist/assets/`.
- A marca NetX foi reutilizada dos materiais locais existentes. O X ilustrativo é um elemento gráfico do site.

## Produção — Cloudflare Workers Static Assets

Domínio de produção: https://netx.dev.br/.

Repositório: https://github.com/CharlesBarreto1/site-netx. A publicação de produção é feita pela integração Git configurada na aplicação `netx` do Cloudflare Workers.

| Configuração | Valor |
|---|---|
| Aplicação | `netx` |
| Branch de produção | `main` |
| Diretório raiz | Raiz do repositório |
| Build command | Nenhum (site estático, sem compilação) |
| Deploy command | `npx wrangler deploy` |
| Diretório de assets | `./dist`, declarado em `wrangler.jsonc` |
| Domínio personalizado | `netx.dev.br` |

Depois de enviar um commit à branch `main`, acompanhe a implantação na aplicação existente do Cloudflare. O Wrangler publica os arquivos de `dist/`, incluindo `index.html`, `styles.css`, `app.js` e `assets/`.

O domínio é gerenciado no painel Cloudflare. `workers_dev` e `preview_urls` estão desativados na configuração para preservar o estado existente desses endereços.

Canonical, metadados sociais, dados estruturados e sitemap usam o domínio de produção. A imagem social é entregue em PNG, com fonte vetorial SVG.

Referência de configuração: https://developers.cloudflare.com/workers/static-assets/binding/.

## Ambiente de revisão inicial

O arquivo `.openai/hosting.json` preserva a identidade do ambiente privado usado na primeira revisão. A hospedagem de produção utiliza o Cloudflare Workers conectado ao GitHub.
