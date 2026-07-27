/* Dados fictícios do protótipo.
   Preços e regras vieram da conversa com o Fernando — precisam do aval dele. */

const CATEGORIAS = [
  { id: 'fazendas', nome: 'Fazendas e sítios',      icone: '🌾' },
  { id: 'gado',     nome: 'Gado e animais',         icone: '🐂' },
  { id: 'maquinas', nome: 'Máquinas e implementos', icone: '🚜' },
  { id: 'veiculos', nome: 'Veículos e caminhonetes',icone: '🛻' },
  { id: 'drones',   nome: 'Drones e tecnologia',    icone: '🚁' },
  { id: 'imoveis',  nome: 'Imóveis e lazer',        icone: '🏡' },
  { id: 'insumos',  nome: 'Insumos e estrutura',    icone: '🧰' }
];

const UFS = ['MG', 'GO', 'MT', 'SP', 'RS', 'BA'];

const VENDEDORES = {
  fg: {
    nome: 'Fernando Gorayeb Agropecuária', tipo: 'Loja oficial', desde: 2019,
    fone: '(34) 99912-4477', verificado: true,
    slug: 'fernando-gorayeb-agropecuaria', cidade: 'Araguari', uf: 'MG',
    lema: 'Gado, fazenda e maquinário no Triângulo Mineiro desde 1994.',
    sobre: 'Trinta anos negociando gado e terra no Triângulo Mineiro. Trabalha com ' +
           'rebanho de fazenda própria, sem reposição de fora, e só anuncia bem que ' +
           'conhece de perto. Entrega no curral ou frete a combinar.'
  },
  sh: {
    nome: 'Fazenda Santa Helena', tipo: 'Produtor rural', desde: 2021,
    fone: '(34) 99841-2210', verificado: true
  },
  am: {
    nome: 'Agro Máquinas Uberlândia', tipo: 'Loja oficial', desde: 2020,
    fone: '(34) 3232-8890', verificado: true,
    slug: 'agro-maquinas-uberlandia', cidade: 'Uberlândia', uf: 'MG',
    lema: 'Máquina usada com procedência e histórico de manutenção.',
    sobre: 'Revenda de máquinas e implementos agrícolas em Uberlândia. Todo ' +
           'equipamento passa por revisão antes de ser anunciado, com horas reais ' +
           'declaradas e histórico de manutenção disponível para o comprador.'
  },
  jc: {
    nome: 'José Carlos Ribeiro', tipo: 'Produtor rural', desde: 2024,
    fone: '(64) 99677-3321', verificado: false
  },
  mv: {
    nome: 'Marcos Vinícius Duarte', tipo: 'Produtor rural', desde: 2023,
    fone: '(65) 99320-7745', verificado: false
  },
  rr: {
    nome: 'Rural Revenda Cristalina', tipo: 'Loja oficial', desde: 2022,
    fone: '(61) 99154-6600', verificado: true,
    slug: 'rural-revenda-cristalina', cidade: 'Cristalina', uf: 'GO',
    lema: 'Irrigação, pulverização e tecnologia para lavoura no Cerrado.',
    sobre: 'Especializada em irrigação e tecnologia de aplicação no Cerrado goiano. ' +
           'Trabalha com pivô, drone pulverizador e plantadeira, com treinamento de ' +
           'operação incluso e assistência na região.'
  }
};

