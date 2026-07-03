---
title: Sistema de Agentes — Criador de Método Proprietário
date: 2026-07-03
tags:
  - tipo/projeto
  - status/ativo
  - contexto/trium
links:
  - "[[trium-brain]]"
  - "[[harness-engineering-em-ia]]"
---

# Sistema de Agentes — Criador de Método Proprietário

Spec de arquitetura aprovada em 2026-07-03.
Baseado na metodologia "O Poder do Método" de Mari Coelho © 2024.

---

## Objetivo

Transformar a skill `criador-de-metodo-proprio` (monolítica, 801 linhas) em um
sistema multi-agente com orquestrador + subagentes paralelos + painel de
especialistas + entrega em HTML navegável com PDF premium embutido.

**Resultado esperado para o usuário:** ao final de uma sessão conversacional,
receber um único arquivo HTML personalizado — com a identidade visual do método
criado — navegável em 3 visões (Método, Pitch, Portfólio) e exportável como
documento premium de ~12 páginas.

---

## Contexto e Motivação

A skill atual funciona mas tem dois limites críticos:

1. **Monolítica:** 801 linhas num único SKILL.md excedem o limite recomendado (500).
   O modelo carrega tudo sempre, mesmo quando usa só 1 módulo.
2. **Sem visual real:** os frameworks são arte ASCII em blocos de código.
   Não há geração de visual, canvas ou documento de entrega.

A arquitetura de subagentes resolve os dois: cada agente é especializado e
carrega apenas o que precisa. O HTML final é o entregável premium que justifica
o valor do processo.

---

## Arquitetura — 6 Fases

```
FASE 1   Briefing Conversacional (orquestrador)
           ↓
FASE 2   Agente DCR — sequencial, bloqueante
           ↓
FASE 3   4 Subagentes em paralelo
         [Identidade] [Didática] [Produto] [Arsenal]
           ↓
FASE 4   Painel de Especialistas — 3 personas em paralelo
         [Strategist] [Storyteller] [Educator]
           ↓
FASE 5   Agente Blueprint — síntese final em JSON
           ↓
FASE 6   HTML personalizado + PDF premium embutido
```

---

## Fase 1 — Briefing Conversacional

**Responsável:** SKILL.md (orquestrador inline, sem subagente)

O orquestrador conduz 3 rodadas de perguntas — 2 a 3 por rodada, nunca todas
de uma vez. Aceita texto, arquivos e fotos como input.

| Rodada | Foco | Perguntas-chave |
|--------|------|-----------------|
| 1 | Destino | Mensagem + Objetivo do criador |
| 2 | Conhecimento | Experiência, diferencial, público ideal |
| 3 | Produto | Formato preferido, estágio atual |

Ao final, o orquestrador gera o **Dossiê de Contexto** em JSON estruturado e
pede confirmação antes de avançar.

```json
{
  "destino": { "mensagem": "", "objetivo": "" },
  "criador": { "experiencia": "", "diferencial": "", "resultado_ancora": "" },
  "cliente_ideal": { "perfil": "", "problema": "" },
  "formato": "curso|mentoria|consultoria|material|hibrido",
  "estagio": "zero|informal|estruturado",
  "arquivos": []
}
```

---

## Fase 2 — Agente DCR (sequencial, bloqueante)

**Arquivo:** `agents/dcr.md`
**Tipo:** sequencial — todos os agentes da Fase 3 dependem do seu output.

### Input
- Dossiê de Contexto confirmado
- Arquivos e fotos do briefing

### Output obrigatório
- Ponto A (situação atual do cliente)
- Ponto B (situação desejada após o método)
- Caminho: 3 a 5 passos nomeados em ordem de execução
- 3F's por passo (FEZ / FAZ / FARIA)
- Framework Método Waze preenchido

### Critério de qualidade
Os 3F's devem ter profundidade real — mínimo 3 linhas cada. FEZ sem trajetória
pessoal genuína invalida a Rota. O agente deve pressionar por especificidade.

---

## Fase 3 — Subagentes Paralelos

Todos recebem Dossiê + output do Agente DCR simultaneamente.
O orquestrador aguarda os 4 finalizarem antes de avançar.

### Agente Identidade
**Arquivo:** `agents/identidade.md`

| Input | Output |
|-------|--------|
| Dossiê + DCR + área de atuação | 5 opções de nome proprietário |
| | 3 opções de tagline |
| | Nome recomendado com justificativa |
| | Forma visual recomendada (roda/funil/escada/mapa/matriz) + descrição |
| | Paleta de 3 cores com razão (ligada ao nicho e ao público) |

Formatos de nome testados: sigla com significado, metáfora, verbo+resultado,
adjetivo+processo, nome próprio+método. Pelo menos 1 de cada.

### Agente Didática
**Arquivo:** `agents/didatica.md`

| Input | Output |
|-------|--------|
| Dossiê + DCR + perfil do público | Framework Teoria da Imaginação preenchido |
| | 1 ferramenta por passo (checklist, canvas, template, framework, mapa) |
| | 3 erros comuns do especialista ao ensinar esse conteúdo |
| | Formato de aula recomendado por módulo |

