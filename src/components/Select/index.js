import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import styled from 'styled-components';

const SelectComponent = styled(ReactSelect)`
  width: 250px;
  margin-right: 15px;
`;

export default function Select({
  placeholder,
  isDisabled,
  isLoading,
  isClearable,
  isSearchable,
  onChange,
  options,
}) {
  return (
    <SelectComponent
      placeholder={placeholder}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isClearable={isClearable}
      isSearchable={isSearchable}
      onChange={onChange}
      options={options}
    />
  );
}

Select.propTypes = {
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.any),
};

Select.defaultProps = {
  placeholder: 'Selecione',
  isDisabled: false,
  isLoading: false,
  isClearable: true,
  isSearchable: true,
  onChange: null,
  options: [],
};
