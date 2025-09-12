'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
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
    const [addSpellModal, setAddSpellModal] = useState<boolean>(false);
    const [chosenSpell, setChosenSpell] = useState<Spell | null>(null);
    const [deleteSpellMode, setDeleteSpellMode] = useState<boolean>(false)

    useEffect(() => {
        if (!fullWarband || fullWarband.length === 0) return;
        const found = fullWarband.find(e => e.role === "Wizard") as Wizard;
        if (!found) return;

        try {
            const foundSpells = found?.spells as Spell[];
            const selectableSpells = Gamecodex.spells.filter(
                s => !foundSpells.some(existing => existing.name === s.name)
            );

            const updatedTargetNumberSpells = ModifyTargetNumbers(selectableSpells)

            const sortedSpells = updatedTargetNumberSpells.sort((a, b) => a.schoolName.localeCompare(b.schoolName))

            setChosenSpell(sortedSpells[0])
            setSpellList(sortedSpells);
            setWizardSpells(foundSpells);
            setWizard(found);
        } catch (e) {
            alert(e)
        }

    }, [fullWarband])

    const ModifyTargetNumbers = (Spells: Spell[]) => {
        const schoolName = wizard?.school
        const school = Gamecodex.schools.find(s => s.name === schoolName)

        const updatedSpells = Spells.map(spell => {
            let newTargetNumber = spell.targetNumber

            if (school?.aligned.includes(spell.school)) {
                newTargetNumber += 2
            } else if (school?.neutral.includes(spell.school)) {
                newTargetNumber += 4
            } else if (school?.opposed.includes(spell.school)) {
                newTargetNumber += 6
            }

            return {
                ...spell,
                targetNumber: newTargetNumber
            }
        })

        return updatedSpells
    }

    const handleAddSpell = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        let updatedSpells

        if (chosenSpell) {
            updatedSpells = wizardSpells?.concat(chosenSpell);

            if (updatedSpells) {
                setWizardSpells(updatedSpells);
            }

        } else {
            throw new Error()
        }
    }

    const handleDeleteSpell = (spellName: string) => {
        if (!wizardSpells) return;

        var updatedWizardSpells = wizardSpells?.filter(e => e.name !== spellName)

        setWizardSpells(updatedWizardSpells);
        setDeleteSpellMode(false);
        alert("Don't forget to press save")

    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        try {
            var updatedWizard = wizard;

            if (updatedWizard) {
                updatedWizard.spells = wizardSpells ?? [];
            }

            const updatedWarband = fullWarband.map(w =>
                w.name === updatedWizard?.name ? updatedWizard : w
            );

            console.log(updatedWizard);

            setFullWarband(updatedWarband);

            localStorage.setItem("warband", JSON.stringify(updatedWarband));
            setDeleteSpellMode(false)
            setAddSpellModal(false);
            alert("Changes saved successfuly")
        } catch (ex) {
            alert(ex)
        }

    }

    return (
        <main className="min-h-screen   p-4">
            <form className="flex flex-col justify-center bg-white p-6 rounded-xl shadow-md  space-y-4"
                onSubmit={handleSubmit}>
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
                                    onChange={e => setWizard(prev => prev ? ({ ...prev, level: Number(e.target.value) }) : null)}
                                    value={wizard?.level || ''} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold' >Exp</label>
                                <input type="number" required className='border-1 p-1 border-black rounded'
                                    onChange={e => setWizard(prev => prev ? ({ ...prev, experience: Number(e.target.value) }) : null)}
                                    value={wizard?.experience || 0} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>Gold</label>
                                <input type="number" required className='border-1 p-1 border-black rounded'
                                    onChange={e => setWizard(prev => prev ? ({ ...prev, gold: Number(e.target.value) }) : null)}
                                    value={wizard?.gold || '0'} />
                            </div>
                        </div>
                        {/* STAT LINE */}
                        <div className='flex flex-wrap max-w-screen align-middle gap-3'>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>Move</label>
                                <input type="number" className='border-1 p-1 border-black rounded' required
                                    onChange={e => setWizard(prev => prev ? ({ ...prev, move: Number(e.target.value) }) : null)}
                                    value={wizard?.move || 0} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>Fight</label>
                                <input type="number" className='border-1 p-1 border-black rounded' required
                                    onChange={e => setWizard(prev => prev ? ({ ...prev, fight: Number(e.target.value) }) : null)}
                                    value={wizard?.fight || 0} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>Shoot</label>
                                <input type="number" className='border-1 p-1 border-black rounded' required
                                    onChange={e => setWizard(prev => prev ? ({ ...prev, shoot: Number(e.target.value) }) : null)}
                                    value={wizard?.shoot || 0} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>Armor</label>
                                <input type="number" className='border-1 p-1 border-black rounded' required
                                    onChange={e => setWizard(prev => prev ? ({ ...prev, armour: Number(e.target.value) }) : null)}
                                    value={wizard?.armour || 0} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>Will</label>
                                <input type="number" className='border-1 p-1 border-black rounded' required
                                    onChange={e => setWizard(prev => prev ? ({ ...prev, will: Number(e.target.value) }) : null)}
                                    value={wizard?.will || 0} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold'>Health</label>
                                <input type="number" className='border-1 p-1 border-black rounded' required
                                    onChange={e => setWizard(prev => prev ? ({ ...prev, health: Number(e.target.value) }) : null)}
                                    value={wizard?.health || 0} />
                            </div>
                        </div>
                        {/* ITEMS AND NOTES */}
                        <div className='flex flex-col gap-2'>
                            <label className='font-bold'>Items</label>
                            <input
                                type="text"
                                name="items"
                                placeholder="Items"
                                className='border-1 pb-16 pr-14 pl-1 rounded md:max-w-1/3'
                                onChange={e => setWizard(prev => prev ? ({ ...prev, items: e.target.value }) : null)}
                                value={wizard?.items || ""}
                            />
                            <label className='font-bold'>Notes</label>
                            <input
                                type="text"
                                name="notes"
                                placeholder="Notes"
                                className='border-1 pb-16 pr-14 pl-1 rounded md:max-w-1/3'
                                onChange={e => setWizard(prev => prev ? ({ ...prev, notes: e.target.value }) : null)}
                                value={wizard?.notes || ""}
                            />
                        </div>
                        {/* ALL SPELLS */}
                        <div>
                            <label htmlFor="" className='font-bold'>{wizard?.name}'s Spells</label>
                            <ul className='flex flex-row gap-4 flex-wrap mt-2' >
                                {!wizardSpells ? <p>No Spells</p> :
                                    wizardSpells.map(spells =>
                                        <li className=" border-1 p-1 rounded font-bold flex " key={spells.name}
                                            value={spells.name}>{spells.name} - {spells.targetNumber} | {spells.targetNumber + 2}
                                            {deleteSpellMode ? <button onClick={() => handleDeleteSpell(spells.name)} className='bg-red-600 px-2 ml-2 rounded-md hover:cursor-pointer hover:bg-red-400'>X</button> : null}</li>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                {addSpellModal ?
                    <div>
                        <p className=' pb-2 font-bold'>Choose Spell</p>
                        <select
                            name='spell'
                            value={chosenSpell ? JSON.stringify(chosenSpell) : ""}
                            className='border-1 min-w-40 p-2 rounded'
                            onChange={e => setChosenSpell(JSON.parse(e.target.value))}
                        >
                            {spellList?.map(spell =>
                                <option value={JSON.stringify(spell)} key={spell.name}>{spell.name} - {spell.schoolName} - {spell.targetNumber} | {spell.targetNumber + 2}</option>
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
                    <button type="submit" className='border-1 min-w-20 rounded-md p-2 hover:bg-gray-600 hover:cursor-pointer  bg-gray-800 text-white'>
                        Save
                    </button>
                    <button onClick={e => setAddSpellModal(prev => !prev)} type="button" className='border-1  rounded-md p-2 hover:bg-gray-600 hover:cursor-pointer  bg-gray-800 text-white'>
                        Add Spells
                    </button>
                    <button onClick={e => setDeleteSpellMode(prev => !prev)} type="button" className='border-1  rounded-md p-2 hover:bg-red-600 hover:cursor-pointer  bg-red-800 text-white'>
                        Remove Spells
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
