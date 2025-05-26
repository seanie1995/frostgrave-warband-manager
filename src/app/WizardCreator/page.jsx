'use client'
import { React, useState, useEffect } from 'react';

const page = () => {

    const [chosenSchool, setChosenSchool] = useState("")

    useEffect(() => {

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

                <select
                    name="school"
                    className="w-full max-w-xs border rounded px-3 py-2 mx-auto block"
                    required
                    onChange={setChosenSchool}
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
                    <label className="block font-semibold mb-1 text-center">Aligned Spells</label>
                    <label className="block font-semibold mb-1 text-center">Opposed Spells</label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                >
                    Save Wizard
                </button>
            </form>
        </main>
    );
};

export default page;
