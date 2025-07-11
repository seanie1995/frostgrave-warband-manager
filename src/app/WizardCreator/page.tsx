'use client'
import React, { useState, useEffect, ChangeEvent, FormEvent, useContext } from 'react';
import { MyContext } from '../context/Context';
import Gamecodex from "../assets/Codex.json";
import { Wizard, Spell, Apprentice, Member, MemberOrMembers } from "../models/models";
import { useRouter } from "next/navigation";
import SpellCard from "../components/spellCard"

const Page = () => {
    const context = useContext(MyContext);
    const router = useRouter();
    if (!context) {
        throw new Error("MyContext must be used within a MyProvider");
    }

    const { fullWarband, setFullWarband } = context

    const [chosenSchool, setChosenSchool] = useState<string>("");
    const [schoolSpells, setSchoolSpells] = useState<Spell[]>([]);
    const [alignedSpells1, setAlignedSpells1] = useState<Spell[]>([]);
    const [alignedSpells2, setAlignedSpells2] = useState<Spell[]>([]);
    const [alignedSpells3, setAlignedSpells3] = useState<Spell[]>([]);
    const [neutralSpells, setNeutralSpells] = useState<Spell[]>([]);

    const [neutralSpell1, setNeutralSpell1] = useState<Spell | null>(null)
    const [neutralSpell2, setNeutralSpell2] = useState<Spell | null>(null)

    const [chosenSchoolInfo, setChosenSchoolInfo] = useState<any>(null);
    const [hasApprentice, setHasApprentice] = useState<boolean | null>(false);
    const [selectedSpells, setSelectedSpells] = useState<Spell[]>([]);
    const [schoolNames, setSchoolNames] = useState<string[]>([]);

    const toggleHasApprentice = () => {
        setHasApprentice(prev => !prev)
    }

    const handleNeutralChoice = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
        if (index === 0) {
            setNeutralSpell1(JSON.parse(e.target.value))
        } else if (index === 1) {
            setNeutralSpell2(JSON.parse(e.target.value))
        }
    }

    const schools = [
        { "id": 1, "name": "Chronomancer" },
        { "id": 2, "name": "Elementalist" },
        { "id": 3, "name": "Enchanter" },
        { "id": 4, "name": "Illusionist" },
        { "id": 5, "name": "Necromancer" },
        { "id": 6, "name": "Sigilist" },
        { "id": 7, "name": "Soothsayer" },
        { "id": 8, "name": "Summoner" },
        { "id": 9, "name": "Thaumaturge" },
        { "id": 10, "name": "Witch" }
    ]

    const [wizard, setWizard] = useState<Wizard>({
        name: "",
        school: "",
        spells: [] as (Spell | null)[],
        role: "Wizard",
        move: 6,
        fight: 2,
        shoot: 0,
        armour: 10,
        will: 4,
        health: 14,
        items: "",
        notes: "",
        experience: 0,
        level: 1,
        gold: 200
    });

    const [apprentice, setApprentice] = useState<Apprentice>({
        name: "",
        school: wizard.school,
        spells: wizard.spells,
        role: "Apprentice",
        move: 6,
        fight: 0,
        shoot: 0,
        armour: 10,
        will: 2,
        health: 12,
        items: "",
        notes: ""
    })

    const [isSpellModalOpen, setSpellModalIsOpen] = useState<boolean>(false)
    const [spellToShow, setSpellToShow] = useState<Spell | null>(null)

    const handleSchoolChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setChosenSchool(e.target.value);
        setWizard(prev => ({ ...prev, school: chosenSchool }))
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            neutralSpell1 &&
            neutralSpell2 &&
            neutralSpell1.school === neutralSpell2.school
        ) {
            alert("You can't have two neutral spells from the same school");
            return;
        }

        const updatedWizard: Wizard = {
            ...wizard,
            school: chosenSchool,
            spells: selectedSpells
        }

        let updatedApprentice: Apprentice | null = null;

        if (hasApprentice) {
            updatedApprentice = {
                ...apprentice,
                school: chosenSchool,
                spells: selectedSpells,
            };
        }

        const uniqueSpells = updatedWizard.spells.filter((spell, index, self) =>
            index === self.findIndex(s => s?.name === spell?.name)
        );


        if (uniqueSpells.length < 8) {
            alert("You have duplicate spells")
            return;
        }

        const warband: Member[] = hasApprentice && updatedApprentice ? [updatedWizard, updatedApprentice] : [updatedWizard]

        localStorage.setItem('warband', JSON.stringify(warband));
        addToWarband(warband);

        router.push("/")
    };

    const addToWarband = (newEntry: MemberOrMembers) => {
        setFullWarband(prev => [
            ...prev,
            ...(Array.isArray(newEntry) ? newEntry : [newEntry]),
        ]);
    };

    const toggleSpellInfo = (index: number) => {
        setSpellModalIsOpen(true);
        const spell = selectedSpells[index]
        setSpellToShow(spell);
    }

    const handleSpellSelect = (e: ChangeEvent<HTMLSelectElement>, index: number) => {

        try {
            const selectedSpell = JSON.parse(e.target.value) as Spell;

            setSelectedSpells((prev) => {
                const updated = [...prev];
                updated[index] = selectedSpell;
                return updated;
            });
        } catch {
            console.log("No chosen spell")
        }

    }

    // Use Effect that sorts spells according to chosen school.
    useEffect(() => {
        if (!chosenSchool) return;

        const foundSchool = Gamecodex.schools.find(
            (school) => school.name === chosenSchool
        );

        let schoolNames: string[];

        setChosenSchoolInfo(foundSchool);

        if (!foundSchool) {
            setSchoolSpells([]);
            setAlignedSpells1([]);
            setAlignedSpells2([]);
            setAlignedSpells3([]);
            setNeutralSpells([]);
            return;
        }

        const ownSchoolSpellsFound = Gamecodex.spells.filter(
            (spells) => spells.school === foundSchool.id
        );

        setSchoolSpells(ownSchoolSpellsFound);

        var as1 = Gamecodex.spells.filter(spells => spells.school === foundSchool.aligned[0]);
        var as2 = Gamecodex.spells.filter(spells => spells.school === foundSchool.aligned[1]);
        var as3 = Gamecodex.spells.filter(spells => spells.school === foundSchool.aligned[2]);

        as1.forEach(s => s.targetNumber = s.targetNumber += 2)
        as2.forEach(s => s.targetNumber = s.targetNumber += 2)
        as3.forEach(s => s.targetNumber = s.targetNumber += 2)


        const allAlignedSchools: number[] = [
            as1[0]?.school,
            as2[0]?.school,
            as3[0]?.school
        ]

        const alignedSchoolNames: string[] = allAlignedSchools
            .map(id => schools.find(school => school.id === id)?.name)
            .filter((name): name is string => !!name);

        schoolNames = alignedSchoolNames;

        setSchoolNames(schoolNames);

        setAlignedSpells1(as1);
        setAlignedSpells2(as2);
        setAlignedSpells3(as3);

        var neutralSpellsFound = Array.isArray(foundSchool.neutral)
            ? Gamecodex.spells.filter(spell => foundSchool.neutral.includes(spell.school))
            : [];

        neutralSpellsFound.forEach(s => s.targetNumber += 4)

        const sortedSpells = neutralSpellsFound.sort((a, b) => a.school - b.school)

        setNeutralSpells(sortedSpells);

    }, [chosenSchool]);

    return (
        <main className="min-h-screen w-screen bg-gray-50">
            <form
                className="flex flex-col justify-center bg-white p-6 rounded-xl shadow-md w-screen space-y-4"
                onSubmit={handleSubmit}
            >
                <h1 className="text-2xl font-bold">Create Your Wizard</h1>
                <input
                    type="text"
                    name="wizardName"
                    placeholder="Wizard Name"
                    className="w-1/2 border rounded px-3 py-2 mr-2"
                    required
                    onChange={(e) =>
                        setWizard((prev) => ({ ...prev, name: e.target.value }))
                    }
                    value={wizard.name}
                />
                <select
                    name="school"
                    className="w-full max-w-xs border rounded px-3 py-2 "
                    required
                    onChange={handleSchoolChange}
                    value={chosenSchool}
                >
                    {!chosenSchool ? <option value="">Choose School</option> : null}

                    <option value="Chronomancer">Chronomancer</option>
                    <option value="Elementalist">Elementalist</option>
                    <option value="Enchanter">Enchanter</option>
                    <option value="Illusionist">Illusionist</option>
                    <option value="Necromancer">Necromancer</option>
                    <option value="Sigilist">Sigilist</option>
                    <option value="Soothsayer">Soothsayer</option>
                    <option value="Summoner">Summoner</option>
                    <option value="Thaumaturge">Thaumaturge</option>
                    <option value="Witch">Witch</option>
                </select>

                <div className='flex flex-col gap-2'>
                    <label className="block font-semibold mb-1">School Spells</label>

                    <div className='flex gap-2 xl:flex-row flex-col'>
                        <div className='flex xl:flex-row flex-row'>
                            <select
                                name="schoolSpell"
                                className="w-xl max-w-xs border rounded px-3 py-2"
                                required
                                onChange={(e) => handleSpellSelect(e, 0)}
                            >
                                <option value="">-</option>
                                {schoolSpells.map((spell) => (
                                    <option key={spell.name} value={JSON.stringify(spell)}>
                                        {spell.name} - {spell.targetNumber} | {spell.targetNumber + 2}
                                    </option>
                                ))}
                            </select>
                            <button onClick={() => toggleSpellInfo(0)} type='button' className="border-2 flex items-center justify-center ml-2 px-3 py-1 rounded"><p>?</p></button>
                        </div>

                        <div className='flex flex-row'>
                            <select
                                name="schoolSpell"
                                className="w-xl max-w-xs border rounded px-3 py-2"
                                required
                                onChange={(e) => handleSpellSelect(e, 1)}
                            >
                                <option value="">-</option>
                                {schoolSpells.map((spell) => (
                                    <option key={spell.name} value={JSON.stringify(spell)}>
                                        {spell.name} - {spell.targetNumber} | {spell.targetNumber + 2}
                                    </option>
                                ))}
                            </select>
                            <button onClick={() => toggleSpellInfo(1)} type='button' className="border-2 flex items-center justify-center ml-2 px-3 py-1 rounded"><p>?</p></button>
                        </div>
                        <div className='flex flex-row'>
                            <select
                                name="schoolSpell"
                                className="w-xl max-w-xs border rounded px-3 py-2"
                                required
                                onChange={(e) => handleSpellSelect(e, 2)}
                            >
                                <option value="">-</option>
                                {schoolSpells.map((spell) => (
                                    <option key={spell.name} value={JSON.stringify(spell)}>
                                        {spell.name} - {spell.targetNumber} | {spell.targetNumber + 2}
                                    </option>
                                ))}
                            </select>
                            <button onClick={() => toggleSpellInfo(2)} type='button' className="border-2 flex items-center justify-center ml-2 px-3 py-1 rounded"><p>?</p></button>
                        </div>
                    </div>

                    {/* ALIGNED SPELLS */}

                    <label className="block font-semibold mb-1 ">Aligned Spells</label>

                    <div className=' flex gap-2 xl:flex-row flex-col'>
                        <div className='flex xl:flex-row  flex-col gap-2'>
                            <div className='flex flex-row'>
                                <select
                                    name="aligned1"
                                    className="w-xl max-w-xs border rounded px-3 py-2"
                                    required
                                    onChange={(e) => handleSpellSelect(e, 3)}
                                >
                                    <option value="">- {schoolNames[0]} -</option>
                                    {alignedSpells1.map((spell) => (
                                        <option key={spell.name} value={JSON.stringify(spell)}>
                                            {spell.name} - {spell.targetNumber} | {spell.targetNumber + 2}
                                        </option>

                                    ))}

                                </select>
                                <button onClick={() => toggleSpellInfo(3)} type='button' className="border-2 flex items-center justify-center ml-2 px-3 py-1 rounded"><p>?</p></button>
                            </div>

                            <div className='flex flex-row'>
                                <select
                                    name="aligned2"
                                    className="w-xl max-w-xs border rounded px-3 py-2"
                                    required
                                    onChange={(e) => handleSpellSelect(e, 4)}
                                >
                                    <option value="">- {schoolNames[1]} -</option>
                                    {alignedSpells2.map((spell) => (
                                        <option key={spell.name} value={JSON.stringify(spell)}>
                                            {spell.name} - {spell.targetNumber} | {spell.targetNumber + 2}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={() => toggleSpellInfo(4)} type='button' className="border-2 flex items-center justify-center ml-2 px-3 py-1 rounded"><p>?</p></button>
                            </div>

                            <div className='flex flex-row'>
                                <select
                                    name="aligned3"
                                    className="w-xl max-w-xs border rounded px-3 py-2"
                                    required
                                    onChange={(e) => handleSpellSelect(e, 5)}
                                >
                                    <option value="">- {schoolNames[2]} -</option>
                                    {alignedSpells3.map((spell) => (
                                        <option key={spell.name} value={JSON.stringify(spell)}>
                                            {spell.name} - {spell.targetNumber} | {spell.targetNumber + 2}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={() => toggleSpellInfo(5)} type='button' className="border-2 flex items-center justify-center ml-2 px-3 py-1 rounded"><p>?</p></button>
                            </div>
                        </div></div>

                    {/* NEUTRAL SPELLS */}

                    <label className="block font-semibold mb-1">Neutral Spells</label>
                    <div className=' flex md:flex-row flex-col space-y-2'>
                        <div className='flex xl:flex-row  flex-col gap-2'>
                            <div className='flex flex-row'>
                                <select
                                    name="neutral1"
                                    className="w-xl max-w-xs border rounded px-3 py-2"
                                    required
                                    onChange={(e) => { handleSpellSelect(e, 6), handleNeutralChoice(e, 0) }}
                                >
                                    <option value="">-</option>
                                    {neutralSpells.map((spell) => (
                                        <option key={spell.name} value={JSON.stringify(spell)}>
                                            {spell.name} - {spell.schoolName} - {spell.targetNumber} | {spell.targetNumber + 2}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={() => toggleSpellInfo(6)} type='button' className="border-2 flex items-center justify-center ml-2 px-3 py-1 rounded"><p>?</p></button>
                            </div>

                            <div className='flex flex-row'>
                                <select
                                    name="neutral2"
                                    className="w-xl max-w-xs border rounded px-3 py-2"
                                    required
                                    onChange={(e) => { handleSpellSelect(e, 7), handleNeutralChoice(e, 1) }}
                                >
                                    <option value="">-</option>
                                    {neutralSpells.map((spell) => (
                                        <option key={spell.name} value={JSON.stringify(spell)}>
                                            {spell.name} - {spell.schoolName} - {spell.targetNumber} | {spell.targetNumber + 2}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={() => toggleSpellInfo(7)} type='button' className="border-2 flex items-center justify-center ml-2 px-3 py-1 rounded"><p>?</p></button>
                            </div>

                        </div>

                    </div>
                    <div className='flex flex-row m-2'>
                        <input type="checkbox" checked={hasApprentice ?? false} onChange={toggleHasApprentice} className='mr-3'></input>
                        <p className='text-center'>Make an Apprentice?</p>
                    </div>

                    {!hasApprentice ? null :
                        <input
                            type="text"
                            name="apprenticeName"
                            placeholder="Apprentice Name"
                            className="w-full border rounded px-3 py-2 max-w-xs  block"
                            required
                            onChange={(e) =>
                                setApprentice((prev) => ({ ...prev, name: e.target.value }))
                            }
                        />
                    }

                </div>
                <div className='flex space-x-2'>
                    <button
                        type="submit"
                        className="w-sm bg-black sm:max-w-1/12 text-white py-2 rounded hover:bg-gray-800"
                    >
                        Save Wizard
                    </button>
                    <button
                        type="button"
                        className="w-sm bg-red-600 sm:max-w-1/12 sm:not-[]:max-w-1/12 text-white py-2 rounded hover:bg-gray-800"
                        onClick={() => {
                            // You can add cancel logic here
                            console.log("Cancelled");
                        }}
                    >
                        Cancel
                    </button></div>

            </form>
            {isSpellModalOpen && spellToShow ? <SpellCard spell={spellToShow} onClick={() => setSpellModalIsOpen(false)} /> : null}
        </main>
    );
};

export default Page;
