'use client'
import { React, useState, useEffect } from 'react';
import Gamecodex from "../assets/Codex.json"
import { type } from 'os';
const page = () => {

    const [chosenSchool, setChosenSchool] = useState("");
    const [schoolSpells, setSchoolSpells] = useState([]);
    const [alignedSpells1, setAlignedSpells1] = useState([]);
    const [alignedSpells2, setAlignedSpells2] = useState([]);
    const [alignedSpells3, setAlignedSpells3] = useState([]);
    const [neutralSpells, setNeutralSpells] = useState([]);
    const [chosenSchoolInfo, setChosenSchoolInfo] = useState([]);
    const [hasApprentice, setHasApprentice] = useState(false);

    useEffect(() => {

        if (!chosenSchool) return;

        const foundSchool = Gamecodex.schools.find(
            (school) => school.name === chosenSchool
        )

        setChosenSchoolInfo(foundSchool);

        const ownSchoolSpellsFound = Gamecodex.spells.filter(
            (spells) => spells.school === foundSchool.id
        )

        setSchoolSpells(ownSchoolSpellsFound);

        const as1 = Gamecodex.spells.filter(spells => spells.school === foundSchool.aligned[0])
        const as2 = Gamecodex.spells.filter(spells => spells.school === foundSchool.aligned[1])
        const as3 = Gamecodex.spells.filter(spells => spells.school === foundSchool.aligned[2])

        setAlignedSpells1(as1);
        setAlignedSpells2(as2);
        setAlignedSpells3(as3);

        const neutralSpellsFound = Gamecodex.spells.filter(spells => foundSchool.neutral.includes(spells.school))

        setNeutralSpells(neutralSpellsFound)

    }, [chosenSchool])


    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <form className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
                <h1 className="text-2xl font-bold text-center">Create Your Wizard</h1>
                <input
                    type="text"
                    name="name"
                    placeholder="Wizard Name"
                    className="w-full border rounded px-3 py-2 max-w-xs mx-auto block"
                    required
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Apprentice Name"
                    className="w-full border rounded px-3 py-2 max-w-xs mx-auto block"
                    required
                />
                <p className="text-center text-s">Leave above field blank if you don't want an apprentice</p>
                <select
                    name="school"
                    className="w-full max-w-xs border rounded px-3 py-2 mx-auto block"
                    required
                    onChange={(e) => setChosenSchool(e.target.value)}
                >
                    <option value="">Choose School</option>
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

                <input
                    type="number"
                    name="level"
                    placeholder="Level"
                    className="w-full border rounded px-3 py-2 max-w-xs mx-auto block"
                    min={0}
                />

                <div>
                    <label className="block font-semibold mb-1 text-center">School Spells</label>
                    <select
                        name="school"
                        className="w-full max-w-xs border rounded px-3 py-2 mx-auto block"
                        required
                    >
                        {schoolSpells.map((spell) => (
                            <option key={spell.name} value={JSON.stringify(spell)}>{spell.name}</option>
                        ))}

                    </select>
                    <label className="block font-semibold mb-1 text-center">Aligned Spells</label>

                    <select
                        name="aligned1"
                        className="w-full max-w-xs border rounded px-3 py-2 mx-auto block mb-2"
                        required
                    >
                        {alignedSpells1.map((spell) => (
                            <option key={spell.name} value={JSON.stringify(spell)}>{spell.name}</option>
                        ))}
                    </select>
                    <select
                        name="aligned2"
                        className="w-full max-w-xs border rounded px-3 py-2 mx-auto block mb-2"
                        required
                    >
                        {alignedSpells2.map((spell) => (
                            <option key={spell.name} value={JSON.stringify(spell)}>{spell.name}</option>
                        ))}
                    </select>
                    <select
                        name="aligned3"
                        className="w-full max-w-xs border rounded px-3 py-2 mx-auto block mb-2"
                        required
                    >
                        {alignedSpells3.map((spell) => (
                            <option key={spell.name} value={JSON.stringify(spell)}>{spell.name}</option>
                        ))}
                    </select>

                    <label className="block font-semibold mb-1 text-center">Neutral Spells</label>
                    <select
                        name="neutral"
                        className="w-full max-w-xs border rounded px-3 py-2 mx-auto block mb-2"
                        required
                    >
                        {neutralSpells.map((spell) => (
                            <option key={spell.name} value={JSON.stringify(spell)}>{spell.name}</option>
                        ))}
                    </select>
                    <select
                        name="neutral"
                        className="w-full max-w-xs border rounded px-3 py-2 mx-auto block"
                        required
                    >
                        {neutralSpells.map((spell) => (
                            <option key={spell.name} value={JSON.stringify(spell)}>{spell.name}</option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                >
                    Save Wizard
                </button>
                <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-gray-800">
                    Cancel
                </button>
            </form>
        </main>
    );
};

export default page;
