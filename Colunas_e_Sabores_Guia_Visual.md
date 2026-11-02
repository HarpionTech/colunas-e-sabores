# Colunas & Sabores — Guia visual da página web

## Objetivo

Apresentar os pratos e o serviço de buffet da Colunas & Sabores, destinado a encontros e celebrações maçônicas, e facilitar pedidos de orçamento pelo WhatsApp.

Instagram informado: [@colunasesabores](https://www.instagram.com/colunasesabores/).

## Conceito visual

A página deve transmitir a sensação de entrar em um salão preparado para um banquete: portas de madeira abertas, colunas nas laterais, lustre, iluminação quente e uma mesa central que cria profundidade. Preto, dourado e marfim conectam o ambiente à identidade da marca.

O salão é um cenário conceitual. A comunicação deve apresentar o serviço de buffet, sem sugerir que a empresa possui ou aluga o espaço ilustrado.

## Tipografia

O conceito foi gerado como imagem e não possui uma fonte incorporada identificável. As fontes abaixo são sugestões para reproduzir sua aparência, não uma identificação exata.

| Aplicação | Fonte sugerida | Peso |
| --- | --- | --- |
| Títulos principais | Cormorant Garamond | 500 ou 600 |
| Frases em destaque | Cormorant Garamond Italic | 400 ou 500 |
| Textos menores e navegação | Lato | 400 |
| Botões | Lato | 700 |

Downloads e referências:

- [Cormorant Garamond — Google Fonts](https://fonts.google.com/specimen/Cormorant+Garamond)
- [Lato — Google Fonts](https://fonts.google.com/specimen/Lato)
- [Projeto Cormorant](https://github.com/CatharsisFonts/Cormorant)
- [Site oficial Lato](https://www.latofonts.com/)

## Paleta sugerida

Valores de partida para implementação, não amostras exatas extraídas da imagem.

| Cor | HEX | Uso |
| --- | --- | --- |
| Preto quente | `#11110E` | Fundo principal e sobreposições |
| Dourado | `#D6AA55` | Botões, linhas e detalhes |
| Marfim | `#F3EBDD` | Títulos e textos sobre fundo escuro |
| Marrom madeira | `#4A2C18` | Integração com o cenário |

## Imagens e logo

Foram entregues quatro imagens separadas na conversa. São reconstruções geradas a partir do conceito, e podem apresentar diferenças em relação ao mockup. Os nomes abaixo são sugestões para organizar os arquivos ao baixá-los; este Markdown não incorpora os arquivos de imagem.

| Nome sugerido | Conteúdo | Aplicação |
| --- | --- | --- |
| `salao-principal.png` | Salão com portas abertas, colunas, lustre e mesa; sem textos ou interface | Fundo da abertura |
| `prato-carne-assada.png` | Carne assada fatiada com ervas | Galeria de pratos |
| `prato-acompanhamento.png` | Gratinado em cuba de buffet com arroz ao fundo | Galeria de acompanhamentos |
| `logo-colunas-e-sabores.png` | Logo horizontal com fundo transparente | Cabeçalho e rodapé |

### Logo

Símbolo dourado com chapéu de chef integrado ao esquadro e compasso e à letra G. Nome em marfim, com “COLUNAS &” na linha superior, “SABORES” abaixo e “BUFFET” em dourado.

A logo entregue foi reconstruída visualmente. Não é o arquivo original extraído do Instagram nem uma versão vetorial. Para a publicação definitiva, preferir o arquivo oficial fornecido pelo cliente e preservar suas proporções.

### Fotografias

As imagens dos pratos são ilustrativas e não comprovam o cardápio da empresa. Na versão final, substituir pelas fotografias reais ou validar seu uso e a correspondência dos pratos com o cliente.

## Estrutura sugerida

### 1. Cabeçalho

- Logo à esquerda.
- Links: “A experiência”, “Nossa cozinha” e “Contato”.
- Botão: “Solicitar orçamento”.
- Fundo escuro integrado ao cenário e linha dourada discreta.

### 2. Abertura imersiva

**Título:** Uma entrada marcante. Um encontro inesquecível.

**Texto de apoio:** Buffet para encontros e celebrações maçônicas.

**Ação principal:** Planejar meu evento.

**Ação secundária:** Explorar os sabores.

**Indicação de rolagem:** Entre. A mesa está posta.

Manter contraste suficiente para leitura e preservar a perspectiva central da mesa. Usar uma sobreposição escura localizada atrás dos textos quando necessário.

### 3. Nossa cozinha

**Título:** À altura do seu encontro.

**Texto de apoio:** Sabores que acolhem. Detalhes que aproximam.

**Link:** Conheça nossos pratos.

Apresentação assimétrica com fotografias em alturas diferentes, molduras douradas finas e transição suave do salão para o fundo escuro.

### 4. Contato

**Chamada:** Seu próximo encontro começa aqui.

**Botão:** Falar pelo WhatsApp.

Confirmar o número com o cliente antes de configurar o link definitivo.

## Movimento e implementação

- Abertura suave das portas como efeito opcional de entrada.
- Pequeno avanço visual pelo salão durante a rolagem.
- Entrada discreta das imagens dos pratos.
- Manter acesso imediato ao conteúdo e ao orçamento.
- Respeitar a preferência de movimento reduzido do dispositivo.
- No celular, adaptar o enquadramento e empilhar as imagens sem prejudicar a leitura.

A imagem do salão é plana e não contém camadas independentes. Para abrir cada porta de forma convincente, será necessário preparar as portas e o fundo como elementos separados, ou usar uma cena 3D. Com o arquivo atual, é possível aplicar zoom e deslocamento sutil ao conjunto.

## Base CSS sugerida

```css
:root {
  --cor-fundo: #11110e;
  --cor-dourado: #d6aa55;
  --cor-texto: #f3ebdd;
  --fonte-titulos: "Cormorant Garamond", Georgia, serif;
  --fonte-corpo: "Lato", Arial, sans-serif;
}

body {
  background: var(--cor-fundo);
  color: var(--cor-texto);
  font-family: var(--fonte-corpo);
}

h1, h2, h3 {
  font-family: var(--fonte-titulos);
  font-weight: 600;
}
```

Carregar as fontes escolhidas no projeto; declarar `font-family` sozinho não faz o download delas.
