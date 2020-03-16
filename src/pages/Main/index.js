import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  FaRunning,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrashAlt,
} from 'react-icons/fa';
import { Table } from 'react-bootstrap';
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
            <Table hover responsive size="sm">
              <thead>
                <tr>
                  <th> </th>
                  <th>Cliente</th>
                  <th>Tipo</th>
                  <th>Documento</th>
                  <th>Razão</th>
                  <th>CEP</th>
                  <th>E-mail</th>
                  <th>Classificação</th>
                  <th>Telefone</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(customer => (
                  <tr key={customer.id}>
                    <td>
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
                    </td>
                    <td style={{ maxWidth: '200px' }}>{customer.nome}</td>
                    <td>
                      {(customer.tipo === ETipo.PESSOA_FISICA
                        ? 'Pessoa Física'
                        : null) ||
                        (customer.tipo === ETipo.PESSOA_JURIDICA
                          ? 'Pessoa Jurídica'
                          : null) ||
                        null}
                    </td>
                    <td style={{ minWidth: '140px' }}>
                      {formatarDocumento(customer.documento)}
                    </td>
                    <td style={{ maxWidth: '200px' }}>{customer.razao}</td>
                    <td style={{ minWidth: '85px' }}>
                      {formatarCep(customer.cep)}
                    </td>
                    <td>{customer.email}</td>
                    <td>
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
                    </td>
                    <td style={{ minWidth: '125px' }}>
                      {customer.phones.map(phone => (
                        <p key={phone.id}>{formatarTelefone(phone.number)}</p>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </Container>
  );
}
