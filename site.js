/* Comportamentos comuns às páginas institucionais.
   Sem dependência externa — precisa funcionar sem internet. */

(function () {
  'use strict';

  /* ---------- consentimento de cookies (LGPD) ---------- */

  const CHAVE = 'ft-cookies';
  const PADRAO = { necessarios: true, analiticos: false, marketing: false };

  function lerEscolha() {
    try {
      const bruto = localStorage.getItem(CHAVE);
      return bruto ? JSON.parse(bruto) : null;
    } catch (e) {
      return null;  // navegação privada ou storage bloqueado
    }
  }

  function gravarEscolha(escolha) {
    try {
      localStorage.setItem(CHAVE, JSON.stringify({ ...escolha, em: new Date().toISOString() }));
    } catch (e) { /* sem storage: a escolha vale só nesta visita */ }
  }

  function montarBanner(escolhaAtual) {
    const atual = escolhaAtual || PADRAO;
    const caixa = document.createElement('div');
    caixa.className = 'cookies';
    caixa.setAttribute('role', 'dialog');
    caixa.setAttribute('aria-label', 'Preferências de cookies');
    caixa.innerHTML = `
      <div class="cookies-corpo">
        <div class="cookies-texto">
          <strong>A gente usa cookies.</strong>
          Os necessários mantêm você conectado e protegem contra fraude — sem eles o site não
          funciona. Os outros são escolha sua. Detalhes na
          <a href="/privacidade/">Política de Privacidade</a>.
        </div>

        <div class="cookies-opcoes">
          <label class="cookies-opcao">
            <input type="checkbox" checked disabled>
            <span><strong>Necessários</strong> — sempre ativos</span>
          </label>
          <label class="cookies-opcao">
            <input type="checkbox" id="ck-analiticos" ${atual.analiticos ? 'checked' : ''}>
            <span><strong>Analíticos</strong> — entender como o site é usado</span>
          </label>
          <label class="cookies-opcao">
            <input type="checkbox" id="ck-marketing" ${atual.marketing ? 'checked' : ''}>
            <span><strong>Marketing</strong> — medir campanhas</span>
          </label>
        </div>

        <div class="cookies-acoes">
          <button type="button" class="btn btn-verde btn-sm" data-ck="aceitar">Aceitar todos</button>
          <button type="button" class="btn btn-linha btn-sm" data-ck="salvar">Salvar escolha</button>
          <button type="button" class="btn btn-fantasma btn-sm" data-ck="recusar">Só os necessários</button>
        </div>
      </div>`;

    document.body.appendChild(caixa);
    requestAnimationFrame(() => caixa.classList.add('vis'));

    function fechar(escolha) {
      gravarEscolha(escolha);
      caixa.classList.remove('vis');
      setTimeout(() => caixa.remove(), 240);
    }

    caixa.addEventListener('click', e => {
      const acao = e.target.closest('[data-ck]');
      if (!acao) return;
      if (acao.dataset.ck === 'aceitar') fechar({ necessarios: true, analiticos: true, marketing: true });
      if (acao.dataset.ck === 'recusar') fechar(PADRAO);
      if (acao.dataset.ck === 'salvar') fechar({
        necessarios: true,
        analiticos: caixa.querySelector('#ck-analiticos').checked,
        marketing: caixa.querySelector('#ck-marketing').checked
      });
    });
  }

  // primeira visita → mostra o banner
  if (!lerEscolha()) montarBanner(null);

  // link do rodapé reabre a qualquer momento
  document.addEventListener('click', e => {
    if (!e.target.closest('[data-cookies]')) return;
    e.preventDefault();
    if (document.querySelector('.cookies')) return;
    montarBanner(lerEscolha());
  });

  /* ---------- formulário de contato ---------- */

  const form = document.getElementById('form-contato');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const invalido = form.querySelector(':invalid');
      if (invalido) { invalido.focus(); return; }

      const botao = form.querySelector('[type=submit]');
      botao.disabled = true;
      botao.textContent = 'Enviando...';

      // Sem back-end ainda. Ver LEIA-ME para plugar o envio de verdade.
      setTimeout(() => { window.location.href = '/obrigado/'; }, 500);
    });
  }
})();