const ANUNCIOS = [
  {
    id: 'FT-1042', foto: 'fazenda-casa-aerea', cat: 'fazendas', destaque: true, video: true, vend: 'fg', dias: 2, vistas: 1284, contatos: 37,
    titulo: 'Fazenda 420 hectares — pecuária e lavoura',
    cidade: 'Araguari', uf: 'MG', preco: 18900000,
    desc: 'Fazenda de dupla aptidão a 32 km de Araguari, asfalto até a porteira. Sede de 400 m², três casas de colono, curral coberto com balança e tronco. Pastagem formada em braquiária e mombaça, divisão em 14 piquetes com água em todos.',
    specs: { 'Área total': '420 ha', 'Pastagem': '300 ha formados', 'Lavoura': '95 ha mecanizáveis', 'Água': '2 córregos + poço artesiano', 'Benfeitorias': 'Sede, 3 casas, curral, galpão', 'Documentação': 'Matrícula e CAR regulares' }
  },
  {
    id: 'FT-1043', foto: 'gado-rebanho', cat: 'gado', destaque: true, video: true, vend: 'fg', dias: 1, vistas: 2140, contatos: 64,
    titulo: '100 bezerras nelore desmamadas',
    cidade: 'Araguari', uf: 'MG', preco: 2850, unidade: 'por cabeça',
    desc: 'Lote fechado de 100 bezerras nelore desmamadas, média de 8 a 10 arrobas, vacinadas e vermifugadas. Rebanho de fazenda própria, sem histórico de reposição de fora. Entrega no curral ou frete a combinar.',
    specs: { 'Quantidade': '100 cabeças', 'Raça': 'Nelore', 'Idade': '8 a 10 meses', 'Peso médio': '240 kg', 'Sanidade': 'Vacinadas e vermifugadas', 'Entrega': 'No curral ou frete a combinar' }
  },
  {
    id: 'FT-1044', foto: 'trator-campo', cat: 'maquinas', vend: 'am', dias: 4, vistas: 876, contatos: 21, video: true,
    titulo: 'Trator John Deere 6110J 4x4 — 2019',
    cidade: 'Uberlândia', uf: 'MG', preco: 285000,
    desc: 'Trator revisado, pneus 70%, cabine com ar condicionado funcionando. Único dono, sempre com manutenção na concessionária. Aceita troca em implemento.',
    specs: { 'Ano': '2019', 'Horas': '4.180 h', 'Potência': '110 cv', 'Tração': '4x4', 'Cabine': 'Com ar condicionado', 'Estado': 'Revisado, pneus 70%' }
  },
  {
    id: 'FT-1045', foto: 'caminhonete-estrada', cat: 'veiculos', vend: 'jc', dias: 3, vistas: 1502, contatos: 44,
    titulo: 'Toyota Hilux SRX 4x4 diesel — 2022',
    cidade: 'Uberaba', uf: 'MG', preco: 339900,
    desc: 'Hilux SRX automática, 48 mil km rodados, revisões em dia na concessionária. Capota marítima, protetor de caçamba e engate. Nunca rodou em estrada de terra pesada.',
    specs: { 'Ano': '2022', 'Km': '48.000', 'Câmbio': 'Automático', 'Combustível': 'Diesel', 'Tração': '4x4', 'Extras': 'Capota marítima, engate' }
  },
  {
    id: 'FT-1046', foto: 'drone-pulverizando', cat: 'drones', destaque: true, vend: 'rr', dias: 5, vistas: 943, contatos: 28, video: true,
    titulo: 'Drone pulverizador DJI Agras T40',
    cidade: 'Rio Verde', uf: 'GO', preco: 318000,
    desc: 'Conjunto completo: drone T40, duas baterias, gerador e carreta de apoio. 320 horas de voo, revisado pela assistência autorizada. Acompanha treinamento de operação.',
    specs: { 'Capacidade': '40 litros', 'Horas de voo': '320 h', 'Baterias': '2 unidades', 'Acompanha': 'Gerador + carreta', 'Garantia': '6 meses assistência', 'Treinamento': 'Incluso' }
  },
  {
    id: 'FT-1047', foto: 'fazenda-lavoura-aerea', cat: 'fazendas', vend: 'sh', dias: 7, vistas: 612, contatos: 15,
    titulo: 'Sítio 28 hectares com sede e represa',
    cidade: 'Indianópolis', uf: 'MG', preco: 2400000,
    desc: 'Sítio de lazer e produção a 18 km de Indianópolis. Casa sede de 220 m² com piscina, represa com peixe, pomar formado e curral pequeno. Energia trifásica.',
    specs: { 'Área total': '28 ha', 'Sede': '220 m² com piscina', 'Água': 'Represa + nascente', 'Energia': 'Trifásica', 'Acesso': 'Estrada boa o ano todo', 'Documentação': 'Escriturado' }
  },
  {
    id: 'FT-1048', foto: 'gado-campo-verde', cat: 'gado', vend: 'sh', dias: 6, vistas: 734, contatos: 19,
    titulo: '45 vacas girolando em lactação',
    cidade: 'Patos de Minas', uf: 'MG', preco: 8900, unidade: 'por cabeça',
    desc: 'Vacas girolando 3/4 em plena lactação, média de 22 litros por dia. Rebanho controlado, com registro de produção individual. Ordenha mecânica.',
    specs: { 'Quantidade': '45 cabeças', 'Raça': 'Girolando 3/4', 'Produção': '22 L/dia média', 'Lactação': 'Em plena produção', 'Controle': 'Registro individual', 'Sanidade': 'Brucelose e tuberculose negativas' }
  },
  {
    id: 'FT-1049', foto: 'colheitadeira', cat: 'maquinas', vend: 'am', dias: 9, vistas: 511, contatos: 12,
    titulo: 'Colheitadeira New Holland CR5.85 — 2018',
    cidade: 'Rio Verde', uf: 'GO', preco: 890000,
    desc: 'Colheitadeira com plataforma de 25 pés inclusa, 2.900 horas de motor. Sempre guardada em galpão, pronta para a safra.',
    specs: { 'Ano': '2018', 'Horas motor': '2.900 h', 'Plataforma': '25 pés inclusa', 'Sistema': 'Rotor duplo', 'Estado': 'Pronta para safra', 'Manutenção': 'Concessionária' }
  },
  {
    id: 'FT-1050', foto: 'imovel-casa-piscina', cat: 'imoveis', vend: 'mv', dias: 11, vistas: 1877, contatos: 52, video: true,
    titulo: 'Casa de praia em Torres — 4 suítes',
    cidade: 'Torres', uf: 'RS', preco: 1750000,
    desc: 'Casa a 300 metros da Praia Grande, quatro suítes, churrasqueira e piscina aquecida. Mobiliada. Ótima para quem quer trocar por gado ou máquina.',
    specs: { 'Área construída': '310 m²', 'Terreno': '480 m²', 'Suítes': '4', 'Distância do mar': '300 m', 'Extras': 'Piscina aquecida, churrasqueira', 'Aceita': 'Permuta por gado ou máquina' }
  },
  {
    id: 'FT-1051', foto: 'fazenda-plantio-aereo', cat: 'maquinas', vend: 'rr', dias: 8, vistas: 402, contatos: 9,
    titulo: 'Pivô central Valley — 90 hectares',
    cidade: 'Cristalina', uf: 'GO', preco: 640000,
    desc: 'Pivô Valley completo com painel elétrico, torres galvanizadas e sistema de fertirrigação. Desmontagem e transporte por conta do comprador.',
    specs: { 'Área irrigada': '90 ha', 'Marca': 'Valley', 'Torres': '9 torres galvanizadas', 'Painel': 'Elétrico com automação', 'Extras': 'Sistema de fertirrigação', 'Condição': 'Desmontagem por conta do comprador' }
  },
  {
    id: 'FT-1052', foto: 'caminhao-feno', cat: 'veiculos', vend: 'fg', dias: 5, vistas: 690, contatos: 17,
    titulo: 'Caminhão Volvo VM 270 boiadeiro — 2017',
    cidade: 'Barretos', uf: 'SP', preco: 295000,
    desc: 'Caminhão com carroceria boiadeira de dois pisos, freio a ar, pneus novos. Documentação em dia e sem multas.',
    specs: { 'Ano': '2017', 'Km': '410.000', 'Carroceria': 'Boiadeira 2 pisos', 'Motor': '270 cv', 'Pneus': 'Novos', 'Documentação': 'Em dia' }
  },
  {
    id: 'FT-1053', foto: 'gado-pasto', cat: 'gado', vend: 'fg', dias: 2, vistas: 1120, contatos: 31, video: true,
    titulo: '12 matrizes nelore PO com registro',
    cidade: 'Araguari', uf: 'MG', preco: 24000, unidade: 'por cabeça',
    desc: 'Matrizes nelore puro de origem, registradas na ABCZ, todas prenhes de touro provado. Genética selecionada, documentação completa.',
    specs: { 'Quantidade': '12 cabeças', 'Raça': 'Nelore PO', 'Registro': 'ABCZ', 'Situação': 'Prenhes', 'Genética': 'Touro provado', 'Documentação': 'Completa' }
  },
  {
    id: 'FT-1054', foto: 'trator-plantio', cat: 'maquinas', vend: 'rr', dias: 14, vistas: 288, contatos: 6,
    titulo: 'Plantadeira John Deere 2117 — 17 linhas',
    cidade: 'Cristalina', uf: 'GO', preco: 420000,
    desc: 'Plantadeira de 17 linhas, discos novos, sistema de adubação revisado. Usada em duas safras apenas.',
    specs: { 'Linhas': '17', 'Espaçamento': '45 cm', 'Safras de uso': '2', 'Discos': 'Novos', 'Adubação': 'Sistema revisado', 'Marca': 'John Deere' }
  },
  {
    id: 'FT-1055', foto: 'drone-piloto', cat: 'drones', vend: 'am', dias: 10, vistas: 336, contatos: 8,
    titulo: 'Estação meteorológica + sensores de solo',
    cidade: 'Uberlândia', uf: 'MG', preco: 34900,
    desc: 'Kit completo de monitoramento: estação meteorológica, seis sensores de umidade de solo e painel de acompanhamento pelo celular. Instalação inclusa na região.',
    specs: { 'Sensores': '6 de umidade de solo', 'Conexão': '4G + painel no celular', 'Autonomia': 'Painel solar', 'Instalação': 'Inclusa na região', 'Garantia': '12 meses', 'Suporte': 'Remoto incluso' }
  },
  {
    id: 'FT-1056', foto: 'silo-metalico', cat: 'insumos', vend: 'sh', dias: 13, vistas: 197, contatos: 5,
    titulo: 'Silo metálico 500 toneladas',
    cidade: 'Rio Verde', uf: 'GO', preco: 210000,
    desc: 'Silo metálico com aeração e termometria, capacidade de 500 toneladas. Desmontado e pronto para transporte.',
    specs: { 'Capacidade': '500 t', 'Aeração': 'Sim', 'Termometria': 'Instalada', 'Estado': 'Desmontado', 'Idade': '6 anos', 'Transporte': 'Por conta do comprador' }
  },
  {
    id: 'FT-1057', foto: 'trator-arando', cat: 'fazendas', destaque: true, vend: 'mv', dias: 3, vistas: 2450, contatos: 71, video: true,
    titulo: 'Fazenda 1.200 hectares — soja e milho',
    cidade: 'Sorriso', uf: 'MT', preco: 96000000,
    desc: 'Fazenda de alto padrão em Sorriso, 1.100 hectares abertos e mecanizados, com dois armazéns de 3.000 toneladas cada. Sede, alojamento e oficina próprios. Produtividade média de 62 sacas de soja.',
    specs: { 'Área total': '1.200 ha', 'Área aberta': '1.100 ha', 'Produtividade': '62 sc/ha soja', 'Armazenagem': '2 armazéns de 3.000 t', 'Benfeitorias': 'Sede, alojamento, oficina', 'Documentação': 'Georreferenciada' }
  },
  {
    id: 'FT-1058', foto: 'caminhonete-campo', cat: 'veiculos', vend: 'jc', dias: 6, vistas: 812, contatos: 23,
    titulo: 'Ram Rampage Laramie — 2024',
    cidade: 'Goiânia', uf: 'GO', preco: 289000,
    desc: 'Rampage Laramie com apenas 12 mil km, garantia de fábrica até 2027. Todos os opcionais, teto solar e som premium.',
    specs: { 'Ano': '2024', 'Km': '12.000', 'Câmbio': 'Automático 9 marchas', 'Garantia': 'Fábrica até 2027', 'Extras': 'Teto solar, som premium', 'Estado': 'Impecável' }
  },
  {
    id: 'FT-1059', foto: 'veiculo-trator-estrada', cat: 'maquinas', vend: 'fg', dias: 4, vistas: 445, contatos: 11,
    titulo: 'Retroescavadeira Randon RK 406',
    cidade: 'Araguari', uf: 'MG', preco: 165000,
    desc: 'Retroescavadeira com 3.400 horas, cabine fechada, pneus bons. Sempre usada em serviço próprio da fazenda.',
    specs: { 'Horas': '3.400 h', 'Cabine': 'Fechada', 'Tração': '4x4', 'Pneus': 'Bons', 'Uso': 'Serviço próprio', 'Manutenção': 'Em dia' }
  },
  {
    id: 'FT-1060', foto: 'colheita-graos', cat: 'insumos', vend: 'mv', dias: 1, vistas: 528, contatos: 14,
    titulo: '2.000 sacas de soja — disponível para retirada',
    cidade: 'Sorriso', uf: 'MT', preco: 128, unidade: 'por saca',
    desc: 'Soja safra atual, armazenada em silo próprio com termometria. Retirada no armazém da fazenda, carregamento por nossa conta.',
    specs: { 'Quantidade': '2.000 sacas', 'Safra': 'Atual', 'Armazenagem': 'Silo com termometria', 'Umidade': '13%', 'Impureza': 'Abaixo de 1%', 'Carregamento': 'Por nossa conta' }
  },
  {
    id: 'FT-1061', foto: 'soja-saca', cat: 'insumos', vend: 'sh', dias: 15, vistas: 163, contatos: 4,
    titulo: 'Sêmen nelore — 200 doses de touro provado',
    cidade: 'Uberaba', uf: 'MG', preco: 180, unidade: 'por dose',
    desc: 'Doses de touro nelore provado, com DEPs comprovadas. Botijão disponível para transporte na região do Triângulo.',
    specs: { 'Quantidade': '200 doses', 'Raça': 'Nelore', 'DEPs': 'Comprovadas', 'Armazenagem': 'Botijão criogênico', 'Transporte': 'Triângulo Mineiro', 'Certificação': 'Central credenciada' }
  },
  {
    id: 'FT-1062', foto: 'fazenda-casa-aerea', cat: 'imoveis', vend: 'sh', dias: 4, vistas: 921, contatos: 26, video: true,
    titulo: 'Chácara 5 alqueires com lago e casa sede',
    cidade: 'Uberlândia', uf: 'MG', preco: 1850000,
    desc: 'Chácara de lazer a 22 km de Uberlândia, asfalto até a entrada. Casa sede de 260 m², piscina, campo de futebol, lago com peixe e pomar formado. Energia trifásica e poço artesiano.',
    specs: { 'Área total': '5 alqueires (24 ha)', 'Sede': '260 m²', 'Lazer': 'Piscina, campo, lago', 'Água': 'Poço artesiano', 'Energia': 'Trifásica', 'Distância': '22 km de Uberlândia' }
  },
  {
    id: 'FT-1063', foto: 'fazenda-sede-aerea', cat: 'imoveis', vend: 'mv', dias: 9, vistas: 1344, contatos: 38,
    titulo: 'Casa em Porto Seguro — 300 m do mar',
    cidade: 'Porto Seguro', uf: 'BA', preco: 980000,
    desc: 'Casa de 3 suítes em condomínio fechado com portaria 24 h, piscina e quadra. Mobiliada e pronta para morar ou alugar por temporada. Aceita permuta por gado ou máquina.',
    specs: { 'Área construída': '185 m²', 'Terreno': '360 m²', 'Suítes': '3', 'Condomínio': 'Portaria 24h, piscina, quadra', 'Situação': 'Mobiliada', 'Aceita': 'Permuta por gado ou máquina' }
  },
  {
    id: 'FT-1064', foto: 'fazenda-lavoura-aerea', cat: 'imoveis', vend: 'jc', dias: 16, vistas: 274, contatos: 7,
    titulo: 'Terreno 2.000 m² em condomínio fechado',
    cidade: 'Uberlândia', uf: 'MG', preco: 690000,
    desc: 'Lote plano em condomínio de alto padrão, com infraestrutura completa e projeto aprovado. Documentação pronta para escritura.',
    specs: { 'Área': '2.000 m²', 'Topografia': 'Plano', 'Infraestrutura': 'Completa', 'Condomínio': 'Alto padrão com portaria', 'Documentação': 'Pronta para escritura', 'Projeto': 'Aprovado na prefeitura' }
  },
  {
    id: 'FT-1065', foto: 'drone-lavoura', cat: 'drones', vend: 'rr', dias: 6, vistas: 587, contatos: 16, video: true,
    titulo: 'Drone pulverizador DJI Agras T25 + gerador',
    cidade: 'Cristalina', uf: 'GO', preco: 189000,
    desc: 'T25 com 140 horas de voo, quatro baterias, gerador a diesel e carreta. Ideal para quem está começando na pulverização por drone. Treinamento e primeira revisão inclusos.',
    specs: { 'Capacidade': '20 litros', 'Horas de voo': '140 h', 'Baterias': '4 unidades', 'Acompanha': 'Gerador + carreta', 'Treinamento': 'Incluso', 'Revisão': 'Primeira inclusa' }
  },
  {
    id: 'FT-1066', foto: 'veiculo-trator-estrada', cat: 'drones', vend: 'am', dias: 12, vistas: 312, contatos: 9,
    titulo: 'Piloto automático RTK para trator — kit completo',
    cidade: 'Sorriso', uf: 'MT', preco: 62000,
    desc: 'Kit de direção automática com correção RTK, antena, monitor e base. Reduz sobreposição no plantio e na pulverização. Compatível com as principais marcas de trator.',
    specs: { 'Precisão': '±2,5 cm (RTK)', 'Itens': 'Monitor, antena, base', 'Compatibilidade': 'John Deere, Case, New Holland', 'Instalação': 'Inclusa na região', 'Garantia': '12 meses', 'Uso': '2 safras' }
  },
  {
    id: 'FT-1067', foto: 'feno-campo', cat: 'fazendas', vend: 'fg', dias: 5, vistas: 1508, contatos: 42, video: true,
    titulo: 'Fazenda 180 hectares — pecuária de cria',
    cidade: 'Tupaciguara', uf: 'MG', preco: 7200000,
    desc: 'Fazenda de cria com pastagem 100% formada e dividida em 22 piquetes com água em todos. Curral coberto com balança, tronco e brete. Casa sede e duas casas de colono. Estrada boa o ano inteiro.',
    specs: { 'Área total': '180 ha', 'Pastagem': '170 ha formados', 'Piquetes': '22 com água', 'Curral': 'Coberto, balança e tronco', 'Benfeitorias': 'Sede + 2 casas', 'Documentação': 'Matrícula e CAR regulares' }
  },
  {
    id: 'FT-1068', foto: 'gado-close', cat: 'gado', vend: 'fg', dias: 3, vistas: 1687, contatos: 49, video: true,
    titulo: '30 touros nelore prontos para monta',
    cidade: 'Barretos', uf: 'SP', preco: 16500, unidade: 'por cabeça',
    desc: 'Touros nelore de 30 a 36 meses, avaliados andrologicamente e aprovados para monta. Criados a pasto, sem confinamento. Entrega parcelada conforme a necessidade do comprador.',
    specs: { 'Quantidade': '30 cabeças', 'Raça': 'Nelore', 'Idade': '30 a 36 meses', 'Andrológico': 'Aprovados', 'Criação': 'A pasto', 'Entrega': 'Parcelada se preferir' }
  },
  {
    id: 'FT-1069', foto: 'trator-paisagem', cat: 'maquinas', vend: 'rr', dias: 7, vistas: 643, contatos: 18,
    titulo: 'Pulverizador autopropelido Jacto Uniport 3030',
    cidade: 'Rio Verde', uf: 'GO', preco: 720000,
    desc: 'Uniport 3030 com barra de 30 metros, 3.000 litros, piloto automático e corte de seção. 3.100 horas, sempre com manutenção preventiva em dia.',
    specs: { 'Ano': '2020', 'Horas': '3.100 h', 'Tanque': '3.000 litros', 'Barra': '30 metros', 'Extras': 'Piloto automático, corte de seção', 'Manutenção': 'Preventiva em dia' }
  },
  {
    id: 'FT-1070', foto: 'caminhonete-branca', cat: 'veiculos', vend: 'am', dias: 2, vistas: 1195, contatos: 34,
    titulo: 'Ford Ranger Storm 4x4 diesel — 2023',
    cidade: 'Uberlândia', uf: 'MG', preco: 279000,
    desc: 'Ranger Storm com 31 mil km, único dono, garantia de fábrica até 2028. Santantônio, protetor de caçamba e pneus AT novos. Sempre na concessionária.',
    specs: { 'Ano': '2023', 'Km': '31.000', 'Câmbio': 'Automático', 'Tração': '4x4', 'Garantia': 'Fábrica até 2028', 'Extras': 'Santantônio, pneus AT novos' }
  },
  {
    id: 'FT-1071', foto: 'feno-rolos', cat: 'insumos', vend: 'sh', dias: 8, vistas: 396, contatos: 12,
    titulo: '500 rolos de feno de tifton',
    cidade: 'Patos de Minas', uf: 'MG', preco: 145, unidade: 'por rolo',
    desc: 'Feno de tifton 85 enfardado nesta safra, rolos de aproximadamente 300 kg, armazenados em galpão coberto. Carregamento por nossa conta.',
    specs: { 'Quantidade': '500 rolos', 'Tipo': 'Tifton 85', 'Peso do rolo': 'Aprox. 300 kg', 'Safra': 'Atual', 'Armazenagem': 'Galpão coberto', 'Carregamento': 'Por nossa conta' }
  }
];

