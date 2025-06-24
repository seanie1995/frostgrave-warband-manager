'use client'

import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context/Context'
import { Spell, Wizard } from '../models/models'

const EditSpells = () => {
    const context = useContext(MyContext)
    if (!context) {
        throw new Error("No Context")
    }

    const { fullWarband, setFullWarband } = context // Assuming setFullWarband exists

    const [spells, setSpells] = useState<Spell[] | null>([])
    const [expandedSpells, setExpandedSpells] = useState<Record<string, boolean>>({})
    const [originalSpells, setOriginalSpells] = useState<Spell[]>([])

    useEffect(() => {
        const wizard = fullWarband.find(m => m.role === "Wizard") as Wizard | undefined

        if (!wizard) {
            setSpells([])
            return
        }

        const filteredSpells = wizard.spells.filter((s): s is Spell => s !== null)
        setSpells(filteredSpells)
        setOriginalSpells(filteredSpells)
    }, [fullWarband])

    const toggleSpell = (spellName: string) => {
        setExpandedSpells(prev => ({
            ...prev,
            [spellName]: !prev[spellName],
        }))
    }

    const handleTargetNumberChange = (spellName: string, newValue: number) => {
        setSpells(prev =>
            prev?.map(s =>
                s.name === spellName ? { ...s, targetNumber: newValue } : s
            ) || []
        )
    }

    const handleSave = () => {
        const newWarband = fullWarband.map(member => {
            if (member.role === "Wizard") {
                const wizard = member as Wizard
                return {
                    ...wizard,
                    spells: wizard.spells.map(spell => {
                        const updated = spells?.find(s => s.name === spell?.name)
                        return updated ?? spell
                    }),
                }
            }
            return member
        })

        setFullWarband(newWarband)
        alert("Changes Saved")
    }

    return (
        <main className="flex flex-col items-center p-4 min-h-screenp-4">
            <div>
                <ul className="rounded-lg min-w-[350px] text-left space-y-2">
                    {spells?.map(spell => {
                        return (
                            <li
                                key={spell.name}
                                className="border text-md rounded p-3 cursor-pointer select-none"
                                onClick={() => toggleSpell(spell.name)}
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
                                    <span className="text-m font-semibold">{spell.name} - </span>
                                    <div>
                                        <input
                                            type="number"
                                            value={spell.targetNumber}
                                            onClick={e => e.stopPropagation()}
                                            onChange={e => {
                                                const val = Number(e.target.value)
                                                if (!isNaN(val)) {
                                                    handleTargetNumberChange(spell.name, val)
                                                }
                                            }}
                                            className="w-12 ml-2 text-center rounded border border-gray-300"
                                        />
                                        <span className="ml-2 text-m font-semibold">| {spell.targetNumber + 2}</span></div>

                                </div>
                            </li>
                        )
                    })}
                </ul>
                <div className='flex'>
                    <button
                        onClick={handleSave}
                        className=" bg-gray-800 m-auto  text-white px-4 py-2 mt-2 rounded hover:bg-blue-700 transition"
                    >
                        Save Changes
                    </button>
                </div>

            </div>
        </main>
    )
}

export default EditSpells
