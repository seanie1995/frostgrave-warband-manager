'use client'
import React, { useState, useEffect, ChangeEvent, FormEvent, useContext } from 'react';
import { MyContext } from '@/context/Context';
import Gamecodex from "@/assets/Codex.json";
import { Wizard, Spell, Apprentice, Member, MemberOrMembers } from "@/models/models";
import { useRouter } from "next/navigation";
import SpellCard from "@/components/SpellCard"

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

        setChosenSchoolInfo(foundSchool);

        if (!foundSchool) {
            setSchoolSpells([]);
            setAlignedSpells1([]);
            setAlignedSpells2([]);
            setAlignedSpells3([]);
            setNeutralSpells([]);
            return;
        }

        // Own school spells
        const ownSchoolSpellsFound = Gamecodex.spells
            .filter(spell => spell.school === foundSchool.id)
            .map(s => ({ ...s })); // clone to avoid mutation
        setSchoolSpells(ownSchoolSpellsFound);

        // Aligned spells (add +2 targetNumber)
        const as1 = Gamecodex.spells
            .filter(spell => spell.school === foundSchool.aligned[0])
            .map(s => ({ ...s, targetNumber: s.targetNumber + 2 }));
        const as2 = Gamecodex.spells
            .filter(spell => spell.school === foundSchool.aligned[1])
            .map(s => ({ ...s, targetNumber: s.targetNumber + 2 }));
        const as3 = Gamecodex.spells
            .filter(spell => spell.school === foundSchool.aligned[2])
            .map(s => ({ ...s, targetNumber: s.targetNumber + 2 }));

        setAlignedSpells1(as1);
        setAlignedSpells2(as2);
        setAlignedSpells3(as3);

        // Neutral spells (add +4 targetNumber)
        const neutralSpellsFound = (Array.isArray(foundSchool.neutral)
            ? Gamecodex.spells.filter(spell => foundSchool.neutral.includes(spell.school))
            : []
        ).map(s => ({ ...s, targetNumber: s.targetNumber + 4 }));

        const sortedNeutral = neutralSpellsFound.sort((a, b) => a.school - b.school);
        setNeutralSpells(sortedNeutral);

        // Aligned school names for display
        const alignedSchoolNames = [as1, as2, as3]
            .map(arr => schools.find(s => s.id === arr[0]?.school)?.name)
            .filter((name): name is string => !!name);
        setSchoolNames(alignedSchoolNames);

    }, [chosenSchool]);


    return (
        <main className="min-h-screen w-full pb-20 px-4">
            <form
                className="flex flex-col justify-center glass-panel p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto space-y-6"
                onSubmit={handleSubmit}
            >
                <h1 className="text-3xl font-bold text-white text-center mb-4">Create Your Wizard</h1>
                
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    <input
                        type="text"
                        name="wizardName"
                        placeholder="Wizard Name"
                        className="w-full md:w-1/2 bg-black/30 border border-white/20 rounded px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-[var(--accent-color)]"
                        required
                        onChange={(e) =>
                            setWizard((prev) => ({ ...prev, name: e.target.value }))
                        }
                        value={wizard.name}
                    />
                    <select
                        name="school"
                        className="w-full md:w-1/2 bg-black/30 border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                        required
                        onChange={handleSchoolChange}
                        value={chosenSchool}
                    >
                        {!chosenSchool ? <option value="" className="text-black">Choose School</option> : null}

                        {schools.map(s => (
                            <option key={s.id} value={s.name} className="text-black">{s.name}</option>
                        ))}
                    </select>
                </div>

                <div className='flex flex-col gap-4'>
                    <label className="block font-semibold text-[var(--accent-color)] text-lg border-b border-white/10 pb-2">School Spells</label>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        {[0, 1, 2].map((index) => (
                            <div key={index} className='flex items-center gap-2'>
                                <select
                                    name="schoolSpell"
                                    className="w-full bg-black/30 border border-white/20 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--accent-color)]"
                                    required
                                    onChange={(e) => handleSpellSelect(e, index)}
                                >
                                    <option value="" className="text-black">- Select Spell -</option>
                                    {schoolSpells.map((spell) => (
                                        <option key={spell.name} value={JSON.stringify(spell)} className="text-black">
                                            {spell.name} (TN: {spell.targetNumber})
                                        </option>
                                    ))}
                                </select>
                                <button onClick={() => toggleSpellInfo(index)} type='button' className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] transition-all">?</button>
                            </div>
                        ))}
                    </div>

                    {/* ALIGNED SPELLS */}
                    <label className="block font-semibold text-[var(--accent-color)] text-lg border-b border-white/10 pb-2 mt-4">Aligned Spells</label>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        {[
                            { spells: alignedSpells1, schoolName: schoolNames[0], index: 3 },
                            { spells: alignedSpells2, schoolName: schoolNames[1], index: 4 },
                            { spells: alignedSpells3, schoolName: schoolNames[2], index: 5 }
                        ].map((group) => (
                            <div key={group.index} className='flex items-center gap-2'>
                                <select
                                    name={`aligned${group.index}`}
                                    className="w-full bg-black/30 border border-white/20 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--accent-color)]"
                                    required
                                    onChange={(e) => handleSpellSelect(e, group.index)}
                                >
                                    <option value="" className="text-black">- {group.schoolName || 'Aligned'} -</option>
                                    {group.spells.map((spell) => (
                                        <option key={spell.name} value={JSON.stringify(spell)} className="text-black">
                                            {spell.name} (TN: {spell.targetNumber})
                                        </option>
                                    ))}
                                </select>
                                <button onClick={() => toggleSpellInfo(group.index)} type='button' className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] transition-all">?</button>
                            </div>
                        ))}
                    </div>

                    {/* NEUTRAL SPELLS */}
                    <label className="block font-semibold text-[var(--accent-color)] text-lg border-b border-white/10 pb-2 mt-4">Neutral Spells</label>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {[0, 1].map((i) => (
                            <div key={i} className='flex items-center gap-2'>
                                <select
                                    name={`neutral${i + 1}`}
                                    className="w-full bg-black/30 border border-white/20 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--accent-color)]"
                                    required
                                    onChange={(e) => { handleSpellSelect(e, 6 + i), handleNeutralChoice(e, i) }}
                                >
                                    <option value="" className="text-black">- Select Neutral Spell -</option>
                                    {neutralSpells.map((spell) => (
                                        <option key={spell.name} value={JSON.stringify(spell)} className="text-black">
                                            {spell.name} - {spell.schoolName} (TN: {spell.targetNumber})
                                        </option>
                                    ))}
                                </select>
                                <button onClick={() => toggleSpellInfo(6 + i)} type='button' className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] transition-all">?</button>
                            </div>
                        ))}
                    </div>

                    <div className='flex items-center justify-center gap-3 mt-6 p-4 bg-white/5 rounded-lg border border-white/10'>
                        <input type="checkbox" checked={hasApprentice ?? false} onChange={toggleHasApprentice} className='w-5 h-5 accent-[var(--accent-color)]'></input>
                        <p className='text-white font-medium'>Recruit an Apprentice? (200gc)</p>
                    </div>

                    {hasApprentice && (
                        <div className="flex justify-center">
                            <input
                                type="text"
                                name="apprenticeName"
                                placeholder="Apprentice Name"
                                className="w-full max-w-xs bg-black/30 border border-white/20 rounded px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-[var(--accent-color)] text-center"
                                required
                                onChange={(e) =>
                                    setApprentice((prev) => ({ ...prev, name: e.target.value }))
                                }
                            />
                        </div>
                    )}

                </div>
                <div className='flex gap-4 justify-center pt-6'>
                    <button
                        type="submit"
                        className="px-8 py-3 bg-[var(--accent-color)] text-slate-900 font-bold rounded-lg hover:bg-[var(--accent-hover)] transition-colors shadow-lg shadow-[var(--accent-color)]/20"
                    >
                        Save Wizard
                    </button>
                    <button
                        type="button"
                        className="px-8 py-3 bg-red-500/80 text-white font-bold rounded-lg hover:bg-red-600 transition-colors border border-red-400/30"
                        onClick={() => router.push('/')}
                    >
                        Cancel
                    </button>
                </div>

            </form>
            {isSpellModalOpen && spellToShow ? <SpellCard spell={spellToShow} onClick={() => setSpellModalIsOpen(false)} /> : null}
        </main>
    );
};

export default Page;
