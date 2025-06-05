'use client'

import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context/Context'
import { Member, Wizard, Spell } from '../models/models'



const YourSpells = () => {
    const context = useContext(MyContext)
    if (!context) {
        throw new Error("No Context")
    }

    const { fullWarband, setFullWarband } = context

    const [spells, setSpells] = useState<Spell[] | null>([])
    const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null)

    useEffect(() => {
        const wizard = fullWarband.find(m => m.role === "Wizard") as Wizard;

        if (!wizard) {
            return;
        }

        setSpells(wizard.spells.filter((s): s is Spell => s !== null));
    }, [fullWarband])

    /* if (fullWarband.length === 0) {
        return <div>Loading...</div>; // Handle loading state
    } */

    return (
        <main className="flex  justify-center min-h-screen bg-gray-100 p-4">
            <div>
                <ul className="bg-white rounded-lg shadow-md p-6 min-w-[350px] text-left">
                    {spells?.map(spell => (
                        <li
                            key={spell.name}
                            className="flex justify-between text-xl items-center my-2 "
                        >
                            <span>{spell.name} - {spell.targetNumber} | {spell.targetNumber + 2}</span>
                            <button
                                onClick={() => setSelectedSpell(spell)}
                                className="ml-4 px-2 py-1 bg-gray-500 text-white text-xl rounded hover:bg-gray-600"
                                aria-label={`Show details for ${spell.name}`}
                            >
                                ?
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Modal */}
                {selectedSpell && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        onClick={() => setSelectedSpell(null)} // close modal on backdrop click
                    >
                        <div
                            className="bg-white rounded-lg p-6 max-w-md w-full"
                            onClick={e => e.stopPropagation()} // prevent closing modal when clicking inside box
                        >
                            <h2 className="text-xl font-bold mb-4">{selectedSpell.name}</h2>
                            <h3 className='text-lg font-bold mb-4'>{selectedSpell.targetNumber} | {selectedSpell.targetNumber + 2}</h3>
                            <h3 className='text-lg font-bold mb-4'>{selectedSpell.type}</h3>
                            <p className="mb-4">{selectedSpell.description}</p>
                            <button
                                onClick={() => setSelectedSpell(null)}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )

}

export default YourSpells
