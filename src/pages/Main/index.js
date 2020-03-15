import React, { useEffect, useState } from 'react';

import { FaRunning, FaSearch, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Table } from 'react-bootstrap';
import SelectComponent from '../../components/Select';

import api from '../../services/api';

import {
  ETipo,
  EClassificacao,
  optionsTipo,
  optionsClassificacao,
} from '../../helpers';

import {
  Container,
  Form,
  SubmitButton,
  TableActions,
  TableIcon,
} from './styles';

export default function Main() {
  const [customers, setCustomers] = useState([]);

  const [filtroTipo, setFiltroTipo] = useState(null);
  const [filtroClassificacao, setFiltroClassificacao] = useState(null);

  async function carregarClientes(params = {}) {
    const response = await api.get(`customer`, { params });

    setCustomers(response.data);
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

  return (
    <Container>
      <h1>
        <FaRunning />
        SportX
      </h1>

      <Form onSubmit={() => []}>
        <SelectComponent
          placeholder="Tipo"
          onChange={e => (e ? setFiltroTipo(e.value) : setFiltroTipo(null))}
          options={optionsTipo}
        />
        <SelectComponent
          placeholder="Classificação"
          onChange={e =>
            e ? setFiltroClassificacao(e.value) : setFiltroClassificacao(null)
          }
          options={optionsClassificacao}
        />

        <SubmitButton onClick={() => handleFiltro()}>
          <FaSearch color="FFF" size={14} />
        </SubmitButton>
      </Form>

      <hr />

      {customers.length === 0 ? (
        <h1>Nenhum item encontrado</h1>
      ) : (
        <Table bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Tipo</th>
              <th>Documento</th>
              <th>Razão</th>
              <th>CEP</th>
              <th>E-mail</th>
              <th>Classificação</th>
              <th>Telefone</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.nome}</td>
                <td>
                  {(customer.tipo === ETipo.PESSOA_FISICA
                    ? 'Pessoa Física'
                    : null) ||
                    (customer.tipo === ETipo.PESSOA_JURIDICA
                      ? 'Pessoa Jurídica'
                      : null) ||
                    null}
                </td>
                <td>{customer.documento}</td>
                <td>{customer.razao}</td>
                <td>{customer.cep}</td>
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
                <td>
                  {customer.phones.map(phone => (
                    <p key={phone.id}>{phone.number}</p>
                  ))}
                </td>
                <td>
                  <TableActions>
                    <TableIcon onClick={() => {}}>
                      <FaEdit color="#333" size={14} />
                    </TableIcon>
                    <TableIcon onClick={() => {}}>
                      <FaTrashAlt color="#333" size={14} />
                    </TableIcon>
                  </TableActions>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
