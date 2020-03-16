import React from 'react';
import PropTypes from 'prop-types';
import ReactInputMask from 'react-input-mask';
import styled from 'styled-components';

const InputMaskArea = styled.div`
  h6 {
    font-weight: 600;
  }

  input {
    background-color: ${props => (props.disabled ? 'rgba(0, 0, 0, 0.1)' : '')};
  }
`;

const InputMaskComponent = styled(ReactInputMask)`
  width: 100%;
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  height: 40px;
  padding: 0 15px;
  color: #333;
  margin: 0 0 10px;
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

export default function InputMask({
  mask,
  maskPlaceholder,
  disabled,
  possuiLabel,
  label,
  type,
  onChange,
  value,
}) {
  return (
    <InputMaskArea disabled={disabled}>
      {possuiLabel && <h6>{label}</h6>}
      <InputMaskComponent
        mask={mask}
        maskPlaceholder={maskPlaceholder}
        disabled={disabled}
        maxLength={100}
        type={type}
        onChange={onChange}
        value={value}
      />
    </InputMaskArea>
  );
}

InputMask.propTypes = {
  mask: PropTypes.string,
  maskPlaceholder: PropTypes.string,
  disabled: PropTypes.bool,
  possuiLabel: PropTypes.bool,
  label: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

InputMask.defaultProps = {
  mask: null,
  maskPlaceholder: '',
  disabled: false,
  possuiLabel: false,
  label: '',
  type: '',
  onChange: null,
  value: '',
};
