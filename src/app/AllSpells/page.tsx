'use client'

import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '@/context/Context'
import { Member, Wizard, Spell } from '@/models/models'
import Gamecodex from '@/assets/Codex.json'

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
        <main className="min-h-screen w-full pb-20 px-4 flex flex-col items-center">
            <div className="glass-panel p-6 rounded-xl w-full max-w-4xl mt-8 space-y-6">
                <div className="border-b border-white/10 pb-4">
                    <h1 className="text-3xl font-bold text-white text-center">Spell Compendium</h1>
                    <p className="text-slate-400 text-center mt-2">Browse all available spells</p>
                </div>

                <div className="space-y-3">
                    <label className="block text-slate-300 text-sm font-semibold uppercase tracking-wider">
                        Select a Spell
                    </label>
                    <select
                        name="chosenSpell"
                        value={chosenSpell ? JSON.stringify(chosenSpell) : ""}
                        onChange={e => setChosenSpell(JSON.parse(e.target.value))}
                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--accent-color)] transition-colors"
                    >
                        <option value="" className="text-black">-- Choose a Spell --</option>
                        {spellList ?
                            spellList.map(s =>
                                <option value={JSON.stringify(s)} key={s.name} className="text-black">
                                    {s.name} - {s.schoolName}
                                </option>) : null}
                    </select>
                </div>

                {chosenSpell && (
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-4 animate-fadeIn">
                        <div className="flex justify-between items-start border-b border-white/10 pb-3">
                            <h2 className="text-2xl font-bold text-white">{chosenSpell.name}</h2>
                            <span className="text-xs font-semibold bg-[var(--accent-color)]/20 text-[var(--accent-color)] px-3 py-1 rounded-full">
                                {chosenSpell.schoolName}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Target Number</div>
                                <div className="text-2xl font-bold text-[var(--accent-color)]">
                                    {chosenSpell.targetNumber} <span className="text-slate-400 text-lg">/ {chosenSpell.targetNumber + 2}</span>
                                </div>
                            </div>

                            <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Spell Type</div>
                                <div className="text-lg font-semibold text-white">{chosenSpell.type}</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="text-xs text-slate-400 uppercase tracking-wider">Description</div>
                            <p className="text-slate-200 leading-relaxed whitespace-pre-line">
                                {chosenSpell.description}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

export default AllSpells
