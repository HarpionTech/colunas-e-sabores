const CONFIG = {
  // Número do WhatsApp só com dígitos, com DDI e DDD (ex.: "5511999998888").
  // Vazio: o WhatsApp abre e a pessoa escolhe o contato.
  whatsapp: "",

  // Cardápio da seção de contato. Para trocar a foto de um prato, salve a imagem em assets/img
  // (jpg + webp com o mesmo nome) e informe o caminho sem extensão em `foto`.
  // Sem `foto`, o card mostra o símbolo da casa.
  cardapio: [
    {
      categoria: "Entradas",
      pratos: [
        { nome: "Canapés de salmão defumado", desc: "Pão tostado, cream cheese e ervas", foto: "assets/img/prato-entrada" },
        { nome: "Bruschetta de tomate", desc: "Pão italiano, tomate fresco e manjericão" },
        { nome: "Tábua de frios", desc: "Queijos, embutidos, castanhas e geleia" },
        { nome: "Caldo verde", desc: "Servido em copinhos, com linguiça" },
      ],
    },
    {
      categoria: "Pratos principais",
      pratos: [
        { nome: "Carne assada ao molho", desc: "Fatiada, com alecrim e molho da casa", foto: "assets/img/prato-carne" },
        { nome: "Frango ao molho de mostarda", desc: "Peito grelhado com molho cremoso" },
        { nome: "Lombo com abacaxi", desc: "Assado lentamente, abacaxi caramelizado" },
        { nome: "Peixe ao molho de alcaparras", desc: "Filé grelhado na manteiga" },
      ],
    },
    {
      categoria: "Acompanhamentos",
      pratos: [
        { nome: "Gratinado de batatas", desc: "Batatas em creme com queijo dourado", foto: "assets/img/prato-gratinado" },
        { nome: "Arroz à grega", desc: "Com legumes e uvas-passas" },
        { nome: "Salada da estação", desc: "Folhas, tomate-cereja e molho de mostarda e mel" },
        { nome: "Farofa da casa", desc: "Com bacon e cebola dourada" },
      ],
    },
    {
      categoria: "Sobremesas",
      pratos: [
        { nome: "Mousse de chocolate", desc: "Em taças individuais" },
        { nome: "Pudim de leite", desc: "Com calda de caramelo" },
        { nome: "Pavê de chocolate", desc: "Camadas de creme e biscoito" },
        { nome: "Frutas da estação", desc: "Fatiadas e servidas no gelo" },
      ],
    },
  ],
};

