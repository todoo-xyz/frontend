import React, {PropsWithChildren} from 'react';

function ErrorAlert({children}: PropsWithChildren<any>) {
  return (
    <div className={"p-4 bg-green-700 text-white rounded mb-5"}>
      {children}
    </div>
  );
}

export default ErrorAlert;
