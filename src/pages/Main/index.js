import React from 'react';

import { FaRunning, FaSearch } from 'react-icons/fa';

import { Container, Form, SubmitButton } from './styles';

export default function Main() {
  return (
    <Container>
      <h1>
        <FaRunning />
        SportX
      </h1>

      <Form onSubmit={() => []}>
        <input type="text" placeholder="Tipo" />
        <input type="text" placeholder="Classificação" />

        <SubmitButton disabled>
          <FaSearch color="FFF" size={14} />
        </SubmitButton>
      </Form>
    </Container>
  );
}
