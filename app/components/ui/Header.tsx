import React from 'react'

const Header = ({ headertext }: { headertext: string }) => {
    return (
        <header className="bg-gray-800 py-6 px-8 mt-5 max-sm:mt-2 shadow-lg">
            <h1 className="text-3xl font-bold text-green-400 max-sm:text-2xl max-sm:text-center">{headertext}</h1>
        </header>
    )
}

export default Header
