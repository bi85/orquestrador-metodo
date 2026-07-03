// PDF Premium — gerado via pdfmake (CDN)
// CDN: https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js
//       https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js
//
// Chamado por: exportPDF() no HTML final
// Input: window.__blueprint (Blueprint JSON injetado pelo orquestrador)
// Output: download automático do PDF (~12 páginas)

function exportPDF() {
  const bp = window.__blueprint;
  if (!bp) { alert('Blueprint não carregado.'); return; }

  const cores = bp.identidade.cores;
  const primaria  = cores.primaria  || '#1a1a2e';
  const secundaria = cores.secundaria || '#16213e';
  const acento    = cores.acento    || '#e94560';

  // ── Helpers ──────────────────────────────────────────────────────────────

  function header(text, level = 1) {
    const sizes = { 1: 20, 2: 15, 3: 12 };
    return {
      text,
      fontSize: sizes[level] || 12,
      bold: true,
      color: level === 1 ? primaria : secundaria,
      margin: level === 1 ? [0, 20, 0, 8] : [0, 12, 0, 4],
    };
  }

  function label(text) {
    return { text: text.toUpperCase(), fontSize: 8, color: '#888888', margin: [0, 6, 0, 2] };
  }

  function body(text) {
    return { text: text || '—', fontSize: 10, color: '#333333', margin: [0, 0, 0, 4] };
  }

  function divider() {
    return { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: '#dddddd' }], margin: [0, 8, 0, 8] };
  }

  function pageBreak() {
    return { text: '', pageBreak: 'after' };
  }

  function tag(text, color) {
    return {
      table: { body: [[{ text, fontSize: 9, color: '#ffffff', fillColor: color || acento, margin: [6, 3, 6, 3] }]] },
      layout: 'noBorders',
      margin: [0, 2, 6, 2],
    };
  }

  // ── Capa (Página 1) ───────────────────────────────────────────────────────

  const capa = [
    {
      canvas: [{
        type: 'rect', x: 0, y: 0, w: 595, h: 841,
        color: primaria,
      }],
      absolutePosition: { x: 0, y: 0 },
    },
    { text: '\n\n\n\n\n\n' },
    {
      text: bp.identidade.nome_oficial,
      fontSize: 36,
      bold: true,
      color: '#ffffff',
      alignment: 'center',
      margin: [40, 0, 40, 12],
    },
    {
      text: bp.identidade.tagline || '',
      fontSize: 14,
      color: acento,
      alignment: 'center',
      margin: [60, 0, 60, 40],
    },
    { text: '\n\n\n\n\n\n\n\n\n\n\n\n\n' },
    {
      text: `por ${bp.criador.nome}`,
      fontSize: 12,
      color: '#aaaaaa',
      alignment: 'center',
    },
    {
      text: `${bp.criador.area} · ${bp.criador.anos_experiencia} anos de experiência`,
      fontSize: 10,
      color: '#888888',
      alignment: 'center',
      margin: [0, 4, 0, 0],
    },
    pageBreak(),
  ];

  // ── Índice (Página 2) ────────────────────────────────────────────────────

  const indice = [
    header('Sumário'),
    divider(),
    ...[
      ['1. Método — DCR', '3'],
      ['2. Identidade do Método', '5'],
      ['3. Didática', '7'],
      ['4. Pitch', '8'],
      ['5. Portfólio', '9'],
      ['6. Arsenal', '10'],
      ['7. Próximos Passos', '11'],
    ].map(([titulo, pg]) => ({
      columns: [
        { text: titulo, fontSize: 11, color: '#333333' },
        { text: pg, fontSize: 11, color: '#888888', alignment: 'right' },
      ],
      margin: [0, 6, 0, 0],
    })),
    pageBreak(),
  ];

  // ── Seção 1: DCR (Páginas 3-4) ───────────────────────────────────────────

  const passos = (bp.caminho || []).map((p, i) => [
    header(`${p.ordem}. ${p.nome}`, 2),
    body(p.descricao),
    label('FEZ — trajetória pessoal'),
    body(p.fez),
    label('FAZ — processo atual'),
    body(p.faz),
    label('FARIA — versão ensinável'),
    body(p.faria),
    label('Ferramenta'),
    body(p.ferramenta),
    i < (bp.caminho.length - 1) ? divider() : {},
  ]).flat();

  const secaoDCR = [
    header('1. Método — DCR'),
    { columns: [
      [label('Público'), body(bp.destino?.publico)],
      [label('Ponto A'), body(bp.destino?.ponto_a)],
      [label('Ponto B'), body(bp.destino?.ponto_b)],
    ], columnGap: 20 },
    divider(),
    header('Caminho', 2),
    ...passos,
    { text: bp.rota_resumo || '', fontSize: 10, italics: true, color: '#555555', margin: [0, 12, 0, 0] },
    pageBreak(),
  ];

  // ── Seção 2: Identidade (Página 5) ───────────────────────────────────────

  const secaoIdentidade = [
    header('2. Identidade do Método'),
    label('Nome Oficial'),
    body(bp.identidade.nome_oficial),
    label('Tagline'),
    body(bp.identidade.tagline),
    label('Frase Autoral'),
    {
      text: `"${bp.identidade.frase_autoral}"`,
      fontSize: 13,
      italics: true,
      color: primaria,
      margin: [0, 4, 0, 12],
    },
    label('Forma Visual'),
    body(bp.identidade.forma_visual + (bp.identidade.forma_descricao ? ` — ${bp.identidade.forma_descricao}` : '')),
    divider(),
    label('Paleta de Cores'),
    {
      columns: [
        { stack: [{ canvas: [{ type: 'rect', x: 0, y: 0, w: 50, h: 30, color: primaria }] }, { text: 'Primária', fontSize: 8, margin: [0, 4, 0, 0] }, { text: primaria, fontSize: 8, color: '#888888' }] },
        { stack: [{ canvas: [{ type: 'rect', x: 0, y: 0, w: 50, h: 30, color: secundaria }] }, { text: 'Secundária', fontSize: 8, margin: [0, 4, 0, 0] }, { text: secundaria, fontSize: 8, color: '#888888' }] },
        { stack: [{ canvas: [{ type: 'rect', x: 0, y: 0, w: 50, h: 30, color: acento }] }, { text: 'Acento', fontSize: 8, margin: [0, 4, 0, 0] }, { text: acento, fontSize: 8, color: '#888888' }] },
      ],
      columnGap: 20,
      margin: [0, 8, 0, 0],
    },
    pageBreak(),
  ];

  // ── Seção 3: Didática (Página 7) ─────────────────────────────────────────

  const d = bp.didatica || {};
  const secaoDidatica = [
    header('3. Didática — Teoria da Imaginação'),
    {
      columns: [
        [{ text: 'APROXIMAR', fontSize: 9, bold: true, color: primaria }, body(d.aproximar)],
        [{ text: 'CONECTAR', fontSize: 9, bold: true, color: secundaria }, body(d.conectar)],
        [{ text: 'DESEJAR', fontSize: 9, bold: true, color: acento }, body(d.desejar)],
      ],
      columnGap: 16,
    },
    pageBreak(),
  ];

  // ── Seção 4: Pitch (Página 8) ─────────────────────────────────────────────

  const p = bp.pitch || {};
  const secaoPitch = [
    header('4. Pitch'),
    {
      text: `"${p.uma_frase}"`,
      fontSize: 14,
      italics: true,
      color: primaria,
      margin: [0, 0, 0, 16],
    },
    { columns: [
      [label('Quem'), body(p.quem), label('Solução'), body(p.solucao)],
      [label('Diferencial'), body(p.diferencial), label('Resultado'), body(p.resultado)],
    ], columnGap: 20 },
    divider(),
    label('3 Níveis de Problema'),
    { columns: [
      [{ text: 'Externo', fontSize: 9, bold: true, margin: [0, 0, 0, 2] }, body(p.problema_externo)],
      [{ text: 'Interno', fontSize: 9, bold: true, margin: [0, 0, 0, 2] }, body(p.problema_interno)],
      [{ text: 'Filosófico', fontSize: 9, bold: true, margin: [0, 0, 0, 2] }, body(p.problema_filosofico)],
    ], columnGap: 16 },
    pageBreak(),
  ];

  // ── Seção 5: Portfólio (Página 9) ────────────────────────────────────────

  const secaoPortfolio = [
    header('5. Portfólio'),
    ...(bp.portfolio || []).map(prod => ({
      table: {
        widths: [80, '*'],
        body: [
          [
            { text: prod.nivel.toUpperCase(), fontSize: 9, bold: true, color: '#ffffff', fillColor: acento, margin: [6, 6, 6, 6] },
            { stack: [
              { text: prod.nome, fontSize: 12, bold: true, color: primaria },
              { text: prod.formato, fontSize: 9, color: '#888888', margin: [0, 2, 0, 2] },
              { text: prod.descricao || '', fontSize: 10, color: '#444444' },
              { text: prod.preco_faixa, fontSize: 11, bold: true, color: acento, margin: [0, 6, 0, 0] },
            ], margin: [8, 6, 8, 6] },
          ],
        ],
      },
      layout: { hLineColor: () => '#eeeeee', vLineColor: () => '#eeeeee' },
      margin: [0, 0, 0, 12],
    })),
    pageBreak(),
  ];

  // ── Seção 6: Arsenal (Página 10) ─────────────────────────────────────────

  const a = bp.arsenal || {};
  const ho = a.historia_origem || {};
  const secaoArsenal = [
    header('6. Arsenal'),
    header('Frases Autorais', 2),
    ...(a.frases_autorais || []).map(frase => ({
      text: `"${frase}"`,
      fontSize: 12,
      italics: true,
      color: primaria,
      margin: [20, 4, 20, 4],
      borderLeft: [3, '#e94560'],
    })),
    divider(),
    header('História de Origem', 2),
    ...[
      ['Situação', ho.situacao],
      ['Tentativa', ho.tentativa],
      ['Insight', ho.insight],
      ['Método', ho.metodo],
      ['Resultado', ho.resultado],
    ].map(([l, v]) => [label(l), body(v)]).flat(),
    divider(),
    header('MVP 30 Dias', 2),
    body(a.mvp_30_dias),
    pageBreak(),
  ];

  // ── Seção 7: Próximos Passos (Página 11) ─────────────────────────────────

  const secaoProximos = [
    header('7. Próximos Passos'),
    {
      text: a.proximo_passo || '—',
      fontSize: 13,
      color: primaria,
      margin: [0, 8, 0, 24],
    },
    { text: bp.painel_sintese || '', fontSize: 10, color: '#555555', italics: true },
  ];

  // ── Definição do Documento ────────────────────────────────────────────────

  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 60],
    content: [
      ...capa,
      ...indice,
      ...secaoDCR,
      ...secaoIdentidade,
      ...secaoDidatica,
      ...secaoPitch,
      ...secaoPortfolio,
      ...secaoArsenal,
      ...secaoProximos,
    ],
    header: (currentPage) => currentPage === 1 ? {} : {
      columns: [
        { text: bp.identidade.nome_oficial, fontSize: 8, color: '#aaaaaa', margin: [40, 20, 0, 0] },
        { text: `${currentPage}`, fontSize: 8, color: '#aaaaaa', alignment: 'right', margin: [0, 20, 40, 0] },
      ],
    },
    footer: (currentPage) => currentPage === 1 ? {} : {
      text: bp.identidade.tagline || '',
      fontSize: 7,
      color: '#cccccc',
      alignment: 'center',
      margin: [0, 0, 0, 20],
    },
    defaultStyle: {
      font: 'Roboto',
      fontSize: 10,
      color: '#222222',
    },
  };

  pdfMake.createPdf(docDefinition).download(
    `${bp.identidade.nome_oficial.replace(/\s+/g, '-').toLowerCase()}-metodo.pdf`
  );
}