### Agente Produto
**Arquivo:** `agents/produto.md`

| Input | Output |
|-------|--------|
| Dossiê + DCR + formato preferido | Portfólio: entrada · core · premium |
| | Pitch de 1 frase (modelo: "Eu ajudo [QUEM] a [RESULTADO] através de [MÉTODO]") |
| | Pitch completo 5 elementos (Klaff + Miller) |
| | Score de precificação (6 critérios, 0–10 cada) + faixa recomendada |
| | Estrutura do Curso ou Mentoria (conforme briefing) |

### Agente Arsenal
**Arquivo:** `agents/arsenal.md`

| Input | Output |
|-------|--------|
| Dossiê + DCR + crença central | 3 frases autorais candidatas |
| | História de origem estruturada (situação → tentativa → insight → método → resultado) |
| | MVP recomendado para lançar em 30 dias |
| | Checklist de validação do método (5 critérios) |

---

## Fase 4 — Painel de Especialistas

3 personas rodam em paralelo. Cada uma recebe todos os outputs das Fases 2 e 3.
O usuário vê o painel completo como um bloco de deliberação visível — não um
resumo silencioso.

### Formato de output do painel (o que o usuário vê)

```
━━ PAINEL DE ESPECIALISTAS ━━━━━━━━━━━━━━━━━━━━━━

Strategist (lente: Expert Secrets / Brunson)
  ✓ [ponto forte 1]
  ✓ [ponto forte 2]
  ⚠ [ajuste recomendado]
  → [recomendação específica]

Storyteller (lente: StoryBrand / Miller)
  ✓ [ponto forte]
  ⚠ [ajuste recomendado 1]
  ⚠ [ajuste recomendado 2]
  → [recomendação específica]

Educator (lente: O Poder do Método / Coelho)
  ✓ [ponto forte 1]
  ✓ [ponto forte 2]
  ⚠ [ajuste recomendado]
  → [recomendação específica]

━━ SÍNTESE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[decisão sobre elementos em conflito — maioria decide]
[2-3 ajustes prioritários antes do Blueprint]
```

### Critérios por persona

**Strategist**
- O nome cria categoria própria ou imita o que já existe?
- O portfólio está na ordem de escala correta?
- A faixa de preço é defensável vs. o resultado entregue?
- O método tem potencial de multiplicação (livro, curso, formação)?

**Storyteller**
- O cliente é o herói ou o especialista é o herói?
- O pitch nomeia os 3 níveis de dor (externo, interno, filosófico)?
- O CTA é claro, urgente e sem ambiguidade?
- A história de origem é autêntica — contém fracasso real?

**Educator**
- A Rota é genuína — não copiável por quem não viveu aquilo?
- Os 3F's têm profundidade suficiente para ensinar?
- A didática entrega transformação ou apenas informação?
- O MVP é executável em 30 dias sem construir nada do zero?

---

## Fase 5 — Agente Blueprint

**Arquivo:** `agents/blueprint.md`

Recebe todos os outputs das Fases 2, 3 e 4. Produz o Blueprint final em JSON
estruturado — input direto do gerador de HTML.

```json
{
  "identidade": {
    "nome_oficial": "",
    "tagline": "",
    "frase_autoral": "",
    "cores": { "primaria": "#", "secundaria": "#", "acento": "#" },
    "forma_visual": "roda|funil|escada|mapa|matriz"
  },
  "destino": {
    "publico": "",
    "ponto_a": "",
    "ponto_b": ""
  },
  "caminho": [
    { "ordem": 1, "nome": "", "descricao": "", "fez": "", "faz": "", "faria": "", "ferramenta": "" }
  ],
  "rota_resumo": "",
  "pitch": {
    "uma_frase": "",
    "quem": "", "problema": "", "solucao": "", "diferencial": "", "resultado": ""
  },
  "portfolio": [
    { "nivel": "entrada|core|premium", "nome": "", "formato": "", "preco_faixa": "" }
  ],
  "arsenal": {
    "frases_autorais": [],
    "historia_origem": "",
    "mvp_30_dias": "",
    "proximo_passo": ""
  },
  "criador": { "nome": "", "area": "", "anos_experiencia": 0 }
}
```

---

## Fase 6 — HTML Personalizado

**Referência:** `references/html-structure.md`
**Output:** `[slug-do-metodo].html` — arquivo único, sem dependências externas
exceto pdfmake via CDN.

### Estrutura das 3 visões

**Visão Método**
- Framework DCR visual (SVG inline gerado a partir da forma escolhida)
- Accordion por passo: expande FEZ / FAZ / FARIA + ferramenta
- Teoria da Imaginação (3 ativadores)
- Frases autorais destacadas
- Arsenal de ferramentas

**Visão Pitch**
- Navegação em slides (setas / teclado)
- Slide 1: Quem você ajuda
- Slide 2: Os 3 níveis de dor
- Slide 3: O caminho (visual do método)
- Slide 4: Por que você (Rota + resultado âncora)
- Slide 5: Oferta + CTA
- Pitch de 1 frase em destaque tipográfico

