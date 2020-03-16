import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FaRunning, FaPlus } from 'react-icons/fa';
import {
  Container as ContainerBootstrap,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import SelectComponent from '../../../components/Select';
import InputMaskComponent from '../../../components/InputMask';

import api from '../../../services/api';

import {
  ETipo,
  optionsTipo,
  optionsClassificacao,
  retirarFormatacao,
  validarCampos,
} from '../../../helpers';

import { Container, Form, TelefoneIcon, Botoes } from './styles';

export default function CustomerCreate() {
  const history = useHistory();

  const [customer, setCustomer] = useState({
    nome: '',
    tipo: 0,
    documento: '',
    razao: '',
    cep: '',
    email: '',
    classificacao: 0,
    // phones: [
    //   {
    //     number: '',
    //   },
    // ],
  });

  async function handleSubmit() {
    if (validarCampos(customer)) {
      const params = customer;

      await api
        .post('customer', params)
        .then(() => {
          toast.success('Cliente cadastrado com sucesso.');
          history.push('/');
        })
        .catch(() => {
          toast.error('Ocorreu um problema, tente novamente.');
        });
    }
  }

  return (
    <Container>
      <h1>
        <FaRunning />
        SportX / <p>Cadastro</p>
      </h1>

      <hr />

      {customer.length === 0 ? (
        <h6>Carregando...</h6>
      ) : (
        <Form onSubmit={() => []}>
          <ContainerBootstrap>
            <Row>
              <Col md={8}>
                <InputMaskComponent
                  possuiLabel
                  label="Nome do Cliente"
                  value={customer.nome}
                  onChange={e =>
                    setCustomer({
                      ...customer,
                      nome: e ? e.target.value : null,
                    })
                  }
                />
              </Col>
              <Col md={4}>
                <SelectComponent
                  possuiLabel
                  label="Tipo"
                  placeholder="Selecione"
                  value={optionsTipo.filter(f => f.value === customer.tipo)}
                  onChange={e =>
                    setCustomer({
                      ...customer,
                      tipo: e ? e.value : null,
                      razao: '',
                      documento: '',
                    })
                  }
                  options={optionsTipo}
                />
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <InputMaskComponent
                  possuiLabel
                  label="Razão Social"
                  value={customer.razao}
                  onChange={e =>
                    setCustomer({
                      ...customer,
                      razao: e ? e.target.value : null,
                    })
                  }
                  disabled={
                    customer.tipo === ETipo.INDEFINIDO ||
                    customer.tipo === ETipo.PESSOA_FISICA ||
                    customer.tipo === null
                  }
                />
              </Col>
              <Col md={4}>
                <InputMaskComponent
                  mask={
                    customer.documento.length > 11
                      ? '99.999.999/9999-99'
                      : '999.999.999-999'
                  }
                  possuiLabel
                  label="Documento"
                  value={customer.documento}
                  onChange={e =>
                    setCustomer({
                      ...customer,
                      documento: e ? retirarFormatacao(e.target.value) : null,
                    })
                  }
                  disabled={customer.tipo === null}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <InputMaskComponent
                  mask="99-999-999"
                  possuiLabel
                  label="CEP"
                  value={customer.cep}
                  onChange={e =>
                    setCustomer({
                      ...customer,
                      cep: e ? retirarFormatacao(e.target.value) : null,
                    })
                  }
                />
              </Col>
              <Col md={4}>
                <InputMaskComponent
                  possuiLabel
                  label="Email"
                  value={customer.email}
                  type="email"
                  onChange={e =>
                    setCustomer({
                      ...customer,
                      email: e ? e.target.value : null,
                    })
                  }
                />
              </Col>
              <Col md={4}>
                <SelectComponent
                  possuiLabel
                  label="Classificação"
                  placeholder="Selecione"
                  value={optionsClassificacao.filter(
                    f => f.value === customer.classificacao
                  )}
                  onChange={e =>
                    setCustomer({
                      ...customer,
                      classificacao: e ? e.value : null,
                    })
                  }
                  options={optionsClassificacao}
                />
              </Col>
            </Row>

            <hr />

            {/* <Row>
              <Col>
                <h6>
                  <b>Telefone(s)</b>
                </h6>
              </Col>
            </Row>

            <br />

            {customer.phones.map((phone, index) => (
              <Row key={phone.number}>
                <Col md={4}>
                  <InputMaskComponent
                    value={phone.number}
                    disabled
                    onChange={e => {
                      const valor = e ? e.target.value : null;

                      const novoCustomer = customer;

                      novoCustomer.phones.map((item, i) => {
                        if (i === index) {
                          item.number += valor;
                        }
                        return item;
                      });

                      setCustomer(novoCustomer);
                    }}
                  />
                </Col>
                <Col>
                  <TelefoneIcon
                    onClick={() =>
                      setCustomer({
                        ...customer,
                        phones: [
                          ...customer.phones,
                          {
                            number: '',
                          },
                        ],
                      })
                    }
                  >
                    <FaPlus color="1DB954" />
                  </TelefoneIcon>
                </Col>
              </Row>
            ))}

            <hr /> */}

            <Botoes>
              <Button variant="danger" onClick={() => history.push('/')}>
                Cancelar
              </Button>
              <Button variant="success" onClick={() => handleSubmit()}>
                Salvar
              </Button>
            </Botoes>
          </ContainerBootstrap>
        </Form>
      )}
    </Container>
  );
}
