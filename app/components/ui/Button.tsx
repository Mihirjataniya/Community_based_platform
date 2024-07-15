import React from 'react'

const Button = ({buttonlabel,onClick}:{
    buttonlabel:string,
    onClick: ()=>void
}) => {
  return (
    <button
    onClick={onClick}
    className="w-full py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-200"
  >
    {buttonlabel}
  </button>
  )
}

export default Button
