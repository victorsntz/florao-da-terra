/* Florão da Terra — protótipo navegável
   Sem framework e sem build: abre com dois cliques no index.html. */

const app = document.getElementById('app');

const estado = {
  filtros: { q: '', cat: 'todas', uf: 'todas', faixa: 'todas', ordem: 'relevancia' },
  contatos: {},          // id do anúncio -> leads gerados na demo
  wizard: null,
  galeria: 0,
  abaAdmin: 'fila',
  moderados: {}
};

/* ---------------- utilidades ---------------- */

const brl = (v, casas = 0) => 'R$ ' + v.toLocaleString('pt-BR', {
  minimumFractionDigits: casas, maximumFractionDigits: casas
});

const nomeCat = id => (CATEGORIAS.find(c => c.id === id) || {}).nome || id;
const iconeCat = id => (CATEGORIAS.find(c => c.id === id) || {}).icone || '📦';
const vendedorDe = a => VENDEDORES[a.vend];
const iniciais = n => n.split(' ').filter(p => p.length > 2).slice(0, 2).map(p => p[0]).join('').toUpperCase();

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.hidden = false;
  requestAnimationFrame(() => t.classList.add('vis'));
  clearTimeout(toast._t);
  toast._t = setTimeout(() => {
    t.classList.remove('vis');
    setTimeout(() => { t.hidden = true; }, 220);
  }, 3200);
}

function abrirModal(html) {
  const m = document.getElementById('modal');
  m.innerHTML = `<div class="modal-caixa">${html}</div>`;
  m.hidden = false;
  m.onclick = e => { if (e.target === m) fecharModal(); };
}
function fecharModal() {
  const m = document.getElementById('modal');
  m.hidden = true;
  m.innerHTML = '';
}

function precoCard(a) {
  return `<strong class="num">${brl(a.preco)}</strong>${a.unidade ? `<small>${a.unidade}</small>` : ''}`;
}

/* Galeria: a primeira posição é a foto do bem, as outras duas ficam como
   ilustração. Um anúncio real teria três fotos; aqui existe uma só. */
function imagemGaleria(a, posicao, prioridade) {
  return posicao === 0 ? imagemAnuncio(a, 0, prioridade) : arte(a.cat, posicao);
}

/* Foto do anúncio. Sem foto — ou se o arquivo faltar — cai na ilustração SVG,
   que não depende de rede nenhuma. */
function imagemAnuncio(a, variacao, prioridade) {
  if (!a.foto) return arte(a.cat, variacao ?? variacaoDe(a.id));
  const carga = prioridade
    ? 'fetchpriority="high"'
    : 'loading="lazy" decoding="async"';
  // no arquivo único as fotos vêm embutidas; no site, do disco
  const src = (typeof FOTOS_EMBUTIDAS !== 'undefined' && FOTOS_EMBUTIDAS[a.foto])
    || `/florao-da-terra/fotos/${a.foto}.jpg`;
  return `<img src="${src}" alt="${a.titulo}" width="800" height="520" ${carga}
    onerror="this.outerHTML=arte('${a.cat}', ${variacao ?? variacaoDe(a.id)})">`;
}

/* ---------------- filtragem ---------------- */

const FAIXAS = {
  todas: [0, Infinity],
  a: [0, 50000],
  b: [50000, 300000],
  c: [300000, 2000000],
  d: [2000000, Infinity]
};

function filtrar() {
  const f = estado.filtros;
  const termo = f.q.trim().toLowerCase();
  const [min, max] = FAIXAS[f.faixa];

  let lista = ANUNCIOS.filter(a => {
    if (f.cat !== 'todas' && a.cat !== f.cat) return false;
    if (f.uf !== 'todas' && a.uf !== f.uf) return false;
    if (a.preco < min || a.preco > max) return false;
    if (termo) {
      const alvo = `${a.titulo} ${a.desc} ${a.cidade} ${a.uf} ${nomeCat(a.cat)}`.toLowerCase();
      if (!alvo.includes(termo)) return false;
    }
    return true;
  });

  const ordens = {
    relevancia: (x, y) => (y.destaque ? 1 : 0) - (x.destaque ? 1 : 0) || y.vistas - x.vistas,
    recentes:   (x, y) => x.dias - y.dias,
    barato:     (x, y) => x.preco - y.preco,
    caro:       (x, y) => y.preco - x.preco
  };
  return lista.sort(ordens[f.ordem]);
}

/* ---------------- componentes ---------------- */

function cardAnuncio(a) {
  const v = vendedorDe(a);
  return `
  <a class="card" href="#/anuncio/${a.id}">
    <div class="card-arte">
      ${imagemAnuncio(a)}
      <div class="selos">
        ${a.destaque ? '<span class="selo selo-destaque">Destaque</span>' : ''}
        ${v && v.verificado ? '<span class="selo selo-verificado">✓ Verificado</span>' : ''}
      </div>
      ${a.video ? '<span class="selo selo-video">▶ Vídeo</span>' : ''}
    </div>
    <div class="card-corpo">
      <span class="card-cat">${nomeCat(a.cat)}</span>
      <span class="card-titulo">${a.titulo}</span>
      <span class="card-local">📍 ${a.cidade} — ${a.uf} · há ${a.dias} ${a.dias === 1 ? 'dia' : 'dias'}</span>
      <span class="card-preco">${precoCard(a)}</span>
    </div>
  </a>`;
}

