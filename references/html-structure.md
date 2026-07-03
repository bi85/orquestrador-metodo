# Guia do HTML Final — Estrutura das 3 Visões

## Princípios

- Arquivo único `.html` — sem dependências externas exceto pdfmake via CDN
- Cores do Blueprint JSON injetadas como CSS variables na tag `<style>`
- Nome do método no `<title>` e no header
- 3 visões navegáveis via tabs no topo da página
- Accordion nativo (`<details>/<summary>`) para conteúdo expansível
- `@media print` força expansão total para PDF

---

## CSS Variables (injetar do Blueprint JSON)

```css
:root {
  --cor-primaria:   /* Blueprint.identidade.cores.primaria */;
  --cor-secundaria: /* Blueprint.identidade.cores.secundaria */;
  --cor-acento:     /* Blueprint.identidade.cores.acento */;
  --metodo-nome:    /* Blueprint.identidade.nome_oficial */;
}
```

---

## Estrutura do Header

```html
<header>
  <div class="metodo-nome">[Blueprint.identidade.nome_oficial]</div>
  <div class="metodo-autor">por [Blueprint.criador.nome]</div>
  <nav class="tabs">
    <button class="tab active" data-view="metodo">Método</button>
    <button class="tab" data-view="pitch">Pitch</button>
    <button class="tab" data-view="portfolio">Portfólio</button>
  </nav>
</header>
```

---

## Visão 1 — Método

Ordem dos blocos:

### 1.1 Framework DCR — SVG Visual
Gerar SVG inline baseado em `Blueprint.identidade.forma_visual`.
Dimensões: 100% width, altura proporcional.

**Roda:** círculo central com nome do método, raios com os passos
**Escada:** degraus verticais do Ponto A ao Ponto B
**Funil:** triângulo invertido com passos afunilando
**Mapa/Rota:** linha horizontal com paradas (Ponto A → passos → Ponto B)
**Matriz:** grid 2x2 com os quadrantes nomeados

### 1.2 Accordion por Passo (iterar sobre Blueprint.caminho[])

```html
<details>
  <summary>
    <span class="passo-num">[ordem]</span>
    <span class="passo-nome">[nome]</span>
    <span class="passo-desc">[descricao]</span>
  </summary>
  <div class="passo-body">
    <div class="field">
      <label>FEZ — trajetória pessoal</label>
      <p>[fez]</p>
    </div>
    <div class="field">
      <label>FAZ — processo atual</label>
      <p>[faz]</p>
    </div>
    <div class="field">
      <label>FARIA — versão ensinável</label>
      <p>[faria]</p>
    </div>
    <div class="field">
      <label>Ferramenta</label>
      <p>[ferramenta]</p>
    </div>
  </div>
</details>
```

### 1.3 Teoria da Imaginação

3 blocos lado a lado (Aproximar / Conectar / Desejar) com os dados de
`Blueprint.didatica`.

### 1.4 Frases Autorais

As 3 frases de `Blueprint.arsenal.frases_autorais` em tipografia grande,
uma por linha, com borda lateral na cor primária.

---

## Visão 2 — Pitch

Slides navegáveis via setas (← →) ou teclado.
Cada slide ocupa 100% da área de conteúdo.

| Slide | Conteúdo |
|-------|----------|
| 1 | **Quem você ajuda** — `Blueprint.pitch.quem` em tipografia grande |
| 2 | **Os 3 níveis de dor** — externo / interno / filosófico |
| 3 | **O caminho** — versão compacta do SVG visual com os passos |
| 4 | **Por que você** — Rota resumida + resultado âncora |
| 5 | **Oferta + CTA** — produto core + preço + próximo passo |

Pitch de 1 frase (`Blueprint.pitch.uma_frase`) fixo no rodapé de todos os slides.

Indicador de progresso: pontos no topo (●●○○○).

---

## Visão 3 — Portfólio

### 3.1 Cards de Produto (iterar sobre Blueprint.portfolio[])

```html
<div class="produto-card nivel-[nivel]">
  <div class="nivel-badge">[nivel]</div>
  <h3>[nome]</h3>
  <p class="formato">[formato]</p>
  <p class="descricao">[descricao]</p>
  <div class="preco">[preco_faixa]</div>
</div>
```

### 3.2 Score de Precificação

Barra de progresso visual com o score médio de `Blueprint.precificacao`.
Label: "Seu posicionamento atual: [score]/10 — Faixa [faixa]"

### 3.3 Checklist MVP 30 Dias

```html
<div class="mvp-box">
  <h3>MVP — [Blueprint.arsenal.mvp_30_dias]</h3>
  <ul class="checklist">
    <li><input type="checkbox"> Item 1</li>
    <!-- itens gerados com base no mvp_30_dias -->
  </ul>
</div>
```

### 3.4 Próximo Passo

Bloco destacado com `Blueprint.arsenal.proximo_passo` em tipografia grande
e botão de copiar.

---

## Print / PDF (@media print)

```css
@media print {
  .tabs, .nav, .export-btn { display: none; }
  .view { display: block !important; }
  details { display: block; }
  details[open], details:not([open]) > .passo-body { display: block; }
  summary::marker { display: none; }
  .slide { display: block; page-break-after: always; }
}
```

---

## Botão de Export PDF Premium

```html
<button class="export-btn" onclick="exportPDF()">
  Exportar PDF Premium
</button>
```

A função `exportPDF()` é definida em `scripts/pdf-template.js` e usa pdfmake
para gerar o documento de ~12 páginas com layout premium independente do
estado do accordion ou dos slides.
