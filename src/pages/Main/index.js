import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  FaRunning,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrashAlt,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import SelectComponent from '../../components/Select';

import api from '../../services/api';

import {
  ETipo,
  EClassificacao,
  optionsTipo,
  optionsClassificacao,
  formatarDocumento,
  formatarCep,
  formatarTelefone,
} from '../../helpers';

import {
  Container,
  Form,
  MensagemCentralizada,
  SubmitButton,
  LinkAdd,
  TableActions,
  TableIcon,
} from './styles';

export default function Main() {
  const [customers, setCustomers] = useState([]);

  const [carregando, setCarregando] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState(null);
  const [filtroClassificacao, setFiltroClassificacao] = useState(null);

  async function carregarClientes(params = {}) {
    setCarregando(true);

    try {
      const response = await api.get(`customer`, { params });

      setCustomers(response.data);
    } catch (error) {
      toast.warn('Ocorreu um problema, tente novamente.');
    }

    setCarregando(false);
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  function handleFiltro() {
    const params = {
      tipo: filtroTipo,
      classificacao: filtroClassificacao,
    };

    carregarClientes(params);
  }

  async function handleDelete(id) {
    await api
      .delete(`customer/${id}`)
      .then(() => {
        toast.success('Cliente deletado com sucesso');
        carregarClientes();
      })
      .catch(() => {
        toast.warn('Ocorreu um problema, tente novamente.');
      });
  }

  return (
    <Container>
      <h1>
        <FaRunning />
        SportX
      </h1>

      <Form onSubmit={() => []}>
        <SelectComponent
          placeholder="Tipo"
          value={optionsTipo.filter(f => f.value === filtroTipo)}
          onChange={e => (e ? setFiltroTipo(e.value) : setFiltroTipo(null))}
          options={optionsTipo}
        />
        <SelectComponent
          placeholder="Classificação"
          value={optionsClassificacao.filter(
            f => f.value === filtroClassificacao
          )}
          onChange={e =>
            e ? setFiltroClassificacao(e.value) : setFiltroClassificacao(null)
          }
          options={optionsClassificacao}
        />

        <SubmitButton onClick={() => handleFiltro()}>
          <FaSearch color="FFF" size={14} />
        </SubmitButton>

        <LinkAdd to="/customer">
          <FaPlus color="FFF" size={14} />
        </LinkAdd>
      </Form>

      <hr />
      <br />

      {carregando ? (
        <MensagemCentralizada>
          <h3>Carregando...</h3>
        </MensagemCentralizada>
      ) : (
        <>
          {customers.length === 0 ? (
            <MensagemCentralizada>
              <h3>Nenhum item encontrado :(</h3>
            </MensagemCentralizada>
          ) : (
            <>
              {customers.map(customer => (
                <div
                  key={customer.id}
                  className="card"
                  style={{ width: '100%', margin: '10px auto' }}
                >
                  <div className="card-body">
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <h5 className="card-title">{customer.nome}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {(customer.tipo === ETipo.PESSOA_FISICA
                            ? 'Pessoa Física'
                            : null) ||
                            (customer.tipo === ETipo.PESSOA_JURIDICA
                              ? 'Pessoa Jurídica'
                              : null) ||
                            null}
                        </h6>
                      </div>
                      <div>
                        <TableActions>
                          <Link to={`/customer/${customer.id}`}>
                            <TableIcon>
                              <FaEdit color="#333" size={14} />
                            </TableIcon>
                          </Link>
                          <TableIcon onClick={() => handleDelete(customer.id)}>
                            <FaTrashAlt color="#333" size={14} />
                          </TableIcon>
                        </TableActions>
                      </div>
                    </div>
                    <br />
                    <p>
                      <strong>Documento:</strong>{' '}
                      {formatarDocumento(customer.documento)}
                    </p>
                    {customer.razao && (
                      <p>
                        <strong>Razão:</strong> {customer.razao}
                      </p>
                    )}

                    <p>
                      <strong>CEP:</strong> {formatarCep(customer.cep)}
                    </p>
                    <p>
                      <strong>E-mail:</strong> {customer.email}
                    </p>
                    <p>
                      <strong>Classificação:</strong>{' '}
                      {(customer.classificacao === EClassificacao.ATIVO
                        ? 'Ativo'
                        : null) ||
                        (customer.classificacao === EClassificacao.INATIVO
                          ? 'Inativo'
                          : null) ||
                        (customer.classificacao === EClassificacao.PREFERENCIAL
                          ? 'Preferencial'
                          : null) ||
                        null}
                    </p>
                    <p>
                      <strong>Telefone(s):</strong>
                    </p>
                    {customer.phones.map(phone => (
                      <p key={phone.id}>{formatarTelefone(phone.number)}</p>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </Container>
  );
}
