import React, {PropsWithChildren} from 'react';
import PropTypes from 'prop-types';

export enum InputTypes {
  'text' = "text",
  'email' = 'email',
  'password' = 'password'
}

type InputProps = {
  type: InputTypes,
  placeholder: string,
  isRequired: boolean,
  value: string,
  onChange: any,
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  isRequired: false,
}

function Input({type, placeholder, isRequired, value, onChange}: PropsWithChildren<InputProps>) {
  return (
    <input
      className="w-full placeholder-westar bg-transparent border border-westar rounded px-3 py-2 mb-5 block focus:outline-none"
      type={type}
      placeholder={placeholder}
      required={isRequired}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
