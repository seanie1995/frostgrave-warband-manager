'use client'

import React, { ChangeEvent, FormEvent, useContext, useEffect } from 'react'
import Gamecodex from "../assets/Codex.json";
import { useState } from 'react';
import { Member, MemberProp, Soldier, Wizard } from "../models/models"
import { MyContext } from '../context/Context';
import { error } from 'console';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter();
    const context = useContext(MyContext)

    if (!context) {
        throw new Error("You aint got no context")
    }

    const { fullWarband, setFullWarband, wizardGold, setWizardGold } = context;

    const [selectedSoldier, setSelectedSoldier] = useState<Soldier | null>(null)
    const [soldierCodexList, setSoldierCodexList] = useState<Soldier[] | null>(null)
    const [soldierList, setSoldierList] = useState<Soldier[] | null>(null);

    useEffect(() => {
        const rawSoldiers = Gamecodex.soldiers

        const convertedSoldiers: Soldier[] = rawSoldiers.map(s => ({
            name: s.name,
            role: s.class,
            move: s.move,
            fight: s.fight,
            shoot: s.shoot,
            armour: s.armour,
            will: s.will,
            health: s.health,
            items: s.gear,
            notes: s.notes,
            type: s.type,
            cost: s.cost
        }));

        const wizard = fullWarband.find(member => member.role === "Wizard") as Wizard | null;

        if (!wizard) {
            return
        }

        setSoldierCodexList(convertedSoldiers);

    }, [])

    const handleSelectSoldier = (e: ChangeEvent<HTMLSelectElement>) => {
        const chosen: Soldier = JSON.parse(e.target.value)
        setSelectedSoldier(chosen)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const specialists = fullWarband.filter(
            (member): member is Soldier =>
                'type' in member && member.type === 'Specialist'
        );

        console.log(specialists.length)

        if (specialists.length > 4) {
            alert("You have too many specialists. Max 4 ");
            return;
        } else if (selectedSoldier?.role === selectedSoldier?.name) {
            alert("Please give soldier a unique name");
            return;
        }


        if (selectedSoldier && wizardGold >= selectedSoldier.cost) {

            const change = wizardGold - selectedSoldier.cost
            const wizard = fullWarband.find(member => member.role === "Wizard") as Wizard;

            const updatedWizard = {
                ...wizard,
                gold: change
            };

            const updatedWarband = fullWarband.map((m) =>
                m.role === "Wizard" ? updatedWizard : m)

            const finalWarband = [...updatedWarband, selectedSoldier]

            console.log(updatedWarband);

            console.log(change)

            setFullWarband(finalWarband);
            setWizardGold(change);

            localStorage.setItem('warband', JSON.stringify(finalWarband));
            setSelectedSoldier(null);
        } else {
            alert("U broke");
            return;
        }
    }

    const handleReturn = () => {
        router.back();
    }

    return (
        <main className="flex flex-col min-h-screen items-center max-w-md justify-center align-middle m-auto p-4 gap-2">
            <section className='flex flex-col p-4'>
                <h3>Gold: {wizardGold.toString()}</h3>
            </section>
            <form
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
                onSubmit={handleSubmit}
            >
                <div className='flex flex-col gap-2'>
                    <select
                        name="schoolSpell"
                        className="w-full max-w-xs border rounded px-3 py-2 m-auto block"
                        required
                        onChange={(e) => handleSelectSoldier(e)}
                    >
                        <option value="">Select Soldier</option>
                        {soldierCodexList?.length !== 0 ?
                            soldierCodexList?.map((soldier) => (
                                <option key={soldier.role} value={JSON.stringify(soldier)}>{soldier.role}</option>
                            )) : null
                        }
                    </select>
                </div>
                {selectedSoldier ? (<>
                    <section className=' flex flex-row gap-6 justify-center items-center'>
                        <p className='text-center'><span className='font-bold'>Move</span> {selectedSoldier?.move}</p>
                        <p className='text-center'><span className='font-bold'>Fight</span> {selectedSoldier?.fight}</p>
                        <p className='text-center'><span className='font-bold'>Shoot </span>{selectedSoldier?.shoot}</p>
                        <p className='text-center'><span className='font-bold'>Armour</span> {selectedSoldier?.armour}</p>
                        <p className='text-center'><span className='font-bold'>Health</span> {selectedSoldier?.health}</p>
                    </section>
                    <section className='flex flex-col'>
                        <div className='flex flex-row'>
                            <h3 className='font-bold mr-2'>Gear:</h3>
                            <p> {selectedSoldier?.items}</p>
                        </div>
                        <div className=' flex flex-row'>
                            <h3 className='font-bold mr-2'>Cost:</h3>
                            <p> {selectedSoldier?.cost}g</p>
                        </div>
                        <div className=' flex flex-row'>
                            <h3 className='font-bold mr-2'>Type:</h3>
                            <p> {selectedSoldier?.type}</p>
                        </div>
                    </section>
                    <input
                        className="w-full border rounded px-3 py-2 max-w-xs mx-auto block"
                        type="text"
                        placeholder='Enter Soldier Name'
                        name='soldierName'
                        value={selectedSoldier.name}
                        onChange={(e) => setSelectedSoldier((prev) => prev ? ({ ...prev, name: e.target.value }) : null)}
                        required />
                </>) : null}
                <div className='flex gap-2 flex-col w-full justify-center align-middle'>
                    <button type="submit" className="w-2/3 bg-black text-white py-2 m-auto rounded hover:bg-gray-800">Add Soldier</button>
                    {/* <button onClick={handleReturn} className="w-2/3 bg-black text-white py-2 m-auto rounded hover:bg-gray-800">Return</button> */}
                </div>
                {fullWarband.length !== 0 ?
                    <>
                        <h3 className='font-bold'>Warband</h3>
                        <ul>
                            {fullWarband.map((member) =>
                            (
                                <li key={member.name}>{member.name} - {member.role}</li>
                            ))}
                        </ul>
                    </> : null}
            </form>



        </main>
    )
}

export default page
