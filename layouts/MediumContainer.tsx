import React, {PropsWithChildren} from 'react';
import PropTypes from "prop-types";

type MediumContainerProps = {
  hasBoarder: boolean
}

function MediumContainer({children, hasBoarder}: PropsWithChildren<MediumContainerProps>) {
  return (
    <div className="flex items-center min-h-screen">
      <main
        className={`w-10/12 sm:w-8/12 lg:w-6/12 mx-auto p-5 ${hasBoarder && "border border-westar rounded"}`}
      >
        {children}
      </main>
    </div>
  );
}

export default MediumContainer;

MediumContainer.defaultProps = {
  hasBoarder: false
}

MediumContainer.propTypes = {
  hasBoarder: PropTypes.bool
}