**Visão Portfólio**
- Cards dos 3 produtos (entrada, core, premium) com preço e formato
- Score de precificação visual (barra de progresso)
- Checklist MVP 30 dias (interativo — itens riscáveis)
- Próximo passo concreto em destaque

### Identidade visual automática

As cores do Blueprint JSON são injetadas como CSS variables na tag `<style>`:

```css
:root {
  --cor-primaria: #1B2A4A;   /* vem do Blueprint */
  --cor-secundaria: #C0392B; /* vem do Blueprint */
  --cor-acento: #1A6B45;     /* vem do Blueprint */
}
```

Todas as seções, badges, bordas e destaques usam essas variáveis.
O nome do método aparece no header do HTML e no PDF.

### Accordion — comportamento

- Digital: `<details>/<summary>` nativo. Tudo inicia colapsado.
  Estado preservado ao navegar entre as 3 visões.
- Print / PDF: `@media print` força `details[open]` em todos os elementos.
  Nenhum conteúdo fica oculto no documento impresso.

---

## PDF Premium

**Biblioteca:** pdfmake (CDN `cdnjs.cloudflare.com`) — geração client-side,
sem servidor, sem upload.

**Script:** `scripts/pdf-template.js` — embutido no HTML via `<script>`.

### Estrutura do documento (~12 páginas)

| # | Página | Conteúdo |
|---|--------|----------|
| 1 | Capa | Nome do método, autor, ano, cor primária de fundo, borda lateral acento |
| 2 | Índice | 4 seções com número de página e linha pontilhada |
| 3–5 | DCR | Destino, Caminho (tabela), 3F's por passo |
| 6 | Identidade | Nome, tagline, frases autorais, forma visual (SVG) |
| 7 | Didática | Teoria da Imaginação, ferramentas por passo |
| 8–9 | Pitch | 5 elementos + pitch de 1 frase em destaque |
| 10–11 | Portfólio | Cards de produto, precificação, MVP |
| 12 | Contracapa | Créditos, atribuição Mari Coelho, próximo passo |

Cada página tem header (nome do método + seção) e footer (nome do criador +
número de página). Cores do método tingem headers, títulos e badges.

---

## Estrutura de Arquivos da Skill

```
skill-metodo-proprietario/
├── SKILL.md                        ← orquestrador · entrada da skill
├── agents/
│   ├── dcr.md                      ← fase 2 · sequencial
│   ├── identidade.md               ← fase 3 · paralelo
│   ├── didatica.md                 ← fase 3 · paralelo
│   ├── produto.md                  ← fase 3 · paralelo
│   ├── arsenal.md                  ← fase 3 · paralelo
│   ├── painel-strategist.md        ← fase 4 · deliberação
│   ├── painel-storyteller.md       ← fase 4 · deliberação
│   ├── painel-educator.md          ← fase 4 · deliberação
│   └── blueprint.md                ← fase 5 · síntese
├── references/
│   ├── frameworks-complementares.md ← existente (Brunson, Miller, Klaff, Gerber)
│   └── html-structure.md           ← guia do HTML final
└── scripts/
    └── pdf-template.js             ← pdfmake · layout premium
```

**Princípio do orquestrador:** SKILL.md nunca gera conteúdo de método.
Todo conteúdo sai dos subagentes. O orquestrador lê, compila e entrega.
Isso mantém cada agente focado e substituível independentemente.

---

## Decisões Técnicas

| Decisão | Escolha | Razão |
|---------|---------|-------|
| Geração de PDF | pdfmake via CDN | Client-side, sem servidor, layout tipográfico profissional |
| Accordion | `<details>/<summary>` nativo | Zero JS, funciona em qualquer browser |
| Print CSS | `@media print` + `details[open]` | Força expansão total sem JS adicional |
| Identidade visual | CSS variables geradas do Blueprint JSON | Um ponto de controle, todo o HTML reflete |
| Framework visual | SVG inline | Sem dependências, embutido no HTML e no PDF |
| Blueprint | JSON estruturado | Interface limpa entre Blueprint agent e HTML generator |

---

## Pendências de Implementação

- [ ] Escrever `agents/dcr.md` com critérios de qualidade dos 3F's
- [ ] Escrever `agents/identidade.md` com os 5 formatos de nome
- [ ] Escrever `agents/didatica.md` com Teoria da Imaginação
- [ ] Escrever `agents/produto.md` com pitch Klaff + matrix de precificação
- [ ] Escrever `agents/arsenal.md` com estrutura de história de origem
- [ ] Escrever 3 arquivos de painel com critérios por persona
- [ ] Escrever `agents/blueprint.md` com schema JSON de output
- [ ] Criar `references/html-structure.md` com guia das 3 visões
- [ ] Criar `scripts/pdf-template.js` com layout pdfmake
- [ ] Reescrever `SKILL.md` como orquestrador puro (briefing + dispatch)
- [ ] Testar com caso real antes de presentear a Mari Coelho

---

*Baseado na metodologia "O Poder do Método" de Mari Coelho © 2024*
*Complementado por Expert Secrets (Brunson), StoryBrand (Miller), E-Myth (Gerber) e Pitch Anything (Klaff)*
