import React from 'react'

const Input = ({placeholder,onChange,type}:{
    placeholder?:string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
}) => {
  return (
    <div className="">
    <input
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
    />
    
  </div>
  )
}

export default Input