(() => {
  const doc = document.documentElement;
  const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const temGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  const animar = temGsap && !reduz;

  const topo = document.querySelector("[data-topo]");
  const topoAltura = () => topo.offsetHeight + (document.querySelector(".cornija")?.offsetHeight || 0);

  document.querySelectorAll("[data-ano]").forEach((el) => { el.textContent = new Date().getFullYear(); });

  let lenis = null;
  if (animar && typeof window.Lenis !== "undefined") {
    lenis = new window.Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
    lenis.on("scroll", window.ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // No palco de cenas, cozinha e contato só aparecem depois do gatilho: a âncora vai um pouco além do topo
  const destino = (id, alvo) => {
    const topoDe = (el) => el.getBoundingClientRect().top + window.scrollY;
    if (doc.classList.contains("cenas-ativas")) {
      const cenas = topoDe(document.querySelector("[data-cenas]"));
      if (id === "#experiencia") return cenas + 1;
      if (id === "#cozinha") return cenas + window.innerHeight * 0.3;
      if (id === "#contato") return topoDe(alvo) + window.innerHeight * 0.05;
    }
    return id === "#contato" ? topoDe(alvo) : topoDe(alvo) - topoAltura() + 1;
  };

  // Âncoras: rolagem suave com Lenis; foco no primeiro campo ao chegar no contato
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const alvo = document.querySelector(id);
      if (!alvo) return;
      e.preventDefault();
      const focar = () => {
        if (id === "#contato") setTimeout(() => document.getElementById("tipo").focus({ preventScroll: true }), 900);
        else if (id === "#conteudo") alvo.setAttribute("tabindex", "-1"), alvo.focus({ preventScroll: true });
      };
      if (lenis) {
        lenis.scrollTo(id === "#inicio" ? 0 : destino(id, alvo), { duration: 1.6, onComplete: focar });
      } else {
        alvo.scrollIntoView({ behavior: reduz ? "auto" : "smooth" });
        focar();
      }
      history.replaceState(null, "", id);
    });
  });

  // Cabeçalho: sólido depois da abertura; fica sempre visível porque a cornija trava logo abaixo dele
  const atualizaTopo = () => {
    topo.classList.toggle("is-solido", window.scrollY > window.innerHeight * 0.55);
  };
  if (lenis) lenis.on("scroll", atualizaTopo);
  else window.addEventListener("scroll", atualizaTopo, { passive: true });
  atualizaTopo();

  iniciaPedido();

  if (!animar) return;

  gsap.registerPlugin(ScrollTrigger);
  doc.classList.add("js-motion");

  const cena = document.querySelector("[data-cena]");
  const salao = document.querySelector("[data-salao]");
  const brilho = document.querySelector("[data-brilho]");
  const conteudo = document.querySelector("[data-abertura-conteudo]");

  // Entrada: as luzes do salão se acendem e o título sobe linha a linha
  const entrada = gsap.timeline({ defaults: { ease: "power3.out" } });
  entrada
    .fromTo(cena, { scale: 1.1, opacity: 0.2 }, { scale: 1, opacity: 1, duration: 2.6, ease: "power2.out" }, 0)
    .fromTo(brilho, { opacity: 0 }, { opacity: 1, duration: 2.2, ease: "power1.inOut" }, 0.3)
    .from(topo, { yPercent: -100, duration: 1, clearProps: "transform" }, 0.2)
    .from(".sobretitulo__linha", { scaleX: 0, duration: 1.1, ease: "power2.inOut" }, 0.25)
    .from(".sobretitulo", { opacity: 0, letterSpacing: "0.6em", duration: 1.2 }, 0.25)
    .from("[data-linha]", { yPercent: 115, duration: 1.1, stagger: 0.14 }, 0.35)
    .from(".abertura [data-entra]:not(.sobretitulo)", { opacity: 0, y: 18, duration: 0.9, stagger: 0.12 }, 0.95)
    .from(".trilho", { opacity: 0, duration: 1.2 }, 1.1);

  gsap.to(brilho, { opacity: 0.82, duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.6 });

  // Rolagem: a câmera avança pelo salão em direção à mesa
  const avanco = gsap.timeline({
    scrollTrigger: { trigger: "[data-abertura]", start: "top top", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true },
  });
  const camada = document.querySelector("[data-camada]");
  avanco
    .fromTo(camada,
      { y: () => -Math.max(0, camada.offsetHeight - cena.offsetHeight) * 0.13 },
      { y: () => -Math.max(0, camada.offsetHeight - cena.offsetHeight) * 0.42, ease: "power1.inOut", duration: 1 }, 0)
    .to(cena, { scale: 1.32, ease: "power1.in", duration: 1 }, 0)
    .to(conteudo, { opacity: 0, y: -70, ease: "power1.in", duration: 0.38 }, 0)
    .to(".abertura__rolagem, .trilho", { opacity: 0, ease: "none", duration: 0.18 }, 0)
    .to(cena, { opacity: 0.3, ease: "power1.in", duration: 0.4 }, 0.6);

  // Leve paralaxe com o ponteiro
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const px = gsap.quickTo(salao, "x", { duration: 1.4, ease: "power3.out" });
    const py = gsap.quickTo(salao, "y", { duration: 1.4, ease: "power3.out" });
    document.querySelector("[data-abertura]").addEventListener("pointermove", (e) => {
      px((e.clientX / window.innerWidth - 0.5) * -18);
      py((e.clientY / window.innerHeight - 0.5) * -12);
    });
  }

  iniciaPoeira(document.querySelector("[data-poeira]"));

  // A experiência rola normalmente e revela seus blocos uma vez só
  const revelaPorRolagem = (sel) => {
    gsap.set(sel, { opacity: 0, y: 40 });
    ScrollTrigger.batch(sel, {
      start: "top 86%",
      once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.1, overwrite: true }),
    });
  };
  revelaPorRolagem(".experiencia [data-revela]");

  // Foto: a janela abre de baixo para cima e a moldura se desloca para o lugar
  const fotos = [...document.querySelectorAll("[data-foto]")];
  const abreFoto = (foto) => gsap.timeline()
    .fromTo(foto.querySelector(".foto__janela"), { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.out" })
    .from(foto.querySelector(".foto__janela img"), { scale: 1.25, duration: 1.8, ease: "expo.out" }, 0)
    .from(foto.querySelector(".foto__moldura"), { x: 0, y: 0, opacity: 0, duration: 1.2, ease: "power3.out" }, 0.35)
    .from(foto.querySelector("figcaption"), { opacity: 0, y: 10, duration: 0.8, ease: "power2.out" }, 0.6);

  // Rodapé: o guardanapo desdobra a partir da borda da mesa
  gsap.fromTo("[data-guardanapo]", { scaleY: 0.06, opacity: 0.4 }, {
    scaleY: 1, opacity: 1, duration: 1.2, ease: "power3.out", clearProps: "transform,opacity",
    scrollTrigger: { trigger: ".rodape", start: "top 96%", once: true },
  });

  const palco = "(min-width: 1100px) and (min-height: 680px)";
  const mm = gsap.matchMedia();

  // Desktop: cozinha e contato são cenas que entram no lugar, disparadas pela rolagem
  mm.add(palco, () => {
    doc.classList.add("cenas-ativas");
    const cozinha = document.querySelector(".cozinha");
    const contato = document.querySelector(".contato__inner");

    // Depois da experiência, as cenas entram pela lateral direita e a que sai segue para a esquerda
    const entra = () => window.innerWidth * 0.6;
    const sai = () => -window.innerWidth * 0.45;
    const entraCozinha = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } })
      .to(".experiencia__inner", { x: sai, autoAlpha: 0, duration: 0.9, ease: "power2.inOut" }, 0)
      .fromTo(cozinha, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, 0.15)
      .fromTo(".cozinha__inner", { x: entra }, { x: 0, duration: 1.3 }, 0.15)
      .from(".cozinha__texto > *", { autoAlpha: 0, x: 40, duration: 0.9, stagger: 0.07 }, 0.5)
      .from(".cardapio__fio", { scaleX: 0, transformOrigin: "left center", duration: 1, stagger: 0.1, ease: "power2.out" }, 0.9);
    fotos.forEach((foto, i) => entraCozinha.add(abreFoto(foto), 0.6 + i * 0.14));

    // fromTo com valores fixos: a saída não pode herdar a posição de uma entrada ainda em andamento
    const entraContato = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } })
      .fromTo(".cozinha__inner", { x: 0 }, { x: sai, duration: 0.9, ease: "power2.inOut", immediateRender: false }, 0)
      .fromTo(cozinha, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.4, ease: "power1.in", immediateRender: false }, 0.5)
      .fromTo(contato, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, 0.15)
      .fromTo(contato, { x: entra }, { x: 0, duration: 1.3 }, 0.15)
      .from(".contato__chamada > *", { autoAlpha: 0, x: 40, duration: 0.9, stagger: 0.07 }, 0.5)
      .from(".escolha", { autoAlpha: 0, x: 40, duration: 0.9 }, 0.7)
      .from(".pedido", { autoAlpha: 0, x: 60, duration: 1 }, 0.6);

    ScrollTrigger.create({
      trigger: "[data-cenas]", start: "top top-=20%",
      onEnter: () => entraCozinha.timeScale(1).play(),
      onLeaveBack: () => { entraContato.progress(0).pause(); entraCozinha.timeScale(1.6).reverse(); },
    });
    ScrollTrigger.create({
      trigger: "[data-contato]", start: "top 10%",
      onEnter: () => { entraCozinha.progress(1).pause(); entraContato.timeScale(1).play(); },
      onLeaveBack: () => entraContato.timeScale(1.6).reverse(),
    });

    ScrollTrigger.refresh();
    return () => doc.classList.remove("cenas-ativas");
  });

  // Telas menores: as seções rolam e revelam o conteúdo ao entrar
  mm.add(`not all and ${palco}`, () => {
    revelaPorRolagem(".cozinha [data-revela], .contato [data-revela]");
    fotos.forEach((foto, i) => {
      gsap.timeline({ scrollTrigger: { trigger: foto, start: "top 88%", once: true }, delay: i * 0.08 }).add(abreFoto(foto));
    });
    gsap.from(".cardapio__fio", {
      scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power2.out", stagger: 0.1,
      scrollTrigger: { trigger: ".cardapio", start: "top 85%", once: true },
    });
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());

  function iniciaPoeira(canvas) {
    const ctx = canvas.getContext("2d");
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 64;
    const sc = sprite.getContext("2d");
    const g = sc.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,226,160,1)");
    g.addColorStop(0.25, "rgba(240,190,100,0.55)");
    g.addColorStop(1, "rgba(214,170,85,0)");
    sc.fillStyle = g;
    sc.fillRect(0, 0, 64, 64);

    let w = 0, h = 0, dpr = 1, particulas = [], ativo = false, raf = 0;
    const nova = (y) => ({
      x: Math.random() * w,
      y: y ?? Math.random() * h,
      r: 2 + Math.random() * 6,
      vy: 0.08 + Math.random() * 0.32,
      fase: Math.random() * Math.PI * 2,
      amp: 0.2 + Math.random() * 0.5,
      brilho: 0.25 + Math.random() * 0.6,
    });
    const medir = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(70, Math.round(w / 22));
      particulas = Array.from({ length: n }, () => nova());
    };
    const quadro = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particulas) {
        p.y -= p.vy;
        p.x += Math.sin(t * 0.0004 + p.fase) * p.amp * 0.3;
        if (p.y < -10) Object.assign(p, nova(h + 10));
        const pisca = 0.55 + 0.45 * Math.sin(t * 0.0015 + p.fase);
        ctx.globalAlpha = p.brilho * pisca;
        ctx.drawImage(sprite, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
      }
      raf = requestAnimationFrame(quadro);
    };
    const liga = (on) => {
      if (on === ativo) return;
      ativo = on;
      if (on) raf = requestAnimationFrame(quadro);
      else cancelAnimationFrame(raf);
    };
    medir();
    window.addEventListener("resize", medir);
    new IntersectionObserver(([e]) => liga(e.isIntersecting && !document.hidden)).observe(canvas);
    document.addEventListener("visibilitychange", () => liga(!document.hidden && canvas.getBoundingClientRect().bottom > 0));
    gsap.fromTo(canvas, { opacity: 0 }, { opacity: 1, duration: 2, delay: 1 });
  }
})();