function chips() {
  const f = estado.filtros;
  return `
  <div class="categorias">
    <button class="chip ${f.cat === 'todas' ? 'ativo' : ''}" data-cat="todas"><em>🧭</em> Tudo</button>
    ${CATEGORIAS.map(c => `
      <button class="chip ${f.cat === c.id ? 'ativo' : ''}" data-cat="${c.id}"><em>${c.icone}</em> ${c.nome}</button>
    `).join('')}
  </div>`;
}

/* ---------------- tela: mural ---------------- */

function viewHome() {
  const totalAnuncios = ANUNCIOS.length;
  const totalCidades = new Set(ANUNCIOS.map(a => a.cidade)).size;

  app.innerHTML = `
  <div class="pagina">
    <section class="hero">
      <h1>Quem tem pra vender acha quem quer comprar.</h1>
      <p>O mural do agro: fazenda, gado, trator, caminhonete, drone e o que mais girar dentro da porteira. Um lugar só, gente do ramo, contato direto no WhatsApp.</p>
      <div class="busca">
        <input id="busca" type="text" placeholder="O que o senhor procura? Ex.: bezerra nelore, trator 4x4, fazenda em Araguari" value="${estado.filtros.q}">
        <button class="btn btn-ambar" id="btn-buscar">Buscar</button>
      </div>
      <div class="hero-nums">
        <div><strong class="num">${totalAnuncios}</strong> anúncios no ar</div>
        <div><strong class="num">${totalCidades}</strong> cidades</div>
        <div><strong>100%</strong> anúncios revisados</div>
      </div>
    </section>

    <div class="titulo-secao">
      <h2>Navegue por categoria</h2>
      <span>Tudo que anda, pasta ou produz</span>
    </div>
    ${chips()}

    <div class="barra-filtros">
      <div class="campo">
        <label for="f-uf">Estado</label>
        <select id="f-uf">
          <option value="todas">Todos</option>
          ${UFS.map(u => `<option value="${u}" ${estado.filtros.uf === u ? 'selected' : ''}>${u}</option>`).join('')}
        </select>
      </div>
      <div class="campo">
        <label for="f-faixa">Faixa de preço</label>
        <select id="f-faixa">
          <option value="todas">Qualquer valor</option>
          <option value="a">Até R$ 50 mil</option>
          <option value="b">R$ 50 mil a R$ 300 mil</option>
          <option value="c">R$ 300 mil a R$ 2 milhões</option>
          <option value="d">Acima de R$ 2 milhões</option>
        </select>
      </div>
      <div class="campo">
        <label for="f-ordem">Ordenar por</label>
        <select id="f-ordem">
          <option value="relevancia">Mais relevantes</option>
          <option value="recentes">Mais recentes</option>
          <option value="barato">Menor preço</option>
          <option value="caro">Maior preço</option>
        </select>
      </div>
      <span class="resumo" id="resumo"></span>
    </div>

    <div id="resultados"></div>
  </div>`;

  document.getElementById('f-uf').value = estado.filtros.uf;
  document.getElementById('f-faixa').value = estado.filtros.faixa;
  document.getElementById('f-ordem').value = estado.filtros.ordem;

  renderResultados();

  const busca = document.getElementById('busca');
  busca.addEventListener('input', e => { estado.filtros.q = e.target.value; renderResultados(); });
  document.getElementById('btn-buscar').addEventListener('click', () => renderResultados());

  ['uf', 'faixa', 'ordem'].forEach(campo => {
    document.getElementById('f-' + campo).addEventListener('change', e => {
      estado.filtros[campo] = e.target.value;
      renderResultados();
    });
  });

  app.querySelectorAll('.chip').forEach(c => {
    c.addEventListener('click', () => {
      estado.filtros.cat = c.dataset.cat;
      app.querySelectorAll('.chip').forEach(o => o.classList.toggle('ativo', o === c));
      renderResultados();
    });
  });
}

function renderResultados() {
  const lista = filtrar();
  const destaques = lista.filter(a => a.destaque);
  const comuns = lista.filter(a => !a.destaque);
  const alvo = document.getElementById('resultados');
  const resumo = document.getElementById('resumo');
  if (resumo) resumo.textContent = `${lista.length} ${lista.length === 1 ? 'anúncio encontrado' : 'anúncios encontrados'}`;
  if (!alvo) return;

  if (!lista.length) {
    alvo.innerHTML = `<div class="grid"><div class="vazio">
      <strong>Nada encontrado com esses filtros.</strong>
      <p style="margin-top:6px">Tente ampliar a faixa de preço ou limpar a busca.</p>
    </div></div>`;
    return;
  }

  alvo.innerHTML = `
    ${destaques.length ? `
      <div class="titulo-secao"><h2>Em destaque</h2><span>Anúncios com posição paga no mural</span></div>
      <div class="grid">${destaques.map(cardAnuncio).join('')}</div>` : ''}
    <div class="titulo-secao"><h2>${destaques.length ? 'Demais anúncios' : 'Anúncios'}</h2><span>${comuns.length} itens</span></div>
    <div class="grid">${comuns.map(cardAnuncio).join('') || '<div class="vazio">Só há anúncios em destaque com esses filtros.</div>'}</div>`;
}

