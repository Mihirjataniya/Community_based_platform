import React from 'react'

const Textarea =  ({placeholder,onChange,type}:{
    placeholder?:string,
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    type?: string
}) => {
  return (
    <textarea
    onChange={onChange}
    placeholder={placeholder}
    rows={4}
    className="w-full px-4 py-2 resize-none bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
/>
  )
}

export default Textarea
