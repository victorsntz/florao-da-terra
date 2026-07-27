/* Ilustrações geradas em SVG.
   Nada de imagem externa: o protótipo tem que abrir sem internet. */

let _uid = 0;
const uid = () => 'g' + (++_uid);

// Paleta derivada da marca: verde #6DBC50, areia #D4C9A7, verde-escuro #1B2217.
// Céu por variação (0,1,2 = "fotos" diferentes do mesmo anúncio).
const CEUS = [
  ['#C4DFEA', '#EFEADA'],
  ['#F0DEBC', '#EFEADA'],
  ['#CBDEE9', '#E8EEDF']
];
const CHAOS = [
  ['#7FC163', '#4F9639'],
  ['#95CE72', '#5CA344'],
  ['#88C86A', '#539B3D']
];

const TINTA = '#1B2217';

function moldura(v, conteudo) {
  const c = uid(), t = uid();
  const [c1, c2] = CEUS[v % 3];
  const [t1, t2] = CHAOS[v % 3];
  return `<svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${c}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
      </linearGradient>
      <linearGradient id="${t}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${t1}"/><stop offset="1" stop-color="${t2}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="260" fill="url(#${c})"/>
    ${conteudo(`url(#${t})`, v)}
  </svg>`;
}

const sol = (x, y) => `<circle cx="${x}" cy="${y}" r="20" fill="#E8B84A" opacity=".85"/>`;

const morros = (chao) => `
  <path d="M0 150 Q80 118 160 148 T320 142 T400 156 V260 H0Z" fill="${chao}"/>
  <path d="M0 176 Q110 154 210 180 T400 172 V260 H0Z" fill="#000" opacity=".08"/>`;

const cerca = (y) => `
  <g stroke="${TINTA}" stroke-width="3" opacity=".55">
    <line x1="0" y1="${y}" x2="400" y2="${y}"/>
    <line x1="0" y1="${y + 12}" x2="400" y2="${y + 12}"/>
    ${[20, 90, 160, 230, 300, 370].map(x => `<line x1="${x}" y1="${y - 10}" x2="${x}" y2="${y + 26}"/>`).join('')}
  </g>`;

const arvore = (x, y, s) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-3" y="-16" width="6" height="20" fill="${TINTA}" opacity=".8"/>
    <circle cx="0" cy="-26" r="17" fill="${TINTA}" opacity=".78"/>
    <circle cx="-12" cy="-19" r="11" fill="${TINTA}" opacity=".78"/>
    <circle cx="12" cy="-20" r="12" fill="${TINTA}" opacity=".78"/>
  </g>`;

const vaca = (x, y, s) => `
  <g transform="translate(${x} ${y}) scale(${s})" fill="${TINTA}" opacity=".82">
    <rect x="0" y="0" width="54" height="26" rx="12"/>
    <rect x="46" y="-9" width="20" height="17" rx="6"/>
    <path d="M62 -9l7-7 1 8zM50 -9l-4-8 8 4z"/>
    <rect x="6" y="24" width="6" height="18" rx="2"/>
    <rect x="18" y="24" width="6" height="18" rx="2"/>
    <rect x="34" y="24" width="6" height="18" rx="2"/>
    <rect x="45" y="24" width="6" height="18" rx="2"/>
    <path d="M0 4c-8 2-10 12-7 18" stroke="${TINTA}" stroke-width="3" fill="none"/>
  </g>`;

const CENAS = {

  fazendas: (chao) => `
    ${sol(330, 52)}
    ${morros(chao)}
    <g fill="${TINTA}" opacity=".85">
      <rect x="120" y="112" width="96" height="52" rx="3"/>
      <path d="M112 112 L168 78 L224 112 Z"/>
      <rect x="228" y="130" width="52" height="34" rx="3"/>
      <path d="M222 130 L254 108 L286 130 Z"/>
    </g>
    <rect x="158" y="136" width="20" height="28" fill="#EFEADA"/>
    <rect x="131" y="124" width="17" height="15" fill="#EFEADA"/>
    <rect x="188" y="124" width="17" height="15" fill="#EFEADA"/>
    ${arvore(58, 172, 1.1)}
    ${arvore(340, 182, .85)}
    ${cerca(206)}`,

  gado: (chao) => `
    ${sol(66, 48)}
    ${morros(chao)}
    ${arvore(352, 168, .9)}
    ${vaca(46, 168, 1.05)}
    ${vaca(168, 186, 1.25)}
    ${vaca(280, 160, .85)}
    ${cerca(232)}`,

  maquinas: (chao) => `
    ${sol(336, 46)}
    <path d="M0 148 Q120 130 250 150 T400 144 V260 H0Z" fill="${chao}"/>
    <g stroke="#000" opacity=".07" stroke-width="6">
      ${[168, 190, 214, 240, 268].map(y => `<line x1="0" y1="${y}" x2="400" y2="${y - 8}"/>`).join('')}
    </g>
    <g transform="translate(96 96)" fill="${TINTA}" opacity=".88">
      <rect x="60" y="10" width="66" height="46" rx="6"/>
      <rect x="72" y="-24" width="46" height="38" rx="5"/>
      <rect x="14" y="30" width="60" height="24" rx="5"/>
      <rect x="30" y="-4" width="7" height="34" rx="3"/>
      <circle cx="104" cy="76" r="32"/>
      <circle cx="30" cy="86" r="20"/>
    </g>
    <circle cx="200" cy="172" r="13" fill="#D4C9A7"/>
    <circle cx="126" cy="182" r="8" fill="#D4C9A7"/>
    <rect x="176" y="80" width="30" height="22" fill="#CBE0EA" opacity=".85" rx="3"/>`,

  veiculos: (chao) => `
    ${sol(60, 50)}
    <path d="M0 152 Q120 138 250 154 T400 148 V260 H0Z" fill="${chao}"/>
    <rect y="188" width="400" height="52" fill="#4E4A42" opacity=".55"/>
    <g stroke="#EFEADA" stroke-width="4" stroke-dasharray="26 22" opacity=".8">
      <line x1="0" y1="214" x2="400" y2="214"/>
    </g>
    <g transform="translate(72 92)" fill="${TINTA}" opacity=".88">
      <path d="M18 62 L18 40 Q18 34 26 32 L92 32 L112 4 L176 4 Q186 4 188 14 L194 32 L246 34 Q256 36 256 46 L256 62 Q256 70 246 70 L28 70 Q18 70 18 62Z"/>
    </g>
    <path d="M188 100 L200 128 L246 128 L240 100 Z" fill="#CBE0EA" opacity=".9"/>
    <path d="M258 102 L262 128 L296 128 L290 102 Z" fill="#CBE0EA" opacity=".9"/>
    <circle cx="132" cy="164" r="21" fill="${TINTA}"/><circle cx="132" cy="164" r="8" fill="#C6B994"/>
    <circle cx="278" cy="164" r="21" fill="${TINTA}"/><circle cx="278" cy="164" r="8" fill="#C6B994"/>`,

  drones: (chao) => `
    <path d="M0 160 H400 V260 H0Z" fill="${chao}"/>
    <g stroke="#000" opacity=".09" stroke-width="3">
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<line x1="${200 + (i - 3) * 22}" y1="160" x2="${200 + (i - 3) * 96}" y2="260"/>`).join('')}
      ${[176, 200, 228, 260].map((y, i) => `<line x1="0" y1="${y}" x2="400" y2="${y}" stroke-width="${2 + i}"/>`).join('')}
    </g>
    <ellipse cx="200" cy="212" rx="52" ry="9" fill="#000" opacity=".14"/>
    <g transform="translate(200 96)" fill="${TINTA}" opacity=".9">
      <rect x="-34" y="-10" width="68" height="22" rx="9"/>
      <circle cx="0" cy="14" r="8"/>
      <g stroke="${TINTA}" stroke-width="6" stroke-linecap="round">
        <line x1="-26" y1="-4" x2="-72" y2="-24"/><line x1="26" y1="-4" x2="72" y2="-24"/>
        <line x1="-26" y1="4" x2="-64" y2="26"/><line x1="26" y1="4" x2="64" y2="26"/>
      </g>
      <g opacity=".55">
        <ellipse cx="-76" cy="-26" rx="28" ry="5"/><ellipse cx="76" cy="-26" rx="28" ry="5"/>
        <ellipse cx="-68" cy="26" rx="26" ry="5"/><ellipse cx="68" cy="26" rx="26" ry="5"/>
      </g>
    </g>
    <circle cx="200" cy="110" r="4" fill="#C0452F"/>`,

  imoveis: (chao) => `
    ${sol(324, 48)}
    <path d="M0 156 Q120 142 260 158 T400 150 V260 H0Z" fill="${chao}"/>
    <g fill="${TINTA}" opacity=".86">
      <rect x="78" y="92" width="168" height="72" rx="4"/>
      <rect x="66" y="84" width="192" height="12" rx="4"/>
      <rect x="246" y="116" width="62" height="48" rx="4"/>
    </g>
    <rect x="96" y="108" width="52" height="34" fill="#CBE0EA" opacity=".92"/>
    <rect x="162" y="108" width="66" height="34" fill="#CBE0EA" opacity=".92"/>
    <rect x="262" y="132" width="30" height="32" fill="#EFEADA"/>
    <ellipse cx="176" cy="204" rx="118" ry="30" fill="#6BB6CC" opacity=".85"/>
    <ellipse cx="176" cy="200" rx="102" ry="22" fill="#8CCFE1" opacity=".7"/>
    ${arvore(342, 178, 1)}
    ${arvore(40, 170, .8)}`,

  insumos: (chao) => `
    ${sol(66, 46)}
    <path d="M0 158 H400 V260 H0Z" fill="${chao}"/>
    <g fill="${TINTA}" opacity=".86">
      <rect x="108" y="88" width="88" height="76" rx="3"/>
      <path d="M100 88 Q152 52 204 88 Z"/>
      <rect x="212" y="112" width="62" height="52" rx="3"/>
      <path d="M206 112 Q243 88 280 112 Z"/>
    </g>
    <g stroke="#EFEADA" stroke-width="2" opacity=".5">
      ${[104, 120, 136, 152].map(y => `<line x1="108" y1="${y}" x2="196" y2="${y}"/>`).join('')}
      ${[128, 146].map(y => `<line x1="212" y1="${y}" x2="274" y2="${y}"/>`).join('')}
    </g>
    <g fill="#C2A472">
      <rect x="292" y="132" width="34" height="32" rx="7"/>
      <rect x="330" y="140" width="32" height="24" rx="6"/>
      <rect x="300" y="112" width="30" height="24" rx="6"/>
    </g>
    ${cerca(212)}`
};

function arte(cat, variacao = 0) {
  const cena = CENAS[cat] || CENAS.fazendas;
  return moldura(variacao, cena);
}

/* Deriva uma variação estável (0, 1 ou 2) do código do anúncio.
   Sem isto, todos os cards de uma mesma categoria saem idênticos — fica claro
   que é ilustração e não foto. Estável porque o mesmo anúncio precisa manter
   a mesma cara entre o mural, a categoria e a página do anúncio. */
function variacaoDe(id) {
  let soma = 0;
  for (let i = 0; i < id.length; i++) soma += id.charCodeAt(i);
  return soma % 3;
}