function iniciaCardapio() {
  const abas = document.querySelector("[data-abas]");
  const grade = document.querySelector("[data-pratos]");
  const lista = document.querySelector("[data-selecao-lista]");
  const vazio = document.querySelector("[data-selecao-vazio]");
  const total = document.querySelector("[data-selecao-total]");
  if (!abas || !grade) return () => [];

  const check = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const fotoHtml = (p) => p.foto
    ? `<span class="prato__foto"><picture><source srcset="${p.foto}.webp" type="image/webp"><img src="${p.foto}.jpg" alt="" width="1024" height="768" loading="lazy"></picture></span>`
    : `<span class="prato__foto prato__foto--vazia"><img src="assets/img/simbolo.png" alt="" width="174" height="240" loading="lazy"><span>Foto em breve</span></span>`;

  const botoesAba = [];
  CONFIG.cardapio.forEach((cat, i) => {
    const aba = document.createElement("button");
    aba.type = "button";
    aba.className = "aba";
    aba.id = `aba-${i}`;
    aba.setAttribute("role", "tab");
    aba.setAttribute("aria-controls", "pratos-painel");
    aba.innerHTML = `${cat.categoria} <span class="aba__conta" hidden>0</span>`;
    aba.addEventListener("click", () => seleciona(i, true));
    abas.appendChild(aba);
    botoesAba.push(aba);

    cat.pratos.forEach((p, j) => {
      const card = document.createElement("label");
      card.className = "prato";
      card.dataset.cat = i;
      const id = `prato-${i}-${j}`;
      card.innerHTML = `<input class="prato__check" type="checkbox" id="${id}" value="${p.nome}" data-cat="${i}">${fotoHtml(p)}<span class="prato__info"><span class="prato__nome">${p.nome}</span><span class="prato__desc">${p.desc || ""}</span></span><span class="prato__marca" aria-hidden="true">${check}</span>`;
      grade.appendChild(card);
    });
  });
  grade.id = "pratos-painel";

  // teclado nas abas: setas esquerda/direita, Home e End
  abas.addEventListener("keydown", (e) => {
    const atual = botoesAba.findIndex((b) => b.getAttribute("aria-selected") === "true");
    const mapa = { ArrowRight: atual + 1, ArrowLeft: atual - 1, Home: 0, End: botoesAba.length - 1 };
    if (!(e.key in mapa)) return;
    e.preventDefault();
    const n = (mapa[e.key] + botoesAba.length) % botoesAba.length;
    seleciona(n, true);
    botoesAba[n].focus();
  });

  function seleciona(i, animar) {
    botoesAba.forEach((b, k) => {
      b.setAttribute("aria-selected", String(k === i));
      b.tabIndex = k === i ? 0 : -1;
    });
    grade.setAttribute("aria-labelledby", botoesAba[i].id);
    grade.querySelectorAll(".prato").forEach((c) => { c.hidden = Number(c.dataset.cat) !== i; });
    if (animar && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      grade.classList.remove("is-trocando");
      void grade.offsetWidth;
      grade.classList.add("is-trocando");
    }
  }
  seleciona(0, false);

  const marcados = () => [...grade.querySelectorAll(".prato__check:checked")];
  const atualiza = () => {
    const sel = marcados();
    total.textContent = sel.length === 1 ? "1 prato" : `${sel.length} pratos`;
    vazio.hidden = sel.length > 0;
    lista.replaceChildren(...sel.map((c) => {
      const li = document.createElement("li");
      li.className = "selecao__item";
      li.append(c.value);
      const tirar = document.createElement("button");
      tirar.type = "button";
      tirar.className = "selecao__tirar";
      tirar.setAttribute("aria-label", `Tirar ${c.value}`);
      tirar.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
      tirar.addEventListener("click", () => { c.checked = false; atualiza(); });
      li.append(tirar);
      return li;
    }));
    botoesAba.forEach((b, k) => {
      const n = sel.filter((c) => Number(c.dataset.cat) === k).length;
      const conta = b.querySelector(".aba__conta");
      conta.textContent = n;
      conta.hidden = n === 0;
    });
  };
  grade.addEventListener("change", atualiza);
  grade.addEventListener("change", () => {
    const n = marcados().length;
    conta.textContent = n;
    conta.hidden = n === 0;
  });
  atualiza();

  // Botão que abre e fecha o cardápio
  const botao = document.querySelector("[data-escolha-botao]");
  const corpo = document.querySelector("[data-escolha-corpo]");
  const conta = document.querySelector("[data-escolha-conta]");
  const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  botao.addEventListener("click", () => {
    const abrir = botao.getAttribute("aria-expanded") !== "true";
    botao.setAttribute("aria-expanded", String(abrir));
    corpo.classList.toggle("is-aberto", abrir);
    corpo.inert = !abrir;
    if (abrir && !reduz) {
      grade.classList.remove("is-trocando");
      void grade.offsetWidth;
      grade.classList.add("is-trocando");
    }
  });
  corpo.addEventListener("transitionend", (e) => {
    if (e.target === corpo && window.ScrollTrigger) window.ScrollTrigger.refresh();
  });
  lista.addEventListener("click", () => {
    const n = marcados().length;
    conta.textContent = n;
    conta.hidden = n === 0;
  });

  // linhas da mensagem, agrupadas por categoria
  return () => CONFIG.cardapio
    .map((cat, k) => [cat.categoria, marcados().filter((c) => Number(c.dataset.cat) === k).map((c) => c.value)])
    .filter(([, nomes]) => nomes.length)
    .map(([categoria, nomes]) => `• ${categoria}: ${nomes.join(", ")}`);
}

