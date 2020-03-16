import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 60px auto;

  h1 {
    font-size: 45px;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;

    p {
      font-size: 20px;
      margin: auto 5px;
      font-style: italic;
    }

    svg {
      margin-right: 10px;
    }
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
`;

export const TelefoneIcon = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: center;
  margin-top: 10px;
  background-color: transparent;
  border: 0;
`;

export const Botoes = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    margin: 15px;
    font-weight: bold;
  }
`;
