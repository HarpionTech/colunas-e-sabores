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

1. **Número do WhatsApp** — preencher `CONFIG.whatsapp` no topo de `js/main.js` (só dígitos, com 55 e DDD).
   Enquanto estiver vazio, o botão abre o WhatsApp com a mensagem pronta e a pessoa escolhe o contato.
2. **Fotos dos pratos** — as três fotos são ilustrativas (geradas por IA). Trocar por fotos reais do buffet,
   mantendo proporção 4:3 (`assets/img/prato-*.jpg` e `.webp`).
3. **Logo** — a atual foi reconstruída e teve o halo removido. Pedir o arquivo oficial (de preferência SVG).
4. **Textos a validar** — tipos de encontro do formulário (ágape, sessão magna, aniversário de loja,
   iniciação ou elevação, celebração em família) e a frase "o buffet chega pronto para servir".
5. **Salão** — é cenário conceitual; a página não afirma que o buffet possui ou aluga o espaço.
