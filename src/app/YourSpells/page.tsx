'use client'

import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context/Context'
import { Member, Wizard, Spell } from '../models/models'

const YourSpells = () => {
    const context = useContext(MyContext)
    if (!context) {
        throw new Error("No Context")
    }

    const { fullWarband } = context

    const [spells, setSpells] = useState<Spell[] | null>([])
    const [expandedSpells, setExpandedSpells] = useState<Record<string, boolean>>({})

    useEffect(() => {
        const wizard = fullWarband.find(m => m.role === "Wizard") as Wizard | undefined

        if (!wizard) {
            setSpells([])
            return
        }

        setSpells(wizard.spells.filter((s): s is Spell => s !== null))
    }, [fullWarband])

    const toggleSpell = (spellName: string) => {
        setExpandedSpells(prev => ({
            ...prev,
            [spellName]: !prev[spellName],
        }))
    }

    return (
        <main className="flex justify-center min-h-screen m-auto p-4">
            <div>
                <ul className="bg-white rounded-lg  p-6 text-left space-y-2 w-full  justify-between">
                    {spells?.map(spell => {
                        const isExpanded = !!expandedSpells[spell.name]
                        return (
                            <li
                                key={spell.name}
                                className="border rounded p-3 cursor-pointer  select-none"
                                onClick={() => toggleSpell(spell.name)}
                                aria-expanded={isExpanded}
                                aria-controls={`spell-details-${spell.name}`}
                                role="button"
                                tabIndex={0}
                                onKeyDown={e => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault()
                                        toggleSpell(spell.name)
                                    }
                                }}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-semibold">
                                        {spell.name} — {spell.targetNumber} | {spell.targetNumber + 2}
                                    </span>
                                    <span className="ml-4 px-2 py-1 bg-gray-500 text-white rounded select-none">
                                        {isExpanded ? '−' : '+'}
                                    </span>
                                </div>

                                {isExpanded && (
                                    <div
                                        id={`spell-details-${spell.name}`}
                                        className="mt-2 text-gray-700 max-w-md"
                                    >
                                        <p><strong>Type:</strong> {spell.type}</p>
                                        <p className="mt-1">{spell.description}</p>
                                    </div>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </main>
    )
}

export default YourSpells
