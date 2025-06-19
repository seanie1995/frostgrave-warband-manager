'use client'

import React, { ChangeEvent, useState } from 'react'
import { Member, MemberProp, Wizard, Apprentice, Spell } from "../models/models"
import { MyContext } from "../context/Context"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import Gamecodex from "../assets/Codex.json";
import { error } from 'console'

const WizardPage = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("MyContext must be used within a provider");
    }
    const router = useRouter();
    const { fullWarband, setFullWarband } = context;

    const [wizard, setWizard] = useState<Wizard | null>(null);
    const [wizardSpells, setWizardSpells] = useState<Spell[] | null>([]);
    const [spellList, setSpellList] = useState<Spell[] | null>([]);
    const [addSpell, setAddSpell] = useState<boolean>(false);
    const [chosenSpell, setChosenSpell] = useState<Spell | null>(null);

    useEffect(() => {
        const found = fullWarband.find(e => e.role === "Wizard") as Wizard;
        const foundSpells = found.spells as Spell[];



        const selectableSpells = Gamecodex.spells.filter(
            s => !foundSpells.some(existing => existing.name === s.name)
        );

        const sortedSpells = selectableSpells.sort((a, b) => a.schoolName.localeCompare(b.schoolName))

        setSpellList(sortedSpells);
        setWizardSpells(foundSpells);
        setWizard(found);
    }, [])

    const handleAddSpell = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        let updatedSpells

        if (chosenSpell) {
            updatedSpells = wizardSpells?.concat(chosenSpell);

            if (updatedSpells) {
                setWizardSpells(updatedSpells);
            }

        } else {
            throw new Error("Somefing went wrong")
        }


    }

    return (
        <main className="min-h-screen  bg-gray-50 p-4">
            <form className="flex flex-col justify-center bg-white p-6 rounded-xl shadow-md  space-y-4">
                <h1 className='text-2xl font-bold'>Your Wizard</h1>

                <input
                    type="text"
                    name="wizardName"
                    placeholder="Name"
                    required
                    className='border-1 border-black rounded min-w-1/8 sm:max-w-1/4 py-2 pl-2'
                    value={wizard?.name || ''}
                    onChange={e => setWizard(prev => prev ? ({ ...prev, name: e.target.value }) : null)}

                />
                <h2 className='text-lg font-bold'>School: {wizard?.school}</h2>
                <div className='flex max-w-full'>
                    <div className='flex gap-6 flex-col'>
                        <div className='gap-3 flex flex-wrap max-w-1/2'>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>Level</label>
                                <input type="number" required className='border-1 p-1 border-black rounded'
                                    onChange={e => setWizard(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                                    value={wizard?.level || ''} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold' >Exp</label>
                                <input type="number" required className='border-1 p-1 border-black rounded'
                                    onChange={e => setWizard(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                                    value={wizard?.experience || ''} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>Gold</label>
                                <input type="number" required className='border-1 p-1 border-black rounded'
                                    onChange={e => setWizard(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                                    value={wizard?.gold || ''} />
                            </div>
                        </div>
                        {/* STAT LINE */}
                        <div className='flex flex-wrap max-w-screen align-middle gap-3'>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>Move</label>
                                <input type="number" className='border-1 p-1 border-black rounded' required
                                    onChange={e => setWizard(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                                    value={wizard?.move || ''} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>Fight</label>
                                <input type="number" className='border-1 p-1 border-black rounded' required
                                    onChange={e => setWizard(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                                    value={wizard?.fight || ''} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>Shoot</label>
                                <input type="number" className='border-1 p-1 border-black rounded' required
                                    onChange={e => setWizard(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                                    value={wizard?.shoot || ''} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>Armor</label>
                                <input type="number" className='border-1 p-1 border-black rounded' required
                                    onChange={e => setWizard(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                                    value={wizard?.armour || ''} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>Will</label>
                                <input type="number" className='border-1 p-1 border-black rounded' required
                                    onChange={e => setWizard(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                                    value={wizard?.will || ''} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>Health</label>
                                <input type="number" className='border-1 p-1 border-black rounded' required
                                    onChange={e => setWizard(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                                    value={wizard?.health || ''} />
                            </div>
                        </div>
                        {/* ITEMS AND NOTES */}
                        <div className='flex flex-wrap gap-2'>
                            <input

                                type="text"
                                name="items"
                                placeholder="Items"
                                className='border-1 pb-16 pr-14 pl-1 rounded'
                                onChange={e => setWizard(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                            />
                            <input
                                type="text"
                                name="notes"
                                placeholder="Notes"
                                className='border-1 pb-16 pr-14 pl-1 rounded'
                                onChange={e => setWizard(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                            />
                        </div>
                        {/* ALL SPELLS */}
                        <div>
                            <label htmlFor="" className='font-bold'>{wizard?.name}'s Spells</label>
                            <ul className='flex flex-row gap-4 flex-wrap mt-2' >
                                {!wizardSpells ? <p>No Spells</p> :
                                    wizardSpells.map(spells =>
                                        <li className=" border-1 p-1 rounded font-bold " key={spells.name} value={spells.name}>{spells.name} - {spells.targetNumber} | {spells.targetNumber + 2}</li>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                {addSpell ?
                    <div>
                        <p className=' pb-2 font-bold'>Choose Spell</p>
                        <select
                            name='spell'
                            value={chosenSpell?.name}
                            className='border-1 min-w-40 p-2 rounded'
                            onChange={e => setChosenSpell(JSON.parse(e.target.value))}
                        >
                            {spellList?.map(spell =>
                                <option value={JSON.stringify(spell)} key={spell.name}>{spell.name} - {spell.schoolName}</option>
                            )}
                        </select>
                        <button
                            className='border-1 min-w-20 rounded-md p-2 hover:bg-gray-600 hover:cursor-pointer  bg-green-700 ml-2 text-white'
                            onClick={handleAddSpell}
                        >
                            Add
                        </button>
                    </div>
                    : null
                }
                <div className='flex flex-row gap-2'>
                    <button type="button" className='border-1 min-w-20 rounded-md p-2 hover:bg-gray-600 hover:cursor-pointer  bg-gray-800 text-white'>
                        Save
                    </button>
                    <button onClick={e => setAddSpell(prev => !prev)} type="button" className='border-1  rounded-md p-2 hover:bg-gray-600 hover:cursor-pointer  bg-gray-800 text-white'>
                        Add Spells
                    </button>
                    <button onClick={e => router.push("/EditSpells")} type="button" className='border-1  rounded-md p-2 hover:bg-gray-600 hover:cursor-pointer  bg-gray-800 text-white'>
                        Modify Spells
                    </button>
                </div>


            </form>
        </main>
    )
}

export default WizardPage
