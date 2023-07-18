import React from 'react';

const Button = ({ handlerLoadMore }) => {
  return (
    <button onClick={handlerLoadMore}>Завантажити ще</button>
  );
};

export default Button;
