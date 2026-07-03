# Orquestrador de Método Proprietário

Sistema multi-agente para criação de método proprietário com entrega em HTML navegável e PDF premium.

Baseado na metodologia **"O Poder do Método"** de Mari Coelho © 2024, complementado por Expert Secrets (Brunson), StoryBrand (Miller), E-Myth (Gerber) e Pitch Anything (Klaff).

---

## Visão Geral

Um especialista entra numa conversa, responde perguntas, e recebe ao final:

- Um **HTML personalizado** com a identidade visual do método criado, navegável em 3 visões (Método / Pitch / Portfólio)
- Um **PDF premium** de ~12 páginas gerado no browser — capa, índice, frameworks preenchidos, cores do método

Não é um template. É um sistema que extrai o método que já existe dentro da pessoa e o organiza de forma que ninguém mais pode copiar — porque a Rota é a trajetória pessoal de quem viveu aquilo.

---

## Arquitetura — 6 Fases

```
FASE 1   Briefing Conversacional
           Orquestrador faz perguntas em 3 rodadas
           Aceita texto, arquivos e fotos
           Gera Dossiê de Contexto em JSON
                    ↓
FASE 2   Agente DCR  ← sequencial, bloqueante
           Estrutura Destino + Caminho + Rota (3F's)
           Todos os agentes da Fase 3 dependem deste output
                    ↓
FASE 3   4 Subagentes em paralelo
         ┌──────────┬──────────┬──────────┬──────────┐
         │Identidade│ Didática │ Produto  │ Arsenal  │
         └──────────┴──────────┴──────────┴──────────┘
                    ↓
FASE 4   Painel de Especialistas — 3 personas em paralelo
         ┌────────────┬─────────────┬──────────────┐
         │ Strategist │ Storyteller │   Educator   │
         │  (Brunson) │   (Miller)  │  (Coelho)    │
         └────────────┴─────────────┴──────────────┘
           Deliberação visível — o usuário vê o painel
                    ↓
FASE 5   Agente Blueprint
           Lê todos os outputs + deliberação
           Gera Blueprint final em JSON estruturado
                    ↓
FASE 6   HTML personalizado + PDF premium
           3 visões navegáveis (Método / Pitch / Portfólio)
           Accordion expansível por linha
           Export PDF via pdfmake (client-side)
```

---

## Subagentes — Detalhes

### Fase 2 — Agente DCR (sequencial)

| | |
|---|---|
| **Arquivo** | `agents/dcr.md` |
| **Recebe** | Dossiê de Contexto JSON + arquivos/fotos do briefing |
| **Entrega** | Ponto A e Ponto B · Caminho: 3–5 passos nomeados · 3F's por passo (FEZ/FAZ/FARIA) · Framework Método Waze preenchido |

Único agente sequencial. Bloqueante — os 4 paralelos da Fase 3 só rodam após seu output.

---

### Fase 3 — Agentes Paralelos

Todos recebem Dossiê + output do Agente DCR simultaneamente.

#### Agente Identidade
| | |
|---|---|
| **Arquivo** | `agents/identidade.md` |
| **Recebe** | Dossiê + DCR + área de atuação |
| **Entrega** | 5 opções de nome proprietário · 3 taglines · Nome recomendado com razão · Forma visual (roda/funil/escada/mapa/matriz) · Paleta de 3 cores |

Formatos de nome testados: sigla, metáfora, verbo+resultado, adjetivo+processo, nome próprio+método.

#### Agente Didática
| | |
|---|---|
| **Arquivo** | `agents/didatica.md` |
| **Recebe** | Dossiê + DCR + perfil do público |
| **Entrega** | Framework Teoria da Imaginação (Aproximar/Conectar/Desejar) · 1 ferramenta por passo · 3 erros comuns do especialista · Formato de aula por módulo |

#### Agente Produto
| | |
|---|---|
| **Arquivo** | `agents/produto.md` |
| **Recebe** | Dossiê + DCR + formato preferido |
| **Entrega** | Portfólio: entrada · core · premium · Pitch de 1 frase · Pitch completo 5 elementos · Score de precificação + faixa recomendada · Estrutura Curso ou Mentoria |