/* ---------------- tela: detalhe ---------------- */

function viewAnuncio(id) {
  const a = ANUNCIOS.find(x => x.id === id);
  if (!a) { location.hash = '#/'; return; }
  const v = vendedorDe(a);
  const leads = a.contatos + (estado.contatos[a.id] || 0);
  const relacionados = ANUNCIOS.filter(x => x.cat === a.cat && x.id !== a.id).slice(0, 4);

  app.innerHTML = `
  <div class="pagina">
    <a class="voltar" href="#/">← Voltar para o mural</a>
    <div class="detalhe">
      <div>
        <div class="galeria">
          <div class="galeria-principal" id="galeria-principal">
            ${imagemGaleria(a, estado.galeria, true)}
            <div class="selos">
              ${a.destaque ? '<span class="selo selo-destaque">Destaque</span>' : ''}
              ${v.verificado ? '<span class="selo selo-verificado">✓ Vendedor verificado</span>' : ''}
            </div>
            ${a.video ? '<span class="selo selo-video">▶ Vídeo do bem</span>' : ''}
          </div>
          <div class="galeria-miniaturas">
            ${[0, 1, 2].map(i => `
              <div class="mini ${estado.galeria === i ? 'ativa' : ''}" data-foto="${i}">${imagemGaleria(a, i)}</div>
            `).join('')}
          </div>
        </div>

        <div class="bloco">
          <h3>Descrição</h3>
          <p style="color:var(--ink-2);line-height:1.65">${a.desc}</p>
        </div>

        <div class="bloco">
          <h3>Ficha do bem</h3>
          <dl class="ficha">
            ${Object.entries(a.specs).map(([k, val]) => `<div><dt>${k}</dt><dd>${val}</dd></div>`).join('')}
          </dl>
        </div>

        <div class="bloco">
          <h3>Anúncios parecidos</h3>
          <div class="grid">${relacionados.map(cardAnuncio).join('')}</div>
        </div>
      </div>

      <aside class="painel-lateral">
        <div class="cartao-preco">
          <span class="card-cat">${nomeCat(a.cat)}</span>
          <h1 style="font-size:20px;margin:6px 0 12px">${a.titulo}</h1>
          <div class="valor num">${brl(a.preco)}${a.unidade ? ` <small>${a.unidade}</small>` : ''}</div>
          <div class="cod">Código ${a.id} · 📍 ${a.cidade} — ${a.uf} · publicado há ${a.dias} ${a.dias === 1 ? 'dia' : 'dias'}</div>

          <div class="vendedor">
            <div class="avatar">${iniciais(v.nome)}</div>
            <div class="vendedor-info">
              <strong>${v.nome}</strong>
              <span>${v.tipo} · no mural desde ${v.desde}${v.verificado ? ' · ✓ verificado' : ''}</span>
            </div>
          </div>

          <button class="btn btn-verde btn-bloco" id="btn-zap">Falar no WhatsApp</button>
          <button class="btn btn-linha btn-bloco" id="btn-salvar" style="margin-top:8px">Salvar anúncio</button>

          <div class="aviso">
            <span>🛡️</span>
            <div>Anúncio conferido pela nossa moderação: fotos, categoria e dados do vendedor. Nunca faça pagamento antes de ver o bem.</div>
          </div>
        </div>

        <div class="bloco" style="margin:0">
          <h3>Movimento do anúncio</h3>
          <div class="linha-anuncio" style="border:0;padding:0;margin:0">
            <div class="stats" style="gap:26px">
              <div><b class="num">${a.vistas.toLocaleString('pt-BR')}</b>visualizações</div>
              <div><b class="num" id="cnt-leads">${leads}</b>contatos</div>
            </div>
          </div>
          <p style="font-size:12.5px;color:var(--ink-3);margin-top:12px">
            O vendedor enxerga esses números no painel dele — é o que justifica a assinatura.
          </p>
        </div>

        <button class="btn btn-fantasma btn-bloco" id="btn-denunciar">Denunciar este anúncio</button>
      </aside>
    </div>
  </div>`;

  app.querySelectorAll('.mini[data-foto]').forEach(m => {
    m.addEventListener('click', () => {
      estado.galeria = +m.dataset.foto;
      document.getElementById('galeria-principal').innerHTML =
        imagemGaleria(a, estado.galeria, true) +
        `<div class="selos">${a.destaque ? '<span class="selo selo-destaque">Destaque</span>' : ''}${v.verificado ? '<span class="selo selo-verificado">✓ Vendedor verificado</span>' : ''}</div>` +
        (a.video ? '<span class="selo selo-video">▶ Vídeo do bem</span>' : '');
      app.querySelectorAll('.mini[data-foto]').forEach(o => o.classList.toggle('ativa', o === m));
    });
  });

  document.getElementById('btn-zap').addEventListener('click', () => {
    abrirModal(`
      <h3>Contato liberado</h3>
      <p>O vendedor recebe seu nome e o código do anúncio junto com a mensagem.</p>
      <div class="zap">
        <span style="font-size:26px">💬</span>
        <div><strong>${v.fone}</strong><br><span style="font-size:12.5px;color:var(--ink-2)">${v.nome}</span></div>
      </div>
      <p style="font-size:12.5px">Assunto sugerido: “Vi o anúncio ${a.id} no Florão da Terra — ${a.titulo}”.</p>
      <div style="display:flex;gap:8px;margin-top:18px">
        <button class="btn btn-verde" id="m-ok" style="flex:1">Registrar meu interesse</button>
        <button class="btn btn-linha" id="m-fechar">Fechar</button>
      </div>`);
    document.getElementById('m-fechar').onclick = fecharModal;
    document.getElementById('m-ok').onclick = () => {
      estado.contatos[a.id] = (estado.contatos[a.id] || 0) + 1;
      document.getElementById('cnt-leads').textContent = a.contatos + estado.contatos[a.id];
      fecharModal();
      toast('Contato registrado — o vendedor foi avisado no WhatsApp.');
    };
  });

  document.getElementById('btn-salvar').addEventListener('click', () => toast('Anúncio salvo na sua lista.'));
  document.getElementById('btn-denunciar').addEventListener('click', () => toast('Denúncia enviada para a moderação. Obrigado.'));
}

