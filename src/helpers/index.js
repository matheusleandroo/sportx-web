import { toast } from 'react-toastify';

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

export function retirarFormatacao(valor) {
  return valor.replace(/(\(|\)|\.|\/|-)/g, '');
}

function mascaraCpf(valor) {
  return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
}

function mascaraCnpj(valor) {
  return valor.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
    '$1.$2.$3/$4-$5'
  );
}

export function formatarDocumento(valor) {
  if (valor.length <= 11) {
    valor = mascaraCpf(valor);
  } else {
    valor = mascaraCnpj(valor);
  }

  return valor;
}

export function formatarCep(valor) {
  return valor.replace(/(\d{5})(\d{3})/g, '$1-$2');
}

function mascaraCelular(valor) {
  return valor.replace(/(\d{2})(\d{5})(\d{4})/g, '($1)$2-$3');
}

function mascaraTelefone(valor) {
  return valor.replace(/(\d{2})(\d{4})(\d{4})/g, '($1)$2-$3');
}

export function formatarTelefone(valor) {
  if (!valor) return valor;

  if (valor.length <= 10) {
    valor = mascaraTelefone(valor);
  } else {
    valor = mascaraCelular(valor);
  }

  return valor;
}

function validarEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validarCampos(customer) {
  if (!customer) {
    toast.warn(
      'Ocorreu um erro inesperado, tente realizar o processo novamente.'
    );
    return false;
  }

  if (customer.nome === '') {
    toast.warn('O campo "Nome do Cliente" é obrigatório.');
    return false;
  }

  if (customer.tipo === 0) {
    toast.warn('O campo "Tipo" é obrigatório.');
    return false;
  }

  if (
    customer.documento &&
    customer.documento.length !== 11 &&
    customer.documento.length !== 14
  ) {
    toast.warn('O campo "Documento" é inválido.');
    return false;
  }

  if (customer.cep && customer.cep.length !== 8) {
    toast.warn('O campo "CEP" é inválido.');
    return false;
  }

  if (customer.email === '') {
    toast.warn('O campo "E-mail" é obrigatório.');
    return false;
  }

  if (!validarEmail(customer.email)) {
    toast.warn('O campo "E-mail" é inválido.');
    return false;
  }

  if (customer.classificacao === 0) {
    toast.warn('O campo "Classificação" é obrigatório.');
    return false;
  }

  return true;
}