#### Agente Arsenal
| | |
|---|---|
| **Arquivo** | `agents/arsenal.md` |
| **Recebe** | Dossiê + DCR + crença central do especialista |
| **Entrega** | 3 frases autorais candidatas · História de origem estruturada · MVP para 30 dias · Checklist de validação do método |

---

### Fase 4 — Painel de Especialistas (paralelo)

Três personas leem **todos** os outputs das Fases 2 e 3. Cada uma entrega um bloco de deliberação. O usuário vê o painel completo antes da síntese.

```
━━ PAINEL DE ESPECIALISTAS ━━━━━━━━━━━━━━━━━━━━━━

Strategist  (lente: Expert Secrets / Brunson)
  ✓ ponto forte
  ⚠ ajuste recomendado
  → recomendação específica

Storyteller (lente: StoryBrand / Miller)
  ✓ ponto forte
  ⚠ ajuste recomendado
  → recomendação específica

Educator    (lente: O Poder do Método / Coelho)
  ✓ ponto forte
  ⚠ ajuste recomendado
  → recomendação específica

━━ SÍNTESE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[decisão — maioria decide em conflito]
[ajustes prioritários antes do Blueprint]
```

#### Critérios por persona

**Strategist**
- O nome cria categoria própria ou imita o que já existe?
- O portfólio está na ordem de escala correta?
- A faixa de preço é defensável vs. o resultado entregue?
- O método tem potencial de multiplicação?

**Storyteller**
- O cliente é o herói ou o especialista é o herói?
- O pitch nomeia os 3 níveis de dor (externo, interno, filosófico)?
- O CTA é claro, urgente e sem ambiguidade?
- A história de origem tem fracasso real?

**Educator**
- A Rota é genuína — não copiável por quem não viveu aquilo?
- Os 3F's têm profundidade suficiente para ensinar?
- A didática entrega transformação ou apenas informação?
- O MVP é executável em 30 dias sem construir nada do zero?

---

### Fase 5 — Agente Blueprint

| | |
|---|---|
| **Arquivo** | `agents/blueprint.md` |
| **Recebe** | Todos os outputs das Fases 2–4 |
| **Entrega** | Blueprint final em JSON estruturado (input do HTML generator) |

