import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import styled from 'styled-components';

const SelectArea = styled.div`
  h6 {
    font-weight: 600;
  }
`;

const SelectComponent = styled(ReactSelect)`
  width: 100%;
  margin: 0 15px 10px 0;
`;

export default function Select({
  placeholder,
  isDisabled,
  isLoading,
  isClearable,
  isSearchable,
  possuiLabel,
  label,
  value,
  onChange,
  options,
}) {
  return (
    <SelectArea>
      {possuiLabel && <h6>{label}</h6>}
      <SelectComponent
        placeholder={placeholder}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        value={value}
        onChange={onChange}
        options={options}
      />
    </SelectArea>
  );
}

Select.propTypes = {
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  possuiLabel: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.any),
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.any),
};

Select.defaultProps = {
  placeholder: 'Selecione',
  isDisabled: false,
  isLoading: false,
  isClearable: true,
  isSearchable: true,
  possuiLabel: false,
  label: '',
  value: [],
  onChange: null,
  options: [],
};