const PLANOS = [
  {
    id: 'avulso', nome: 'Avulso', preco: 39.90, sub: 'por anúncio, por mês',
    quem: 'Tem um bem pra vender e acabou.',
    itens: ['1 anúncio ativo', 'Até 5 fotos', 'Contato direto no WhatsApp', 'Anúncio no ar enquanto pagar']
  },
  {
    id: 'produtor', nome: 'Produtor', preco: 89.90, sub: 'por mês', recomendado: true,
    quem: 'Vive negociando — gado, máquina, terra.',
    itens: ['Até 2 anúncios ativos', 'Até 15 fotos + 1 vídeo', '1 destaque no mural por mês', 'Selo de vendedor verificado', 'Painel de contatos recebidos']
  },
  {
    id: 'revenda', nome: 'Revenda', preco: 199.90, sub: 'por mês',
    quem: 'Loja, revenda ou corretor com giro.',
    itens: ['Anúncios ilimitados', 'Fotos e vídeos sem limite', '4 destaques no mural por mês', 'Página de loja oficial', 'Relatório de leads por anúncio', 'Atendimento prioritário']
  }
];

const EXTRAS = [
  ['Destaque no topo do mural', '7 dias', 'R$ 49,90'],
  ['Produção de fotos e vídeo do bem', 'por anúncio', 'sob consulta'],
  ['Assessoria jurídica para fechar negócio', 'por negócio', 'a partir de R$ 490'],
  ['Anúncio na newsletter semanal', 'por envio', 'R$ 149']
];

