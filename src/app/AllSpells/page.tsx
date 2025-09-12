'use client'

import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context/Context'
import { Member, Wizard, Spell } from '../models/models'
import Gamecodex from '../assets/Codex.json'

const AllSpells = () => {
    const context = useContext(MyContext)
    if (!context) {
        throw new Error("No Context")
    }

    const [chosenSpell, setChosenSpell] = useState<Spell | null>(null)
    const [spellList, setSpellList] = useState<Spell[] | null>([])

    useEffect(() => {
        const spellList = Gamecodex.spells;

        if (!spellList) {
            return;
        }

        const sortedSpells = spellList.sort((a, b) => a.school - b.school);

        setSpellList(sortedSpells);
    }, [])

    return (
        <div className="min-h-screen w-screen mt-20  p-4">
            <p className='font-bold'>Select a Spell</p>
            <select
                name="chosenSpell"
                value={chosenSpell ? JSON.stringify(chosenSpell) : ""}
                onChange={e => setChosenSpell(JSON.parse(e.target.value))}
                className='border border-black p-1 mt-2 rounded'
            >
                {spellList ?
                    spellList.map(s =>
                        <option value={JSON.stringify(s)} key={s.name} >
                            {s.name} - {s.schoolName}
                        </option>) : null}
            </select>
            {chosenSpell ? <div className="bg-white max-w-screen mt-2 w-full p-6 rounded-2xl shadow-xl border border-gray-200">
                <div className="flex flex-col gap-2 text-gray-800">
                    <h2 className="text-2xl font-bold">{chosenSpell.name}</h2>
                    <p className="text-sm text-gray-500">
                        Target Number: <span className="font-medium">{chosenSpell.targetNumber}</span> /{" "}
                        <span className="font-medium">{chosenSpell.targetNumber + 2}</span>

                    </p>
                    <p className='text-sm text-gray-500'>Type: {chosenSpell.type}</p>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">{chosenSpell.description}</p>

                </div>
            </div> : null}
        </div>
    )
}

export default AllSpells