/* ---------------- tela: planos ---------------- */

function viewPlanos() {
  app.innerHTML = `
  <div class="pagina">
    <div style="max-width:620px;margin-bottom:26px">
      <h1 style="font-size:28px">Planos para quem vive de vender</h1>
      <p style="color:var(--ink-2);margin-top:10px">
        O anúncio fica no ar enquanto a assinatura estiver ativa. Sem taxa de adesão, sem fidelidade,
        cancela quando o bem vender.
      </p>
    </div>

    <div class="planos">
      ${PLANOS.map(p => `
        <div class="plano ${p.recomendado ? 'recomendado' : ''}">
          ${p.recomendado ? '<span class="plano-fita">Mais procurado</span>' : ''}
          ${p.recomendado ? `<span class="plano-selo"><b>R$ ${Math.round(p.preco / 30)}</b>por dia</span>` : ''}
          <h3>${p.nome}</h3>
          <p class="plano-quem">${p.quem}</p>
          <div class="preco num">R$ ${p.preco.toFixed(2).replace('.', ',')} <span>${p.sub}</span></div>
          <ul>${p.itens.map(i => `<li>${i}</li>`).join('')}</ul>
          <a class="btn ${p.recomendado ? 'btn-verde' : 'btn-linha'} btn-bloco" href="#/anunciar" style="margin-top:auto">Começar com o ${p.nome}</a>
        </div>
      `).join('')}
    </div>

    <p class="planos-pe">
      <span>✓ Sem taxa de adesão</span>
      <span>✓ Sem fidelidade</span>
      <span>✓ 0% de comissão sobre a venda</span>
    </p>

    <div class="titulo-secao"><h2>Serviços avulsos</h2><span>Vendidos por dentro do painel</span></div>
    <div class="bloco" style="margin:0;padding:6px 0">
      <table class="tabela">
        <tr><th>Serviço</th><th>Período</th><th>Valor</th></tr>
        ${EXTRAS.map(([a, b, c]) => `<tr><td>${a}</td><td style="color:var(--ink-2)">${b}</td><td><strong>${c}</strong></td></tr>`).join('')}
      </table>
    </div>

    <div class="titulo-secao"><h2>Taxa de sucesso (opcional)</h2><span>Cobrada só quando o negócio fecha pela plataforma</span></div>
    <div class="bloco" style="margin:0;padding:6px 0">
      <table class="tabela">
        <tr><th>Valor do bem</th><th>Taxa</th></tr>
        ${COMISSOES.map(([a, b]) => `<tr><td>${a}</td><td><strong>${b}</strong></td></tr>`).join('')}
      </table>
    </div>

    <div class="aviso aviso-ambar" style="margin-top:20px;max-width:720px">
      <span>📌</span>
      <div><strong>Valores de trabalho.</strong> Saíram da conversa do dia 27/07 e servem para discussão —
      nada aqui está fechado com o mercado ainda. A faixa de comissão em especial precisa do seu aval.</div>
    </div>
  </div>`;
}

/* ---------------- tela: anunciar (passo a passo) ---------------- */

