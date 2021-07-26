import React, {PropsWithChildren} from 'react';
import PropTypes from 'prop-types';

enum BtnType {
  primary = 'border border-white bg-transparent hover:bg-westar hover:text-black '
}

type BtnProps = {
  type: BtnType,
  fullWidth: boolean,
  onClick: any
}

Btn.propTypes = {
  type: PropTypes.string,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func
};

Btn.defaultProps = {
  type: BtnType.primary,
  fullWidth: false,
}

function Btn({children, type, fullWidth, onClick}: PropsWithChildren<BtnProps>) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded transition-colors ${type} ${fullWidth && "w-full"}`}
    >
      {children}
    </button>
  );
}

export default Btn;
