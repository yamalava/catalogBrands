import React from 'react';
import images from '../images/error_404.png';

function ErrorPage() {
  return (
    <img
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
      }}
      src={images}
      alt=''
    />
  );
}

export default ErrorPage;
