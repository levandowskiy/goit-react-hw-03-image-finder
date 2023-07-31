import React from 'react';

const Button = ({ handlerLoadMore }) => {
  console.log(handlerLoadMore);
  return (
    <button onClick={handlerLoadMore}>Завантажити ще</button>
  );
};

export default Button;