function viewAnunciar() {
  if (!estado.wizard) {
    estado.wizard = { passo: 1, cat: null, titulo: '', cidade: '', uf: 'MG', preco: '', desc: '', fotos: 0, plano: 'produtor', enviado: false };
  }
  const w = estado.wizard;
  if (w.enviado) return viewAnaliseIA();

  const passos = ['O que é', 'Detalhes', 'Fotos e vídeo', 'Plano'];

  const conteudo = {
    1: () => `
      <h2 style="font-size:20px;margin-bottom:6px">O que o senhor vai anunciar?</h2>
      <p style="color:var(--ink-2);margin-bottom:20px">Escolher direito ajuda o comprador certo a achar.</p>
      <div class="escolha-cats">
        ${CATEGORIAS.map(c => `
          <div class="escolha-cat ${w.cat === c.id ? 'ativa' : ''}" data-cat="${c.id}">
            <em>${c.icone}</em><span>${c.nome}</span>
          </div>`).join('')}
      </div>`,

    2: () => `
      <h2 style="font-size:20px;margin-bottom:20px">Conte do bem</h2>
      <div class="form-grid">
        <div class="form-campo full">
          <label for="w-titulo">Título do anúncio</label>
          <input type="text" id="w-titulo" value="${w.titulo}" placeholder="Ex.: 100 bezerras nelore desmamadas">
          <span class="dica">Diga o que é, a quantidade e o diferencial. Sem caixa alta e sem telefone no título.</span>
        </div>
        <div class="form-campo">
          <label for="w-cidade">Cidade</label>
          <input type="text" id="w-cidade" value="${w.cidade}" placeholder="Araguari">
        </div>
        <div class="form-campo">
          <label for="w-uf">Estado</label>
          <select id="w-uf">${UFS.map(u => `<option ${w.uf === u ? 'selected' : ''}>${u}</option>`).join('')}</select>
        </div>
        <div class="form-campo">
          <label for="w-preco">Preço (R$)</label>
          <input type="number" id="w-preco" value="${w.preco}" placeholder="2850">
          <span class="dica">Pode ser por cabeça, por saca ou pelo lote fechado.</span>
        </div>
        <div class="form-campo full">
          <label for="w-desc">Descrição</label>
          <textarea id="w-desc" placeholder="Idade, peso, sanidade, benfeitorias, estado de conservação, forma de entrega...">${w.desc}</textarea>
        </div>
      </div>`,

    3: () => `
      <h2 style="font-size:20px;margin-bottom:6px">Fotos e vídeo</h2>
      <p style="color:var(--ink-2);margin-bottom:18px">Anúncio com vídeo recebe cerca de 3 vezes mais contato. Grave o gado andando, o trator ligado, a sede por dentro.</p>
      <div class="zona-fotos" id="zona-fotos">
        <div style="font-size:30px">📷</div>
        <strong>Toque para adicionar fotos</strong>
        <p style="font-size:13px;margin-top:4px">Até 15 fotos e 1 vídeo no plano Produtor</p>
      </div>
      <div class="fotos-add" id="fotos-add">
        ${Array.from({ length: w.fotos }, (_, i) => `<div class="mini">${arte(w.cat || 'fazendas', i % 3)}</div>`).join('')}
      </div>
      ${w.fotos ? `<p style="font-size:13px;color:var(--ink-2);margin-top:12px">${w.fotos} ${w.fotos === 1 ? 'foto adicionada' : 'fotos adicionadas'}.</p>` : ''}`,

    4: () => `
      <h2 style="font-size:20px;margin-bottom:18px">Escolha o plano</h2>
      <div class="planos">
        ${PLANOS.map(p => `
          <div class="plano ${w.plano === p.id ? 'recomendado' : ''}" data-plano="${p.id}" style="cursor:pointer">
            ${w.plano === p.id ? '<span class="plano-fita">Selecionado</span>' : ''}
            <h3>${p.nome}</h3>
            <div class="preco num">R$ ${p.preco.toFixed(2).replace('.', ',')} <span>/ ${p.sub}</span></div>
            <ul>${p.itens.slice(0, 4).map(i => `<li>${i}</li>`).join('')}</ul>
          </div>`).join('')}
      </div>
      <div class="aviso" style="margin-top:18px">
        <span>🛡️</span>
        <div>Antes de ir pro ar, todo anúncio passa pela conferência automática e depois pelo olho de uma pessoa nossa. Leva alguns minutos.</div>
      </div>`
  };

  app.innerHTML = `
  <div class="pagina pagina-estreita">
    <a class="voltar" href="#/">← Voltar para o mural</a>
    <div class="passos">
      ${passos.map((p, i) => `
        <div class="passo ${w.passo === i + 1 ? 'ativo' : ''} ${w.passo > i + 1 ? 'feito' : ''}">
          <b>${w.passo > i + 1 ? '✓' : i + 1}</b> ${p}
        </div>`).join('')}
    </div>
    <div class="bloco" style="margin:0">
      ${conteudo[w.passo]()}
      <div class="acoes-wizard">
        <button class="btn btn-linha" id="w-voltar" ${w.passo === 1 ? 'style="visibility:hidden"' : ''}>Voltar</button>
        <button class="btn btn-verde" id="w-avancar">${w.passo === 4 ? 'Publicar anúncio' : 'Continuar'}</button>
      </div>
    </div>
  </div>`;

  app.querySelectorAll('.escolha-cat').forEach(c => c.addEventListener('click', () => {
    w.cat = c.dataset.cat;
    app.querySelectorAll('.escolha-cat').forEach(o => o.classList.toggle('ativa', o === c));
  }));

  ['titulo', 'cidade', 'preco', 'desc', 'uf'].forEach(campo => {
    const el = document.getElementById('w-' + campo);
    if (el) el.addEventListener('input', e => { w[campo] = e.target.value; });
    if (el && el.tagName === 'SELECT') el.addEventListener('change', e => { w[campo] = e.target.value; });
  });

  const zona = document.getElementById('zona-fotos');
  if (zona) zona.addEventListener('click', () => {
    if (w.fotos >= 15) return toast('Limite de 15 fotos no plano Produtor.');
    w.fotos++;
    viewAnunciar();
  });

  app.querySelectorAll('[data-plano]').forEach(p => p.addEventListener('click', () => {
    w.plano = p.dataset.plano;
    viewAnunciar();
  }));

  document.getElementById('w-voltar').addEventListener('click', () => { w.passo--; viewAnunciar(); });
  document.getElementById('w-avancar').addEventListener('click', () => {
    if (w.passo === 1 && !w.cat) return toast('Escolha uma categoria para continuar.');
    if (w.passo === 2 && !w.titulo.trim()) return toast('O anúncio precisa de um título.');
    if (w.passo === 3 && w.fotos === 0) return toast('Adicione pelo menos uma foto.');
    if (w.passo === 4) { w.enviado = true; return viewAnaliseIA(); }
    w.passo++;
    viewAnunciar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function viewAnaliseIA() {
  const w = estado.wizard;
  const plano = PLANOS.find(p => p.id === w.plano);

  app.innerHTML = `
  <div class="pagina pagina-estreita">
    <div class="bloco analise" style="margin:0">
      <div class="circulo">⏳</div>
      <h2>Anúncio recebido — está em análise</h2>
      <p>“${w.titulo}” entrou na fila. A conferência automática roda agora; a revisão humana sai em até 30 minutos no horário comercial.</p>
      <ul class="checklist" id="checklist"></ul>
      <div style="display:flex;gap:10px;justify-content:center;margin-top:26px;flex-wrap:wrap">
        <a class="btn btn-verde" href="#/painel">Ir para o meu painel</a>
        <button class="btn btn-linha" id="novo">Anunciar outro bem</button>
      </div>
      <p style="font-size:12.5px;color:var(--ink-3);margin-top:18px">
        Plano escolhido: <strong>${plano.nome}</strong> — R$ ${plano.preco.toFixed(2).replace('.', ',')} ${plano.sub}
      </p>
    </div>
  </div>`;

  const itens = [
    ['ok', 'Imagens conferem com a categoria escolhida', 'Nenhum conteúdo impróprio identificado nas ' + w.fotos + ' fotos.'],
    ['ok', 'Texto sem telefone nem link externo', 'O contato fica no botão do WhatsApp, que é o que a gente consegue medir.'],
    ['ok', 'Preço dentro da média da praça', 'Comparado com anúncios parecidos da região.'],
    ['pend', 'Aguardando revisão humana', 'Uma pessoa da moderação confirma antes de liberar no mural.']
  ];

  const ul = document.getElementById('checklist');
  itens.forEach(([tipo, titulo, det], i) => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="${tipo}">${tipo === 'ok' ? '✓' : '⏳'}</span>
      <div><strong>${titulo}</strong><br><span style="color:var(--ink-2);font-size:12.5px">${det}</span></div>`;
    ul.appendChild(li);
    setTimeout(() => li.classList.add('vis'), i * 550 + 300);
  });

  document.getElementById('novo').addEventListener('click', () => {
    estado.wizard = null;
    viewAnunciar();
  });
}

/* ---------------- tela: painel do anunciante ---------------- */

function viewPainel() {
  const meus = ANUNCIOS.filter(a => a.vend === 'fg');
  const vistas = meus.reduce((s, a) => s + a.vistas, 0);
  const leads = meus.reduce((s, a) => s + a.contatos + (estado.contatos[a.id] || 0), 0);
  const pendente = estado.wizard && estado.wizard.enviado ? estado.wizard : null;

  app.innerHTML = `
  <div class="pagina">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap;margin-bottom:22px">
      <div>
        <h1 style="font-size:26px">Painel · Fernando Gorayeb Agropecuária</h1>
        <p style="color:var(--ink-2);margin-top:6px">Loja oficial · plano Revenda ativo · próxima cobrança em 12 dias</p>
      </div>
      <a class="btn btn-ambar" href="#/anunciar">Novo anúncio</a>
    </div>

    <div class="metricas">
      <div class="metrica"><span>Anúncios ativos</span><strong class="num">${meus.length}</strong><em>de ilimitados no plano</em></div>
      <div class="metrica"><span>Visualizações no mês</span><strong class="num">${vistas.toLocaleString('pt-BR')}</strong><em>+18% vs. mês passado</em></div>
      <div class="metrica"><span>Contatos recebidos</span><strong class="num">${leads}</strong><em>${(leads / meus.length).toFixed(1)} por anúncio</em></div>
      <div class="metrica"><span>Destaques usados</span><strong class="num">3</strong><em>de 4 no mês</em></div>
    </div>

    <div class="titulo-secao"><h2>Meus anúncios</h2><span>Clique para abrir</span></div>

    ${pendente ? `
      <div class="linha-anuncio">
        <div class="mini">${arte(pendente.cat || 'fazendas', 0)}</div>
        <div class="info">
          <strong>${pendente.titulo}</strong>
          <span>${pendente.cidade || 'cidade não informada'} — ${pendente.uf} · enviado agora</span>
        </div>
        <span class="etiqueta et-analise">Em análise</span>
      </div>` : ''}

    ${meus.map(a => `
      <a class="linha-anuncio" href="#/anuncio/${a.id}">
        <div class="mini">${imagemAnuncio(a)}</div>
        <div class="info">
          <strong>${a.titulo}</strong>
          <span>${a.cidade} — ${a.uf} · ${brl(a.preco)}${a.unidade ? ' ' + a.unidade : ''} · há ${a.dias} ${a.dias === 1 ? 'dia' : 'dias'}</span>
        </div>
        <div class="stats">
          <div><b class="num">${a.vistas.toLocaleString('pt-BR')}</b>vistas</div>
          <div><b class="num">${a.contatos + (estado.contatos[a.id] || 0)}</b>contatos</div>
        </div>
        <span class="etiqueta et-ativo">No ar</span>
      </a>`).join('')}

    <div class="aviso" style="margin-top:20px;max-width:760px">
      <span>💡</span>
      <div>É esta tela que segura a assinatura. O produtor renova porque enxerga contato entrando —
      não porque a gente pediu.</div>
    </div>
  </div>`;
}

/* ---------------- tela: moderação + simulador ---------------- */

function viewAdmin() {
  app.innerHTML = `
  <div class="pagina">
    <h1 style="font-size:26px">Área interna</h1>
    <p style="color:var(--ink-2);margin:6px 0 22px">Fila de moderação e projeção de receita — o que fica só com a gente.</p>
    <div class="abas">
      <button class="aba ${estado.abaAdmin === 'fila' ? 'ativa' : ''}" data-aba="fila">Fila de moderação</button>
      <button class="aba ${estado.abaAdmin === 'sim' ? 'ativa' : ''}" data-aba="sim">Simulador de receita</button>
    </div>
    <div id="conteudo-admin"></div>
  </div>`;

  app.querySelectorAll('.aba').forEach(b => b.addEventListener('click', () => {
    estado.abaAdmin = b.dataset.aba;
    viewAdmin();
  }));

  document.getElementById('conteudo-admin').innerHTML =
    estado.abaAdmin === 'fila' ? htmlFila() : htmlSimulador();

  if (estado.abaAdmin === 'fila') ligarFila(); else ligarSimulador();
}

function htmlFila() {
  const pendentes = FILA_MODERACAO.filter(f => !estado.moderados[f.id]);
  const rotulo = { ok: ['parecer-ok', '✓ Liberar', 'IA aprovou'], alerta: ['parecer-alerta', '⚠ Atenção', 'IA pediu conferência'], bloqueio: ['parecer-bloq', '⛔ Bloqueado', 'IA recomendou recusa'] };

  return `
    <div class="metricas" style="margin-bottom:22px">
      <div class="metrica"><span>Na fila agora</span><strong class="num">${pendentes.length}</strong><em>meta: zerar em 30 min</em></div>
      <div class="metrica"><span>Aprovados hoje</span><strong class="num">${47 + Object.values(estado.moderados).filter(v => v === 'ok').length}</strong><em>92% direto pela IA</em></div>
      <div class="metrica"><span>Recusados hoje</span><strong class="num">${6 + Object.values(estado.moderados).filter(v => v === 'no').length}</strong><em>foto imprópria e preço-isca</em></div>
      <div class="metrica"><span>Tempo médio</span><strong class="num">14<span style="font-size:15px"> min</span></strong><em>do envio ao ar</em></div>
    </div>

    ${pendentes.length ? pendentes.map(f => {
      const [cls, , resumo] = rotulo[f.ia];
      return `
      <div class="fila-item" data-id="${f.id}">
        <div class="mini">${arte(f.cat, variacaoDe(f.id))}</div>
        <div>
          <span class="card-cat">${nomeCat(f.cat)} · ${f.id} · ${f.enviado}</span>
          <strong style="display:block;font-size:15px;margin:3px 0">${f.titulo}</strong>
          <span style="font-size:13px;color:var(--ink-2)">${f.vend} · ${f.cidade} — ${f.uf} · ${brl(f.preco)}${f.unidade ? ' ' + f.unidade : ''}</span>
          <div class="parecer ${cls}">
            <b>${resumo} (${f.score}/100)</b>
            <span>${f.parecer}</span>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;min-width:132px">
          <button class="btn btn-verde btn-sm" data-acao="ok" data-id="${f.id}">Aprovar</button>
          <button class="btn btn-linha btn-sm" data-acao="no" data-id="${f.id}">Recusar</button>
        </div>
      </div>`;
    }).join('') : `<div class="vazio"><strong>Fila zerada.</strong><p style="margin-top:6px">Nenhum anúncio esperando revisão humana.</p></div>`}

    <div class="aviso aviso-ambar" style="margin-top:18px;max-width:820px">
      <span>🤖</span>
      <div><strong>É aqui que entra o custo de API que conversamos.</strong> A IA lê foto e texto de todo anúncio
      e classifica antes de chegar na pessoa. Sem ela, alguém teria que olhar item por item — que era o medo do senhor
      com a foto imprópria no meio da venda de fazenda.</div>
    </div>`;
}

function ligarFila() {
  app.querySelectorAll('[data-acao]').forEach(b => b.addEventListener('click', () => {
    estado.moderados[b.dataset.id] = b.dataset.acao;
    toast(b.dataset.acao === 'ok' ? 'Anúncio liberado no mural.' : 'Anúncio recusado — vendedor notificado com o motivo.');
    viewAdmin();
  }));
}

const SIM = { assinantes: 800, ticket: 89.9, pctDestaque: 12, vendas: 25, comissao: 390 };

function htmlSimulador() {
  return `
  <div class="simulador">
    <div class="controles bloco" style="margin:0">
      <div class="controle">
        <label>Assinantes ativos <b id="v-assinantes"></b></label>
        <input type="range" id="s-assinantes" min="100" max="5000" step="50" value="${SIM.assinantes}">
      </div>
      <div class="controle">
        <label>Ticket médio da assinatura <b id="v-ticket"></b></label>
        <input type="range" id="s-ticket" min="39.9" max="199.9" step="10" value="${SIM.ticket}">
      </div>
      <div class="controle">
        <label>Assinantes que compram destaque <b id="v-pct"></b></label>
        <input type="range" id="s-pct" min="0" max="40" step="1" value="${SIM.pctDestaque}">
      </div>
      <div class="controle">
        <label>Negócios fechados no mês (com taxa) <b id="v-vendas"></b></label>
        <input type="range" id="s-vendas" min="0" max="200" step="5" value="${SIM.vendas}">
      </div>
      <div class="controle">
        <label>Taxa média por negócio fechado <b id="v-comissao"></b></label>
        <input type="range" id="s-comissao" min="99" max="1500" step="10" value="${SIM.comissao}">
      </div>
      <p style="font-size:12.5px;color:var(--ink-3);line-height:1.55">
        <strong>Infraestrutura:</strong> R$ 90/mês fixo mais R$ 1,00 por assinante (servidor, armazenamento
        de foto e vídeo, e-mail, WhatsApp, IA de moderação).<br>
        <strong>Taxa do gateway:</strong> R$ 1,99 por assinatura recebida via Pix. É o maior custo do
        negócio e não estava na conta da mesa — com 800 assinantes passa de R$ 1.500/mês sozinho.
      </p>
    </div>

    <div class="resultado">
      <span class="rotulo">Receita mensal</span>
      <b class="destaque num" id="r-total"></b>
      <div class="linha"><span>Assinaturas</span><b class="num" id="r-assin"></b></div>
      <div class="linha"><span>Destaques no mural</span><b class="num" id="r-dest"></b></div>
      <div class="linha"><span>Taxa de sucesso</span><b class="num" id="r-com"></b></div>
      <div class="linha"><span>Infraestrutura</span><b class="num" id="r-custo"></b></div>
      <div class="linha"><span>Taxa do gateway (Pix)</span><b class="num" id="r-gateway"></b></div>
      <div class="linha"><span><strong>Sobra no mês</strong></span><b class="num" id="r-sobra"></b></div>
      <div class="linha"><span>Projeção 12 meses</span><b class="num" id="r-ano"></b></div>
    </div>
  </div>`;
}

function ligarSimulador() {
  const campos = ['assinantes', 'ticket', 'pct', 'vendas', 'comissao'];
  const mapa = { assinantes: 'assinantes', ticket: 'ticket', pct: 'pctDestaque', vendas: 'vendas', comissao: 'comissao' };

  function calcular() {
    const assin = SIM.assinantes * SIM.ticket;
    const dest = SIM.assinantes * (SIM.pctDestaque / 100) * 49.9;
    const com = SIM.vendas * SIM.comissao;
    const custo = 90 + SIM.assinantes * 1.0;      // infraestrutura — ver ESTRUTURACAO.md
    const gateway = SIM.assinantes * 1.99;        // Asaas: R$ 1,99 por Pix recebido
    const total = assin + dest + com;
    const sobra = total - custo - gateway;

    document.getElementById('v-assinantes').textContent = SIM.assinantes.toLocaleString('pt-BR');
    document.getElementById('v-ticket').textContent = brl(SIM.ticket, 2);
    document.getElementById('v-pct').textContent = SIM.pctDestaque + '%';
    document.getElementById('v-vendas').textContent = SIM.vendas;
    document.getElementById('v-comissao').textContent = brl(SIM.comissao);

    document.getElementById('r-total').textContent = brl(total);
    document.getElementById('r-assin').textContent = brl(assin);
    document.getElementById('r-dest').textContent = brl(dest);
    document.getElementById('r-com').textContent = brl(com);
    document.getElementById('r-custo').textContent = '− ' + brl(custo);
    document.getElementById('r-gateway').textContent = '− ' + brl(gateway);
    document.getElementById('r-sobra').textContent = brl(sobra);
    document.getElementById('r-ano').textContent = brl(sobra * 12);
  }

  campos.forEach(c => {
    document.getElementById('s-' + c).addEventListener('input', e => {
      SIM[mapa[c]] = parseFloat(e.target.value);
      calcular();
    });
  });

  calcular();
}

/* ---------------- roteador ---------------- */

function rotear() {
  const hash = location.hash || '#/';
  const partes = hash.replace('#/', '').split('/');
  const raiz = partes[0] || '';

  window.scrollTo({ top: 0 });

  if (raiz === 'anuncio' && partes[1]) { estado.galeria = 0; viewAnuncio(partes[1]); }
  else if (raiz === 'planos')   viewPlanos();
  else if (raiz === 'anunciar') viewAnunciar();
  else if (raiz === 'painel')   viewPainel();
  else if (raiz === 'admin')    viewAdmin();
  else viewHome();

  const atual = '/' + raiz;
  document.querySelectorAll('#nav a').forEach(a => {
    a.classList.toggle('ativo', a.dataset.rota === atual || (atual === '/anuncio' && a.dataset.rota === '/'));
  });
}

window.addEventListener('hashchange', rotear);
document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharModal(); });
rotear();
