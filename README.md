# Colunas & Sabores Buffet — landing page

Página única em HTML, CSS e JS puro, com GSAP + ScrollTrigger e Lenis via CDN.
Abrir com qualquer servidor estático (ex.: `python -m http.server`) e acessar `index.html`.

## Estrutura

- `index.html` — abertura imersiva, A experiência, Nossa cozinha, Contato (WhatsApp) e rodapé
- `css/style.css` — tokens de cor, tipografia (EB Garamond + Alegreya Sans) e layout
- `js/main.js` — configuração do WhatsApp, animações e formulário
- `assets/img/` — imagens otimizadas (webp + jpg de reserva)
- `assets/raw/` — arquivos originais, não servidos pela página

## Pendências com o cliente

1. **WhatsApp** — configurado em `CONFIG.whatsapp` (`js/main.js`) com o número do buffet, só dígitos com 55 e DDD.
   Testar no celular: o botão tem que abrir direto a conversa do buffet com a mensagem pronta.
2. **Cardápio e fotos dos pratos** — os pratos do "Monte seu cardápio" são exemplos e ficam em `CONFIG.cardapio`
   (`js/main.js`): nome, descrição e foto de cada um. Para pôr a foto de um prato, salvar `assets/img/<nome>.jpg` e
   `.webp` (proporção 4:3) e informar `foto: "assets/img/<nome>"`. Sem foto, o card mostra o símbolo da casa.
   As três fotos atuais são ilustrativas (geradas por IA).
   Os dois vídeos da Nossa cozinha são material real do cliente (`assets/video/`, originais em `assets/raw/`):
   confirmar com ele os nomes dos pratos nas legendas "Gratinado com cebolinha" e
   "Pratos quentes no réchaud".
3. **Logo** — a atual foi reconstruída e teve o halo removido. Pedir o arquivo oficial (de preferência SVG).
4. **Textos a validar** — tipos de encontro do formulário (ágape, sessão magna, aniversário de loja,
   iniciação ou elevação, celebração em família) e a frase "o buffet chega pronto para servir".
5. **Salão** — é cenário conceitual; a página não afirma que o buffet possui ou aluga o espaço.
