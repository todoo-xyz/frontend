import React, {PropsWithChildren} from 'react';
import PropTypes from "prop-types";

type SmallContainerProps = {
  hasBoarder: boolean
}

function SmallContainer({children, hasBoarder}: PropsWithChildren<SmallContainerProps>) {
  return (
    <div className="flex items-center min-h-screen">
      <main
        className={`w-10/12 sm:w-8/12 lg:w-6/12 xl:w-4/12 mx-auto p-5 ${hasBoarder && "border border-westar rounded"}`}
      >
        {children}
      </main>
    </div>
  );
}

export default SmallContainer;

SmallContainer.defaultProps = {
  hasBoarder: false
}

SmallContainer.propTypes = {
  hasBoarder: PropTypes.bool
}