const COMISSOES = [
  ['Até R$ 10 mil', 'R$ 99 por venda fechada'],
  ['De R$ 10 mil a R$ 50 mil', 'R$ 249 por venda fechada'],
  ['De R$ 50 mil a R$ 200 mil', 'R$ 690 por venda fechada'],
  ['Acima de R$ 200 mil', '0,5% negociável']
];

const FILA_MODERACAO = [
  {
    id: 'FT-2001', cat: 'gado', titulo: '80 garrotes nelore', cidade: 'Tupaciguara', uf: 'MG',
    preco: 3100, unidade: 'por cabeça', vend: 'Antônio Pereira', enviado: 'há 12 minutos',
    ia: 'ok', score: 96,
    parecer: 'Fotos compatíveis com a categoria, texto sem contato externo, preço dentro da média da praça.'
  },
  {
    id: 'FT-2002', cat: 'maquinas', titulo: 'Trator Massey 275 — 1998', cidade: 'Monte Alegre', uf: 'GO',
    preco: 18000, vend: 'Comprador Rápido MG', enviado: 'há 34 minutos',
    ia: 'alerta', score: 61,
    parecer: 'Preço 74% abaixo da média da categoria e vendedor cadastrado há 2 dias. Padrão associado a golpe de sinal antecipado.'
  },
  {
    id: 'FT-2003', cat: 'fazendas', titulo: 'Fazenda 80 hectares barata!!!', cidade: 'não informada', uf: 'MT',
    preco: 350000, vend: 'Usuário 88213', enviado: 'há 1 hora',
    ia: 'bloqueio', score: 12,
    parecer: 'Imagem enviada não corresponde ao bem anunciado (detectada foto de pessoa). Descrição com telefone no corpo do texto.'
  },
  {
    id: 'FT-2004', cat: 'veiculos', titulo: 'Chevrolet S10 High Country 2021', cidade: 'Patrocínio', uf: 'MG',
    preco: 265000, vend: 'Auto Center Patrocínio', enviado: 'há 2 horas',
    ia: 'ok', score: 93,
    parecer: 'Vendedor com CNPJ validado, fotos originais (sem correspondência em busca reversa), dados do veículo conferem.'
  }
];