```json
{
  "identidade": {
    "nome_oficial": "",
    "tagline": "",
    "frase_autoral": "",
    "cores": { "primaria": "#", "secundaria": "#", "acento": "#" },
    "forma_visual": "roda|funil|escada|mapa|matriz"
  },
  "destino": { "publico": "", "ponto_a": "", "ponto_b": "" },
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

Arquivo único, sem dependências externas exceto pdfmake via CDN.

### 3 Visões Navegáveis

| Visão | Conteúdo |
|-------|----------|
| **Método** | Framework DCR visual (SVG inline) · Accordion por passo com FEZ/FAZ/FARIA · Teoria da Imaginação · Frases autorais · Arsenal de ferramentas |
| **Pitch** | Slides navegáveis (setas/teclado) · 5 slides: Quem/Dor/Caminho/Por que você/Oferta · Pitch de 1 frase em destaque |
| **Portfólio** | Cards dos 3 produtos com preço · Score de precificação visual · Checklist MVP 30 dias interativo · Próximo passo concreto |

### Identidade Visual Automática

As cores do Blueprint JSON são injetadas como CSS variables:

```css
:root {
  --cor-primaria:   #1B2A4A;  /* vem do Blueprint */
  --cor-secundaria: #C0392B;  /* vem do Blueprint */
  --cor-acento:     #1A6B45;  /* vem do Blueprint */
}
```

Todas as seções, badges e destaques usam essas variáveis. Cada especialista recebe um HTML com a identidade visual do *próprio método* — não um template genérico.

### Accordion

- **Digital:** `<details>/<summary>` nativo. Tudo inicia colapsado. Estado preservado ao navegar entre visões.
- **Print/PDF:** `@media print` força `details[open]` em todos os elementos. Nenhum conteúdo fica oculto no documento impresso.

---

## PDF Premium

**Biblioteca:** pdfmake via CDN `cdnjs.cloudflare.com` — geração client-side, sem servidor.

### Estrutura do Documento (~12 páginas)

| Página | Conteúdo |
|--------|----------|
| 1 | Capa — nome do método, autor, ano, cor primária de fundo, borda lateral acento |
| 2 | Índice — 4 seções com número de página |
| 3–5 | DCR — Destino, Caminho (tabela), 3F's por passo |
| 6 | Identidade — nome, tagline, frases autorais, forma visual (SVG) |
| 7 | Didática — Teoria da Imaginação, ferramentas por passo |
| 8–9 | Pitch — 5 elementos + pitch de 1 frase em destaque tipográfico |
| 10–11 | Portfólio — cards de produto, precificação, MVP |
| 12 | Contracapa — créditos, atribuição Mari Coelho, próximo passo |

Cada página tem header (nome do método + seção) e footer (nome do criador + número de página). As cores do método tingem headers, títulos e badges em todas as páginas.

---

## Estrutura de Arquivos

```
orquestrador-metodo/
├── README.md                         ← este arquivo
├── SPEC.md                           ← spec de arquitetura completa
├── SKILL.md                          ← orquestrador · entrada da skill
│
├── agents/
│   ├── dcr.md                        ← fase 2 · sequencial · bloqueante
│   ├── identidade.md                 ← fase 3 · paralelo
│   ├── didatica.md                   ← fase 3 · paralelo
│   ├── produto.md                    ← fase 3 · paralelo
│   ├── arsenal.md                    ← fase 3 · paralelo
│   ├── painel-strategist.md          ← fase 4 · deliberação (Brunson)
│   ├── painel-storyteller.md         ← fase 4 · deliberação (Miller)
│   ├── painel-educator.md            ← fase 4 · deliberação (Coelho)
│   └── blueprint.md                  ← fase 5 · síntese final
│
├── references/
│   ├── frameworks-complementares.md  ← Brunson · Miller · Klaff · Gerber
│   └── html-structure.md             ← guia das 3 visões do HTML
│
└── scripts/
    └── pdf-template.js               ← pdfmake · layout premium 12 páginas
```

---

## Decisões Técnicas

| Decisão | Escolha | Razão |
|---------|---------|-------|
| Geração de PDF | pdfmake via CDN | Client-side, sem servidor, tipografia profissional |
| Accordion | `<details>/<summary>` nativo | Zero JS, funciona em qualquer browser |
| Print CSS | `@media print` + `details[open]` | Força expansão total sem JS adicional |
| Identidade visual | CSS variables do Blueprint JSON | Um ponto de controle, todo o HTML reflete |
| Framework visual | SVG inline | Sem dependências externas, embutido no HTML e no PDF |
| Blueprint | JSON estruturado | Interface limpa entre Blueprint agent e HTML generator |
| Paralelismo | Fases 3 e 4 em paralelo | Agente DCR é o único bloqueante; demais rodam simultâneos |

---

## Pendências de Implementação

- [ ] Escrever `SKILL.md` como orquestrador puro (briefing + dispatch)
- [ ] Escrever `agents/dcr.md` com critérios de qualidade dos 3F's
- [ ] Escrever `agents/identidade.md` com os 5 formatos de nome
- [ ] Escrever `agents/didatica.md` com Teoria da Imaginação
- [ ] Escrever `agents/produto.md` com pitch Klaff + matriz de precificação
- [ ] Escrever `agents/arsenal.md` com estrutura de história de origem
- [ ] Escrever os 3 arquivos de painel com critérios por persona
- [ ] Escrever `agents/blueprint.md` com schema JSON de output
- [ ] Criar `references/html-structure.md` com guia das 3 visões
- [ ] Criar `scripts/pdf-template.js` com layout pdfmake
- [ ] Testar com caso real antes de presentear a Mari Coelho

---

## Créditos

Baseado na metodologia **"O Poder do Método"** de Mari Coelho © 2024.
Complementado por Expert Secrets (Brunson), StoryBrand (Miller), E-Myth (Gerber) e Pitch Anything (Klaff).

Arquitetura e orquestração: ODDATA / Trium Mind Advisory — 2026.
