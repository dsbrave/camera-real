# Camera Real - Plataforma de Videochat

Uma plataforma moderna de videochat ao vivo construída com Next.js, oferecendo experiências interativas em tempo real.

## 🚀 Características

- **Interface Moderna**: Design responsivo e elegante com animações suaves
- **Carrossel de Modelos**: Exibição destacada de modelos em destaque para usuários logados
- **Sistema de Autenticação**: Login/cadastro com diferentes tipos de usuário
- **Chat em Tempo Real**: Videochat interativo com sistema de moedas (Créditos)
- **Video Player Profissional**: Mock de player com controles hover, indicadores HD e badge AO VIVO
- **Painel do Usuário**: Área personalizada para gerenciamento de conta
- **Sistema de Carteira**: Compra e gerenciamento de Créditos
- **Páginas Institucionais**: Sobre, FAQ, Termos, Política de Privacidade
- **UX Mobile Otimizada**: Botões redondos mobile-friendly com feedback tátil

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 13.5.11
- **Styling**: Tailwind CSS
- **Linguagem**: TypeScript
- **Componentes**: React 18
- **Animações**: CSS personalizado com gradientes dinâmicos

## 📁 Estrutura do Projeto

```
camera-real/
├── frontend/
│   ├── public/
│   │   ├── images/          # Imagens do projeto
│   │   │   ├── icons/           # Ícones SVG
│   │   │   └── video-player-placeholder.png  # Placeholder do video player
│   │   ├── src/
│   │   │   ├── components/      # Componentes reutilizáveis
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── AnimatedBackground.tsx
│   │   │   ├── pages/           # Páginas da aplicação
│   │   │   │   ├── index.tsx    # Página principal
│   │   │   │   ├── explorar.tsx # Explorar modelos
│   │   │   │   ├── login.tsx    # Login
│   │   │   │   ├── cadastro.tsx # Cadastro
│   │   │   │   ├── chat-video.tsx # Interface de videochat
│   │   │   │   └── ...
│   │   │   └── styles/          # Estilos globais
│   │   └── package.json
│   └── README.md
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/dsbrave/camera-real.git
cd camera-real
```

2. Navegue para o diretório frontend:
```bash
cd frontend
```

3. Instale as dependências:
```bash
npm install
```

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 🎯 Funcionalidades Principais

### 🎨 Design e UX
- **Hero Section**: Apresentação impactante com vídeo de fundo
- **Cards de Modelos**: Grid responsivo com informações dos modelos
- **Navegação Intuitiva**: Menu responsivo com dropdown de usuário
- **Botões de ação**: "Explorar Agora" e "Comprar Créditos"
- **Video Player Mockup**: Interface profissional com controles hover-only

### 🎥 Video Player Features
- **Controles Hover**: Controles aparecem apenas no hover para experiência limpa
- **Badge AO VIVO**: Indicador de transmissão ao vivo
- **Indicadores HD**: Qualidade, rating e número de visualizadores
- **Barra de Progresso**: Timer visual com cores da marca
- **Identidade Visual**: Cores rosa (#F25790) aplicadas consistentemente
- **Responsivo**: Otimizado para desktop e mobile

### 👥 Tipos de Usuário
- **Visitantes**: Podem visualizar a página inicial e se cadastrar
- **Usuários**: Podem navegar, comprar Créditos e iniciar videochats
- **Modelos**: Podem gerenciar perfis, definir preços e atender clientes

### 📱 Páginas Principais
- `/` - Homepage com apresentação e modelos em destaque
- `/explorar` - Catálogo completo de modelos
- `/carteira` - Gerenciamento de Créditos
- `/chat-video` - Interface de videochat com player profissional
- `/painel-usuario` - Dashboard do usuário
- `/painel-modelo` - Dashboard do modelo
- `/login` e `/cadastro` - Autenticação
- `/suporte` - Página de suporte com IA

## 🎨 Design

O projeto utiliza uma paleta de cores moderna com:
- **Rosa principal**: #F25790
- **Roxo**: #8B5CF6
- **Azul**: #3B82F6
- **Fundo escuro**: Gradientes dinâmicos

### Componentes Visuais
- Background animado com efeitos de mouse
- Cards com efeitos de hover e blur
- Gradientes responsivos
- Ícones SVG personalizados
- Video player com animações suaves
- Botões mobile-friendly com feedback tátil

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run start    # Servidor de produção
npm run lint     # Verificação de código
```

## 📱 Mobile Experience

### Otimizações Mobile
- **Botões Redondos**: Design mobile-friendly com área de toque otimizada
- **Feedback Tátil**: Animações de hover e active states
- **Layout Responsivo**: Adaptação automática para diferentes tamanhos de tela
- **Navegação Simplificada**: Botões posicionados abaixo do chat para fácil acesso

## 🚀 Próximos Passos

- [ ] Sistema de pagamento para Créditos
- [ ] Implementação completa do WebRTC
- [ ] Sistema de notificações em tempo real
- [ ] Chat por texto durante videochamadas
- [ ] Sistema de avaliações e comentários
- [ ] Programa de afiliados
- [ ] App mobile nativo
- [ ] Integração com streaming real

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato através da página de suporte da plataforma.

---

**Camera Real** - Conectando pessoas através de videochats em tempo real 🎥✨ 