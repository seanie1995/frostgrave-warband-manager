import React from 'react'
import { SpellProp } from '../models/models'

const SpellCard: React.FC<SpellProp> = ({ spell, onClick }) => {
    return (
        <div className="fixed inset-0 m-auto z-50 mt-20  max-h-4/5  bg-gray-200 opacity-99 max-w-sm p-4 rounded-2xl animate-fadeIn">
            <div className='flex flex-col gap-4'>
                <h2>{spell.name}</h2>
                <p>{spell.targetNumber} | {spell.targetNumber + 2}</p>
                <p>{spell.description}</p>
                <button onClick={onClick} className='border-2 w-1/2 m-auto p-1 rounded-md bg-gray-800 text-white'>Return</button>
            </div>
        </div>
    )
}

export default SpellCard
