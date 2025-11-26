'use client'

import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '@/context/Context'
import { Member, Wizard, Spell } from '@/models/models'

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
        <main className="flex justify-center min-h-screen w-full pb-20 px-4">
            <div className="glass-panel p-6 rounded-xl w-full max-w-4xl mt-8">
                <h1 className="text-3xl font-bold text-white text-center mb-6">Your Spells</h1>
                <ul className="rounded-lg min-w-[350px] text-left space-y-2">
                    {spells?.map(spell => {
                        const isExpanded = !!expandedSpells[spell.name]
                        return (
                            <li
                                key={spell.name}
                                className="bg-white/5 border border-white/10 rounded-lg p-3 cursor-pointer select-none hover:bg-white/10 transition-colors"
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
                                    <span className="text-lg font-semibold text-white">
                                        {spell.name} - <span className="text-[var(--accent-color)]">{spell.targetNumber}</span> | <span className="text-slate-400">{spell.targetNumber + 2}</span>
                                    </span>
                                    <span className="ml-4 px-3 py-1 bg-[var(--accent-color)]/20 text-[var(--accent-color)] rounded-full select-none text-sm font-bold">
                                        {isExpanded ? '−' : '+'}
                                    </span>
                                </div>

                                {isExpanded && (
                                    <div
                                        id={`spell-details-${spell.name}`}
                                        className="mt-3 pt-3 border-t border-white/10"
                                    >
                                        <p className="text-slate-300 mb-2"><strong className="text-white">Type:</strong> {spell.type}</p>
                                        <p className="text-slate-300 leading-relaxed">{spell.description}</p>
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
