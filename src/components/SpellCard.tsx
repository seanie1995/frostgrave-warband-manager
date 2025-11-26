import React from 'react'
import { SpellProp } from '@/models/models'

const SpellCard: React.FC<SpellProp> = ({ spell, onClick }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm pt-20 animate-fadeIn">
            <div className="bg-white max-w-sm w-full p-6 rounded-2xl shadow-xl border border-gray-200">
                <div className="flex flex-col gap-2 text-gray-800">
                    <h2 className="text-2xl font-bold">{spell.name}</h2>
                    <p className="text-sm text-gray-500">
                        Target Number: <span className="font-medium">{spell.targetNumber}</span> /{" "}
                        <span className="font-medium">{spell.targetNumber + 2}</span>

                    </p>
                    <p className='text-sm text-gray-500'>Type: {spell.type}</p>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">{spell.description}</p>
                    <button
                        onClick={onClick}
                        className="self-center bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
                    >
                        Return
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SpellCard