function iniciaPedido() {
  const form = document.querySelector("[data-pedido]");
  if (!form) return;
  const pratosEscolhidos = iniciaCardapio();
  const status = form.querySelector("[data-pedido-status]");
  const botao = form.querySelector('button[type="submit"]');
  const rotuloBotao = botao.innerHTML;
  const hoje = new Date();
  const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  form.data.min = iso(hoje);

  const regras = {
    tipo: (v) => v !== "",
    data: (v) => v !== "" && v >= form.data.min,
    pessoas: (v) => Number(v) >= 10 && Number(v) <= 2000,
  };
  const marca = (nome, ok) => {
    const campo = form[nome];
    const erro = document.getElementById(`${nome}-erro`);
    campo.setAttribute("aria-invalid", String(!ok));
    if (ok) campo.removeAttribute("aria-describedby");
    else campo.setAttribute("aria-describedby", erro.id);
    erro.hidden = ok;
    return ok;
  };
  Object.keys(regras).forEach((nome) => {
    form[nome].addEventListener("change", () => marca(nome, regras[nome](form[nome].value)));
    // limpa o erro durante a digitação, antes do blur, para o botão não mudar de lugar no clique
    form[nome].addEventListener("input", () => { if (regras[nome](form[nome].value)) marca(nome, true); });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const invalidos = Object.keys(regras).filter((nome) => !marca(nome, regras[nome](form[nome].value)));
    if (invalidos.length) {
      form[invalidos[0]].focus();
      status.classList.remove("is-ok");
      status.textContent = "Confira os campos destacados.";
      return;
    }
    const [a, m, d] = form.data.value.split("-");
    const texto = [
      "Olá! Gostaria de um orçamento com a Colunas & Sabores.",
      `Tipo de encontro: ${form.tipo.value}`,
      `Data prevista: ${d}/${m}/${a}`,
      `Pessoas: ${form.pessoas.value}`,
    ];
    const pratos = pratosEscolhidos();
    if (pratos.length) texto.push("", "Pratos de interesse:", ...pratos);
    else texto.push("", "Cardápio: gostaria de sugestões.");
    const mensagem = texto.join("\n");
    const numero = CONFIG.whatsapp.replace(/\D/g, "");
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    botao.disabled = true;
    botao.textContent = "Abrindo o WhatsApp…";
    const janela = window.open(url, "_blank");
    if (janela) janela.opener = null;
    else window.location.href = url;
    status.classList.add("is-ok");
    status.textContent = "Mensagem pronta no WhatsApp. É só confirmar o envio por lá.";
    setTimeout(() => { botao.disabled = false; botao.innerHTML = rotuloBotao; }, 1600);
  });
}
