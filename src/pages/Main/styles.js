import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 45px;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;

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

export const SubmitButton = styled.button.attrs({
  type: 'button',
})`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TableActions = styled.div`
  display: flex;
  margin: 5px;
`;

export const TableIcon = styled.button`
  background-color: transparent;
  border: 0;
  margin-right: 5px;
`;
