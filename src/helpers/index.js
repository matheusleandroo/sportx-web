export const ETipo = {
  INDEFINIDO: 0,
  PESSOA_FISICA: 1,
  PESSOA_JURIDICA: 2,
};

export const EClassificacao = {
  INDEFINIDO: 0,
  ATIVO: 1,
  INATIVO: 2,
  PREFERENCIAL: 3,
};

export const optionsTipo = [
  { value: ETipo.PESSOA_FISICA, label: 'Pessoa Física' },
  { value: ETipo.PESSOA_JURIDICA, label: 'Pessoa Jurídica' },
];

export const optionsClassificacao = [
  { value: EClassificacao.ATIVO, label: 'Ativo' },
  { value: EClassificacao.INATIVO, label: 'Inativo' },
  { value: EClassificacao.PREFERENCIAL, label: 'Preferencial' },
];
