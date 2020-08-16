import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { FaRunning, FaPlus, FaTrashAlt } from 'react-icons/fa';
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
  formatarTelefone,
  validarCampos,
} from '../../../helpers';

import {
  Container,
  MensagemCentralizada,
  Form,
  TelefoneIcon,
  TelefoneTitulo,
  Botoes,
} from '../styles';

export default function CustomerEdit({ match }) {
  const { id } = match.params;
  const history = useHistory();

  const [carregando, setCarregando] = useState(false);
  const [customer, setCustomer] = useState([]);

  async function carregarCliente() {
    setCarregando(true);

    const response = await api.get(`customer/${id}`);

    setCustomer(response.data[0]);

    setCarregando(false);
  }

  useEffect(() => {
    carregarCliente();
  }, []);

  async function handleSubmit() {
    if (validarCampos(customer)) {
      const params = customer;

      await api
        .put(`customer/${id}`, params)
        .then(() => {
          toast.success('Cliente atualizado com sucesso');
          history.push('/');
        })
        .catch(() => {
          toast.warn('Ocorreu um problema, tente novamente.');
        });
    }
  }

  return (
    <Container>
      <h1>
        <FaRunning />
        SportX / <p>Edição</p>
      </h1>

      <hr />

      {carregando ? (
        <MensagemCentralizada>
          <h3>Carregando...</h3>
        </MensagemCentralizada>
      ) : (
        <>
          {customer.length === 0 ? (
            <MensagemCentralizada>
              <h3>Nenhum item encontrado :(</h3>
            </MensagemCentralizada>
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
                      maskPlaceholder=""
                      possuiLabel
                      label="Documento"
                      value={customer.documento}
                      onChange={e =>
                        setCustomer({
                          ...customer,
                          documento: e
                            ? retirarFormatacao(e.target.value)
                            : null,
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

                <Row>
                  <Col>
                    <TelefoneTitulo
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
                      <b>Telefone(s)</b>
                      <FaPlus color="#1DB954" />
                    </TelefoneTitulo>
                  </Col>
                </Row>

                {customer.phones.length === 0 ? null : (
                  <>
                    <br />

                    {customer.phones.map((phone, index) => (
                      <Row>
                        <Col md={4}>
                          <InputMaskComponent
                            value={formatarTelefone(
                              phone ? phone.number : null
                            )}
                            onChange={e => {
                              setCustomer({
                                ...customer,
                                phones: customer.phones.map((m, mi) => {
                                  if (
                                    index === mi &&
                                    retirarFormatacao(e.target.value).length <=
                                      11
                                  ) {
                                    m.number = retirarFormatacao(
                                      e.target.value
                                    );
                                    return m;
                                  }
                                  return m;
                                }),
                              });
                            }}
                          />
                        </Col>
                        <Col>
                          {customer.phones.length > 1 && (
                            <TelefoneIcon
                              onClick={() => {
                                setCustomer({
                                  ...customer,
                                  phones: (customer.phones = customer.phones.filter(
                                    (f, y) => y !== index
                                  )),
                                });
                              }}
                            >
                              <FaTrashAlt color="#dc3545" />
                            </TelefoneIcon>
                          )}
                        </Col>
                      </Row>
                    ))}
                  </>
                )}

                <hr />

                <Botoes>
                  <Button variant="success" onClick={() => handleSubmit()}>
                    Salvar
                  </Button>
                  <Button variant="danger" onClick={() => history.push('/')}>
                    Cancelar
                  </Button>
                </Botoes>
              </ContainerBootstrap>
            </Form>
          )}
        </>
      )}
    </Container>
  );
}

CustomerEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

CustomerEdit.defaultProps = {
  match: null,
};
