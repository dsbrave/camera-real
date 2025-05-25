# Camera Real - Plataforma de Videochat

Uma plataforma moderna de videochat ao vivo construída com Next.js, oferecendo experiências interativas em tempo real.

## 🚀 Características

- **Interface Moderna**: Design responsivo e elegante com animações suaves
- **Carrossel de Modelos**: Exibição destacada de modelos em destaque para usuários logados
- **Sistema de Autenticação**: Login/cadastro com diferentes tipos de usuário
- **Chat em Tempo Real**: Videochat interativo com sistema de moedas (ChatCoins)
- **Painel do Usuário**: Área personalizada para gerenciamento de conta
- **Sistema de Carteira**: Compra e gerenciamento de ChatCoins
- **Páginas Institucionais**: Sobre, FAQ, Termos, Política de Privacidade

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
│   │   │   └── icons/           # Ícones SVG
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
git clone <url-do-repositorio>
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

## 📱 Funcionalidades Principais

### Página Principal
- Layout diferenciado para usuários logados e não logados
- Carrossel de modelos em destaque (apenas para usuários logados)
- Botões de ação: "Explorar Agora" e "Comprar ChatCoin"
- Background animado responsivo

### Sistema de Usuários
- **Usuários**: Podem navegar, comprar ChatCoins e iniciar videochats
- **Modelos**: Podem se cadastrar e oferecer serviços de videochat

### Páginas Disponíveis
- `/` - Página principal
- `/explorar` - Galeria de modelos
- `/login` - Autenticação
- `/cadastro` - Registro de usuários
- `/cadastro-modelo` - Registro de modelos
- `/painel-usuario` - Painel do usuário
- `/carteira` - Gerenciamento de ChatCoins
- `/videochats` - Histórico de videochats
- `/sobre` - Sobre a plataforma
- `/contato` - Contato
- `/faq` - Perguntas frequentes
- `/termos-condicoes` - Termos e condições
- `/politica-privacidade` - Política de privacidade

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

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run start    # Servidor de produção
npm run lint     # Verificação de código
```

## 📝 Próximas Funcionalidades

- [ ] Integração com backend real
- [ ] Sistema de pagamento para ChatCoins
- [ ] Chat em tempo real com WebRTC
- [ ] Sistema de notificações
- [ ] App mobile com React Native
- [ ] Sistema de avaliações e comentários

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

Para dúvidas ou sugestões, entre em contato através da página de contato da plataforma.

---

**Camera Real** - Conectando pessoas através de videochats em tempo real 🎥✨ 