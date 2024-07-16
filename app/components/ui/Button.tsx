import React from 'react';

const Button = ({
  buttonlabel,
  onClick,
}: {
  buttonlabel: string;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-200"
    >
      {buttonlabel}
    </button>
  );
};

export default Button;
