import React from 'react';
import Image from 'next/image';

function Logo() {
  return (
    <Image width={300} height={80} alt="Logo todoo.xyz" src="/images/Logo.svg" />
  );
}

export default Logo;
