'use client'

import React, { ChangeEvent, FormEvent, useContext, useEffect } from 'react'
import Gamecodex from "../assets/Codex.json";
import { useState } from 'react';
import { Member, MemberProp, Soldier, Wizard } from "../models/models"
import { MyContext } from '../context/Context';
import { error } from 'console';
import { useRouter } from 'next/navigation';
import NameCodex from "../assets/names.json"

const page = () => {
    const router = useRouter();
    const context = useContext(MyContext)

    if (!context) {
        throw new Error("You aint got no context")
    }

    const { fullWarband, setFullWarband, wizardGold, setWizardGold } = context;

    const [selectedSoldier, setSelectedSoldier] = useState<Soldier | null>(null)
    const [soldierCodexList, setSoldierCodexList] = useState<Soldier[] | null>(null)


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

    }, [fullWarband])

    useEffect(() => {
        if (!fullWarband || fullWarband.length === 0) return;

        const wizard = fullWarband.find(member => member.role === "Wizard");
        if (!wizard) return;

        const rawSoldiers = Gamecodex.soldiers;

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

        setSoldierCodexList(convertedSoldiers);

    }, [fullWarband]);


    const handleSelectSoldier = (e: ChangeEvent<HTMLSelectElement>) => {
        const chosen: Soldier = JSON.parse(e.target.value);
        const randomName = NameCodex.names[randomNumberGen() - 1];
        setSelectedSoldier({ ...chosen, name: randomName });
    }

    const randomNumberGen = () => {
        return Math.floor(Math.random() * 100) + 1
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const specialists = fullWarband.filter(
            (member): member is Soldier =>
                'type' in member && member.type === 'Specialist'
        );

        console.log(specialists.length)

        if (specialists.length >= 4) {
            alert("You have too many specialists. Max 4 ");
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
            setSelectedSoldier(prev => prev ? { ...prev, name: '' } : null)

        } else {
            alert("U broke");
            return;
        }
    }

    const handleReturn = () => {
        router.back();
    }

    return (
        <main className="flex min-h-screen mt-5 p-4 gap-2">
            <form className=" p-6 rounded-xl flex flex-col  w-full max-w-xl space-y-4"
                onSubmit={handleSubmit}
            >
                <section className=''>
                    <h3>Gold: {wizardGold.toString()}</h3>
                </section>
                <div>
                    <select
                        name="soldier"
                        className="w-full xl:max-w-1/2 border rounded px-3 py-2 block"
                        required
                        onChange={(e) => handleSelectSoldier(e)}
                    >
                        {!selectedSoldier ? <option value="">Select Soldier</option> : null}

                        {soldierCodexList?.length !== 0 ?
                            soldierCodexList?.map((soldier) => (
                                <option key={soldier.role} value={JSON.stringify(soldier)}>{soldier.role} {soldier.cost}g</option>
                            )) : null
                        }
                    </select>
                </div>
                {selectedSoldier ? (<div className='flex flex-col gap-6'>
                    <section className='flex flex-row gap-6  '>
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
                        className="w-full border rounded px-3 py-2 max-w-xs"
                        type="text"
                        placeholder='Enter Soldier Name'
                        name='soldierName'
                        value={selectedSoldier?.name ?? ''}
                        onChange={(e) => setSelectedSoldier((prev) => prev ? ({ ...prev, name: e.target.value }) : null)}
                        required />
                </div>) : null}
                <div className='flex gap-2 flex-col w-full justify-center align-middle'>
                    <button type="submit" className=" bg-black text-white py-2 rounded xl:max-w-1/2 hover:bg-gray-800">Add Soldier</button>
                    {/* <button onClick={handleReturn} className="w-2/3 bg-black text-white py-2 m-auto rounded hover:bg-gray-800">Return</button> */}
                </div>
                {fullWarband.length !== 0 && (
                    <div className='w-screen'>
                        <h3 className='font-bold text-lg mb-2'>Warband: {fullWarband.length}</h3>
                        <ul className=" gap-2 flex flex-wrap list-none">
                            {fullWarband
                                .map((member) => (
                                    <li
                                        key={member.name}
                                        className="border rounded-md p-3 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <h4 className="font-semibold text-base">{member.name}</h4>
                                            <span className="text-sm italic text-gray-500">{member.role}</span>
                                        </div>
                                        {'move' in member && (
                                            <div className="flex gap-4 text-sm text-gray-700">
                                                <span>Move: {member.move}</span>
                                                <span>Fight: {member.fight}</span>
                                                <span>Shoot: {member.shoot}</span>
                                                <span>Armour: {member.armour}</span>
                                                <span>Health: {member.health}</span>
                                            </div>
                                        )}
                                    </li>
                                ))}
                        </ul>
                    </div>
                )}
            </form>
        </main>
    )
}

export default page
