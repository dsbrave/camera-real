# Camera Real - Plataforma de Videochat

Este projeto implementa uma plataforma de transmissão ao vivo (camming) semelhante ao Chaturbate/CameraPrive, onde modelos podem fazer streams interativos e usuários podem assistir, enviar gorjetas (tips) e pagar por shows privados.

## Tecnologias Utilizadas

- **Frontend**: Next.js (React) com TypeScript
- **Estilização**: TailwindCSS
- **Futuras Implementações**:
  - Backend com Node.js/Express
  - Banco de dados PostgreSQL
  - Streaming com WebRTC ou HLS.js
  - Integração de pagamentos (Stripe, PagSeguro, etc)

## Estrutura do Projeto

```
/camera-real
  /frontend (Next.js)
    /public
      /images  - Imagens do site
      /icons   - Ícones do site
    /src
      /components - Componentes reutilizáveis
      /pages      - Páginas do site
      /styles     - Estilos CSS
  /backend (Futuro)
```

## Requisitos

- Node.js 14.x ou superior
- npm 6.x ou superior

## Como Instalar

```bash
# Navegar para o diretório frontend
cd frontend

# Instalar dependências
npm install
```

## Como Executar

```bash
# Iniciar o servidor de desenvolvimento
npm run dev
```

Depois de iniciar, acesse http://localhost:3000 no seu navegador.

## Páginas Implementadas

- **/** - Página inicial/landing page
- **/login** - Página de login
- **/cadastro** - Página de cadastro de usuários
- **/seja-modelo** - Página informativa sobre ser modelo
- **/videochats** - Página sobre os videochats

## Próximos Passos

- Implementação da autenticação
- Implementação da página de transmissão
- Integração com backend
- Sistema de chat em tempo real
- Sistema de pagamentos e gorjetas
