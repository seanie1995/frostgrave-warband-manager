import React from 'react'

const navbar = () => {
    return (
        <nav className="bg-gray-900 text-white p-4">
            <ul className="flex space-x-4 max-w-7xl mx-auto justify-center">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/WarbandBuilder" className="hover:underline">Hire New Member</a></li>
                <li><a href="/spells" className="hover:underline">Spells</a></li>
            </ul>
        </nav>
    )
}

export default navbar
